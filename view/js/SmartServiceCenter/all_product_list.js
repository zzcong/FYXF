$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    getProductList(1)
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
    
    $('.showlist').on('click', '.product-info', function () {
        window.location.href = './product_details.html?pro_id='+getQueryString('category')
    })

    function getProductList (page) {
        $http({
            url: 'api/product/list',
            type: 'get',
            data: {
                currPage: page,
                pageSize: 12,
                categoryId: getQueryString('category')
            },
            success: function (res) {
                if (res.msg != 'success') {
                    return
                }
                if (res.page.list.length == 0) {
                    var li = '<div style="font-size:18px;text-align:center;line-height:100px;">暂无商品信息</div>'
                    $('.showlist').html(li)
                    return
                }
                var data = res.page
                var html = template('product', data)
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
                        getProductList(index)
                    }
                })
                $('.showlist').html(html)
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
})
