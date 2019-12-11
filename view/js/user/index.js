$(function () {
    Common.toHome()
    Common.userInfo()
    Common.menuHover()
    Common.tabChange()
    Common.userImgClick()

    // 拿到服务商资质
    getFacilitator()
    
    // 个人中心图片上传
    $('.personbtn,.personimg').on('click', function () {
        $('#person_cover').off('change')
        $('#person_cover').trigger('click')
        $('#person_cover').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.personimg img').attr('src', '')
                $('.imgexplain').show(400)
                return
            }
            $('.imgexplain').hide()
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.personimg img').attr('src', res.url)
                    }
                }
            })
        })
    })
    $(".pkeepsave").on("click",function (event) {
        event.preventDefault();
        if($('.nicknametext').val()==''&&$('.nicknametext').val()== null){
            alert('请输入昵称!')
            return false
        }
        var user = JSON.parse(window.localStorage.getItem('user'))
        $http({
            url: 'api/user/updateuser?userId=' + user.userId,
            type: 'put',
            data: {
                avatar:$('.personimg img').attr('src'),
                nickname: $('.nicknametext').val(),
                introduce: $('.personaltextbox').val()
            },
            success: function (res) {
                if (res.msg == 'success') {
                    alert('操作成功')
                    user.avatar = $('.personimg img').attr('src')
                    user.nickname = $('.nicknametext').val()
                    user.introduce = $('.personaltextbox').val()
                    window.localStorage.setItem('user', JSON.stringify(user))
                    window.location.href = '../../index.html'
                } else {
                    alert(res.msg)
                } 
            }
        })
        return false
    })
})

// 拿到服务商资质
function getFacilitator(){
    $http({
        url: 'api/user/userInfo',
        type: 'get',
        success: function (res) {
            if (res.msg =='success') {
                $(".personimg img").attr("src",res.user.avatar)
                $(".nicknametext").val(res.user.nickname)
                $(".personaltextbox").val(res.user.introduce)
            } else {
                alert(res.msg)
            } 
        }
    })
}