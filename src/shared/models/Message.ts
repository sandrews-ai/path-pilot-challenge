export enum MessageType {
    sent = 'USER',
    received = 'ASSISTANT',
    fnCall = 'FUNCTION_CALL',
    fnReturn = 'FUNCTION_RETURN',
}

interface MessageFunction {
    _action_label: string;
    function_arguments: string; // JSON string
    function_name: string;
}

export interface MessageMetadata {
    hideDoc?: boolean;
    unviewedJobs?: boolean;
}

interface Message {
    content: string;
    dt: string;
    i?: number;
    type: MessageType
    mem?: string[];
    fncalls?: MessageFunction[];
    function_name?: string;
    meta?: MessageMetadata;
}


export const messageFromJson = (json: any, type: MessageType): Message => {
    const messageJson = json.messages[0];
    return {
        type,
        dt: messageJson.dt,
        content: messageJson.content,
        mem: messageJson.mem,
        i: messageJson.i,
        fncalls: messageJson.fnCalls,
    };
};

export const updateStreamingMessage = (message: Message, fragment: string): Message => {
    return {
        ...message,
        content: message.content + fragment,
    }
};

export const isLastMessageFromUser = (messages: Message[]): boolean => {
    if (messages.length === 0) return false;
    const lastMessage = messages[messages.length - 1];
    return lastMessage.type === MessageType.sent;
};

export default Message;