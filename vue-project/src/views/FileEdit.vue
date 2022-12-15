<template>

    <div class="file-header">
        <span class="file-title">档案登记</span>
        <div style="flex-grow: 1;"></div>

    </div>

    <div style="margin-top: 50px; margin-left: 10%;">
        <a-form 
            :model="formState" 
            name="file" 
            labelAlign="left" 
            :label-col="{ span: 5 }" 
            :wrapper-col="{ span: 15 }"
            v-bind="formItemLayout" 
            action="127.0.0.1/file"
            @finishFailed="onFinishFailed" 
            @finish="onFinish">


            <a-row>
                <a-col :span="6">

                    <a-form-item label="一级机构" :span="3" :rules="[{ required: true, message: '请选择一级机构' }]" name="emplOrganizationA">
                        <a-select 
                            v-model:value="formState.emplOrganizationA"
                            :disabled="orgaDisabled"
                            :loading="orgaDisabled"
                            :options="orgaSelects"
                            :field-names="{ label: 'orgaName', value: 'oid' }" 
                            @change="onOrgaSelected"
                            >

                        </a-select>
                    </a-form-item>

                    <a-form-item label="职位分类">
                        <a-select 
                            v-model:value="posiCategory"
                            :disabled="posiCateDisabled"
                            :loading="posiCateDisabled"
                            :options="posiCateSelects"
                            :field-names="{ label: 'posiCategory', value: 'posiCategory' }" 
                            @change="onPosiCateSelected"
                            >

                        </a-select>
                    </a-form-item>

                    <a-form-item label="邮箱" name="emplEmali" :rules="[{ required: true, message: '请输入邮箱' }]">
                        <a-input v-model:value="formState.emplEmali" placeholder="请输入邮箱" />
                    </a-form-item>

                    <a-form-item label="生日" name="emplBirthday" :rules="[{ required: true, message: '请选择日期' }]">
                        <a-date-picker v-model:value="formState.emplBirthday" placeholder="请选择日期" style="width: 100%;" format="YYYY-MM-DD"  valueFormat="YYYY-MM-DD HH:mm:ss"/>
                    </a-form-item>

                    <a-form-item label="国家" name="emplCountry" :rules="[{ required: true, message: '请输入国家' }]">
                        <a-input v-model:value="formState.emplCountry" placeholder="请输入国家" />
                    </a-form-item>

                    <a-form-item label="民族" name="emplEthnic" :rules="[{ required: true, message: '请输入民族' }]">
                        <a-input v-model:value="formState.emplEthnic" placeholder="请输入民族" />
                    </a-form-item>

                    <a-form-item label="学历" name="emplEducation" :rules="[{ required: true, message: '请选择学历' }]">
                        <a-select v-model:value="formState.emplEducation">
                            <a-select-option value="小学">小学</a-select-option>
                            <a-select-option value="初中">初中</a-select-option>
                            <a-select-option value="高中">高中</a-select-option>
                            <a-select-option value="大专">大专</a-select-option>
                            <a-select-option value="本科">本科</a-select-option>
                            <a-select-option value="研究生">研究生</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item label="爱好" name="emplHobby" :rules="[{ required: true, message: '请输入爱好' }]">
                        <a-input v-model:value="formState.emplHobby" placeholder="请输入爱好" />
                    </a-form-item>





                </a-col>
                <a-col :span="6">

                    <a-form-item label="二级机构" :rules="[{ required: true, message: '请选择二级机构' }]" name="emplOrganizationB">
                        <a-select 
                            v-model:value="formState.emplOrganizationB"
                            :options="orgbSelects"
                            :disabled="orgbDisabled"
                            :loading="orgbDisabled"
                            :field-names="{ label: 'orgaName', value: 'oid' }" 
                            @change="onOrgbSelected"
                            >

                        </a-select>
                    </a-form-item>

                    <a-form-item label="职位名称" :rules="[{ required: true, message: '请选择职位名称' }]" name="emplPosition">
                        <a-select 
                            v-model:value="formState.emplPosition"
                            :disabled="posiNameDisabled"
                            :loading="posiNameDisabled"
                            :options="posiNameSelects"
                            :field-names="{ label: 'posiName', value: 'pid' }" 
                            @change="onPosiNameSelected"
                            >

                        </a-select>
                    </a-form-item>

                    <a-form-item label="年龄" name="emplAge" :rules="[{ required: true, message: '请输入年龄' }]">
                        <a-input v-model:value="formState.emplAge" placeholder="请输入年龄" />
                    </a-form-item>

                    <a-form-item label="身份证号" name="emplIdcard" :rules="[{ required: true, message: '请输入身份证号' }]">
                        <a-input v-model:value="formState.emplIdcard" placeholder="请输入身份证号" />
                    </a-form-item>

                    <a-form-item label="出生地" name="emplBirthpalce" :rules="[{ required: true, message: '请输入出生地' }]">
                        <a-input v-model:value="formState.emplBirthpalce" placeholder="请输入出生地" />
                    </a-form-item>

                    <a-form-item label="政治面貌" name="emplPolitical" :rules="[{ required: true, message: '请输入政治面貌' }]">
                        <a-input v-model:value="formState.emplPolitical" placeholder="请输入政治面貌"  />
                    </a-form-item>

                    <a-form-item label="学历专业" name="emplMajor" :rules="[{ required: true, message: '请输入学历专业' }]">
                        <a-input v-model:value="formState.emplMajor" placeholder="请输入学历专业"  />
                    </a-form-item>

                    <a-form-item label="银行卡号" name="emplSpecicalty" :rules="[{ required: true, message: '请输入银行卡号' }]">
                        <a-input v-model:value="formState.emplSpecicalty" placeholder="请输入银行卡号" />
                    </a-form-item>


                </a-col>


                <a-col :span="6">

                    <a-form-item label="三级机构" name="emplOrganizationC" :rules="[{ required: true, message: '请选择三级机构' }]">
                        <a-select 
                            v-model:value="formState.emplOrganizationC"
                            :options="orgcSelects"
                            :loading="orgcDisabled"
                            :disabled="orgcDisabled"
                            :field-names="{ label: 'orgaName', value: 'oid' }" 
                            @change="onOrgcSelected"
                            >

                        </a-select>
                    </a-form-item>

                    <a-form-item label="姓名" :rules="[{ required: true, message: '请输入姓名' }]" name="emplName">
                        <a-input v-model:value="formState.emplName" placeholder="请输入姓名" />
                    </a-form-item>

                    <a-form-item label="固定电话" name="emplTelephone" :rules="[{ required: true, message: '请输入固定电话' }]">
                        <a-input v-model:value="formState.emplTelephone" placeholder="请输入固定电话"  />
                    </a-form-item>

                    <a-form-item label="手机号码" name="emplMobilephone" :rules="[{ required: true, message: '请输入手机号码' }]">
                        <a-input v-model:value="formState.emplMobilephone" placeholder="请输入手机号码" />
                    </a-form-item>

                    <a-form-item label="QQ" name="emplQq" :rules="[{ required: true, message: '请输入QQ' }]">
                        <a-input v-model:value="formState.emplQq" placeholder="请输入QQ"  />
                    </a-form-item>

                    <a-form-item label="社保号码" name="emplSsc" :rules="[{ required: true, message: '请输入社保号码' }]">
                        <a-input v-model:value="formState.emplSsc" placeholder="请输入社保号码" />
                    </a-form-item>

                    <a-form-item label="薪酬标准">
                        <a-input v-model:value="salaryName" placeholder="管理员未设置标准" disabled />
                    </a-form-item>

                    <a-form-item label="开户银行" name="emplBankname" :rules="[{ required: true, message: '请输入开户银行' }]"> 
                        <a-input v-model:value="formState.emplBankname" placeholder="请输入开户银行" />
                    </a-form-item>

                </a-col>
                <a-col :span="3">
                    <a-image 
                        style="width: 160px; object-fit: cover;"
                        :src=formState.emplAvatar
                        fallback="data:image/png;base64,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" />
                
                    
                    <a-upload 
                        v-model:file-list="fileList" 
                        name="file" 
                        :action="'http://127.0.0.1:8686/img'" 
                        :headers="headers" 
                        @change="handleChange" 
                        style="width: 160px;">
                            <a-button style="width: 100%; margin-top: 20px;">
                                !点击此按钮上传图片
                            </a-button>
                    </a-upload>

                    <a-form-item label="性别" name="emplGender" style="margin-top: 10px;" :rules="[{ required: true, message: '请输入性别' }]" :label-col="{ span: 10 }" :wrapper-col="{ offset: 0, span: 14 }">
                        <a-select v-model:value="formState.emplGender">
                            <a-select-option value="男">男</a-select-option>
                            <a-select-option value="女">女</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row>

                <a-col :span="6">
                    <a-form-item label="邮编" name="emplPostcode" :rules="[{ required: true, message: '请输入邮编' }]">
                        <a-input v-model:value="formState.emplPostcode" placeholder="请输入邮编" />
                    </a-form-item>
                </a-col>

                <a-col :span="15">
                    <a-form-item label="地址" :label-col="{ span: 2 }" :wrapper-col="{ offset: 0, span: 22 }" name="emplAddress" :rules="[{ required: true, message: '请输入地址' }]">
                        <a-input v-model:value="formState.emplAddress" placeholder="请输入地址" />
                    </a-form-item>
                </a-col>



            </a-row>



            <a-form-item :label-col="{ span: 1 }" :wrapper-col="{ offset: 0, span: 21 }" name="emplResume" :rules="[{ required: true, message: '请输入个人履历' }]">
                <a-textarea v-model:value="formState.emplResume" placeholder="请输入个人履历" allow-clear />
            </a-form-item>




            <a-form-item :label-col="{ span: 1 }" :wrapper-col="{ offset: 0, span: 21 }" name="emplRemakes" :rules="[{ required: true, message: '请输入备注' }]">
                <a-textarea v-model:value="formState.emplRemakes" placeholder="请输入备注" allow-clear />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 19, span: 2 }" style="width: 100%;">
                <a-button type="primary" html-type="submit" style="width: 100%;">Submit</a-button>
            </a-form-item>


        </a-form>



    </div>






