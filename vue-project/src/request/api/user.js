import service from "..";

// 获取验证码
export function getVerify(){
    return service({
        method: "Get",
        url: "/login/verify",
        responseType: 'blob',
        withCredentials: true,
    })
}

// 登录
export function login(loginData){
    return service({
        method: "Post",
        url: "/login",
        data: loginData,
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials: true,
    })
}

//通过token获取用户信息
export function getUserInfo(token){
    return service({
        method: "Get",
        url: "/user/currentUser",
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//获取用户信息
export function getAllUserInfo(token,param){
    let rindex = param.index;
    return service({
        method: "Get",
        url: "/user?index="+rindex+"&count=8",
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

// 创建用户
export function createUser(userData,token){
    return service({
        method: "Post",
        url: "/user",
        data: userData,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

// 编辑用户信息
export function editUser(userData,token){
    return service({
        method: "PUT",
        url: "/user",
        data: userData,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

//删除用户
export function deleteUser(id,token){
    return service({
        url: "/user?userId="+id,
        method: "DELETE",
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}