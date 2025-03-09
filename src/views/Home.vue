<template>
    <div class="console">
        <notify></notify>
        <CardList :dataList="dataList" />
        <div class="column2">
            <el-card class="userinfo">
                <div class="user">
                    <img :src="getImageUrl('user')" class="user-img"/>
                    <div class="user-info">
                        <p class="user-info-admin">admin</p>
                        <p class="user-info-p">超級管理員</p>
                    </div>
                </div>
                <div class="login">
                    <p>上次登入時間：<span>2024-06-30</span></p>
                    <p>上次登入地點：<span>台中市</span></p>
                </div>
            </el-card>
            <el-card class="linechart">
                <div ref="lineChart" style="height: 100%"></div>
            </el-card>
        </div>

        <div class="column3">
            <el-card class="chart-card">
                <div ref="userEchart" style="height: 250px"></div>
            </el-card>
            <el-card class="chart-card">
                <div ref="videoEchart" style="height: 100%"></div>
            </el-card>
            <!-- <ChartCard v-if="userChartData.length > 0" :chartType="'user'" :chartData="userChartData" />
            <ChartCard v-if="videoChartData.length > 0" :chartType="'video'" :chartData="videoChartData" /> -->
        </div>

        <div class="column4">
            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData">
                    <el-table-column
                        v-for="(val, key) in tableLabel"
                        :key="key"
                        :prop="key"
                        :label="val"
                    >
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useSettingStore } from '@/stores/setting.js'
import CardList from '@/components/dashboard/CardList.vue'
import ChartCard from '@/components/dashboard/ChartCard.vue'
// import notify from '@/views/notify.vue'

const { proxy } = getCurrentInstance()
const settingStore = useSettingStore()

const getImageUrl = (user) => {
    return new URL(`../asset/images/${user}.png`, import.meta.url).href
}

const dataList = reactive([
  {
    des: '總放款金額',
    icon: 'Money',
    num: 0,
    change: '',
    color: '#5ab1ef'
  },
  {
    des: '當月應收款項',
    icon: 'check',
    num: 0,
    change: '',
    color: '#ffb980'
  },
  {
    des: '當月未還款金額',
    icon: 'WarningFilled',
    num: 0,
    change: '',
    color: '#d87a80'
  },
  {
    des: '當月新增貸款',
    icon: 'star',
    num: 0,
    change: '+30%',
    color: '#9462e5'
  }
])
const tableData = ref([])
const userChartData = ref([])
const videoChartData = ref([])

const tableLabel = ref({
    debtor_name: "債務人",
    loan_amount: "貸款金額",
    action: "還款狀態",
    loan_date: "借款日期",
})

const xOptions = reactive({
    textStyle: { color: "var(--text-color)" },
    legend: {},
    grid: { left: "20%" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: [], axisLine: { lineStyle: { color: "#17b3a3" } }, axisLabel: { color: "#333" } },
    yAxis: { type: "value", axisLine: { lineStyle: { color: "#17b3a3" } } },
    series: []
})

const pieOptions = reactive({
    tooltip: { trigger: "item", formatter: '{a} <br/>{b}: {c} ({d}%)' },
    color: ["#0f78f4", "#dd536b", "#9462e5", "#a6a6a6", "#e1bb22", "#39c362", "#3ed1cf"],
    series: []
})

const getCountData = async () => {
  const response = await proxy.$api.getCountData()
  console.log('getCountData', response)
  dataList[0].num = response.totalLoanAmount
  dataList[1].num = response.totalPayment
  dataList[2].num = response.totalUnpaid
  dataList[3].num = response.totalNewLoan

  dataList[0].change = ''
  dataList[1].change = ''
  dataList[2].change = ''
  // const lastMonthAmount = response.data.totalNewLoanLastMonth || 0
  dataList[3].change = calculateChange(response.totalNewLoan, response.lastMonthAmount)
}

const calculateChange = (newValue, oldValue) => {
  const change = ((newValue - oldValue) / oldValue) * 100
  return (change > 0 ? '+' : '') + change.toFixed(2) + '%'
}


