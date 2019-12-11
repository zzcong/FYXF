$(function (){
    for(var i=0; i<$(".logintop > div").length;i++){
        $(".logintop > div")[i].onclick = function(){
            var index=$(this).index();//获取当前certification-title>div标签的个数
            $(this).parent().siblings().hide();//返回上一层，在下面要隐藏的divlist
            $(this).parent().siblings().eq(index).show(); //返回上一层，在下面查要显示的divlist，然后选中的显示
            $(this).addClass("tophover");
            $(this).siblings().removeClass("tophover");
        }
    } 
    // 登录请求
    $(".loginbtn").on("click",function(e){
        e.stopPropagation()
        var index = $(this).index()
        if (index == 0) {
            loginIn()
        } else {
            window.location.href = '../index.html'
        }
    })
    // 注册请求
    $(".registerbtn").on("click",function(e){
        e.stopPropagation()
        registerTo()
    })

})

// 登录请求 
function loginIn(){
    $http({
        url: 'api/login',
        type: 'post',
        data: {
            mobile : $(".accountnum").val(),
            password : $(".password").val()
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            } else {
                window.localStorage.setItem('accountnum', $(".accountnum").val())
                $(".accountnum").val('')
                $(".password").val('')
                window.localStorage.setItem('token',res.token)
                !!res.score ? window.localStorage.setItem('score',res.score) : null
                getUserInfo(function (res) {
                    window.localStorage.setItem('user', JSON.stringify(res.user))
                    window.history.go(-1)
                })
            }
            
        }
    })
}
function getUserInfo (cb) {
    $http({
        url: 'api/user/userInfo',
        success: function (res) {
            if (res.msg == 'success') {
                cb(res)
            }
        }
    })
}
// 注册请求 
function registerTo(){
    $http({
        url: 'api/register',
        type: 'post',
        data: {
            mobile:$(".zctel").val(),
            password:$(".zcpassword").val()
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }else {
                alert('操作成功')
                $(".zctel").val("")
                $(".zcpassword").val("")
                // window.location.href = '../index.html'
            }
        }
    })
}