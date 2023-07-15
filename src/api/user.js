import { request } from "./request"

const userApi={
    login:{
        endPoint:'/auth/login',
        method:'POST'
    },
    logout:{
        endPoint:'/auth/logout',
        method:'GET'
    },
    register:{
        endPoint:'/auth/register',
        method:'POST'
    },
    checkEmail:{
        endPoint:'/auth/email',
        method:'POST'
    },
    edit:{
        endPoint:'/users/ed',
        method:'PUT'
    },
    delete:{
        endPoint:'/users/dl',
        method:'DELETE'
    },
    deleteUsers:{
        endPoint: '/users/deleteMulti',
        method: 'DELETE'
    },
    getUsers:{
        endPoint:'/users/getAll',
        method: 'GET'
    },
    getUserById:{
        endPoint:'/users/user',
        method: 'GET'
    },
    findUser:{
        endPoint: '/users/search',
        method: 'GET'
    }
}

export async function login(data){
    const {endPoint,method} = userApi.login
    const res = await request(endPoint,method,data)
    const result = await res.json();
    return {status: res.status , result}
}

export async function logout(){
    const {endPoint,method} = userApi.logout
    const res = await request(endPoint,method)
    const result = await res.json();
    return {status: res.status , result}
}

export async function register(data){
    const {endPoint,method} = userApi.register
    const res = await request(endPoint,method,data)
    const result = await res.json();
    return {status: res.status , result}
}

export async function checkEmail(data){
    const {endPoint,method} = userApi.checkEmail
    const res = await request(endPoint,method,data)
    const result = await res.json();
    return {status: res.status , result}
}

export async function getUsers(params){
    const {endPoint, method}  = userApi.getUsers;
    const res = await request(endPoint, method, null,params)
    const result = await res.json();
    return {status:res.status, result}; 
}

export async function getUserById(params){
    const {endPoint, method}  = userApi.getUserById;
    const res = await request(endPoint, method, null,params)
    const result = await res.json();
    return {status:res.status, result}; 
}

export async function editUser(data){
    const {endPoint, method}  = userApi.edit;
    const res = await request(endPoint, method,data);
    const result = await res.json();
    return {status:res.status, result}; 
}


export async function deleteUser(id){
    const {endPoint, method}  = userApi.delete;
    const res = await request(endPoint, method,{id});
    const result = await res.json();
    return {status:res.status, result}; 
}

export async function deleteUsers(id){
    const {endPoint, method}  = userApi.deleteUsers;
    const res = await request(endPoint, method,{id});
    const result = await res.json();
    return {status:res.status, result}; 
}

export async function searchUser(params){
    const {endPoint, method}  = userApi.findUser;
    const res = await request(endPoint, method,null,params);
    const result = await res.json();
    return {status:res.status, result}; 
}

