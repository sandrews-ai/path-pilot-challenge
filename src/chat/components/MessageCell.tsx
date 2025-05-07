import { Typography } from '@mui/material';
import moment from 'moment';
import React, { ReactNode, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MobileAppLogo from '../../assets/icons/mobile_app_logo';
import AppLogoRoundedSmall from '../../assets/images/app_logo_rounded small';
import { useAppSelector } from '../../redux/hooks';
import UserAvatar from '../../shared/components/UserAvatar';
import Message, { MessageType } from '../../shared/models/Message';
import { AppColors } from '../../theme/AppTheme';
import ChatCell from './ChatCell';

interface MessageCellProps {
    message: Message;
    suggestions?: string[];
    reference?: React.RefObject<HTMLDivElement>;
    isNewest: boolean;
    accessory?: ReactNode;
    documentName?: string;
    debug?: boolean;
    richContent?: boolean;
    hideDoc?: boolean;
    unviewedJobs?: boolean;
    streaming?: boolean;
}


const getJobMatchSuggestions = (unviewedJobs?: boolean): string[] => {
    if (unviewedJobs) {
        return ['Provide me with more job matches like these'];
    }
    return ['Provide me with more job matches like these', 'Provide me with a list of job matches that I haven\'t viewed before'];
}

const MessageCell = (props: MessageCellProps) => {
    const { message, richContent, hideDoc, unviewedJobs, suggestions, reference, isNewest, accessory, documentName, debug, streaming, } = props;
    const [urls, setUrls] = useState<string[]>([]);
    const [resumeMode, setResumeMode] = useState(false);
    const [coverLetterMode, setCoverLetterMode] = useState(false);
    const isSent = message.type === MessageType.sent;
    const isMobile = useAppSelector((s) => s.appState.isMobile);
    const [contactInfoFound, setContactInfoFound] = useState(false);
    let foundJobWords = { 'Job Title': false, 'Location': false, 'Skills': false, 'Fit Score': false, 'Company': false };
    let foundResumeHeaders = { 'Experience': false, 'Skills': false, 'Education': false, 'Summary': false, 'Objective': false, };

    useEffect(() => {
        const extractedUrls = message.content?.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])(?![.,;])/gi);
        const uniqueUrls = extractedUrls ? Array.from(new Set(extractedUrls)) : [];
        setUrls(uniqueUrls);
        if (message.type !== MessageType.sent && message.content.includes('[RESUME]')) {
            setResumeMode(true);
        }
    }, [message]);

    const checkResumeHeaders = (str: string) => {
        const lowerCaseString = str.toLowerCase();
        const headers = ['Experience', 'Skills', 'Education', 'Summary', 'Objective', 'Publications', 'References', 'Projects', 'Research'];
        headers.forEach(header => {
            if (lowerCaseString.includes(header.toLowerCase())) {
                foundResumeHeaders = { ...foundResumeHeaders, [header]: true };
            }
            if (lowerCaseString.includes('resume') && !resumeMode) {
                setResumeMode(true);
            }
        });
        const headerCount = Object.values(foundResumeHeaders).filter(Boolean).length;
        if (headerCount >= 2 && contactInfoFound) {
            setResumeMode(true);
        }
    }

    const messageContainsEmailOrPhone = (message: string): boolean => {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        const phoneRegex = /(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})/;
        const email = emailRegex.test(message)
        const phone = phoneRegex.test(message);
        return email || phone;
    }

    const messageContainsLetterGreetings = (message: string): boolean => {
        const dearRegex = /dear\s[a-zA-Z\s\[\]']+,?\n/i;
        const hiRegex = /hi\s[a-zA-Z\s\[\]']+,?\n/i;
        const helloRegex = /hello\s[a-zA-Z\s\[\]']+,?\n/i;
        const greetings = [dearRegex, hiRegex, helloRegex];
        return greetings.some(greeting => greeting.test(message));
    }

    const getFormattedMessage = (): string => {
        return message.content?.replace(/\n/g, '  \n').replace(/```/g, '') ?? '';
    }

    const getResumeText = (): string | undefined => {
        const resumeRegex = /\[RESUME\]([\s\S]*?)\[\/RESUME\]/g;
        const match = resumeRegex.exec(message.content);
        return match ? match[1] : undefined;
    }

    if (!contactInfoFound) {
        const found = messageContainsEmailOrPhone(message.content);
        if (found) {
            setContactInfoFound(true);
        }
    }

    if (!resumeMode && !coverLetterMode) {
        const found = messageContainsLetterGreetings(message.content);
        if (found) {
            setCoverLetterMode(true);
        }
    }
    return (
        <div ref={reference} style={{ width: '100%' }}>
            <ChatCell
                suggestions={suggestions}
                avatar={isSent ? <UserAvatar small={isMobile} /> : (isMobile ? <MobileAppLogo /> : <AppLogoRoundedSmall />)}
                isSent={isSent}
                time={moment(message.dt).fromNow()}
                urls={urls}
                richContentMode={richContent ?? false}
                resumeMode={resumeMode}
                coverLetterMode={hideDoc ? false : coverLetterMode}
                isNewest={isNewest}
                messageText={getFormattedMessage()}
                resumeText={resumeMode ? getResumeText() : undefined}
                documentName={documentName}
                messageIndex={message.i}
                mem={message.mem}
                debug={debug}
                content={
                    <Typography
                        variant='h5'
                        sx={{
                            textAlign: 'left',
                            color: AppColors.black,
                            userSelect: 'text',
                            webkitUserSelect: 'text',
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                        }}
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code: ({ node, ...props }) => {
                                    return (
                                        <code {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                            {props.children}
                                        </code>
                                    )
                                },
                                strong: ({ node, ...props }) => {
                                    if (props.children && typeof props.children === 'string') {
                                        checkResumeHeaders(props.children);
                                    }
                                    return (
                                        <strong {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                            {props.children}
                                        </strong>
                                    )
                                },
                                b: ({ node, ...props }) => {
                                    if (props.children && typeof props.children === 'string') {
                                        checkResumeHeaders(props.children);
                                    }
                                    return (
                                        <b {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                            {props.children}
                                        </b>
                                    )
                                },
                                h1: ({ node, ...props }) => {
                                    if (props.children && typeof props.children === 'string') {
                                        checkResumeHeaders(props.children);
                                    }
                                    return (
                                        <h1 {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                            {props.children}
                                        </h1>

                                    )
                                },
                                h2: ({ node, ...props }) => {
                                    if (props.children && typeof props.children === 'string') {
                                        checkResumeHeaders(props.children);
                                    }
                                    return (
                                        <h2 {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                            {props.children}
                                        </h2>
                                    )
                                },
                                h3: ({ node, ...props }) => {
                                    if (props.children && typeof props.children === 'string') {
                                        checkResumeHeaders(props.children);
                                    }
                                    return (
                                        <h3 {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                            {props.children}
                                        </h3>
                                    )
                                },
                                h4: ({ node, ...props }) => {
                                    if (props.children && typeof props.children === 'string') {
                                        checkResumeHeaders(props.children);
                                    }
                                    return (
                                        <h4 {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                            {props.children}
                                        </h4>
                                    )
                                },
                                h5: ({ node, ...props }) => {
                                    if (props.children && typeof props.children === 'string') {
                                        checkResumeHeaders(props.children);
                                    }
                                    return (
                                        <h5 {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                            {props.children}
                                        </h5>
                                    )
                                },
                                h6: ({ node, ...props }) => {
                                    if (props.children && typeof props.children === 'string') {
                                        checkResumeHeaders(props.children);
                                    }
                                    return (
                                        <h6 {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                            {props.children}
                                        </h6>
                                    )
                                },
                                a: ({ node, ...props }) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer">
                                        {props.children}
                                    </a>
                                ),
                                p: ({ node, ...props }) => (
                                    <p {...props} style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
                                        {props.children}
                                    </p>
                                ),
                                li: ({ node, ...props }) => (
                                    <li {...props} style={{ margin: '8px 0px', WebkitUserSelect: 'text', userSelect: 'text' }}>
                                        {props.children}
                                    </li>
                                ),
                            }}
                        >
                            {getFormattedMessage()}
                        </ReactMarkdown>
                        {accessory}
                    </Typography >
                }
            />
        </div>
    );
}

export const marginForIndex = (index: number) => {
    switch (index) {
        case 0:
            return 0;
        case 1:
            return '3%';
        case 2:
            return '10%';
        case 3:
            return '7%';
        default:
            return '0';
    }
}

export const widthForIndex = (index: number, isMobile?: boolean) => {
    switch (index) {
        case 0:
            return isMobile ? '13%' : '10%';
        case 1:
            return '50%';
        case 2:
            return '15%';
        case 3:
            return '0%';
        default:
            return '0';
    }
}

export default MessageCell;