</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { SearchOutlined, DollarOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getPositionCategory,getPositionbyCategory,getPositionInfoById } from '../request/api/position';
import { addFile } from '../request/api/file';
import { getOrgA,getOrgB,getOrgC,addOrganization,editSOrganization,deleteOrganization  } from '../request/api/organization';
import { getAllSalaryInfo, getSalaryInfoByID } from '../request/api/salary';
import { useAdminStore } from '../stores';
import { usePagination } from 'vue-request';

const store = useAdminStore();

//图片
const handleChange = (info) => {
      if (info.file.status !== "uploading") {

      }
      if (info.file.status === "done" && info.file.response.success) {
        message.success(`${info.file.name} 上传成功`);
        formState.emplAvatar = info.file.response.data;
      } else if (info.file.status === "done" && !info.file.response.success){
        message.error(`${info.file.name} 上传失败`);
      }
    };
const fileList = ref([]);
const headers = {
    'Authorization': store.token,
}

//职位分类
let posiCategory = ref('');
//薪酬名称
let salaryName = ref('');
//一级机构选项
let orgaSelects = reactive();
//二级机构选项
let orgbSelects = reactive();
//三级机构选项
let orgcSelects = reactive();
//职位分类选项
let posiCateSelects = reactive();
//职位名称选项
let posiNameSelects = reactive();
//选择框状态
let orgaDisabled = ref(true);
let orgbDisabled = ref(true);
let orgcDisabled = ref(true);
let posiCateDisabled = ref(true);
let posiNameDisabled = ref(true);

