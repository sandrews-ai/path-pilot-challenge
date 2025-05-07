import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModelWithType } from '../../services/modelsService';
import Chat from '../../shared/models/Chat';
import { DefaultModel, initialModelForKey, modelToString } from '../../shared/models/LLMModels';

interface AppState {
    selectedTab: number;
    isMobile: boolean;
    activeChat?: Chat;
    jobSearchTerm?: string;
    fetchingChat: boolean;
    selectedProfileTab?: number;
    abortController?: AbortController;
    focusedTextToggle: boolean;
    currentChatAction?: string;

    chatModel: ModelWithType;
    suggModel: ModelWithType;
    jobSummaryModel: ModelWithType;
    useSuggestedPrompts: boolean;

    followChatToggle: boolean;

    debugMode: boolean;
    memory: boolean;

    loadUniqueJobs: boolean;
    voiceInterviewActive: boolean;
    advancedInterviewActive: boolean;
}

const initialState: AppState = {
    selectedTab: -1,
    isMobile: false,
    fetchingChat: false,
    focusedTextToggle: false,
    followChatToggle: false,
    debugMode: false,
    loadUniqueJobs: false,
    voiceInterviewActive: false,
    advancedInterviewActive: false,
    memory: localStorage.getItem('useMemory') ? localStorage.getItem('useMemory') === 'true' : false,
    chatModel: initialModelForKey('chatsModel') ?? DefaultModel,
    suggModel: initialModelForKey('suggestModel') ?? DefaultModel,
    jobSummaryModel: initialModelForKey('jobSumryModel') ?? DefaultModel,
    useSuggestedPrompts: localStorage.getItem('useSuggestedPrompts') ? localStorage.getItem('useSuggestedPrompts') === 'true' : true,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedTab: (state, action: PayloadAction<number>) => {
            state.selectedTab = action.payload;
        },
        setMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
        },
        setActiveChat: (state, action: PayloadAction<Chat>) => {
            state.selectedProfileTab = undefined;
            state.activeChat = action.payload;
        },
        clearActiveChat: (state) => {
            state.activeChat = undefined;
            state.selectedProfileTab = undefined;
            state.currentChatAction = undefined;
        },
        setFetchingChat: (state, action: PayloadAction<boolean>) => {
            state.fetchingChat = action.payload;
            state.selectedProfileTab = undefined;
        },
        setUserStoppedStreaming: (state, action: PayloadAction<boolean>) => {
            const chatId = state.activeChat?.sessionId;
            if (chatId === undefined) {
                state.activeChat = {
                    ...state.activeChat!,
                    stoppedByUser: true,
                    streaming: false,
                }
            } else if (chatId === state.activeChat?.sessionId) {
                if (action.payload) {
                    state.activeChat = {
                        ...state.activeChat!,
                        stoppedByUser: true,
                        streaming: false,
                    }
                } else {
                    state.activeChat = {
                        ...state.activeChat!,
                        stoppedByUser: false,
                        streaming: false,
                    }
                }
            }
        },
        setSelectedProfileTab: (state, action: PayloadAction<number | undefined>) => {
            state.selectedProfileTab = action.payload;
        },
        setAbortController: (state, action: PayloadAction<AbortController>) => {
            state.abortController = action.payload;
        },
        focusText: (state) => {
            state.focusedTextToggle = !state.focusedTextToggle;
        },
        setChatModel: (state, action: PayloadAction<ModelWithType>) => {
            state.chatModel = action.payload;
            localStorage.setItem('chatsModel', modelToString(action.payload));
        },
        setSuggModel: (state, action: PayloadAction<ModelWithType>) => {
            state.suggModel = action.payload;
            localStorage.setItem('suggestModel', modelToString(action.payload));
        },
        setJobSummaryModel: (state, action: PayloadAction<ModelWithType>) => {
            state.jobSummaryModel = action.payload;
            localStorage.setItem('jobSumryModel', modelToString(action.payload));
        },
        setUseSuggestedPrompts: (state, action: PayloadAction<boolean>) => {
            state.useSuggestedPrompts = action.payload;
            localStorage.setItem('useSuggestedPrompts', action.payload.toString());
        },
        setCurrentChatAction: (state, action: PayloadAction<string | undefined>) => {
            state.currentChatAction = action.payload;
        },
        toggleFollowChat: (state) => {
            state.followChatToggle = !state.followChatToggle;
        },
        setDebugMode: (state, action: PayloadAction<boolean>) => {
            state.debugMode = action.payload;
        },
        setMemory: (state, action: PayloadAction<boolean>) => {
            state.memory = action.payload;
            localStorage.setItem('useMemory', action.payload ? 'true' : 'false');
        },
        setLoadUniqueJobs: (state, action: PayloadAction<boolean>) => {
            state.loadUniqueJobs = action.payload;
        },
        setVoiceInterviewActive: (state, action: PayloadAction<boolean>) => {
            state.voiceInterviewActive = action.payload;
        },
        setAdvancedInterviewActive: (state, action: PayloadAction<boolean>) => {
            state.advancedInterviewActive = action.payload;
        }
    },
})

export const {
    setSelectedTab,
    setMobile,
    setActiveChat,
    clearActiveChat,
    setFetchingChat,
    setUserStoppedStreaming,
    setSelectedProfileTab,
    setAbortController,
    focusText,
    setChatModel,
    setSuggModel,
    setJobSummaryModel,
    setUseSuggestedPrompts,
    setCurrentChatAction,
    toggleFollowChat,
    setDebugMode,
    setMemory,
    setLoadUniqueJobs,
    setVoiceInterviewActive,
    setAdvancedInterviewActive,
} = appSlice.actions

export default appSlice.reducer
