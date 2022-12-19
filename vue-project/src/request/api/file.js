import service from "..";

// 新增档案
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

// 更新档案
export function updateFile(token,data){
    return service({
        method: "PUT",
        url: "/employee",
        data: data,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

// 复核档案
export function recheckFile(token,data){
    return service({
        method: "Post",
        url: "/employee/recheck",
        data: data,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

//档案查询
export function getFileInfo(token,param){
    let rindex = param.index;
    return service({
        method: "Get",
        url: "/employee?index="+rindex+"&count="+8,
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//档案查询(ID)
export function getFileInfobyId(token,id){
    return service({
        method: "Get",
        url: "/employee?employeeId="+id,
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//档案查询(未复核)
export function getUncheckFileInfo(token,param){
    let rindex = param.index;
    return service({
        method: "Get",
        url: "/employee/getunrecheck?index="+rindex+"&count="+8,
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//档案查询(已删除)
export function getDelFileInfo(token,param){
    let rindex = param.index;
    return service({
        method: "Get",
        url: "/employee/getdel?index="+rindex+"&count="+8,
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

// 搜索档案
export function searchFile(searchData,token){
    return service({
        method: "Get",
        url: "/employee/queryEmployee",
        headers:{
            'Authorization': token,
        },
        params:{
            oaid: searchData.oaid,
            obid: searchData.obid,
            ocid: searchData.ocid,
            categoryname: searchData.categoryname,
            pid: searchData.pid,
            start: searchData.start,
            end: searchData.nd,
        },
        withCredentials: true,
    })
}


//删除档案
export function deleteFile(token,id){
    return service({
        url: "/employee?employeeId="+id,
        method: "DELETE",
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

// 恢复档案
export function restoreFile(token,id){
    return service({
        method: "Post",
        url: "/employee/restore",
        params:{
            employeeId: id
        },
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}
