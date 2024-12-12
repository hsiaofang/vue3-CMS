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
                            path: '/menu',
                            label: '菜單',
                            icon: 'setting',
                            children: [
                                {
                                    path: '/a',
                                    name: 'a',
                                    label: '菜單1',
                                    icon: 'user-cog',
                                },
                                {
                                    path: '/b',
                                    name: 'b',
                                    label: '菜單2',
                                    icon: 'cog',
                                },
                                {
                                    path: '/c',
                                    name: 'c',
                                    label: '菜單3',
                                    icon: 'shield',
                                },
                                {
                                    path: '/d',
                                    name: 'd',
                                    label: '菜單3',
                                    icon: 'shield',
                                },
                                {
                                    path: '/e',
                                    name: 'e',
                                    label: '菜單4',
                                    icon: 'shield',
                                },
                                {
                                    path: '/f',
                                    name: 'f',
                                    label: '菜單5',
                                    icon: 'shield',
                                },
                                {
                                    path: '/g',
                                    name: 'g',
                                    label: '菜單6',
                                    icon: 'shield',
                                },
                                {
                                    path: '/h',
                                    name: 'h',
                                    label: '菜單7',
                                    icon: 'shield',
                                },
                                {
                                    path: '/i',
                                    name: 'i',
                                    label: '菜單8',
                                    icon: 'shield',
                                },
                                {
                                    path: '/j',
                                    name: 'j',
                                    label: '菜單9',
                                    icon: 'shield',
                                },
                                {
                                    path: '/k',
                                    name: 'k',
                                    label: '菜單10',
                                    icon: 'shield',
                                },
                                {
                                    path: '/l',
                                    name: 'l',
                                    label: '菜單11',
                                    icon: 'shield',
                                },
                                {
                                    path: '/m',
                                    name: 'm',
                                    label: '菜單12',
                                    icon: 'shield',
                                },
                                {
                                    path: '/n',
                                    name: 'n',
                                    label: '菜單13',
                                    icon: 'shield',
                                },
                                {
                                    path: '/o',
                                    name: 'o',
                                    label: '菜單14',
                                    icon: 'shield',
                                },
                                {
                                    path: '/p',
                                    name: 'p',
                                    label: '菜單15',
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
