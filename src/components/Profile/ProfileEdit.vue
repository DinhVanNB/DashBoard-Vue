<template>
    <div >
        <a-card class="shadow-md">
            <h3 class="text-lg">
                Edit Profile
            </h3>
            <div>
                <a-form 
                    layout="vertical"
                    :model="userProfile"
                    @finish="onEdit"
                    @finishFailed="()=>console.log('Fail validate edit!')"
                    :disabled="true"
                >
                    <a-row :gutter="24">
                        <a-col :xs="24" :sm="12" :md="24" :lg="12">
                            <a-form-item label="First Name" name="firstName"
                            :rules="firstNameRules"
                            >
                                <a-input 
                                :disabled="!ableEdit"
                                v-model:value="firstName" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="24" :lg="12">
                            <a-form-item  label="Last Name" name="lastName" 
                            :rules="lastNameRules"
                            >
                                <a-input
                                :disabled="!ableEdit"
                                v-model:value="lastName"/>
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-form-item label="Address" name="address">
                        <a-input 
                        :disabled="!ableEdit"
                        v-model:value="address"/>
                    </a-form-item>

                    <a-form-item label="Phone" name="phone"
                        :rules="phoneRules"
                    >
                        <a-input 
                        :disabled="!ableEdit"
                        v-model:value="phone"/>
                    </a-form-item>

                    <a-form-item label="Job" name="position">
                        <a-input
                        :disabled="!ableEdit"
                        v-model:value="position"/>
                    </a-form-item>

                    <a-form-item label="Gender" name="gender">
                        <a-radio-group :disabled="!ableEdit" v-model:value="gender" class="pl-2">
                            <a-radio value="Nam">
                                Nam
                            </a-radio>
                            <a-radio value="Nữ">
                                Nữ
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>
                   

                    <a-form-item
                        label="About" name="about"
                    >
                        <a-textarea :disabled="!ableEdit" v-model:value="about" :rows="4" />
                    </a-form-item>
                    <a-form-item label="Avatar" name="image">
                        <a-upload  accept="image/*" :max-count="1" v-model:fileList="image" list-type="picture" name="avatar">
                            <a-button :disabled="!ableEdit" >
                                <template #icon>
                                    <UploadOutlined/>
                                </template>
                                Upload
                            </a-button>
                        </a-upload>
                    </a-form-item>

                    <a-form-item v-show="ableEdit">
                        <a-button class="float-right" type="primary" htmlType="submit">Edit</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script>
    const vniLower ='ăâđêôơưáàạảéèẹẻóòọỏíìịỉýỳỷỵùúụủểệềếấầậẩắằẳặứừựửốồộổớờởợãễỹĩõẽũỡỗữẵẫ'
    const vniUpper = 'ĂÂĐÊÔƠƯÁÀẠẢÉÈẸẺÓÒỌỎÍÌỊỈÝỲỶỴÙÚỤỦỂỆỀẾẤẦẬẨẮẰẲẶỨỪỰỬỐỒỘỔỚỜỞỢÃỄỸĨÕẼŨỠỖỮẴẪ'
    const regexName= `^[a-zA-Z${vniLower}${vniUpper}._]+$`
    import {UploadOutlined} from '@ant-design/icons-vue'

    export default {
        name : "ProfileEdit",
        props:{
            userData:Object,
            ableEdit:Boolean
        },
        components:{
            UploadOutlined
        },
        data:()=>({
            firstName:'',
            lastName:'',
            address:'',
            phone:null,
            position:'',
            gender:'',
            about:'',
            image:null,
            userProfile:{},
            firstNameRules:[
                {required:true,message:'First Name is required!'},
                {pattern:regexName, message: 'First Name must be valid'}
            ],
            lastNameRules:[
                {required:true,message:'First Name is required!'},
                {pattern:regexName, message: 'Last Name must be valid'}
            ],
            phoneRules:[
                {required:true,message:'Phone is required!'},
                {pattern:/^[0-9]{10}$/, message:'Phone must includes 10 number!'}
            ]
        }),
        methods:{
            onEdit(data){
                let isEdit = false
                let dataAfterEdit = {}
                for(let key in data){
                    if(this.userData[key]!=data[key]){
                        dataAfterEdit={[key]:data[key]}
                        isEdit=true
                    }
                }
                dataAfterEdit= {
                    ...dataAfterEdit, 
                    id:this.userData.id,
                    roleId: this.userData.roleId
                }
                if(isEdit) this.$store.dispatch('user/onEditUser',dataAfterEdit)
            }
        },
        watch:{
            userData(){
                if(this.userData){
                    this.userProfile= Object.assign(this,{
                    ...this.userData,
                    image:null,
                    })
                }
                
            }
        },
    }
</script>