$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    getActiveList(1)
})

// 获取活动列表
function getActiveList (page) {
    $http({
        url: 'api/exam/list',
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
                var li = '<div style="font-size:18px;text-align:center;line-height:100px;">暂无数据</div>'
                $('.activelist').html(li)
                return
            }
            var data = res.page
            data.list.forEach(function (v) {
                v.startTime = dateFormat(v.startTime)
                v.endTime = dateFormat(v.endTime)
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
                    getActiveList(index)
                }
            })
            $('.activelist').html(html)
        }
    })
}