import Job from "./Job";

interface APIJob {
    id: string;
    title: string;
    company: string;
    location: string;
    url: string;
    description: string;
    posting_date: string;
    company_logo: string;
}

export const combineJobData = (job: Job, apiJob: APIJob): Job => {
    const rawLocations = apiJob.location;
    const jobLocations = !!rawLocations ? rawLocations.split(', ') : ['n/a'];
    const location1 = jobLocations.length > 0 ? jobLocations[0] : 'n/a';
    const location2 = jobLocations.length > 1 ? jobLocations[1] : 'n/a';
    return {
        id: apiJob.id ?? job.id,
        jobId: apiJob.id ?? job.jobId,
        fit: job.fit,
        title: apiJob.title ?? job.title,
        company: apiJob.company ?? job.company,
        companyLogo: apiJob.company_logo ?? job.companyLogo,
        location1: location1,
        location2: location2,
        skills: job.skills,
        url: apiJob.url ?? job.url,
        summary: apiJob.description ?? job.summary,
    }
}

export default APIJob;