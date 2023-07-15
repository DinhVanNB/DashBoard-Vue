<template>
    <a-divider>
        <a-typography-text class="text-xs " type="secondary">
            {{title}}
        </a-typography-text>
    </a-divider>
    <div class="grid gap-2 grid-cols-3 justify-between mt-3" >
        <a-form-item no-style>
            <a-button  class="btn-facebook" block type="ghost" size="large" >
                <template #icon>
                    <FacebookFilled/> 
                </template>
            </a-button>
            <a-button class="btn-google"  block type="ghost" size="large" >
                <template #icon>
                    <GoogleOutlined/>
                </template>
            </a-button>
            <a-button class="btn-twitter"   block type="ghost" size="large" >
                <template #icon>
                    <TwitterOutlined/>
                </template>
            </a-button>
        </a-form-item>
    </div>
</template>

<script>
    import {
        TwitterOutlined,
        GoogleOutlined,
        FacebookFilled,
    } from '@ant-design/icons-vue'

    export default {
        name:"SocialButton",
        props:{
            title:String
        },
        components:{
            FacebookFilled,
            TwitterOutlined,
            GoogleOutlined
        }
    }
</script>
<style scoped>
    .btn-google{
        color:#ff3939;
        border-radius:8px ; 
        
    }
    .btn-google:hover{
        border: 1px solid #ff3939;
    }

    .btn-facebook{
        color:#0151ce;
        border-radius:8px ; 
        
    }
    .btn-facebook:hover{
        border: 1px solid #0151ce;
    }

    .btn-twitter{
        color:#1b9ff1;
        border-radius:8px ; 
        
    }
    .btn-twitter:hover{
        border: 1px solid #1b9ff1;
    }


</style>