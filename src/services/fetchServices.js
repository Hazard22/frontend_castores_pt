import fetch from 'cross-fetch';

export async function getRequest(url, headers){

    const response = await fetch(url, {
        method: 'GET',
        headers,
        credentials: 'include',
    });
    return response
}

export async function postRequest(url, headers, requestBody){

    const response = await fetch(url, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(requestBody),
    });
    return response
}

export async function putRequest(url, headers, requestBody){

    const response = await fetch(url, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify(requestBody),
    });
    return response

}

export async function patchRequest(url, headers, requestBody){
   
    const response = await fetch(url, {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify(requestBody),
    });
    return response

}

export async function deleteRequest(url, headers, requestBody){

    const response = await fetch(url, {
        method: 'DELETE',
        headers,
        credentials: 'include',
        body: JSON.stringify(requestBody),
    });
    return response

}