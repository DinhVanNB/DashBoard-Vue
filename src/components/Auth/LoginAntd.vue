<template>
    <a-form
        layout='vertical'
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onLogin"
        @finishFailed="onValidateError">
        <a-form-item label="Username" name="username" :rules="usernameRules">
            <a-input v-model:value="formState.username" :disabled="isLogin">
                <template #prefix>
                    <UserOutlined/>
                </template>
            </a-input>
        </a-form-item>

        <a-form-item label="Password" name="password" :rules="passwordRules">
            <a-input-password v-model:value="formState.password" :disabled="isLogin">
                <template #prefix>
                    <LockOutlined/>
                </template>
            </a-input-password>
        </a-form-item>
        <a-form-item >
            <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>
            <router-link to="/" class="float-right text-xs">Forgot password?</router-link>
        </a-form-item>

        <a-form-item v-if="!isLogin">
            <a-button
                :loading="loading"
                :disabled="isLogin"
                block
                type="primary"
                ghost
                html-type="submit">
                Login
            </a-button>
        </a-form-item>
        <a-form-item  v-else>
            <a-button
                :loading="loading"
                @click="onLogout"
                block
                type="primary"
                ghost
                html-type="button">
                Logout
            </a-button>
        </a-form-item>
    </a-form>
</template>
<script >
    import {mapGetters} from 'vuex'
    import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'
    export default {
        name : 'LoginForm',
        components : {
            UserOutlined,
            LockOutlined,
        },

        data : () => ({
            loading: false,
            formState: {},
            usernameRules: [
                {
                    required: true,
                    message: 'Please input your username!'
                }, {
                    pattern: /.+@.+\..+/,
                    message: 'Username must be valid'
                }
            ],
            passwordRules: [
                {
                    required: true,
                    message: 'Password is required!'
                }, {
                    min: 6,
                    message: 'Password must be 6  characters or more!'
                }
            ]
        }),
        methods : {
            onLogin(values) {
                this.loading = true
                this
                    .$store
                    .dispatch('user/onLogin', {
                        email: values.username,
                        password: values.password
                    })
            },
            onValidateError(errorInfo) {
                console.log('Failed:', errorInfo);
            },
            onLogout() {
                this.loading = true
                this
                    .$store
                    .dispatch('user/onLogout')
                if (!this.formState.remember) {
                    this.formState.username = '';
                    this.formState.password = ''
                }
            }
        },
        computed : {
            ...mapGetters('user', {
                userData: 'userLogin',
                isLogin: 'isLogin'
            })
        },
        watch : {
            // userData() {
            //     console.log(this.userData)
            // },
            loading() {
                if (this.loading === false) 
                    return
                setTimeout(() => {
                    this.loading = false
                }, 2000);
            }
        },
        created() {
            this.formState = {
                username: '',
                password: '',
                remember: true
            }
        }

    }
</script>