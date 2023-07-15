<template>
    <div class="flex items-center gap-2">
        <router-link to="/" class="flex items-center">
            <a-image :width="30" :preview="false" src="https://aliyuncdn.antdv.com/logo.png" />
        </router-link>
        <router-link to="/" class="flex items-center">
            <h3 class="hover:text-blue-600">
                Dashboard
            </h3>
        </router-link>
    </div>
</template>

<script>
    export default {
        name:'HeaderAuth',

    }
</script>

