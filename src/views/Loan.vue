<template>
    <div class="loan-header">
        <el-button type="primary" @click="handleAddLoan">新增債務</el-button>
    </div>
    <div class="year">
        <el-button 
            v-for="year in uniqueYear"
            :key="year"
            :type="selectYear === year ? 'primary' : 'default'"
            @click="filterYear(year)"
        >
        </el-button>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column
                v-for="item in tableLabel"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
            />
     
        <el-dialog v-model="detailVisible" title="債權人" width="30%">
            <el-table :data="loansDetail" style="width: 100%">
                <el-table-column prop="name" label="債權人姓名"></el-table-column>
                <el-table-column prop="pivot.amount" label="債權金額"></el-table-column>
            </el-table>
        </el-dialog>  

            <el-table-column fixed="right" label="操作" min-width="120">
                <template #="scope">
                    <el-button link @click="showLaonsDetail(scope.row)" size="small">更多資料</el-button>

                    <el-button link type="primary" size="small" @click="handleEdit(scope.row)">編輯</el-button>
                    <el-button link type="danger" size="small" @click="handleDelete(scope.row)">刪除</el-button>
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
        >
        </el-pagination>

    </div>
    <el-dialog v-model="detailVisible" title="債權人" width="30%">

    </el-dialog>

    <el-dialog v-model="loanDialogVisible" :title="action === 'add' ? '新增債務' : '編輯債務'" width="35%">
        <el-form :model="loanForm">
            <el-form-item label="借款日期">
                <el-date-picker v-model="loanForm.loan_date" placeholder="請選擇借款日期" />
            </el-form-item>
            <el-form-item label="債務人">
                <el-input v-model="loanForm.debtor_name" placeholder="請輸入債務人" />
            </el-form-item>
            <el-form-item label="本金">
                <el-input v-model.number="loanForm.loan_amount" placeholder="請輸入本金" />
            </el-form-item>
            <el-form-item label="還款方式">
                <el-select v-model="loanForm.repayment_method" placeholder="請選擇還款方式">
                    <el-option label="本利攤" value="principal_and_interest"></el-option>
                    <el-option label="純繳息" value="interest_only"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分期期數">
                <el-input v-model.number="loanForm.installments" placeholder="請輸入分期期數" />
            </el-form-item>
            <el-form-item label="年利率">
                <el-input v-model.number="loanForm.interest_rate" placeholder="請輸入年利率" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">確定</el-button>
                <el-button @click="loanDialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { ref, getCurrentInstance, computed, onMounted, watch } from 'vue'
import {useAllDateStore} from '@/stores'
import { ElMessage } from 'element-plus'
import { unique } from 'element-plus/es/utils/arrays.mjs';
import { filterFields } from 'element-plus/es/components/form/src/utils.mjs';

const { proxy } = getCurrentInstance()
const store = useAllDateStore()

const csrfToken = ref('')
const tableData = computed(() => store.getTableData())
const loansDetail = ref([])
const loanForm = ref({
    loan_date: '',
    debtor_name: '',
    loan_amount: 0,
    repayment_method: '',
    installments: 0,
    interest_rate: 0,
    monthly_payment_amount: 0
})
const repaymentForm = ref({
    repayment_date: '',
    repayment_amount: ''
})
const loanDialogVisible = ref(false)
const repaymentDialogVisible = ref(false)
const detailVisible = ref(false)
const action = ref('add')
const formType = ref('loan')
const tableLabel = ref([
  { prop: 'loan_date', label: '借款日期' },
  { prop: 'debtor_name', label: '債務人' },
  { prop: 'loan_amount', label: '本金' },
  { prop: 'repayment_method', label: '還款方式' },
  { prop: 'installments', label: '分期期數' },
  { prop: 'interest_rate', label: '年利率' },
  { prop: 'monthly_payment_amount', label: '月付總額' }
])
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const uniqueYear = computed(()=>{
    const yearSet = new Set()
})


const getLoans = async () => {
    const response = await proxy.$api.getLoans(currentPage.value, pageSize.value)
    store.setTableData(response)
    currentPage.value = response.getLoans.current_page.value
    totalItems.value = response.getLoans.total
}

const showLaonsDetail = (loan) => {
    loansDetail.value = loan.creditors
    detailVisible.value = true
}

const onSubmit = async () => {
    if (loanDialogVisible.value) {
        if (!loanForm.value.debtor_name || !loanForm.value.loan_amount || !loanForm.value.repayment_method) {
            ElMessage.error('請填寫完整的債務資料')
            return
        }
        const formattedLoanDate = loanForm.value.loan_date 
            ? new Date(loanForm.value.loan_date).toISOString().split('T')[0] 
            : ''
        const formData = {
            ...loanForm.value,
            loan_date: formattedLoanDate,
        }

        let response
        if (action.value === 'add') {
            response = await proxy.$api.createLoan(formData)
            ElMessage.success('債務新增成功')
        } else {
            response = await proxy.$api.updateLoan(loanForm.value)
            ElMessage.success('債務編輯成功')
        }
        loanDialogVisible.value = false
    }
    getLoans()
}

// 重置表單
const resetForm = () => {
    if (formType === 'loan'){
        loanForm.value = {
            loan_date: '',
            debtor_name: '',
            loan_amount: 0,
            repayment_method: '',
            installments: 0,
            interest_rate: 0,
            notes: '',
            phone: '',
            address: '',
            creditors: [],
        }
    } else if (formType === 'repayment') {
        repaymentForm.value = {
            repayment_date: '',
            repayment_amount: 0
        }
    }
}

const handleAddLoan = () => {
    resetForm('loan')
    action.value = 'add'
    formType.value = 'loan'
    loanDialogVisible.value = true
}

const handleEdit = (row) => {
    loanForm.value = { ...row }
    action.value = 'edit'
    loanDialogVisible.value = true
}

const handleDelete = async (row) => {
    const response = await proxy.$api.deleteLoan({ id: row.id })
    if (response.code === 200) {
        ElMessage.success('債務刪除成功')
        getLoans()
    }
}

const handlePageChange = async (page) => {
    currentPage.value = page
    console.log('handle',currentPage.value)
    await getLoans()
}

const computeLoans = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return tableData.value.slice(start, start + pageSize.value)
})

onMounted(() => {
    getLoans()
    onSubmit()
})
</script>


<style scoped>
.el-header {
    background-color: #333;
}
</style>
