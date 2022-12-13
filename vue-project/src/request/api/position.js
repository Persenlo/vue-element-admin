import service from "..";

//职位查询
export function getPositionInfo(token,param){
    let rindex = param.index;
    return service({
        method: "Get",
        url: "/position?index="+rindex+"&count="+8,
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

// 新增职位
export function addPosition(positionData,token){
    return service({
        method: "Post",
        url: "/position",
        data: positionData,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

//删除职位
export function deletePosition(cpid,token){
    return service({
        url: "/position?pid="+cpid,
        method: "DELETE",
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

// 编辑职位
export function editPosition(positionData,token){
    return service({
        method: "PUT",
        url: "/position",
        data: positionData,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}