import Mock from 'mockjs'

export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)

        if (username === 'admin' && password === 'admin') {
            return {
                code: 200,
                data: {
                    // menuList: [
                    //     {
                    //         path: "/home",
                    //         name: "home",
                    //         label: "首頁",
                    //         icon: "house",
                    //         url: "Home"
                    //     },
                    //     {
                    //         path: "/mall",
                    //         name: "mall",
                    //         label: "商品管理",
                    //         icon: "video-play",
                    //         url: "Mall"
                    //     },
                    //     {
                    //         path: "/user",
                    //         name: "user",
                    //         label: "用戶管理",
                    //         icon: "user",
                    //         url: "User"
                    //     }
                    // ],
                    menuList: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首頁',
                            icon: 'house',
                            url: "Home"
                        },
                        {
                            path: '/loan',
                            name: 'loan',
                            label: '債務管理',
                            icon: 'money',
                            // url: "Loan",
                            children: [
                                {
                                    path: '/list',
                                    name: 'list',
                                    url: "Loan",
                                    label: '債務列表',
                                    icon: 'user-cog',
                                },
                                {
                                    path: '/repayment',
                                    name: 'repayment',
                                    url: "Repayment",
                                    label: '新增還款',
                                    icon: 'user-cog',
                                },
                            ]
                        },
                        {
                            path: '/settings',
                            label: '系統設置',
                            icon: 'setting',
                            children: [
                                {
                                    path: '/user-settings',
                                    name: 'userSettings',
                                    label: '用戶設置',
                                    icon: 'user-cog',
                                },
                                {
                                    path: '/system-settings',
                                    name: 'systemSettings',
                                    label: '系統設置',
                                    icon: 'cog',
                                },
                                {
                                    path: '/role-management',
                                    name: 'roleManagement',
                                    label: '角色管理',
                                    icon: 'shield',
                                },
                            ],
                        },
                        {
                            path: '/settings',
                            label: '系統設置',
                            icon: 'setting',
                            children: [
                                {
                                    path: '/user-settings',
                                    name: 'userSettings',
                                    label: '用戶設置',
                                    icon: 'user-cog',
                                },
                                {
                                    path: '/system-settings',
                                    name: 'systemSettings',
                                    label: '系統設置',
                                    icon: 'cog',
                                },
                                {
                                    path: '/role-management',
                                    name: 'roleManagement',
                                    label: '角色管理',
                                    icon: 'shield',
                                },
                            ],
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '獲取成功'
                }
            }
        } 
        else if (username === "mall-admin" && password === "123456") {
            return {
                code: 200,
                data: {
                    menuList: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首頁",
                            icon: "house",
                            url: "Home"
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "Mall"
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '獲取成功'
                }
            }
        } 
        else if (username === "user-admin" && password === "123456") {
            return {
                code: 200,
                data: {
                    menuList: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首頁",
                            icon: "house",
                            url: "Home"
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用戶管理",
                            icon: "user",
                            url: "User"
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '獲取成功'
                }
            }
        } 
        else {
            return {
                code: -999,
                data: {
                    message: '密碼錯誤'
                }
            }
        }
    }
}
