import service from "..";

//薪酬查询
export function getSalaryInfo(token,param){
    let rindex = param.index;
    return service({
        method: "Get",
        url: "/salary?index="+rindex+"&count="+param.count,
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