/**
 *整個項目的api的統一 
 */
import request from './request'


export default {

    getVerificationCode(data){
        return request({
            url:"",
            method:"post",
            data:data,
        })
    },
    checkVerificationCode(){

    },
    getMenu(data){
        return request({
            url:"api/permission/getMenu",
            method: "post",
            data: data,
        })
    },
    getTableData(){
        return request({
            url:"home/getTableData",
            method: "get",
            // mock: true
        })
    },
    getCountData() {
        return request({
            url: "/home/getCountData",
            method: "get",
        })
    },
    getChartData(){
        return request({
            url:"/home/getChartData",
            method: "get",
        })
    },

    getCSRF(){
        return request({
            url:"csrf-token",
            method: "get",
        })
    },
    getLoans(page, pageSize) {
        return request({
            url: "/getloans",
            method: "get",
            params: {
                page: page,
                pageSize: pageSize 
            }
        });
    },
    createLoan(data, csrfToken){
        return request({
            url:"api/createLoan",
            method: "post",
            data,
            headers: {
                'X-CSRF-TOKEN': csrfToken,  
                'Content-Type': 'application/json'
            }
        })
    },
    updateLoan(data){
        console.log("request", data)
        return request({
            url:"api/updateLoan",
            method: "post",
            data
        })
    },
    getRepayments(){
        return request({
            url:"getRepayments",
            method: "get",
        })
    },
}