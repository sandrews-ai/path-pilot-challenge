import ChatData from "./ChatData";
import Message, { MessageType } from "./Message";

interface Chat {
    created: string;
    updated: string;
    messages: Message[];
    msgTotal: number;
    sessionId: string;
    sessionTitle: string;
    pending?: boolean;
    streaming?: boolean;
    stoppedByUser?: boolean;
    error?: boolean;
    suggestions?: string[];
    scrollToIndex?: number;
    data?: ChatData;
}

export const newChat = (originalMessage: Message): Chat => {
    return {
        created: (new Date()).toISOString(),
        updated: (new Date()).toISOString(),
        messages: [
            originalMessage,
        ] as Message[],
        sessionId: '',
        sessionTitle: '...',
        pending: true,
        msgTotal: 1,
    }
};

function makeId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const appendNewStreamingResponse = (chat: Chat, pending?: boolean): Chat => {
    return {
        ...chat,
        streaming: true,
        pending: pending ?? chat.pending ?? false,
        messages: [
            ...chat.messages,
            {
                type: MessageType.received,
                content: '',
                createdAt: new Date(),
            }
        ] as Message[],
    }
};

export const appendFunctionToChat = (chat: Chat, message: Message): Chat => {
    const insertIndex = chat.messages.length - 1;
    if (insertIndex < 0) {
        return chat;
    }
    const newMessages = [...chat.messages];
    newMessages.splice(insertIndex, 0, message);
    return {
        ...chat,
        streaming: true,
        messages: newMessages,
    }
};

export const updateStreamingChatMessage = (chat: Chat, fragment: string): Chat => {
    const lastMessageIndex = chat.messages.length - 1;
    const lastMessage = chat.messages[lastMessageIndex];
    const updatedLastMessage = {
        ...lastMessage,
        content: lastMessage.content + fragment,
    };
    const updatedMessages = [...chat.messages];
    updatedMessages[lastMessageIndex] = updatedLastMessage;
    return {
        ...chat,
        pending: false,
        messages: updatedMessages,
    };
};

export const addMessageIndexToStreamingChat = (chat: Chat, index: number): Chat => {
    const lastMessageIndex = chat.messages.length - 1;
    const lastMessage = chat.messages[lastMessageIndex];
    const updatedLastMessage = {
        ...lastMessage,
        i: index,
    };
    const updatedMessages = [...chat.messages];
    updatedMessages[lastMessageIndex] = updatedLastMessage;
    return {
        ...chat,
        pending: false,
        messages: updatedMessages,
    };
};

export const addSessionInfo = (chat: Chat, json: any): Chat => {
    return {
        ...chat,
        created: json["created"],
        sessionId: json["session_id"],
        sessionTitle: json["session_title"],
        pending: false,
        streaming: false,
    }
};

export const getLastUserMessage = (chat: Chat): Message | undefined => {
    return chat.messages.filter(m => m.type === MessageType.sent).pop();
}

export default Chat;