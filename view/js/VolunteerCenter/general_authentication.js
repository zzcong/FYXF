$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    Common.isHaveScore()
    // 普通志愿者资质附件上传
    $('.uploadbtn').on('click', function () {
        $('.qualification-annex').off('change')
        $('.qualification-annex').trigger('click')
        $('.qualification-annex').one('change', function (ev) {
            var formData = new FormData()
            var documentdetail = ev.target.files[0]
            formData.append("file", documentdetail);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.cell_file').val(documentdetail.name)
                        $('.zizhifilrurl').val(res.url)
                    }
                }
            })
        })
    })
    // 确认申请
    $(".certificatesubmit").on("click",function (event) {
        event.preventDefault();
        if($('.cell_input').val()==''&&$('.cell_textarea').val()== null){
            alert('有未填写信息,请检查!')
            return false
        }
        $http({
            url: 'api/volunteer/save',
            type: 'post',
            data: {
                realName:$('.pname').val(),
                idNumber:$('.idcardnum').val(),
                qualificationsName:$('.zizhiname').val(),
                qualificationsFile: JSON.stringify([$('.zizhifilrurl').val()]),
                qualificationsIntroduce: $('.aboutenclosure').val()
            },
            success: function (res) {
                if (res.msg == 'success') {
                    alert('普通志愿者认证申请已提交, 请您耐心等候!')
                    $('form')[0].reset()
                } else {
                    alert(res.msg)
                } 
            }
        })
        return false
    })
})