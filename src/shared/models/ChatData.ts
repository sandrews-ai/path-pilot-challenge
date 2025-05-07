
interface ChatData {
    id: number;
    sessionId: string;
    documentNames: DocumentName[];
}

export interface DocumentName {
    id: number;
    messageIndex: number;
    name: string;
}

export default ChatData;
