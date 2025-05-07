export const chatDateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

export const getFormattedChatDate = (date: Date): string => {
    const formattedDate = chatDateFormatter.format(date);
    return formattedDate?.replace(/\//g, '.')
}