import ChatService from '../../services/chatService';
import Chat, { addMessageIndexToStreamingChat, addSessionInfo, appendFunctionToChat, appendNewStreamingResponse, newChat, updateStreamingChatMessage } from '../../shared/models/Chat';
import ChatSession from '../../shared/models/ChatSession';
import Message, { MessageMetadata, MessageType } from '../../shared/models/Message';
import { clearActiveChat, setAbortController, setActiveChat, setCurrentChatAction, setFetchingChat, setUserStoppedStreaming } from '../reducers/appReducer';
import { AppDispatch, RootState } from '../store';



export const sendMessageAction = (messageContent: string, startNew?: boolean, noFunctions?: boolean, metadata?: MessageMetadata) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const chat = getState().appState.activeChat;

            const message: Message = {
                content: messageContent,
                dt: (new Date()).toISOString(),
                type: MessageType.sent,
                meta: metadata,
            }

            const useMemory = getState().appState.memory;
            const isPrompt = message.content.startsWith('[');
            const actuallyUseMemory = useMemory && !isPrompt;

            if (startNew || !chat) {
                const freshChat = newChat(message);
                dispatch(setActiveChat(freshChat));
                createNewChat(freshChat, message, actuallyUseMemory, noFunctions ?? false, dispatch, getState);
            } else {
                const updatedChat = updateChat(chat, message, dispatch, true);
                sendMessageToExistingChat(updatedChat, message, actuallyUseMemory, dispatch, getState);
            }

        } catch (error) {
            console.error('Error sending chat:', error);
        }
    };
};

