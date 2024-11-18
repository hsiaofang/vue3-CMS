<template>
<div>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImageUrl('user')" class="user"/>
                    <div class="user-info">
                        <p class="user-infor-admin">admin</p>
                        <p class="user-info-p">超級管理員</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登入時間：<span>2024-06-30</span></p>
                    <p>上次登入地點：<span>台中市 </span></p>
                </div>
            </el-card>
            
            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData" height="250px">
                    <el-table-column
                        v-for="(val, key) in tableLabel"
                        :key="key"
                        :prop="key"
                        :label="val"
                    >
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top:20px">
            <!-- <h2>{{ countData.currentDate }}</h2> -->
            <div class="num">
                <el-card 
                    :body-style="{display: 'flex', padding:0}"
                >
                    <component :is="'Money'" class="icons" :style="{background:'#5ab1ef'}"></component>
                    <div class="detail">
                        <p class="txt">貸款總金額</p>
                        <p class="num">${{ countData.totalLoanAmount }}</p>
                    </div>
                </el-card>
                <el-card
                    :body-style="{display: 'flex', padding:0}"
                >
                    <component :is="'SuccessFilled'" class="icons" :style="{background:'#ffb980'}"></component>
                    <div class="detail">
                        <p class="txt">應收總金額</p>
                        <p class="num">${{ countData.totalPayment }}</p>
                    </div>
                </el-card>
                <el-card
                    :body-style="{display: 'flex', padding:0}"
                >
                    <component :is="'WarningFilled'" class="icons" :style="{background:'#d87a80'}"></component>
                    <div class="detail">
                        <p class="txt">未還款金額</p>
                        <p class="num">${{ countData.totalUnpaid }}</p>
                    </div>
                </el-card>
            </div>
            <!-- <el-card class="top-echart">
                <div ref  ="echart" style="height:280px">
                </div>    
            </el-card> -->
            <div class="graph">
                <el-card>
                    <div ref="userEchart" style="height: 200px"></div>
                </el-card>
                <el-card>
                    <div ref="videoEchart" style="height: 200px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script setup>
import { ref, getCurrentInstance,onMounted, reactive  } from 'vue'
import * as echarts from 'echarts'
const { proxy } = getCurrentInstance()

const getImageUrl = (user)=>{
    return new URL(`../asset/images/${user}.png`, import.meta.url).href
}
const tableData = ref([])
const countData = ref({
    currentDate: 0,
    totalLoanAmount: 0,
    totalMonthlyPaymentAmount: 0,
    totalUnpaidMonthlyPaymentAmount: 0,
    loansOverThreeMonthsCount: 0,
});
const chartData = ref([])

const tableLabel = ref({
    debtor_name: "債務人",
    loan_amount: "貸款金額",
    action: "還款狀態",
    loan_date: "借款日期",
})

const xOptions = reactive({
    textStyle: {
        color: "var(--text-color)",
    },
    legend: {},
    grid: {
        left: "20%",
    },
    tooltip: {
        trigger:"axis",
    },
    xAxis:{
        type: "category",
        data: [],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
        axisLabel: {
            interval: 0,
            color: "var(--text-color)",
        },
    },
    yAxis: {
        type: "value",
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
    },
    color: ["#2ec7c9","#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#898b3"],
    series: [],
})

const pieOptions= reactive({
    tooltip:{
        trigger: "item",
        formatter: '{a} <br/>{b}: {c} ({d}%)' 
    },
    legend: {},
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: []
})
const getTableData = async ()=>{
    const response = await proxy.$api.getTableData()
    console.log('TableData:',response)
    tableData.value = response.getTableData
}
const getCountData = async () => {
    const response = await proxy.$api.getCountData(); 
    console.log('CountData',response)
    countData.value.currentDate = response.currentDate
    countData.value.totalLoanAmount = response.totalLoanAmount
    countData.value.totalPayment = response.totalPayment
    countData.value.totalUnpaid = response.totalUnpaid
}

const getChartData = async ()=>{
    const { userData,videoData } = await proxy.$api.getChartData()
    console.log('userData',userData,'videoData',videoData)
    // 第一個表格
    // xOptions.xAxis.data = orderData.data
    // xOptions.series = Object.keys(orderData.data[0]).map(val => {
    //     return{  
    //         name: val,
    //         data: orderData.data.map(item => item[val]),
    //         type: "line"
    // }
    // })
    // const oneEchart = echarts.init(proxy.$refs['echart'])
    // oneEchart.setOption(xOptions)
    // const userData = [
    //     { date: '2024-01', new: 10, active: 3 },
    //     { date: '2024-02', new: 7, active: 4 },
    //     { date: '2024-03', new: 8, active: 1 },
    //     { date: '2024-04', new: 9, active: 8 },
    // ];
    // const videoData = [
    // { name: "貸款總金額", value: 40 },
    // { name: "應收總金額", value: 50 },

    // ];
    // 第二個表格
    xOptions.xAxis.data = userData.map(item => item.month)
    console.log('userData:',userData)

    xOptions.series = [
        {
            name:'貸款金額',
            data:userData.map(item=>item.totalLoanAmount),
            type:'bar'
        },
        {
            name:'已還款金額',
            data:userData.map(item=>item.totalMonthlyPaymentAmount),
            type:'bar'
        },
    ]
    const twoEchart = echarts.init(proxy.$refs['userEchart'])
    twoEchart.setOption(xOptions)

    pieOptions.series = [
        {
            name: '前一季度總計',
            type: 'pie',
            radius: '50%',
            data: videoData,
            label: {
                show: true,
                formatter: '{b}: {d}%',
            },
        }   
    ]
    const threeEchart = echarts.init(proxy.$refs['videoEchart'])
    threeEchart.setOption(pieOptions)
}

onMounted(()=>{
    getTableData()
    getCountData()
    getChartData()
})
</script>
<style scoped lang="less">
    .home{
        height:100%;
        overflow:hidden;
        .user{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;
            img{
                width: 150px;
                height: 150px;
                border-radius: 50%;
                margin-right: 40px;
            }
            .user-info{
                p{
                    line-height:40px;
                }
                .user-info{
                    color: #999;
                }
                .user-info-admin{
                    font-size:35px;
                }       
            }
        }
        .login-info{
            p{
                line-height: 30px;
                font-size: 14px;
                color: #999;
                span{
                    color: #666;
                    margin-left: 60px;
                }
            }
        }
    }
    .user-table{
        margin-top:20px; 
    }

    .num{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-card{
            width:32%;
            margin-bottom: 20px;
        }
        .icons{
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }
        .detail{
            margin-left:15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .num{
                font-size: 30px;
                margin-bottom: 10px;
                text-align: center;
                color: #999;
            }
        }
    }
    
</style>
 