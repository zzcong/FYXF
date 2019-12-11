$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    Common.isHaveScore()
    $('.classifyout').on('click','.classifyitem', function () {
        $(this).addClass('beselected').siblings().removeClass('beselected')
        getActiveList(1)
    })
    // 获取活动类型
    getActiveType ()

    $('.activelist').on('click','li', function () {
        window.location.href = './activity_info.html?id='+$(this).attr('data-id')+"&actvitid="+$(".activetop1 .beselected").attr('data-id')
    })

    $('.jointo').on('click',function(){
        window.location.href = './activity_center.html?Volunteer='+$('.activetop .beselected').attr('data-id')+'&categoryId='+$('.activetop1 .beselected').attr('data-id')
    })
})
// 获取活动类型
function getActiveType () {
    $http({
        url: 'api/category/list',
        type: 'get',
        data: {
            type:4
        },
        success: function (res) {
            if (res.msg != 'success') {
                return
            }
            var data = res
            var html = template('ActiveType', data)
            $('.activetop1').append(html)
            $('.activetop1').html(html).find('.classifyitem').eq(0).addClass('beselected')
            // 获取活动列表
            getActiveList(1)
        }
    })
}
// 获取活动列表
function getActiveList (page) {
    $http({
        url: 'api/activity/visit/list',
        type: 'get',
        data: {
            categoryId:$('.activetop1').find('.beselected').data('id'),
            volunteer_status: $('.activetop2').find('.beselected').data('id') || null,
            active_tatus: $('.activetop').find('.beselected').data('id') || null,
            currPage: page,
            pageSize: 5
        },
        success: function (res) {
            if (res.msg != 'success') {
                return
            }
            if (res.list.length == 0) {
                var li = '<div style="font-size:18px;text-align:center;line-height:100px;">暂无数据</div>'
                $('.activelist').html(li)
                return
            }
            var data = res
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