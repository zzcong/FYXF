$(function () {
    Common.toHome()
    Common.userInfo()
    Common.menuHover()
    Common.tabChange()
    Common.userImgClick()
    // $('.study-form ul').on('click','li', function () {
    //     window.location.href = './my_study.html?id='+$(this).attr('data-id')
    // })
    getMystudyList(1)
    // 删除本条学习
    $('.study-form ul li').on('click','.videodelete',function(){
        $http({
            url:'api/user/delOperation',
            type:'delete',
            data:{
                tableId:$(this).closest('li').attr('data-id'),
                type:$(this).closest('li').attr('data-id')
            },
            success:function(res){
                $(this).closest('li').hide()
            }
        })
    })
})

function getMystudyList (page) {
    $http({
        url: 'api/user/study/list',
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
                var li = '<div style="font-size:18px;text-align:center;line-height:100px;">我的学习暂无数据</div>'
                $('.study-form ul').html(li)
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
                    getMystudyList(index)
                }
            })
            $('.study-form ul').html(html)
        }
    })
}