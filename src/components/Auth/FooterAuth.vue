<template>
    <div class="flex flex-col sm:flex-row items-center justify-around">
        <div>
            <small>
                This site is protected by 
                <u class="cursor-pointer hover:text-blue-600">
                    Privacy Policy
                </u>
            </small>
        </div>
       
        <div class="flex flex-col sm:flex-row items-center justify-between gap-0 sm:gap-3">
            <div>
                <small @click="toggleLanguage" class="cursor-pointer ">
                    {{lang}}
                </small>
            </div>
            <div>
                <small class="text-blue-600 cursor-pointer ">
                    Ant-Design
                </small>
            </div>
            <div>
                <small class="cursor-pointer hover:text-blue-600">
                    Privacy Policy
                </small>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name : 'FooterAuth',
        data:()=>({
            lang:'Việt Nam'
        }),
        methods:{
            toggleLanguage(){
                this.lang= this.language==='vi'? "English":"Việt Nam"
                this.$store.dispatch('appState/toggleLanguage')
               
            }
        },
        computed:{
            ...mapGetters('appState',{
                language:'language'
            })
        },
        // watch:{
        //     language(){
                
        //     }
        // }
        
    }
</script>