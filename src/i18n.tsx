import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

export enum Strings {
    welcome = 'welcome',
    helpMessage = 'helpMessage',
    chatHistory = 'chatHistory',
    savedJobs = 'savedJobs',
    savedDocs = 'savedDocs',
    faqs = 'faqs',
    settings = 'settings',
    closeSidebar = 'closeSidebar',
    aiWarning = 'aiWarning',
    messagePlaceholder = 'messagePlaceholder',
    signUp = 'signUp',
    logInButton = 'logInButton',
    signUpButton = 'signUpButton',
    addResumeButton = 'addResumeButton',
    welcomeBack = 'welcomeBack',
    signUpDescription = 'signUpDescription',
    newChat = 'newChat',
    chatHistoryCapital = 'chatHistoryCaptial',
    uploadResume = 'uploadResume',
    replaceResume = 'replaceResume',
    resumeInfo = 'resumeInfo',
    edit = 'edit',
    cancel = 'cancel',
    save = 'save',
    yes = 'yes',
    verifyEmailTitle = 'verifyEmailTitle',
    verifyEmailSubtitle = 'verifyEmailSubtitle',
    sentTo = 'sentTo',
    enable2FATitle = 'enable2FATitle',
    enable2FASubtitle = 'enable2FASubtitle',
    createAccount = 'createAccount',
    enterYourEmail = 'enterYourEmail',
    createAccountTitle = 'createAccountTitle',
    createAccountSubtitle = 'createAccountSubtitle',
    continue = 'continue',
    interviews = 'interviews',
    savedResumes = 'savedResumes',
    savedCoverLetters = 'savedCoverLetters',
}

const resources = {
    en: {
        translation: {
            welcome: 'Welcome!',
            helpMessage: 'How can I help you today?',
            chatHistory: 'Chat history',
            savedJobs: 'Saved jobs',
            savedResources: 'Saved resources',
            faqs: 'FAQs',
            settings: 'Settings',
            closeSidebar: 'Close sidebar',
            aiWarning: 'AI can make mistakes. Consider checking important information.',
            messagePlaceholder: 'Message Path Pilot...',
            welcomeBack: 'Welcome back!',
            logInButton: 'Log In',
            signUpButton: 'Sign Up',
            addResumeButton: ' Add Resume',
            uploadResume: 'Upload your resume',
            replaceResume: 'Replace Resume File',
            resumeInfo: 'This will help Path Pilot tailor its advice to your needs.',
            edit: 'Edit',
            cancel: 'Cancel',
            save: 'Save',
            yes: 'Yes',

            newChat: 'New Chat',
            chatHistoryCaptial: 'Chat History',
            interviews: 'Saved interviews',
            savedResumes: 'Saved resumes',
            savedCoverLetters: 'Saved cover letters',

            // Auth Flow
            continue: 'Continue',
            signUp: 'Sign up for free',
            signUpDescription: 'Put your career on the right path.',
            createAccountTitle: 'Create your account',
            createAccountSubtitle: 'Sign up to get started. It\'s free and only takes a minute.',
            createAccount: 'Create Account',
            enterYourEmail: 'Enter your email',
            verifyEmailTitle: 'Verify your email',
            verifyEmailSubtitle: 'We have sent you an email with a link to verify your account. Please check your inbox and click the link to continue.',
            sentTo: 'Sent to',
            enable2FATitle: 'Enable Two Factor Authentication',
            enable2FASubtitle: 'Protect your account with an extra layer of security. Add a phone number to enable Two Factor Authentication.',
            // TODO: Google and linked prompts and the use above one
        }
    },
    fr: {
        translation: {
            chatHistory: 'Le Chat history',
            savedJobs: 'Le Saved jobs',
            savedResources: 'Le Saved Resources',
            savedDocs: 'Le Saved docs',
            faqs: 'Le FAQs',
            settings: 'Le Settings',
            closeSidebar: 'Ferme le sidebar',
            aiWarning: 'Arrét! AI et tres dangereaux!',
            messagePlaceholder: 'Messageur Le Pilot de Path...',
            edit: 'Edit',

            // Auth Flow
            signUp: 'Sign up for Le free',
            signUpDescription: 'Put tu et career on the right path.',
        }
    }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        resources,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;