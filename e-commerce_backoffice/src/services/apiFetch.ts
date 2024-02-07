export async function apiFetch(
    url: string, 
    {json, method}: any
){
    method ??= json ? 'POST' : 'GET';
    const body = json ? JSON.stringify(json) : undefined;
    const response = await fetch (
        "http://127.0.0.1:3658/m1/456942-0-81736358/api/" + url, {
            method, 
            body, 
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        });
        if (response.ok){
            return response.json();
        }
        if (response.status === 400){
            return response.text();
        }
        throw new ApiError(response.status, await response.json());
}
 

class ApiError extends Error {
    constructor(status :any, data: any){
        super();
    }
}