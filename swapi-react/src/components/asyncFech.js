
export const baseUrl = 'https://swapi.dev/api/';

export const getData = async (url) => {
    const response = await fetch(url);
    return response.json()
}
