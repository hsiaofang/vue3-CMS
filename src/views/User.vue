<template>
  <div class="page-content user">
    <div class="content">
      <div class="right-wrap">
        <div class="info box-style" style="margin-top: 20px">
          <h1 class="title">更改密码</h1>
          <el-form :model="pwdForm" class="form" label-width="86px" label-position="top">
            <el-form-item label="當前密碼" prop="password">
              <el-input v-model="pwdForm.password" type="password" />
            </el-form-item>

            <el-form-item label="新密碼" prop="newPassword">
              <el-input v-model="pwdForm.newPassword" type="password"/>
            </el-form-item>

            <el-form-item label="確認新密碼" prop="confirmPassword">
              <el-input v-model="pwdForm.confirmPassword" type="password"/>
            </el-form-item>

            <div class="el-form-item-right">
              <el-button type="primary" style="width: 90px" @click="editPwd">
                {{ isEditPwd ? '保存' : '編輯' }}
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'

  const isEditPwd = ref(false)
  const pwdForm = reactive({
    password: '',
    newPassword: '',
    confirmPassword: '',
  })

  const editPwd = () =>{
    if (isEditPwd.value) {
      if(!pwdForm.password || !pwdForm.newPassword || !pwdForm.confirmPassword){
        ElMessage.error('請填所有欄位')
        return
      }
      if (pwdForm.newPassword !== pwdForm.confirmPassword) {
        ElMessage.error('新密碼與確認密碼不一致')
        return
      }
      ElMessage.success('密碼更新成功')
    }
    isEditPwd.value = !isEditPwd.value
  }

  onMounted(()=>{

  })
</script>

<style lang="less" scoped>
.page-content {
  width: 100%;
  height: 100%;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;

  .box-style {
    border: 1px solid var(--art-border-color);
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .left-wrap {
      width: 450px;
      margin-right: 25px;
    }

    .right-wrap {
      flex: 1;
      border-radius: 12px;
      background: var(--art-main-bg-color);

      .info {
        .title {
          padding: 15px 25px;
          font-size: 20px;
          font-weight: 400;
          color: var(--art-text-gray-800);
          border-bottom: 1px solid var(--art-border-color);
        }

        .form {
          padding: 30px 25px;

          .el-form-item {
            width: 100%;
          }

          .el-form-item-right {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .el-button {
              width: 90px !important;
            }
          }
        }
      }
    }
  }
}
</style>
