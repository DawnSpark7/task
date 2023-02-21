import { generateHeaders } from "./helpers";
export const UsersService = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
}

async function getUsers(payload) {

    const requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        body: JSON.stringify(payload)
    }

    try {
        const result = await fetch('http://localhost:3000/getAllUsers', requestOptions);
        
        return result.json();
    } catch(e) {
        return e;
    }

}

async function addUser(payload) {

    const requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        body: JSON.stringify(payload)
    }

    try {
        const result = await fetch('http://localhost:3000/addUser', requestOptions);
        
        return result.json();
    } catch(e) {
        return e;
    }

}

async function updateUser(payload) {

    const requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        body: JSON.stringify(payload)
    }

    try {
        const result = await fetch('http://localhost:3000/updateUser', requestOptions);
        
        return result.json();
    } catch(e) {
        return e;
    }

}

async function deleteUser(id) {

    const requestOptions = {
        method: 'DELETE',
        headers: generateHeaders(),
    }

    try {
        const result = await fetch('http://localhost:3000/deleteUser/' + id, requestOptions);
        return result.json();
    } catch(e) {
        return e;
    }

}