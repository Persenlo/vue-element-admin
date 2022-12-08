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