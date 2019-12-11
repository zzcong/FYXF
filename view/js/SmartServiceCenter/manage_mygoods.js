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
    // 添加商品按钮
    $('.product_add').on('click',function (ev){
        window.location.href = './sellermanage.html'
    })
    // 编辑商品按钮
    $('.mygoodsli').on('click','.myedit',function (ev){
        window.location.href = './sellermanage.html?id='+$(this).closest("li").attr("data-id")
    })
    // 查看商品详情(点击图片时)
    $('.mygoodsli').on('click','.mygoodsimg',function (ev){
        window.location.href = './product_details.html?id='+$(this).closest("li").attr("data-id")
    })
    // 删除商品按钮
    $('.mygoodsli').on('click','.mydelete',function (ev){
        delProduct($(this).closest('li').data('id'))
    })
    // 全选按钮
    $(document).on('change', '.allcheckbox', function () {
        var flag = $(this).val()
        $('.mygoodsli').find('input[type="checkbox"]').each(function () {
            $(this).prop('checked', flag)
        })
    })
    // 批量删除商品按钮
    $('.betchdelete').on('click',function (ev){
        var ids=[]
        $(".mygoodsli input[type=checkbox]:checked").each(function() {
            ids.push($(this).val())
        })
        if (ids.length == 0) {
            alert('请选择要删除的图片！！！')
            return
        }
        var flag = confirm('是否删除该商品，确认后不可撤销。')
        if (!flag) {
            return
        }
        ids.forEach(function(v) {
            $http({
                url: 'api/product/delete',
                type: 'delete',
                data: JSON.stringify({
                    productId: v,
                    userId: JSON.parse(window.localStorage.getItem('user')).userId
                }),
                success: function (res) {
                    if (res.msg != 'success') {
                        alert(res.msg)
                    } else {
                        getMyGoodsList($('.M-box .active').text())
                    }
                }
            })
        })
    })
    getMyGoodsList(1)
})
function getMyGoodsList(page){
    $http({
        url: 'api/product/my/list',
        type: 'get',
        data: {
            currPage: page,
            pageSize: 5
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }
            if (res.page.list.length == 0) {
                var div = '<div style="font-size:18px;text-align:center;line-height:80px;">暂无数据</div>'
                $(".mygoodsli").html(div)
                return
            }
            var data = res.page
            var html = template('goodslist', data)
            $('.mygoodsli').html(html)
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
                    getMyGoodsList(index)
                }
            })
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

function delProduct (id) {
    var flag = confirm('是否删除该商品，确认后不可撤销。')
    if (!flag) {
        return
    }
    $http({
        url: 'api/product/delete',
        type: 'delete',
        data: JSON.stringify({
            productId: id,
            userId: JSON.parse(window.localStorage.getItem('user')).userId
        }),
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            } else {
                getMyGoodsList($('.M-box .active').text())
            }
        }
    })
}