const createNewChat = async (chat: Chat, message: Message, memory: boolean, noFunctions: boolean, dispatch: AppDispatch, getState: () => RootState) => {
    console.log('>>> Entering createNewChat function'); // Added log
    try {
        const abortController = new AbortController();
        dispatch(setCurrentChatAction(undefined));
        dispatch(setAbortController(abortController));

        const chatModel = getState().appState.chatModel;
        const suggModel = getState().appState.suggModel;
        console.log(`Using functions: ${!noFunctions}`);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/chats/new`, {
            method: 'POST',
            signal: abortController.signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/x-ndjson',
            },
            body: JSON.stringify({
                message: message.content,
                metadata: message.meta,
                chatModel: chatModel.model,
                chatModelType: chatModel.type,
                suggModel: suggModel.model,
                suggModelType: suggModel.type,
                memory,
                noFunctions,
            }),
        });

        console.log('>>> Fetch response status:', res.status); // Added log

        if (!res.ok) {
            console.error('Failed to create new chat', res.status, await res.text().catch(() => 'Could not read error body')); // Enhanced error log
            throw new Error('Failed to create new chat');
        }

        const reader = res.body?.getReader();
        console.log('>>> Reader obtained:', !!reader); // Added log
        console.log('STREAM: PARSER '); // Original log
        if (!reader) {
            console.error(`No reader available. Response ok: ${res.ok}, Status: ${res.status}`); // Enhanced error log
            return;
        }
        const streamingChat = appendNewStreamingResponse(chat);
        console.log('STREAM: BOUTTA READ'); // Original log
        await readStream(streamingChat, reader, dispatch, true, getState);

    } catch (error) {
        console.log('>>> Error in createNewChat:', error); // Added log
        // Check if the error is an AbortError which might be expected if the user cancels
        if (error instanceof DOMException && error.name === 'AbortError') {
            console.log('>>> Fetch aborted, likely by user action.');
        } else {
            console.error('Error creating new chat:', error);
        }
    }
};

export const sendMessageToExistingChat = async (chat: Chat, message: Message, memory: boolean, dispatch: AppDispatch, getState: () => RootState) => {
    const abortController = new AbortController();
    dispatch(setAbortController(abortController));
    dispatch(setCurrentChatAction(undefined));

    const res = await fetch(`${process.env.REACT_APP_API_URL}/chats/${chat.sessionId}/send`, {
        method: 'PUT',
        signal: abortController.signal,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/x-ndjson',

        },
        body: JSON.stringify({
            message: message.content,
            metadata: message.meta,
            memory,
        }),
    });

    const reader = res.body?.getReader();

    if (!reader) return;
    const streamingChat = appendNewStreamingResponse(chat);
    await readStream(streamingChat, reader, dispatch, false, getState);
}

const updateChat = (chat: Chat, message: Message, dispatch: AppDispatch, pending?: boolean): Chat => {
    if (message.i === undefined) {
        message.i = chat.messages[chat.messages.length - 1].i ? chat.messages[chat.messages.length - 1]!.i! + 1 : 0;
    }
    const updatedChat: Chat = {
        ...chat,
        messages: [...chat.messages, message],
        pending: pending ?? chat.pending ?? false,
        suggestions: undefined,
    };
    dispatch(setActiveChat(updatedChat));

    return updatedChat;
}

export enum StreamType {
    chatNew,
    chatExisting,
    interviewNew,
    interviewExisting,
}

const readStream = async (streamingChat: Chat, reader: ReadableStreamDefaultReader<Uint8Array>, dispatch: AppDispatch, newChat: boolean, getState: () => RootState) => {
    console.log('>>> Entering readStream function'); // Added log
    const useSuggestions = true;

    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    console.log('STREAM: Starting to read stream'); // Original log
    const processText = async ({ done, value }: ReadableStreamReadResult<Uint8Array>): Promise<void> => {
        console.log('>>> Entering processText callback', { done }); // Added log
        console.log('INNN'); // Original log
        const stopStreaming = getState().appState.activeChat?.stoppedByUser;
        if (done || stopStreaming) {
            if (stopStreaming) {
                getState().appState.abortController?.abort();
                dispatch(setUserStoppedStreaming(false));
                if (!streamingChat.sessionId) {
                    dispatch(clearActiveChat());
                }
            } else {
                const suggestions = useSuggestions ? await ChatService.fetchSuggestions(streamingChat.sessionId) : [];
                streamingChat = {
                    ...streamingChat,
                    suggestions: suggestions,
                }
                dispatch(setActiveChat(streamingChat));
            }
            return;
        }

        const lines = decoder.decode(value, { stream: true }).split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line) {
                buffer += line;
                try {
                    const data = JSON.parse(buffer);
                    if (data.type === 'ERROR') {
                        console.log('Error:', data);
                        streamingChat = updateChat(streamingChat, { content: "Something went wrong. Please refresh and try again", dt: (new Date()).toISOString(), type: MessageType.received }, dispatch, false);
                        dispatch(setActiveChat(streamingChat));
                    } else if (data.type === 'SESSION_INFO') {
                        streamingChat = addMessageIndexToStreamingChat(streamingChat, data["msg_total"] - 1);
                        streamingChat = addSessionInfo(streamingChat, data);
                        dispatch(setActiveChat(streamingChat));
                    } else if (data.type === MessageType.fnCall) {
                        const fnName = data.fncalls[0]._action_label;
                        if (fnName && fnName.length > 0) {
                            dispatch(setCurrentChatAction(fnName));
                        }
                    } else if (data.fragment === true) {
                        streamingChat = updateStreamingChatMessage(streamingChat, data.content);
                        dispatch(setActiveChat(streamingChat));
                    }
                    if (data.type === MessageType.fnCall || data.type === MessageType.fnReturn) {
                        streamingChat = appendFunctionToChat(streamingChat, data as Message);
                        dispatch(setActiveChat(streamingChat));
                    }
                    buffer = '';
                } catch (e) {
                    console.error('Error parsing line:', e);
                }
            }
        }

        return reader.read().then(processText);
    };
    reader.read().then(processText);
}

export const RegenerateLastMessageAction = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const activeChat = getState().appState.activeChat;
            // Ensure activeChat, sessionId exist and chat is not streaming/pending
            if (!activeChat || activeChat.streaming || activeChat.pending || !activeChat.sessionId) {
                console.warn("Regenerate conditions not met.");
                return;
            }


            // Slice messages from the beginning up to and including the last user message
            // Find the index of the last message sent by the user.
            let lastUserMessageIndex = -1;
            for (let i = activeChat.messages.length - 1; i >= 0; i--) {
                if (activeChat.messages[i].type === MessageType.sent) {
                    lastUserMessageIndex = i;
                    break;
                }
            }

            if (lastUserMessageIndex === -1) {
                console.warn("No user message found to regenerate from.");
                return; // Or handle appropriately
            }

            // Slice messages from the beginning up to and including the last user message found
            const messagesToKeep = activeChat.messages.slice(0, lastUserMessageIndex + 1);

            const newChat: Chat = {
                ...activeChat,
                messages: messagesToKeep,
                suggestions: undefined,
                pending: true,
            };
            dispatch(setActiveChat(newChat));
            rewriteLastMessage(newChat, activeChat.messages[lastUserMessageIndex], dispatch, getState);
        } catch (error) {
            console.error('Error rewriting chat:', error);
        }
    };
};

export const FetchAndShowChatAction = (sessionId: string, scrollToIndex?: number, forceReload?: boolean) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const activeChat = getState().appState.activeChat;
        if (!forceReload && sessionId === activeChat?.sessionId && (activeChat?.scrollToIndex === scrollToIndex || scrollToIndex === undefined)) {
            dispatch(setActiveChat(activeChat));
            return
        };
        dispatch(setFetchingChat(true));
        try {
            let [chat, suggestions] = await Promise.all([
                ChatService.fetchChat(sessionId),
                ChatService.fetchSuggestions(sessionId)
            ]);
            if (!chat) return;
            chat = { ...chat, suggestions: suggestions, scrollToIndex: scrollToIndex };
            dispatch(setActiveChat(chat));
        } catch (error) {
            console.error('Error fetching chat:', error);
        } finally {
            dispatch(setFetchingChat(false));
        }
    };
};

const rewriteLastMessage = async (chat: Chat, message: Message, dispatch: AppDispatch, getState: () => RootState) => {
    const abortController = new AbortController();
    dispatch(setAbortController(abortController));

    const res = await fetch(`${process.env.REACT_APP_API_URL}/chats/${chat.sessionId}/rewrite`, {
        method: 'PUT',
        signal: abortController.signal,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/x-ndjson',

        },
        body: JSON.stringify({ message: message.content, index: message.i ?? -1 }),
    });

    const reader = res.body?.getReader();

    if (!reader) {
        console.error('No reader available');
        return
    }
    const streamingChat = appendNewStreamingResponse(chat);
    await readStream(streamingChat, reader, dispatch, false, getState);
}

export const DeleteChatAction = (chat: ChatSession) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        await ChatService.deleteChat(chat.sessionId);
    }
}

export const saveTitle = async (chat: Chat, title: string, dispatch: AppDispatch) => {
    const updatedSession = await ChatService.updateTitle(chat.sessionId, title);
    if (updatedSession) {
        dispatch(setActiveChat({ ...chat, sessionTitle: title }));
    }
}
