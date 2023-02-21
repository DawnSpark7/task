export const generateHeaders = () => {
    const headers = new Headers({
        "Content-Type": "application/json"
    });

    let token = localStorage.getItem('token')

    token && headers.append("Authorization", `Bearer ${token}`);

    return headers;
}
