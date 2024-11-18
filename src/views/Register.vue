<template>
    <div class="body-register">
      <div class="register-container">
        <h1>註冊</h1>
        <Stepper :steps="steps" v-model:currentStep="currentStep">
          <template #default="{ step }">
            <el-form :model="registerForm" ref="form" label-width="100px" :rules="validationRules">
              <div v-if="step === 0">
                <el-form-item label="會員帳號" prop="username">
                  <el-input type="text" v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item label="聯絡手機" prop="phone">
                  <el-input type="text" v-model="registerForm.phone"></el-input>
                  <el-button @click="sendVerificationCode" type="primary">發送驗證碼</el-button>
                </el-form-item>
                <el-form-item label="身分證字號" prop="idCard">
                  <el-input type="text" v-model="registerForm.idCard"></el-input>
                </el-form-item>
                <el-form-item label="密碼" prop="password">
                  <el-input type="password" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="確認密碼" prop="confirmPassword">
                  <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
                </el-form-item>
              </div>
              <div v-if="step === 1">
                <el-form-item label="手機驗證碼" prop="verificationCode">
                  <el-input type="text" v-model="registerForm.verificationCode"></el-input>
                </el-form-item>
              </div>
              <div v-if="step === 2">
                <h2>確認資訊</h2>
                <p>會員帳號：{{ registerForm.username }}</p>
                <p>聯絡手機：{{ registerForm.phone }}</p>
                <p>身分證字號：{{ registerForm.idCard }}</p>
                <p>密碼：{{ registerForm.password ? '已設置' : '未設置' }}</p>
              </div>
            </el-form>
          </template>
        </Stepper>
        <div class="button-container">
          <el-button v-if="currentStep > 0" @click="currentStep--">上一步</el-button>
          <el-button v-if="currentStep < steps.length - 1" @click="nextStep">下一步</el-button>
          <el-button v-if="currentStep === steps.length - 1" type="primary" @click="onSubmit">提交註冊</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref,getCurrentInstance } from 'vue'
  import { ElMessage } from 'element-plus'
  import Stepper from '../components/Stepper.vue'
  const { proxy } = getCurrentInstance()
  const steps = ref([
    { label: '基本設定' },
    { label: '手機驗證' },
    { label: '完成' },
  ])
  
  const currentStep = ref(0)
  const registerForm = ref({
    username: '',
    phone: '',
    idCard: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  })
  
  const validationRules = {
    username: [
      { required: true, message: '請填寫會員帳號', trigger: 'blur' },
      { min: 6, max: 20, message: '會員帳號必須在 6 到 20 個字符之間', trigger: 'blur' },
      { pattern: /^[a-zA-Z][a-zA-Z0-9]*$/, message: '會員帳號只能包含字母和數字，並以字母開頭', trigger: 'blur' },
    ],
    phone: [
      { required: true, message: '請填寫聯絡手機', trigger: 'blur' },
      { pattern: /^09[0-9]{8}$/, message: '手機號碼必須以09開頭並為10個字符', trigger: 'blur' },
    ],
    idCard: [
      { required: true, message: '請填寫身分證字號', trigger: 'blur' },
      { pattern: /^[A-Za-z]{1}[1-2]{1}[0-9]{8}$/, message: '身分證字號格式不正確', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '請填寫密碼', trigger: 'blur' },
    ],
    confirmPassword: [
      { required: true, message: '請確認密碼', trigger: 'blur' },
    ],
    verificationCode: [
      { required: true, message: '請填寫手機驗證碼', trigger: 'blur' },
    ],
  }
  
  const sendVerificationCode = async() => {
    const res = await proxy.$api.getVerificationCode({ phone: registerForm.value.phone })
    ElMessage.error('驗證碼已發送至您的手機')
  }

  const onSubmit = async() => {
  if (!verificationCode) {
    ElMessage.error('請填寫手機驗證碼')
    return
  }

  await proxy.$api.checkVerificationCode({ phone, verificationCode })
  ElMessage.success('註冊資料:', registerForm.value)
}

const nextStep = () => {
  const { username, phone, idCard, password, confirmPassword } = registerForm.value

  if (!username || !phone || !idCard || !password || !confirmPassword) {
    ElMessage.error('請填寫所有必填項目')
    return
  }

  if (password !== confirmPassword) {
    ElMessage.error('密碼和確認密碼不一致')
    return
  }

  currentStep.value++
}

  </script>
  
  <style scoped lang="less">
  .body-register {
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/background.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .register-container {
    width: 400px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px;
    box-shadow: 0 0 25px #cacaca;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #545450;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  