$(function () {
    Common.toHome()
    Common.userInfo()
    Common.menuHover()
    Common.tabChange()
    Common.userImgClick()
    // 获取发布活动列表
    getMyIssueactList(1)
    // 获取参加的活动列表
    $(".sellertext ").on("click",function(){
        getMyjoinactList(1)
    })
})

    // 获取发布活动列表
    function getMyIssueactList (page) {
        $http({
            url: 'api/user/active/list',
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
                    var li = '<div style="font-size:18px;text-align:center;line-height:30px;">暂无发布的活动数据</div>'
                    $('.issueactive').html(li)
                    return
                }
                var data = res.page
                data.list.forEach(function (v) {
                    v.startTimeText = dateFormat(v.startTime)
                    v.endTimeText = dateFormat(v.endTime)
                })
                var html = template('listissue', data)
                $('.sends .M-box').pagination({
                    mode: 'fixed',
                    pageCount: data.totalCount ? Math.ceil(data.totalCount/5) : 0,
                    totalData: data.totalCount,
                    current: data.currPage,
                    isHide: true,
                    showData:5,
                    count: 4,
                    callback: function (api) {
                        var index = api.getCurrent()
                        getMyIssueactList(index)
                    }
                })
                $('.issueactive').html(html)
            }
        })
    }
    // 获取参加的活动列表
    function getMyjoinactList (page) {
        $http({
            url: 'api/user/active/join/list',
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
                    var li = '<div style="font-size:18px;text-align:center;line-height:30px;">暂无报名活动数据</div>'
                    $('.joinactive').html(li)
                    return
                }
                var data = res.page
                data.list.forEach(function (v) {
                    v.startTimeText = dateFormat(v.startTime)
                    v.endTimeText = dateFormat(v.endTime)
                })
                var html = template('listjoin', data)
                $('.signup .M-box').pagination({
                    mode: 'fixed',
                    pageCount: data.totalCount ? Math.ceil(data.totalCount/5) : 0,
                    totalData: data.totalCount,
                    current: data.currPage,
                    isHide: true,
                    showData:5,
                    count: 4,
                    callback: function (api) {
                        var index = api.getCurrent()
                        getMyjoinactList(index)
                    }
                })
                $('.joinactive').html(html)
            }
        })
    }