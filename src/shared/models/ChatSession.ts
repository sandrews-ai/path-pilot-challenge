import Chat from "./Chat";

interface ChatSession {
    created: string;
    msgTotal: number,
    sessionId: string
    title: string;
    updated: string;
}

export const sessionFromChat = (chat: Chat): ChatSession => {
    return {
        created: chat.created,
        msgTotal: chat.messages.length,
        sessionId: chat.sessionId,
        title: chat.sessionTitle,
        updated: chat.updated,
    }
}

export default ChatSession;