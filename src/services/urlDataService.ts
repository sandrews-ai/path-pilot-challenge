export interface URLMetadata {
    title: string;
    description: string;
    image: string;
}

class URLDataService {
    static fetchMetadata = async (url: string) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/data/url?url=${encodeURIComponent(url)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                console.error('Error fetching URL metadata:', res.statusText);
                return;
            }

            const data = await res.json();
            const { title, description, image, body, audience, price, rating, reviews } = data;
            return { title, description, image, body, audience, price, rating, reviews };
        } catch (error) {
            console.error('Error fetching URL metadata:', error);
        }
    };


}

export default URLDataService;
