import { generateHeaders } from "./helpers";
export const booksService = {
    getBooks,
    addBook,
    updateBook,
    borrowBook,
    getBorrowedDetails
}

async function borrowBook(payload) {

    const requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        body: JSON.stringify(payload)
    }

    try {
        const result = await fetch('http://localhost:3000/borrowBook', requestOptions);
        return result.json();
    } catch(e) {
        return e;
    }

}

async function getBorrowedDetails(payload) {

    const requestOptions = {
        method: 'POST',
        headers: generateHeaders(),
        body: JSON.stringify(payload)
    }

    try {
        const result = await fetch('http://localhost:3000/getBorrowDetails', requestOptions);
        return result.json();
    } catch(e) {
        return e;
    }

}

async function getBooks(payload) {

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

async function addBook(payload) {

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

async function updateBook(payload) {

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

async function deleteBook(id) {

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