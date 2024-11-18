<template>
  <div class="loan-header">
    <el-button type="primary" @click="handleAddRepayment">新增還款</el-button>
  </div>
  <div class="year">
    <el-button 
      v-for="year in uniqueYear"
      :key="year"
      :type="selectYear === year ? 'primary' : 'default'"
      @click="filterYear(year)"
    >
      {{ year }}
    </el-button>
  </div>
    <div class="table">
    <el-table :data="filteredRepaymentData" style="width: 100%">
      <el-table-column label="還款日期" prop="repayment_date" />
      <el-table-column label="債務人" prop="debtor_name" />
      <el-table-column label="還款金額" prop="repayment_amount" />
      
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #="scope">
          <el-button link size="small" @click="showRepaymentDetail(scope.row)">更多資料</el-button>
          <el-button link type="primary" size="small" @click="handleEditRepayment(scope.row)">編輯</el-button>
          <el-button link type="danger" size="small" @click="handleDeleteRepayment(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-count="Math.ceil(totalItems / pageSize)"
      layout="prev, pager, next"
      @update:current-page="handlePageChange"
      :page-sizes="[10, 20, 30, 50]"  
    />
  </div>
  <el-dialog v-model="repaymentDialogVisible" title="新增還款" width="35%">
    <el-form :model="repaymentForm">
      <el-form-item label="還款日期">
        <el-date-picker v-model="repaymentForm.repayment_date" placeholder="請選擇還款日期" />
      </el-form-item>
      <el-form-item label="還款債務">
        <el-select v-model="repaymentForm.repayment_amount" placeholder="請選擇還款債務">
          <el-option
            v-for="loan in tableData"
            :key="loan.id"
            :label="`${loan.loan_date} - ${loan.debtor_name} - ${loan.loan_amount} 元 - ${loan.repayment_method}`"
            :value="loan.loan_amount"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="還款金額">
        <el-input v-model.number="repaymentForm.specified_amount" placeholder="請輸入還款金額" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onRepaymentSubmit">確定</el-button>
        <el-button @click="resetRepaymentForm">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, getCurrentInstance, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAllDateStore } from '@/stores'

const store = useAllDateStore()
const { proxy } = getCurrentInstance()

const tableData = computed(() => store.getTableData())
const filteredRepaymentData = computed(() => {
  return tableData.value.filter(item => item.repayment_date)  // 假設有repayment_date字段
})

const repaymentDialogVisible = ref(false)
const repaymentForm = ref({
  repayment_date: '',
  repayment_amount: null,
  specified_amount: 0
})

const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)

const handleAddRepayment = () => {
  resetRepaymentForm()
  repaymentDialogVisible.value = true
}

const onRepaymentSubmit = async () => {
  if (!repaymentForm.value.repayment_date || !repaymentForm.value.repayment_amount || !repaymentForm.value.specified_amount) {
    ElMessage.error('請填寫完整的還款資料')
    return
  }

  const formData = {
    ...repaymentForm.value,
    repayment_date: new Date(repaymentForm.value.repayment_date).toISOString().split('T')[0]
  }

  const response = await proxy.$api.createRepayment(formData)
  if (response && response.code === 200) {
    ElMessage.success('還款成功')
    resetRepaymentForm()
    repaymentDialogVisible.value = false
  } else {
    ElMessage.error('還款失敗，請稍後再試')
  }
}

const resetRepaymentForm = () => {
  repaymentForm.value = {
    repayment_date: '',
    repayment_amount: null,
    specified_amount: 0
  }
}

const handlePageChange = async (page) => {
  currentPage.value = page
  await getLoans()
}

const getLoans = async () => {
  const response = await proxy.$api.getLoans(currentPage.value, pageSize.value)
  store.setTableData(response)
  totalItems.value = response.getLoans.total
}

onMounted(() => {
  getLoans()
})
</script>
<style scoped>
.repayment-page {
  padding: 20px;
}

.table {
  margin-top: 20px;
}

.el-header {
  background-color: #333;
}
</style>
