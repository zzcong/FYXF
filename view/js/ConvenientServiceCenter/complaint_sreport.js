$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    $('.makesure button').on('click', function () {
        var type = $('#report-type').val()
        var desc = $('#report-desc').val()
        if ($.trim(desc) == '') {
            alert('请输入举报说明')
            return
        }
        $http({
            url: 'api/report/save',
            type: 'post',
            data: {
                "describe": desc,
                "title": "",
                "type": type
            },
            success: function (res) {
                if (res.msg == 'success') {
                    alert('操作成功')
                }
            }
        })
    })
    $('.myconfirm').on('click', '.closedx',function (ev) {
        ev.stopPropagation()
        ev.cancelBubble = true
        $('.myconfirm').hide()
    })
})