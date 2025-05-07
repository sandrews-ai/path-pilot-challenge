export const formatFileSize = (size: number): string => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const hostnameFromUrl = (url: string): string => {
    if (!url || url.length === 0) return '';
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
}

export const cleanUrl = (url: string): string => {
    if (!url || url.length === 0) return '';
    // remove utm tags
    try {
        const urlObj = new URL(url);

        Array.from(urlObj.searchParams.keys()).forEach(key => {
            if (key.toLowerCase().startsWith('utm_')) {
                urlObj.searchParams.delete(key);
            }
        });
        return urlObj.toString();
    } catch (e) {
        console.error('Error cleaning URL:', e);
        return url;
    }
}