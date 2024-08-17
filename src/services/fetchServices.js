export async function getRequest(url, headers){

    const response = await fetch(url, {
        method: 'GET',
        headers,
    });
    return response

}

export async function postRequest(url, headers, requestBody){

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
    });
    return response
}

export async function putRequest(url, headers, requestBody){

    const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(requestBody),
    });
    return response

}

export async function patchRequest(url, headers, requestBody){
   
    const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(requestBody),
    });
    return response

}

export async function deleteRequest(url, headers, requestBody){

    const response = await fetch(url, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(requestBody),
    });
    return response

}