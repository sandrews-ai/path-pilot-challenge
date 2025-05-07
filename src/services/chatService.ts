import Chat from "../shared/models/Chat";
import ChatData from "../shared/models/ChatData";
import ChatSession from "../shared/models/ChatSession";

class ChatService {
    static fetchChatHistory = async (): Promise<ChatSession[]> => {

        const res = await fetch(`${process.env.REACT_APP_API_URL}/chats/history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        });
        if (res.status === 404) {
            return [];
        } else if (res.status !== 200) {
            throw new Error(`Failed to fetch user: ${res.status}`);
        }
        const chatHistory = await res.json();
        return chatHistory;
    }

    static fetchChat = async (sessionId: string): Promise<Chat | undefined> => {

        const res = await fetch(`${process.env.REACT_APP_API_URL}/chats/${sessionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        });
        if (res.status === 404) {
            return undefined;
        } else if (res.status !== 200) {
            throw new Error(`Failed to fetch chat: ${res.status}`);
        }
        const chat: Chat = await res.json();
        return chat;
    }

    static fetchSuggestions = async (sessionId: string): Promise<string[]> => {

        const res = await fetch(`${process.env.REACT_APP_API_URL}/chats/${sessionId}/suggestions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        });
        if (res.status === 404) {
            return [];
        } else if (res.status !== 200) {
            throw new Error(`Failed to fetch suggestions: ${res.status}`);
        }
        const suggestions: string[] = await res.json();
        return suggestions;
    }

    static deleteChat = async (sessionId: string) => {
        try {

            const res = await fetch(`${process.env.REACT_APP_API_URL}/chats/${sessionId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            if (res.status !== 200) {
                console.error(`Failed to delete chat: ${res.status}`);
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
        }
    }
    static updateTitle = async (sessionId: string, title: string): Promise<ChatSession | undefined> => {
        try {
            const body = { title };

            const res = await fetch(`${process.env.REACT_APP_API_URL}/chats/${sessionId}/title`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(body),
            });
            if (res.status !== 200) {
                console.error(`Failed to update title: ${res.status}`);
            }
            const chat: ChatSession = await res.json();
            return chat;
        } catch (error) {
            console.error('Error updating title:', error);
        }
    }

    static appendDocumentName = async (sessionId: string, messageIndex: number, documentName: string): Promise<ChatData | undefined> => {
        return;
        try {
            const body = { name: documentName, messageIndex };

            const res = await fetch(`${process.env.REACT_APP_API_URL}/chats/${sessionId}/documentname`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(body),
            });
            if (res.status !== 200) {
                console.error(`Failed to append document name: ${res.status}`);
            }
            const chatData: ChatData = await res.json();
            return chatData;
        } catch (error) {
            console.error('Error appending document name:', error);
        }
    }
}

export default ChatService;
