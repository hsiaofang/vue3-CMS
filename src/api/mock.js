import Mock from 'mockjs'
import homeApi from './mockData/home'
import menuApi from './mockData/permission'

// 1.攔截路徑 2.方法 3.製造出假數據
Mock.mock(/api\/home\/getTableData/,"get", homeApi.getTableData)
Mock.mock(/api\/home\/getCountData/,"get", homeApi.getCountData)
Mock.mock(/api\/home\/getChartData/,"get", homeApi.getChartData)

Mock.mock(/api\/permission\/getMenu/,"post", menuApi.getMenu)
