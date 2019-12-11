$(function () {
    Common.toHome()
    Common.userInfo()
    Common.menuHover()
    Common.tabChange()
    Common.userImgClick()

    User.initMyReport(1)

    $('.tipslist').on('click','li', function () {
        window.location.href = './../ConvenientServiceCenter/complaint_sreport.html?id='+$(this).attr('data-id')
    })
    // 获取举报列表
    getMyTipsList(1)
})
var User = {
    reportCount: 0,
    reportCurr: 1,
    getMyReport: function () {
        $('.M-box').pagination({
            mode: 'fixed',
            pageCount: User.reportCount ? Math.ceil(User.reportCount/5) : 0,
            totalData: User.reportCount,
            current: User.reportCurr,
            isHide: true,
            showData:5,
            count: 4,
            callback: function (api) {
                var index = api.getCurrent()
                User.initMyReport(index)
            }
        });
    },
    initMyReport:function (index) {
        $http({
            url: 'api/report/list',
            data: {
                currPage: index,
                pageSize: 5
            },
            success: function (res) {
                if (res.msg == 'success') {
                    User.reportCount = res.page.totalCount
                    User.reportCurr = res.page.currPage
                    User.getMyReport()
                }
            }
        })
    }
}
// 获取举报列表
function getMyTipsList (page) {
    $http({
        url: 'api/report/list',
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
                var li = '<div style="font-size:18px;text-align:center;line-height:80px;">暂无举报数据</div>'
                $('.tipslist').html(li)
                return
            }
            var data = res.page
            data.list.forEach(function (v) {
                v.createTime = dateFormat(v.createTime)
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
                    getMyTipsList(index)
                }
            })
            $('.tipslist').html(html)
        }
    })
}