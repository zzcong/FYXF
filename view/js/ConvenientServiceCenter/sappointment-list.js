$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    $('.sappointment-list').on('click','.visit', function () {
        window.location.href = './sappointmentlook.html?id='+$(this).closest('li').attr('data-id')
    })
    function getSappointList (page) {
        $http({
            url: 'sys/visit/list',
            type: 'get',
            data: {
                currPage: page,
                pageSize: 5
            },
            success: function (res) {
                if (res.msg != 'success') {
                    return
                }
                if (res.page.list.length == 0) {
                    var li = '<li style="font-size:18px;text-align:center;line-height:100px;">预约参观暂无数据</li>'
                    $('.sappointment-list').html(li)
                    return
                }
                var data = res.page
                data.list.forEach(function (v) {
                    v.openEndTime = dateFormat(v.openEndTime)
                    v.openStartTime = dateFormat(v.openStartTime)
                })
                var html = template('list', data)
                $('.M-box').pagination({
                    mode: 'fixed',
                    pageCount: data.totalCount ? Math.ceil(data.totalCount/5) : 0,
                    totalData: data.totalCount,
                    current: data.currPage,
                    isHide: true,
                    showData:5,
                    count: 4,
                    callback: function (api) {
                        var index = api.getCurrent()
                        getSappointList(index)
                    }
                })
                $('.sappointment-list').html(html)
            }
        })
    }
    getSappointList(1)
})