//获取一级机构
async function startGetOrga(){
    let res = (await getOrgA(store.token));
    if(res.data.success == true){
        orgaSelects = res.data.data;
        orgaDisabled.value = false
    }
}
//获取二级机构
async function startGetOrgb(id){
    let res = (await getOrgB(store.token,id));
    if(res.data.success == true){
        orgbSelects = res.data.data;
        orgbDisabled.value = false;
    }
}
//获取三级机构
async function startGetOrgc(id){
    let res = (await getOrgC(store.token,id));
    if(res.data.success == true){
        orgcSelects = res.data.data;
        orgcDisabled.value = false;
    }
}
//获取职位分类
async function startGetPosiCate(){
    let res = (await getPositionCategory(store.token));
    if(res.data.success == true){
        posiCateSelects = res.data.data;
        posiCateDisabled.value = false;
    }
}
//获取职位名称
async function startGetPosiName(value){
    let res = (await getPositionbyCategory(store.token,value));
    if(res.data.success == true){
        posiNameSelects = res.data.data;
        posiNameDisabled.value = false;
    }
}
//获取薪酬标准
async function startGetSalary(value){
    let res = (await getPositionInfoById(store.token,value));
    if(res.data.success == false){
        message.error("获取薪酬标准失败，请检查网络连接");
    }else{
        let res2 = (await getSalaryInfoByID(store.token,res.data.data.posiSalary));
        if(res2.data.success == false){
            message.error("获取薪酬标准失败，请检查网络连接");
        }else{
            formState.emplSalary = res2.data.data.sid
            salaryName.value = res2.data.data.salaName
            console.log(res2.data.data)
        }
    }
}

