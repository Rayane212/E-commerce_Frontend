export async function apiFetch(
    url: string, 
    {json, method}: any
){
    method ??= json ? 'POST' : 'GET';
    const body = json ? JSON.stringify(json) : undefined;
    const response = await fetch (
        "https://3b10363c-58f0-46d5-9cb9-e4ca668910ed.mock.pstmn.io/api" + url, {
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