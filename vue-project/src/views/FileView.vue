<template>
        
    <div class="file-header">
        <!-- 返回 -->
        <a-button shape="circle" style="margin-right: 10px;" size="middle" @click="router.go(-1)">
            <template #icon>
                <left-outlined />
            </template>
        </a-button>
        <span class="file-title">档案详情</span>
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
                            :disabled="true"
                            :options="orgaSelects"
                            :field-names="{ label: 'orgaName', value: 'oid' }" 
                            @change="onOrgaSelected"
                            >

                        </a-select>
                    </a-form-item>

                    <a-form-item label="职位分类">
                        <a-select 
                            v-model:value="posiCategory"
                            :disabled="true"
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
                            :disabled="true"
                            :field-names="{ label: 'orgaName', value: 'oid' }" 
                            @change="onOrgbSelected"
                            >

                        </a-select>
                    </a-form-item>

                    <a-form-item label="职位名称" :rules="[{ required: true, message: '请选择职位名称' }]" name="emplPosition">
                        <a-select 
                            v-model:value="formState.emplPosition"
                            :disabled="true"
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
                            :disabled="true"
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

                    <a-form-item label="性别" name="emplGender" style="margin-top: 10px;" :rules="[{ required: true, message: '请输入性别' }]" :label-col="{ span: 0 }" :wrapper-col="{ offset: 0, span: 24 }">
                        <a-select v-model:value="formState.emplGender">
                            <a-select-option value="男">男</a-select-option>
                            <a-select-option value="女">女</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item label="登记日" :label-col="{ span: 0 }" :wrapper-col="{ offset: 0, span: 24 }"> 
                        <a-date-picker v-model:value="formState.emplRecoddate" placeholder="登记日期" style="width: 100%;" format="YYYY-MM-DD"  valueFormat="YYYY-MM-DD HH:mm:ss" disabled="true">
                            <template #suffixIcon>
                                
                            </template>
                        </a-date-picker>
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
                <a-button type="primary" html-type="submit" style="width: 100%;" v-if="isAssistant">更新</a-button>
                <a-button type="primary" html-type="submit" style="width: 100%;" v-if="!isAssistant">复核</a-button>
            </a-form-item>


        </a-form>



    </div>






</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { FormOutlined,CloseOutlined,LeftOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getPositionCategory,getPositionbyCategory,getPositionInfoById } from '../request/api/position';
import { addFile,getFileInfobyId,updateFile,recheckFile } from '../request/api/file';
import { getOrgA,getOrgB,getOrgC,addOrganization,editSOrganization,deleteOrganization  } from '../request/api/organization';
import { getAllSalaryInfo, getSalaryInfoByID } from '../request/api/salary';
import { useAdminStore } from '../stores';
import { usePagination } from 'vue-request';
import { useRouter,useRoute, routerKey } from 'vue-router';


const store = useAdminStore();
const router = useRouter();
const route = useRoute();

//图片
const handleChange = (info) => {
      if (info.file.status !== "uploading") {

      }
      if (info.file.status === "done" && info.file.response.success) {
        message.success(`${info.file.name} 上传成功`);
        formState.value.emplAvatar = info.file.response.data;
      } else if (info.file.status === "done" && !info.file.response.success){
        message.error(`${info.file.name} 上传失败`);
      }
    };
const fileList = ref([]);
const headers = {
    'Authorization': store.token,
}

//是专员
let isAssistant = ref(store.userInfo.userPermission == "1" ? true : false)
//职位分类
let posiCategory = ref('');
//薪酬名称
let salaryName = ref('');
//一级机构选项
let orgaSelects = reactive();
//二级机构选项
let orgbSelects = ref();
//三级机构选项
let orgcSelects = ref();
//职位分类选项
let posiCateSelects = reactive();
//职位名称选项
let posiNameSelects = ref();
//选择框状态
let orgaDisabled = ref(false);
let orgbDisabled = ref(false);
let orgcDisabled = ref(false);
let posiCateDisabled = ref(false);
let posiNameDisabled = ref(false);


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
        orgbSelects.value = res.data.data;
        orgbDisabled.value = false;
    }
}
//获取三级机构
async function startGetOrgc(id){
    let res = (await getOrgC(store.token,id));
    if(res.data.success == true){
        orgcSelects.value = res.data.data;
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
        posiNameSelects.value = res.data.data;
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
            formState.value.emplSalary = res2.data.data.sid
            salaryName.value = res2.data.data.salaName
            console.log(res2.data.data)
        }
    }
}

//一级机构被选中
function onOrgaSelected(value){
    formState.value.emplOrganizationB = '';
    formState.value.emplOrganizationC = '';
    orgbSelects.value = ref('');
    orgcSelects.value = ref('');
    orgbDisabled.value = true;
    orgcDisabled.value = true;
    startGetOrgb(value);
}
//二级机构被选中
function onOrgbSelected(value){
    formState.value.emplOrganizationC = '';
    orgcSelects = ref('');
    orgcDisabled.value  = true;
    startGetOrgc(value);

}
//三级机构被选中
function onOrgcSelected(value){

}
//职位分类被选中
function onPosiCateSelected(value){
    posiNameDisabled.value = true;
    formState.value.emplPosition = '';
    posiNameSelects = ref('');
    startGetPosiName(value);
}
//职位名称被选中
function onPosiNameSelected(value){
    startGetSalary(value);
}


//表单对象
let formState = ref({
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
    startUpdate();
}
function onFinishFailed(){
    
}

//开始发送请求
async function startUpdate(){
    if(isAssistant.value){
        //专员更新
        let res = (await updateFile(store.token, formState.value))
        if (res.data.success == false) {
            message.error(res.data.msg);
        } else {
            message.success("更新成功")
            router.go(-1)
        }
    }else{
        //经理复核
        let res = (await recheckFile(store.token, formState.value))
        if (res.data.success == false) {
            message.error(res.data.msg);
        } else {
            message.success("复核成功")
            router.go(-1)
        }
    }
}

//开始获取信息
async function startGetInfo(){
    let res = await getFileInfobyId(store.token,route.query.id);
    if(res.data.success == true){
        formState.value = res.data.data[0]
        formState.value.emplBirthday =  formState.value.emplBirthday.replace('T',' ')
        console.log(formState.value)
        //获取后续信息
        await startGetOrgb(formState.value.emplOrganizationA)
        await startGetOrgc(formState.value.emplOrganizationB)
        await startGetPosiName(formState.value.empl_position_Category_name)
        posiCategory.value = formState.value.empl_position_Category_name;
        await startGetSalary(formState.value.emplPosition)
    }else{
        message.error("获取信息失败，请检查网络设置")
        router.go(-1);
    }
}


onMounted(async()=>{
    await startGetOrga();
    await startGetPosiCate();
    await startGetInfo();
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