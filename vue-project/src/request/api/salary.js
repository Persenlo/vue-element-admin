import service from "..";

//薪酬查询
export function getSalaryInfo(token,param,count){
    let rindex = param.index;
    return service({
        method: "Get",
        url: "/salary?index="+rindex+"&count="+8,
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//获取全部薪酬
export function getAllSalaryInfo(token){
    return service({
        method: "Get",
        url: "/salary?&count="+10000,
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

//薪酬查询(ID)
export function getSalaryInfoByID(token,id){
    return service({
        method: "Get",
        url: "/salary?salaryId="+id,
        params:{
            
        },
        headers:{
            'Authorization':token,
        },
        withCredentials: true,
    })
}

// 新增薪酬
export function addSalary(SalaryData,token){
    return service({
        method: "Post",
        url: "/salary",
        data: SalaryData,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

//删除薪酬
export function deleteSalary(cpid,token){
    return service({
        url: "/salary?sid="+cpid,
        method: "DELETE",
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

// 编辑薪酬
export function editSalary(SalaryData,token){
    return service({
        method: "PUT",
        url: "/salary",
        data: SalaryData,
        headers:{
            'Content-Type':'application/json',
            'Authorization': token,
        },
        withCredentials: true,
    })
}

// 搜索薪酬
export function searchSalary(searchData,token){
    return service({
        method: "Get",
        url: "/salary/querysalary",
        headers:{
            'Authorization': token,
        },
        params:{
            sid: searchData.sid,
            start: searchData.start,
            end: searchData.end,
            key: searchData.key,
        },
        withCredentials: true,
    })
}