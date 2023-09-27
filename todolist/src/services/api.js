import axios from 'axios';
import { ADDTODO, DELETETODO, GETALLTODO, LOGIN, MARKREADTODO, REGISTER } from './apiConstants';


export const login = (data) => {
    return axios.post(LOGIN, data);
}
export const register = (data) => {
    return axios.post(REGISTER, data);
}
export const addtodo = (data) => {
    let token = getToken();
    console.log("token", token);
    return axios.post(ADDTODO, data, {
        headers: {
            auth: token
        }
    });
}

export const getTodoList = (data) => {
    let token = getToken();
    return axios.get(GETALLTODO, {
        headers: {
            auth: token
        }
    });
}
export const deleteTodo = (data) => {
    let token = getToken();

    return axios.post(DELETETODO, data, {
        headers: {
            auth: token
        }
    });
}

export const markReadTodo = (data) => {
    let token = getToken();

    return axios.post(MARKREADTODO, data, {
        headers: {
            auth: token
        }
    });
}


export function getToken() {
    let user = localStorage.getItem('user');
    if (!user) return;
    const userObj = JSON.parse(user);
    return userObj.token;
}




