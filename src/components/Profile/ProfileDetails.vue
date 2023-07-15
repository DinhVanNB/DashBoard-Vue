<template>
    <a-card class="shadow-md"  style="padding:0px; margin-bottom:16px" >
        <div class="flex flex-col gap-5" >
            <div class="flex flex-col items-center gap-2">
                <a-avatar :src="userAvatar" :size="120"/>
                <div class="text-center">
                    <div class="font-semibold" v-if="userProfile">
                        {{userProfile.firstName +' '+ userProfile.lastName}}
                    </div>
                    <div class="font-semibold"  v-else>User Name</div>
                    <div v-if="userProfile" class="text-xs">
                        {{userProfile.about}} 
                    </div>
                    <div class="text-xs" v-else> About me! </div>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <div>
                    ☎ <span class="font-semibold">Tel : </span> 
                    <span class="text-xs">
                        {{ userProfile? userProfile.phone : '000-000-0000'  }}
                    </span>
                </div>
                <div>
                    🎓 <span class="font-semibold">Job : </span> 
                    <span class="text-xs">
                        {{ userProfile? userProfile.position : 'Chức vụ '  }}
                    </span>
                </div>
                <div>
                    📌  
                    <span class="font-semibold">Add: </span> 
                    <span class="text-xs">
                        {{ userProfile? userProfile.address : 'Địa chỉ của bạn'  }}
                    </span>
                </div>
            </div>
        </div>
        
        <a-divider/>

        <div  >
            <div class="mb-2 ">
                <span class=" font-semibold">Skills</span>
            </div>
            <div class="pl-2">
                <div class="flex flex-wrap">
                    <template v-for="(skill, index) in skills"  :key="skill">
                        <a-tooltip v-if="skill.length > 20" :title="skill">
                        <a-tag 
                            class="a-tag"
                            style="margin-bottom: 8px;"
                            :closable="index!==0"
                            :color="skill.color"
                            @close="()=>handleCloseSkill(skill)"
                        >
                            {{ `${skill.name.slice(0, 20)}...` }}
                        </a-tag>
                        </a-tooltip>
                        <a-tag
                            class="a-tag"
                            v-else
                            :closable="index!==0"
                            @close="()=> handleCloseSkill(skill)"
                            :color="skill.color"
                        >
                            {{ skill.name }}
                        </a-tag>
                    </template>
                    <a-input
                        v-if="skillInputVisible"
                        ref="skillInput"
                        type="text"
                        size="small"
                        :style="{ width: '78px' }"
                        v-model:value="skillInputValue"
                        @blur="handleSubmitSkill"
                        @keyup.enter="handleSubmitSkill"
                    />
                    <a-tag @click="showSkillInput" class="a-tag" v-else style="background: #fff; borderStyle: dashed;">
                        <PlusOutlined/>
                        New Skill
                    </a-tag>
                </div>
            </div>
        </div>

        <a-divider :dashed="true"/>

        <div>
            <div class="font-semibold mb-2">Team member</div>
            <a-spin tip="Loading..." size="large" :spinning="teamSpinning">
                <div class="pl-2">
                    <a-row>
                        <a-col :span="12" class="mb-2" v-for="(item, index) in teams" :key="index">
                            <div class="flex items-center gap-2">
                                <a-avatar size="small" src=""/>
                                <span class="text-xs">{{ item }}</span>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-spin>
        </div>
    </a-card>
</template>

<script>
    import {
        PlusOutlined,
    } from '@ant-design/icons-vue'
    import {pulicURL} from '@/api/request'

    export default {
        name : 'ProfileDetails',
        props:{
            userProfile:Object
        },
        data : ()=>({
            skillName: ['HTML', 'CSS', 'Java Script', 'TypeScript','ReactJs', 'VueJS', 'Tailwindcss','Bootstrap','MUI','NodeJS','AntDesign', 'Postman'],
            colors:['success',"processing","error","warning","default"],
            skills:[],
            skillInputVisible: false,
            skillInputValue: '',
            teams: [
                'Nguyen Van A', "Tran Thi B", 'Ly Thi C'
            ],
            userAvatar:'',
            teamSpinning:true,
        }),
        components:{
            PlusOutlined,
        },
        watch:{
            userProfile() {
                clearTimeout(setTimeout(()=>this.teamSpinning = false,2000))
                this.userAvatar =pulicURL+ JSON.parse(this.userProfile.image)['0']
                setTimeout(()=>this.teamSpinning = false,2000)
            }
        },
        methods : {
            randomColor(){
               return this.colors[Math.floor(Math.random()*this.colors.length)]
            },
            handleCloseSkill(skillRemove){
                const skills = this.skills.filter(skill=>skill!==skillRemove)
                this.skills = skills
            },

            handleSubmitSkill(){
                let skills = this.skills
                if(this.skillInputValue){
                    skills = [...skills,{name: this.skillInputValue, color:this.randomColor()}]
                }
                Object.assign(this,{
                    skills,
                    skillInputValue:'',
                    skillInputVisible:false
                })
            },
            showSkillInput(){
                this.skillInputVisible= true
                this.$nextTick(()=>{
                    this.$refs.skillInput.focus()
                })
            }
        },
        beforeMount(){
            this.skills = this.skillName.map(name=>({
                name,
                color: this.randomColor()
            }))
        },
    }
</script>

<style scoped>
    .a-tag{
        margin-bottom:8px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.575em;
    }
</style>