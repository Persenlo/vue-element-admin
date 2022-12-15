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

//获取职位分类
export function getPositionCategory(token){
    return service({
        method: "Get",
        url: "/employee/getPositionCategory",
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//职位查询(ID)
export function getPositionInfoById(token,id){
    return service({
        method: "Get",
        url: "/position",
        params:{
            pId: id,
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//获取某个职位分类下的所有职位
export function getPositionbyCategory(token,category){
    return service({
        method: "Get",
        url: "/employee/getPosition",
        params:{
            categoryname: category,
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}