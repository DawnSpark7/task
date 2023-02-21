import { generateHeaders } from "./helpers";
export const LoginService = {
    login,
    logout
}

async function login(payload) {

    const requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        body: JSON.stringify(payload)
    }

    try {
        const result = await fetch('http://localhost:3000/login', requestOptions);
        
        return result.json();
    } catch(e) {
        return e;
    }

}

async function logout(payload) {

    const requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        body: JSON.stringify(payload)
    }

    try {
        const result = await fetch('http://localhost:3000/logout', requestOptions);
        
        return result.json();
    } catch(e) {
        return e;
    }

}