const getChartData = async () => {
    const { userData, videoData } = await proxy.$api.getChartData()
    // userChartData.value = userData
    // videoChartData.value = videoData

    // const { userData, videoData } = await proxy.$api.getChartData()

    // userChartData.value = userData.map(item => ({
    //     month: item.month,
    //     totalLoanAmount: item.totalLoanAmount,
    //     totalMonthlyPaymentAmount: item.totalMonthlyPaymentAmount
    // }))

    // videoChartData.value = videoData

    xOptions.xAxis.data = userData.map(item => item.month)
    xOptions.series = [
        { name: '貸款金額', data: userData.map(item => item.totalLoanAmount), type: 'bar' },
        { name: '已還款金額', data: userData.map(item => item.totalMonthlyPaymentAmount), type: 'bar' }
    ]
    const userChart = echarts.init(proxy.$refs['userEchart'])
    userChart.setOption(xOptions)

    pieOptions.series = [{
        name: '前一季度總計',
        type: 'pie',
        radius: '50%',
        data: videoData,
        label: { show: true, formatter: '{b}: {d}%' }
    }]
    const videoChart = echarts.init(proxy.$refs['videoEchart'])
    videoChart.setOption(pieOptions)
}

const getTableData = async ()=>{
    const response = await proxy.$api.getTableData()
    tableData.value = response.getTableData
}

const getLineChartData = () => {
    const profitData = [
        { month: '2024-01', profit: 150 },
        { month: '2024-02', profit: 200 },
        { month: '2024-03', profit: 250 },
        { month: '2024-04', profit: 300 },
        { month: '2024-05', profit: 350 },
        { month: '2024-06', profit: 400 },
        { month: '2024-07', profit: 500 },
        { month: '2024-08', profit: 450 },
        { month: '2024-09', profit: 600 },
        { month: '2024-10', profit: 550 },
        { month: '2024-11', profit: 700 },
        { month: '2024-12', profit: 800 },
    ]

    const months = profitData.map(item => item.month)
    const profits = profitData.map(item => item.profit)

    xOptions.xAxis.data = months
    xOptions.series = [
        {
            name: '淨利潤',
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
                width: 2.6,
                color: settingStore.state.systemThemeColor 
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(90, 177, 239, 0.2)' },
                    { offset: 1, color: 'rgba(90, 177, 239, 0.01)' }
                ])
            },
            data: profits
        }
    ]

    const lineChart = echarts.init(proxy.$refs['lineChart'])
    lineChart.setOption(xOptions)
    nextTick(() => {
        lineChart.resize();
    });
}

onMounted(() => {
    getCountData()
    getTableData()
    getChartData()
    getLineChartData()

})
</script>

<style scoped lang="less">
.console {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    overflow: auto;

    .column2 {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: stretch;
        width: 100%;

        .userinfo {
            width: 300px;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

            .user {
                display: flex;
                align-items: center;
                margin-bottom: 20px;

                .user-img {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .user-info-admin {
                    font-size: 20px;
                    font-weight: bold;
                    color: #333;
                }

                .user-info-p {
                    font-size: 16px;
                    color: #777;
                }

                .login {
                    font-size: 14px;
                    color: #888;

                    p {
                        line-height: 20px;
                    }

                    span {
                        font-weight: bold;
                        color: #333;
                    }
                }
            }
        }
    }

    .linechart {
        flex: 2;
        width: 100%;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .column3 {
        display: flex;
        gap: 20px;
        justify-content: space-between;
        width: 100%;

        .chart-card {
            width: 48%;
            height: 250px;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

            &:hover {
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            }
        }
    }

    .column4 {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        min-height: 300px;

        .user-table {
            width: 100%;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            max-height: 400px;
            overflow-y: auto;

            .el-table {
                border-radius: 12px;

                th {
                    background-color: #f5f7fa;
                    color: #333;
                    font-weight: 600;
                }

                td {
                    color: #666;
                }

                tr:nth-child(even) {
                    background-color: #fafafa;
                }
            }
        }
    }
}

</style>
