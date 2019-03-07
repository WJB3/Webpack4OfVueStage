<template>
    <div class="container"><span>{{msg}}</span></div>
</template>

<script>
export default {
    data(){
        return{
            msg:'webpack4搭建react环境基本完成，是不是很简单呢'
        }
    }
}
</script>

<style>
.container{
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:20px;
    color:red;
    box-shadow:5px 5px 5px 5px;
}
</style>