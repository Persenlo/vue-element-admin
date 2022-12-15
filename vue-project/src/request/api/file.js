import service from "..";

// 新增职位
export function addFile(token,data){
    return service({
        method: "Post",
        url: "/employee",
        data: data,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}