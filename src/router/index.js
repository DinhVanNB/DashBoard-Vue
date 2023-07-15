import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import AuthLayout from '../layout/AuthLayout.vue'


export const route ={
    home:{
        path:'/',
        name:'home',
        component:()=> import('@/views/HomeView.vue'),
        meta: {
            title: 'Home App | Trang Chủ',
            metaTags: [
              {
                name: 'description',
                content: 'The about page of our example app.'
              },
              {
                property: 'og:description',
                content: 'The about page of our example app.'
              }
            ]
        },
    },
    login:{
        path:'/auth/login',
        name:'login',
        component:()=> import('@/views/LoginView.vue'),
        meta: {
            title: 'Login Page | Trang Đăng Nhập',
            metaTags: [
              {
                name: 'description',
                content: 'The about page of our example app.'
              },
              {
                property: 'og:description',
                content: 'The about page of our example app.'
              }
            ]
          },
    },
    register:{
        path:'/auth/register',
        name:'register',
        component:()=> import('@/views/RegisterView.vue'),
        meta: {
            title: 'Register Page | Trang Đăng Ký',
            metaTags: [
              {
                name: 'description',
                content: 'The about page of our example app.'
              },
              {
                property: 'og:description',
                content: 'The about page of our example app.'
              }
            ]
        },
    },
    profile:{
        path:'/profile',
        name:'profile',
        component:()=> import('@/views/ProfileView.vue'),
        meta: {
            title: 'Profile | Thông tin cá nhân',
            metaTags: [
              {
                name: 'description',
                content: 'The about page of our example app.'
              },
              {
                property: 'og:description',
                content: 'The about page of our example app.'
              }
            ]
        },
    },
    team:{
      path:'/team',
      name:'team',
      component:()=> import('@/views/RegisterView.vue'),
      meta: {
          title: 'Manage Team | Quản Lý Nhóm',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
      },
    },
    blog:{
        path:'/blog',
        name:'blog',
        component:()=> import('@/views/RegisterView.vue'),
        meta: {
            title: 'Blog | Trang blog',
            metaTags: [
              {
                name: 'description',
                content: 'The about page of our example app.'
              },
              {
                property: 'og:description',
                content: 'The about page of our example app.'
              }
            ]
        },
    },
    calendar:{
      path:'/calendar',
      name:'calendar',
      component:()=> import('@/views/RegisterView.vue'),
      meta: {
          title: 'Calendar | Lịch',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
      },
  },
    
}

const routes  =[
    {
        path: '/',
        component: MainLayout,
        children: [
            route.home,
            route.profile,
            route.team,
            route.calendar,
            route.blog
        ]
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            route.login,
            route.register
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(){
      return {top:0,left:0, behavior:'smooth'}
    }
})

export default router