$(function () {
    Common.toHome()
    Common.userInfo()
    Common.menuHover()
    Common.tabChange()
    Common.userImgClick()
    
    // 拿到服务商资质
    getFacilitator()

    // 个人中心图片上传--公司
    $('.companybtn,.companyimg').on('click', function () {
        $('#company_cover').off('change')
        $('#company_cover').trigger('click')
        $('#company_cover').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.companyimg img').attr('src','')
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
                        $('.companyimg img').attr('src', res.url)
                    }
                }
            })
        })
    })
    $(".ckeepsave").on("click",function (event) {
        event.preventDefault();
        if($('.companyapplyinput input').val()==''&&$('.companynuminput input').val()== null){
            alert('请输入申报单位名称!')
            return false
        }
        $http({
            url: '',
            type: 'post',
            data: {
                // imgsrc:$('.companyimg img').attr('src'),
                // name: $('.companyapplyinput input').val(),
                // describe: $('.companynuminput input').val()
            },
            success: function (res) {
                if (res.code == 200) {
                    alert('操作成功')
                    clearForm()
                } else {
                    alert(res.msg)
                } 
            }
        })
        return false
    })
})

function clearForm () {
    $('.companyapplyinput input').val('')
    $('.companynuminput input').val('')
    $('.companyimg img').attr('src', '')
}
// 拿到服务商资质
function getFacilitator(){
    $http({
        url: 'api/facilitator/getFacilitator',
        type: 'get',
        data: {},
        success: function (res) {
            console.log(res)
            if (res.msg =='success') {
                $(".companyimg img").attr("src",res.facilitator.companyLogo)
                $(".companyapplyinput input").val(res.facilitator.companyName)
                $(".companynuminput input").val(res.facilitator.companyCode)
            } else {
                alert(res.msg)
            } 
        }
    })
}