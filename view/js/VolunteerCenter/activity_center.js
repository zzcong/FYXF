$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    Common.isHaveScore()
    // 发起活动
    var actInfo = {
        "address": $('#activeadress').val(),
        "categoryId": getQueryString('categoryId'),
        "cover": $('.act-img img').attr('src'),
        "describe": $('#activesay').val(),
        "endTime": new Date($('.endtime').val()),
        "menNum": $("#personnum").val(),
        "startTime": new Date($('.starttime').val()),
        "title": $("#activename").val(),
        "volunteerStatus": $('#inresquest').val()
    }
    if (getQueryString('activityId')) {
        actInfo.activityId = getQueryString('activityId')
    }
    $('#start_up_active').on("click", function (event) {
        event.preventDefault()
        if (!isEmpty()) return
        $http({
            url: "api/activity/save",
            type: "post",
            data: {
                "address": $('#activeadress').val(),
                "categoryId": getQueryString('categoryId'),
                "cover": $('.act-img img').attr('src'),
                "describe": $('#activesay').val(),
                "endTime": new Date($('.endtime').val()),
                "menNum": $("#personnum").val(),
                "startTime": new Date($('.starttime').val()),
                "title": $("#activename").val(),
                "volunteerStatus": $('#inresquest').val()
            },
            success: function (res) {
                if (res.msg == 'success') {
                    alert('活动发起成功')
                    $('form')[0].reset()
                    $('.act-img img').attr('src', '../../images/SmartServiceCenter/01-home-photo-check.png')
                } else {
                    alert(res.msg)
                }
            }
        })
        // isEmpty();  // 验证
    })

    $('.act-img').on('click', function () {
        $(this).siblings('.act-file').trigger('click')
        $(this).siblings('.act-file').one('change', function(ev) {
            var formData = new FormData()
            formData.append("file", ev.target.files[0])
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.act-img img').attr('src', res.url)
                    }
                }
            })
        })
    })
    // 验证
    function isEmpty() {
        var flag = true;    //是否全部输入  默认true
        $(".certification-volunteer input:not([type='file'])").each(function () {
            if ($(this).val() == "") {    //有空输入，将flag置为false
                flag = false
            }
        })
        if (!$('.act-img img').attr('src')) {
            flag = false
        }
        if (!flag) {
            alert('请把活动信息填写完整!!!')
        }
        return flag
    }
    
    if (getQueryString('flag')&&getQueryString('flag') == 'edit') {
        $http({
            url: 'api/activity/info/' + getQueryString('activityId'),
            type: 'get',
            success: function (res) {
                if (res.msg == 'success') {
                    $('.act-img img').attr('src', res.activity.cover)
                    $('#activename').val(res.activity.title)
                    $('#activeadress').val(res.activity.address)
                    $('#personnum').val(res.activity.menNum)
                    $('#inresquest').val(res.activity.volunteerStatus)
                    $('.starttime').val(dateFormat(res.activity.startTime))
                    $('.endtime').val(dateFormat(res.activity.endTime))
                    $('#activesay').val(res.activity.describe)
                } else {
                    alert(res.msg)
                }
            }
        })
    }
})