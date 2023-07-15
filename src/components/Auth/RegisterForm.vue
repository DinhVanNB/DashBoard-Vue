<template >
    <a-form
        layout="vertical"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onRegister"
        @finishFailed="onValidateError"
    >   
        <a-row :gutter="12">
            <a-col :xs="24" :md="12">
                <a-form-item  label="First Name" name="firstName" :rules="firstNameRules">
                    <a-input  v-model:value="formState.firstName"/>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item  label="Last Name" name="lastName" :rules="lastNameRules">
                    <a-input v-model:value="formState.lastName"/>
                </a-form-item>
            </a-col>
        </a-row>
        <a-form-item label="Email" name="email" :rules="emailRules">
            <a-input v-model:value="formState.email"/>
        </a-form-item>
        <a-form-item label="Password" name="password" :rules="passwordRules">
            <a-input-password v-model:value="formState.password"/>
        </a-form-item>

        <a-form-item label="Comfirm Password" name="comfirmPassword" :rules="[{validator:validateComfirmPass,trigger: 'change'}]">
            <a-input-password 
                v-model:value="formState.comfirmPassword"
            />
        </a-form-item>

        <a-form-item label="Phone" name="phone" :rules="phoneRules">
            <a-input v-model:value="formState.phone"/>
        </a-form-item>

        <a-form-item label="Address" name="address" >
            <a-input v-model:value="formState.address"/>
        </a-form-item>

        <a-form-item label="Gender" name="gender">
            <a-radio-group v-model:value="formState.gender">
                <a-radio value="Nam">Nam</a-radio>
                <a-radio value="Nữ">Nữ</a-radio>
            </a-radio-group>
        </a-form-item>

        <a-form-item label="Avatar" name="image">
            <a-upload accept="image/*" :max-count="1" v-model:fileList="formState.image" list-type="picture" name="avatar">
                <a-button>
                    <template #icon><UploadOutlined/></template>
                    Upload
                </a-button>
            </a-upload>
        </a-form-item>
        <div class="mb-2">
            <small >By Signing up, you agree to our  <u class="cursor-pointer text-blue-500">Terms of Service</u>  and  <u class="cursor-pointer text-blue-500">Privacy Policy</u></small>
        </div>
        
        <a-form-item>
            <a-button :loading="loading" block type="primary" ghost html-type="submit" >
                Create Account
            </a-button>
        </a-form-item>
    </a-form>
</template>
<script>
    import {UploadOutlined} from '@ant-design/icons-vue'
    import {route} from '@/router'
    import {register , checkEmail} from '@/api/user'
    const vniLower ='ăâđêôơưáàạảéèẹẻóòọỏíìịỉýỳỷỵùúụủểệềếấầậẩắằẳặứừựửốồộổớờởợãễỹĩõẽũỡỗữẵẫ'
    const vniUpper = 'ĂÂĐÊÔƠƯÁÀẠẢÉÈẸẺÓÒỌỎÍÌỊỈÝỲỶỴÙÚỤỦỂỆỀẾẤẦẬẨẮẰẲẶỨỪỰỬỐỒỘỔỚỜỞỢÃỄỸĨÕẼŨỠỖỮẴẪ'
    const regexName= `^[a-zA-Z${vniLower}${vniUpper}._]+$`

    const checkMail = async(_rule,value)=>{
        const res= await checkEmail({email:value})
        if(res.status !== 200) return Promise.reject(res.result.message)
        if(res.status === 200) return Promise.resolve()
    }

    export default {
        name:'RegisterForm',
        components:{
            UploadOutlined
        },
        data:()=>({
            route:route,
            loading:false,
            formState:{ },
            firstNameRules:[
                {required:true,message:'First Name is required!'},
                {pattern:regexName, message: 'First Name must be valid'}
            ],
            lastNameRules:[
                {required:true,message:'First Name is required!'},
                {pattern:regexName, message: 'Last Name must be valid'}
            ],
            emailRules:[
                {required:true,message:'Email is required!'},
                {pattern: /.+@.+\..+/, message: 'Email must be valid'},
                {validator:checkMail, trigger: 'blur'}
            ],
            passwordRules:[
                {required:true,message:'Password is required!'},
                {min:6, message:'Password must be 6  characters or more!'}
            ],
            phoneRules:[
                {required:true,message:'Phone is required!'},
                {pattern:/^[0-9]{10}$/, message:'Phone must includes 10 number!'}
            ]
               
        }),
        methods:{
            async onRegister(values){
                try{
                    await register(values)
                }
                catch(e){
                    console.log('Error register', e)
                }
            },
            onValidateError(){
                console.log('Error validated')
            },
            async validateComfirmPass() {
                if (this.formState.comfirmPassword === '') {
                    return Promise.reject('Please input the password again');
                } else if (this.formState.comfirmPassword !== this.formState.password) {
                    return Promise.reject("Two inputs don't match!");
                } else {
                    return Promise.resolve();
                }
            }
        },
        computed:{
           
        },
        created() {
            this.formState={
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                comfirmPassword:'',
                phone:'',
                address:'',
                gender:'Nữ',
                image:null
            }
          
        },
    }
</script>