//一级机构被选中
function onOrgaSelected(value){
    formState.emplOrganizationB = '';
    formState.emplOrganizationC = '';
    orgbSelects = reactive('');
    orgcSelects = reactive('');
    orgbDisabled.value = true;
    orgcDisabled.value = true;
    startGetOrgb(value);
}
//二级机构被选中
function onOrgbSelected(value){
    formState.emplOrganizationC = '';
    orgcSelects = reactive('');
    orgcDisabled.value  = true;
    startGetOrgc(value);

}
//三级机构被选中
function onOrgcSelected(value){

}
//职位分类被选中
function onPosiCateSelected(value){
    posiNameDisabled.value = true;
    formState.emplPosition = '';
    posiNameSelects = reactive('');
    startGetPosiName(value);
}
//职位名称被选中
function onPosiNameSelected(value){
    startGetSalary(value);
}


//表单对象
let formState = reactive({
    emplAddress: "",
    emplAge: "",
    emplAvatar: "",
    emplBankname: "",
    emplBirthday: "",
    emplBirthpalce: "",
    emplCountry: "",
    emplEducation: "",
    emplEmali: "",
    emplEthnic: "",
    emplGender: "",
    emplHobby: "",
    emplIdcard: "",
    emplMajor: "",
    emplMobilephone: "",
    emplName: "",
    emplOrganizationA: "",
    emplOrganizationB: "",
    emplOrganizationC: "",
    emplPolitical: "",
    emplPosition: "",
    emplPostcode: "",
    emplQq: "",
    emplRecoddate: "",
    emplRecoders: "",
    emplRemakes: "",
    emplResume: "",
    emplSalary: "",
    emplSpecicalty: "",
    emplSsc: "",
    emplStatus: "",
    emplTelephone: ""
})


function onFinish() {
    startAddFile();
}
function onFinishFailed(){
    console.log("fail")
    console.log(formState)
}

//开始发送请求
async function startAddFile(){
    let res = (await addFile(store.token,formState))
    if(res.data.success == false){
        message.error(res.data.msg);
    }else{
        message.success("提交成功")
    }
}



onMounted(()=>{
    startGetOrga();
    startGetPosiCate();
})

</script>

<style scoped>
.file-header {
    width: 100%;
    display: flex;
    align-items: center;
}

.file-title {
    /* 标题样式 */
    font-size: 25px;
    font-weight: bold;
}
</style>