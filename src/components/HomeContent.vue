<template>
  <div>
    <h1>{{txtText}}</h1> 
    <input type="text" v-model="txtText" class="border rounded p-1 border-blue-500 "/>
     <!-- <button @click="handleChange" class="rounded border p-1 border-blue-500">Change</button>  -->
  </div>
</template>



<script>
export default {
  name: 'HomeContent',
  
  data(){
    return({
      txtText: 'Welcome to Your Home'
    })
  },

  

}
</script>


