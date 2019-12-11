$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    // 拿到在线学习分类
    getOnlineDatatype(function () {
        getOnDataList(1)
    })
    $('.subnav1').on('click', 'li', function () {
        $('li').removeClass('subnav1act')
        $(this).addClass('subnav1act')
        getOnDataList(1)
        paihang()
    })
    // 在线学习下所有小类跳转
    $('.onclass').on('click', 'li', function () {
        window.location.href = './online_learning.html?informationId='+ $(this).attr('data-id') + '&categoryId=' + $('.subnav1 .subnav1act').data('id')
    })

    // 拿到线下课程分类
    getUnlineDatatype(function () {
        getUnDataList(1)
    })
    $('.subnav2').on('click', 'li', function () {
        $('li').removeClass('subnav2act')
        $(this).addClass('subnav2act')
        getUnDataList(1)
        undelineCenter()
    })
    // 线下课程下所有小类跳转
    $('.underclass').on('click', 'li', function () {
        window.location.href = './unline_learning.html?informationId='+ $(this).attr('data-id') + '&categoryId=' + $('.subnav2 .subnav2act').data('id')
    })
    $('.paihang').on('click', 'li', function () {
        window.location.href = './online_learning.html?informationId='+ $(this).attr('data-id') + '&categoryId=' + $('.subnav1 .subnav1act').data('id')
    })
    $('.underlineCenter').on('click', 'li', function () {
        window.location.href = './unline_learning.html?informationId='+ $(this).attr('data-id') + '&categoryId=' + $('.subnav2 .subnav2act').data('id')
    })
})
// 拿到在线学习分类
function getOnlineDatatype (callback) {
    $http({
        url: 'api/category/list',
        data: {
            type: 2
        },
        success: function (res) {
            if (res.code == 0) {
                var html = template('onlineclassify', res)
                $('.subnav1').html(html).find('li').eq(0).addClass('subnav1act')
                actId = $('.subnav1').find('li').eq(0).data('id')
                callback()
                paihang()
            } else {
                alert(res.msg)
            }
        }
    })
}
// 拿到在线学习分类下的列表
function getOnDataList (page) {
    $http({
        url: 'api/information/list',
        type: 'get',
        data: {
            categoryId: $('.subnav1act').data('id'),
            currPage: page,
            pageSize: 500
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }
            if (res.page.list.length == 0) {
                var li = '<div style="font-size:18px;text-align:center;line-height:100px;">暂无数据</div>'
                $('.onclass').html(li)
                return
            }
            var data = res.page
            var html = template('onlineimg', data)
            $('.onclass').html(html)
        }
    })
}
// 拿到线下课程分类
function getUnlineDatatype (callback) {
    $http({
        url: 'api/category/list',
        data: {
            type: 5
        },
        success: function (res) {
            if (res.code == 0) {
                var html = template('unlineclassify', res)
                $('.subnav2').html(html).find('li').eq(0).addClass('subnav2act')
                actId = $('.subnav2').find('li').eq(0).data('id')
                callback()
                undelineCenter()
            } else {
                alert(res.msg)
            }
        }
    })
}
// 拿到线下课程分类下的列表
function getUnDataList (page) {
    $http({
        url: 'api/information/list',
        type: 'get',
        data: {
            categoryId: $('.subnav2act').data('id'),
            currPage: page,
            pageSize: 100
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }
            if (res.page.list.length == 0) {
                var li = '<div style="font-size:18px;text-align:center;line-height:100px;">暂无数据</div>'
                $('.underclass').html(li)
                return
            }
            var data = res.page
            var html = template('unlineimg', data)
            $('.underclass').html(html)
        }
    })
}

function paihang(){
    $http({
        url:"api/information/visit/list",
        type:"get",
        data:{
            categoryId:$(".subnav1act").data("id")
        },
        success:function (res){
            if (!(res.msg == 'success') || !res.list || !res.list.length) {
                $('.paihang').hide()
                return
            }
            $('.paihang').show()
            var list = res.list.splice(0,9)
            var html = template('paihang-list', {list: list})
            $('.paihang ul').html(html)
        }
    })
}

function undelineCenter () {
    $http({
        url:"api/information/visit/list",
        type:"get",
        data:{
            categoryId:$(".subnav2act").data("id")
        },
        success:function (res){
            if (!(res.msg == 'success') || !res.list || !res.list.length) {
                $('.underlineCenter').hide()
                return
            }
            $('.underlineCenter').show()
            var list = res.list.splice(0,9)
           var html = template('unline-center', {list: list})
           $('.underlineCenter .unlinecourse').html(html)
        }
    })
}
