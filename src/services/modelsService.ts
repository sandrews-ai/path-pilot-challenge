export interface AllModels {
    [providerId: string]: string[];
}

export interface ModelWithType {
    type: string;
    model: string;
}

class ModelsService {
    static fetchAllModels = async (): Promise<AllModels | undefined> => {
        try {
            // Fetch the models from the backend
            const res = await fetch(`${process.env.REACT_APP_API_URL}/data/models`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response is successful
            if (!res.ok) {
                console.error('Error fetching models:', res.statusText);
                return;
            }

            // Parse the JSON response
            const data: AllModels = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching models:', error);
            return;
        }
    };
}

export default ModelsService;