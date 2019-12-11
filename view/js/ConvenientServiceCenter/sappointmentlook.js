$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    $http({
        url: 'sys/visit/info/' + getQueryString('id'),
        success: function (res) {
            res.visit.openStartTime = dateFormat(res.visit.openStartTime)
            res.visit.openEndTime = dateFormat(res.visit.openEndTime)
            var html = template('info', res.visit)
            $('.content-list').append(html)
        }
    })
    $('.content-list').on('click', '.submitebutton button', function () {
        $('.myconfirm').show()
    })
    $(".closedbtn, .canclebtn").on("click",function (ev) {
        ev.preventDefault();
        clearForm()
        $('.myconfirm').hide()
        return false
    })
    $(".submitbtn").on("click",function () {
        event.preventDefault()
        $http({
            url: 'sys/visituser/save?MorningOrAfternoon=' + $('.visit-time').val(),
            type: 'post',
            data: {
                visitId: getQueryString('id'),
                linkman: $('.pname').val(),
                phone: $('.phone').val(),
                applyNum: $('.psum').val(),
                describe: $('.desc').val(),
                visitTime: new Date($('.visit-times').val())
            },
            success: function (res) {
                if (res.msg == 'success') {
                    alert('操作成功')
                    $('.myconfirm').hide()
                    clearForm()
                } else {
                    alert(res.msg)
                } 
            }
        })
        return false
    })
    $('.second_confirm').on('click', '.closedx',function (ev) {
        ev.stopPropagation()
        ev.cancelBubble = true
        $('.second_confirm').hide()
    })
})

function clearForm () {
    $('.pname').val('')
    $('.phone').val('')
    $('.psum').val('')
    $('.desc').val('')
}