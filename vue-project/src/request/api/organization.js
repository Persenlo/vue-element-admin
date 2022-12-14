import service from "..";


// 新增机构
export function addOrganization(OrgData,token){
    return service({
        method: "Post",
        url: "/organization",
        data: OrgData,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

//删除机构
export function deleteOrganization(id,token){
    return service({
        url: "/organization?oid="+id,
        method: "DELETE",
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

// 编辑薪酬
export function editSOrganization(orgData,token){
    return service({
        method: "PUT",
        url: "/organization",
        data: orgData,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

//机构查询
export function getOrgA(token){
    return service({
        method: "Get",
        url: "/employee/getorgA",
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//机构查询
export function getOrgB(token,parentId){
    return service({
        method: "Get",
        url: "/employee/getorgB",
        params:{
            fatherId: parentId,
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//机构查询
export function getOrgC(token,parentId){
    return service({
        method: "Get",
        url: "/employee/getorgC",
        params:{
            fatherId: parentId,
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}