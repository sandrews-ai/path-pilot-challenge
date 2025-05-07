export const getPromptNumber = (str: string): number | null => {
    const match = str.match(/\[PROMPT(\d+)\]/);
    return match ? Number(match[1]) : null;
}

export const getJobPromptNumber = (str: string): number | null => {
    const match = str.match(/\[JOB(\d+)\]/);
    return match ? Number(match[1]) : null;
}

export const getCompanyName = (str: string): string | null => {
    const match = str.match(/Company:\s*([^\n]+)/);
    return match ? match[1] : null;
}

export const getJobTitle = (str: string): string | null => {
    const match = str.match(/Title:\s*([^\n]+)/);
    return match ? match[1] : null;
}
