import PageHeader from './PageHeader'
//import Temp from './Temp'
const TytComponent = {
    install: function(Vue) {
        // 注册并获取组件，然后在main.js中引用，在Vue.use()就可以了
        Vue.component('TytPageHeader', PageHeader)
        //Vue.component('TytTemp', Temp)
    }
}
export default TytComponent