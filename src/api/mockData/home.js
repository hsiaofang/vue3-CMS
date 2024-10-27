export default {
    getTableData: () => {
        return {
            code: 200,
            data: {
                tableData: [
                    {
                        name:"apple",
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000,
                    },
                    {
                        name:"samsung",
                        todayBuy: 300,
                        monthBuy: 2200,
                        totalBuy: 24000,
                    },
                    {
                        name:"小米",
                        todayBuy: 800,
                        monthBuy: 4400,
                        totalBuy: 55000,
                    },
                    {
                        name:"oppo",
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000,
                    }
                ]
            }
        }
    },
    getCountData: () => {
        return {
            code: 200,
            data: [
                {
                    name: "今日支付訂單",
                    value: 1234,
                    icon: "SuccessFilled", 
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏訂單",
                    value: 210,
                    icon: "StarFilled", 
                    color: "#ffb980",
                },
                {
                    name: "今日未支付訂單",
                    value: 1234,
                    icon: "GoodsFilled", 
                    color: "#5ab1ef", 
                },
                {
                    name: "本月支付訂單",
                    value: 1234,
                    icon: "SuccessFilled",
                    color: "#5ab1ef", 
                },
                {
                    name: "本月收藏訂單",
                    value: 210,
                    icon: "StarFilled",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付訂單",
                    value: 1234,
                    icon: "GoodsFilled",
                    color: "#5ab1ef",
                },
            ]
        }
    },
    
    getChartData: () => {
        return {
            code: 200,
            data: {
                orderData: {
                    date: [
                        "2024-09-01",
                        "2024-09-02",
                        "2024-09-03",
                        "2024-09-04",
                        "2024-09-05",
                        "2024-09-06",
                        "2024-09-07",
                    ],
                    data: [
                        {
                            apple: 3839,
                            samsung: 2910,
                            小米: 1000,
                            oppo: 1533,
                        },
                        {
                            apple: 4244,
                            samsung: 4300,
                            小米: 2100,
                            oppo: 1005,
                        },
                        {
                            apple: 4500,
                            samsung: 2910,
                            小米: 500,
                            oppo: 1115,
                        },
                        {
                            apple: 4100,
                            samsung: 2910,
                            小米: 2100,
                            oppo: 1005,
                        },
                        {
                            apple: 3839,
                            samsung: 3011,
                            小米: 2210,
                            oppo: 1254,
                        },
                        {
                            apple: 4120,
                            samsung: 3878,
                            小米: 1998,
                            oppo: 998,
                        },
                        {
                            apple: 4000,
                            samsung: 2910,
                            小米: 2100,
                            oppo: 1020,
                        },
                    ]
                },
                userData: [
                    { date: "週一", new: 5, active: 200 },
                    { date: "週二", new: 5, active: 200 },
                    { date: "週三", new: 5, active: 200 },
                    { date: "週四", new: 5, active: 200 },
                ],
                videoData: [
                    { name: "apple", value: 3839 },
                    { name: "samsung", value: 3839 },
                    { name: "小米", value: 3839 },
                    { name: "oppo", value: 3839 },
                ]
            }
        }
    }
    
}