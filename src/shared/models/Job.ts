interface Job {
    id: number | string;
    jobId?: string;
    fit: number;
    title: string;
    company: string;
    companyLogo?: string;
    location1: string;
    location2?: string;
    skills: string;
    url: string;
    summary?: string;
    expired?: boolean;
    updatedAt?: string;
    createdAt?: string;
}

export const testJob: Job = {
    id: 69,
    fit: 86,
    title: "Senior Software Engineer",
    company: "LinkedIn",
    location1: "San Francisco",
    location2: "California",
    skills: "React, Node.js, TypeScript, GraphQL",
    url: "https://www.linkedin.com/jobs/view/12345",
    summary: "LinkedIn is looking for a Senior Software Engineer to join our team in San Francisco, California. The ideal candidate will have experience with React, Node.js, TypeScript, and GraphQL. Apply now!"
}

export default Job;