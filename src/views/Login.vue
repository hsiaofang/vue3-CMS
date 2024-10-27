<template>
    <div class="body-login">
        <el-form :model="loginForm" class="login-container">
            <h1>歡迎登入</h1>
            <el-form-item>
                <el-input type="input" placeholder="請輸入帳號" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="請輸入密碼" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useAllDateStore } from '@/stores'
import { useRouter } from 'vue-router'
const loginForm = reactive({
    username:'',
    password:''
})
const {proxy} = getCurrentInstance()
const store = useAllDateStore()
const router = useRouter()

const handleLogin = async() => {
    const res = await proxy.$api.getMenu(loginForm)
    console.log('res',res.menuList)
    store.state.token = res.token
    // 拿到菜單後在左側菜單顯示，跨組件傳值透過pinia
    store.updateMenuList(res.menuList)
    store.state.token = res.token
    store.addMenu(router)
    router.push('/home')
}
</script>

<style scoped lang="less">
.body-login{
    width:100%;
    height:100%;
    background-image: url("../assets/images/background.png");
    background-size:100%;
    overflow: hidden;
}  
.login-container{
    width:400px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow:0 0 25px #cacaca;
    margin: 250px auto;
    h1{
        text-align: center;
        margin-bottom: 20px;
        color: #545450;
    }
    :deep(.el-formitem__content){
        justify-content: center;
    }
}
</style>
 