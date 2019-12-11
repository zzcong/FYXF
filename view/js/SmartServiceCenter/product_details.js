$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    // 获取左侧菜单
    getClassify(0, 7, function (res) {
        var html = template('main-menu', res)
        $('.goodsnav').html(html)
    })
    // 获取详细分类
    $('.goodsnav').on('mouseenter', '.all_product_name', function () {
        $(this).addClass('active')
        var that = this
        getClassify($(that).data('categoryid'),7, function (res) {
            if (res.list && !res.list.length)  {
                window.location.href = './all_product_list.html?category='+ $(that).data('categoryid')
                return
            }
            var html = template('detail-menu', res)
            $(that).find('.secondnav ul').html(html)
            $(that).siblings('li').find('.secondnav').hide()
            $(that).find('.secondnav').show()
        })
    })
    $('.goodsnav').on('mouseleave', '.all_product_name', function () {
        $(this).removeClass('active')
        $(this).find('.secondnav').hide()
    })
    // 进入详情页
    $('.goodsnav').on('click', '.goods-item a, .all_product_name ', function (ev) {
        ev.stopPropagation()
        ev.cancelBubble = true
        window.location.href = './all_product_list.html?category='+ $(this).closest('li').data('categoryid')
    })
    // 查看详情
    see_details()
    // table栏切换(公用)
    for (var i = 0; i < $(".tablecolumn > .tableswitch").length; i++) {
        $(".tablecolumn > .tableswitch")[i].onclick = function () {
            var index = $(this).index();//获取当前.tableswitch标签的个数
            $(this).parent().siblings().hide();//返回上一层，在下面要隐藏的div
            $(this).parent().siblings().eq(index).show(); //返回上一层，在下面查要显示的div，然后选中的显示
            $(this).addClass("clickswitchtb");//为选中的标题框加样式
            $(this).siblings().removeClass("clickswitchtb"); //没有选中的标题框去掉样式
            if (index == 1) {
                getCompany()
            }
            switch (index) {
                case 0:
                    break
                case 1:
                    getCompany()
                    break
                case 2:
                    $('.eval-cont textarea').val('')
                    getEevaluateList(1)
                    break
            }
        }
    }
    
    scoreStarNum('.total-scores', 5)
    scoreStarNum('.eval-item-scores', 5)
    // $('.set-score .score-item').hover(function () {
    //     var index = $(this).index()
    //     scoreStarNum('.set-score', index+1)
    //     },function () {
    //     $('.set-score .score-item').removeClass('stared')
    // })
    $(document).on('click', '.set-score .score-item', function () {
        var index = $(this).index()
        scoreStarNum('.set-score', index+1)
    })
    $(document).on('click', '.send-eval-btn', function () {
        if (!JSON.parse(window.localStorage.getItem('user'))) {
            alert('登录后才可发布评论哦！')
            return
        }
        var score = $('.set-score .stared-green').length ||　$('.set-score .stared-red').length || 0,
            content = $('.eval-cont textarea').val()
            console.log(score, content)
        $http({
            url: 'api/evaluate/save',
            type: 'post',
            data: {
                "commentatorId": JSON.parse(window.localStorage.getItem('user')).userId,
                "content": content,
                "createTime": new Date().toISOString(),
                "delFlag": 0,
                "examId": 0,
                "facilitatorId": $('body').attr('data-facilitator'),
                "productId": getQueryString('pro_id'),
                "score": score
            },
            success: function (res) {
                if (res.msg != 'success') {
                    alert(res.msg)
                } else {
                    alert('评论成功！')
                    $('.eval-cont textarea').val('')
                    scoreStarNum('.set-score', 0)
                    getEevaluateList(1)
                }
            }
        })
    })

})
function see_details(){
    $http({
        url: 'api/product/info/' + getQueryString('pro_id'),
        type: 'get',
        data: {
            productId: getQueryString('pro_id')
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }
            var facilitator = res.facilitator || {}
            $('body').attr('data-facilitator',facilitator.facilitatorId ? facilitator.facilitatorId : '')
            var data = res.product
            var html = template('toptitle', data)
            $('.goodsname').html(html)
            var html = template('goodsdetail', data)
            $('.detail_goods').html(html)
            var html = template('productshow', data)
            $('.aboutproductdetail').html(html)
        }
    })
}

function getClassify (p, type, cb) {
    $http({
        url: 'api/category/list',
        type: 'get',
        data: {
            parentId: p,
            type: type
        },
        success: function (res) {
            if (res.msg == 'success') {
                cb(res)
            } else {
                alert(res.msg)
            }
        }
    })
}
function getCompany(){
    if (!JSON.parse(window.localStorage.getItem('user'))) {
        return
    }
    $http({
        url: 'api/facilitator/facilitator/' + JSON.parse(window.localStorage.getItem('user')).userId,
        type: 'get',
        success: function (res) {
            var data = res.facilitator
            if (res.msg != 'success') {
                alert(res.msg)
            } else {
                var html = template('companyintroduction', data)
                $('.aboutcompanypd').html(html)
            }
        }
    })
}
function scoreStarNum (ele,num) {
    var list = $(ele).find('.score-item')
    list.removeClass('stared').removeClass('stared-red').removeClass('stared-green')
    var className = ''
    if (num <= 3) {
        className = 'stared-red'
    } else {
        className = 'stared-green'
    }
    num = Number(num) > 5 ? 5 : num
    for(var i = 0;i < num;i++) {
        list.eq(i).addClass(className)
    }
    // for(var i = 0;i < num;i++) {
    //     list.eq(i).addClass('stared')
    // }
}
function getEevaluateList (page) {
    $http({
        url: 'api/evaluate/list',
        type: 'get',
        data: {
            currPage: page,
            pageSize: 10,
            productId: getQueryString('pro_id'),
            facilitatorId: $('body').attr('data-facilitator')
        },
        success: function (res) {
            if (res.msg != 'success') {
                return
            }
            if (res.page.list.length == 0) {
                var li = '<div style="font-size:18px;text-align:center;line-height:100px;">暂无评价信息</div>'
                $('.total-eval h2').text('评价得分：' + 0 + '分')
                scoreStarNum('.total-scores',0)
                $('#totalEvalNum').text(0)   
                $('#eval-lists').html(li)
                return
            }
            $('.total-eval h2').text('评价得分：' + res.averageScore + '分')
            scoreStarNum('.total-scores',Math.ceil(res.averageScore))
            $('#totalEvalNum').text(res.page.totalCount)    
            var data = res.page
            data.list.forEach(function(v) {
                v.time = dateFormat(v.createTime)
            })
            var html = template('eval', data)
            $('.M-box').pagination({
                mode: 'fixed',
                pageCount: data.totalCount ? Math.ceil(data.totalCount/10) : 0,
                totalData: data.totalCount,
                current: data.currPage,
                isHide: true,
                showData:10,
                count: 4,
                callback: function (api) {
                    var index = api.getCurrent()
                    getEevaluateList(index)
                }
            })
            $('#eval-lists').html(html)
        }
    })
}