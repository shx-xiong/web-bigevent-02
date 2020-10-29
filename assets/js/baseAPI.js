var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
    //配置URL
    options.url = baseURL + options.url
    //对需要权限的借口配置headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //登录拦截
    options.complete = function (res) {
        var obj = res.responseJSON
        console.log(obj)
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})