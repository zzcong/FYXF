$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    
    swiperImg()
    // table栏切换(公用)
    $('.getfloors').on('click', '.tableswitch' , function () {
        var index = $(this).index(), id = $(this).closest('.product_middle').data('category-id')
        if (!index) {
            getSubNavList(id, 'hot')
        } else {
            getSubNavList(id, 'new')
        }
        $(this).addClass('clickswitchtb').siblings('.tableswitch').removeClass('clickswitchtb')
    })
    // 获取左侧菜单
    getClassify(0, 7, function (res) {
        // 获取左侧菜单
        var html = template('main-menu', res)
        $('.goodsnav').html(html)
        res.list.forEach(function(v) {
            getClassifyProductList(v.categoryId, v.name)
        })
        // 获取新产品发布
        var id = res.list[0].categoryId
        $http({
            url: 'api/product/list',
            type: 'get',
            data: {
                categoryId: id,
                currPage: 1,
                pageSize: 4
            },
            success: function (result) {
                if (result.msg == 'success') {
                    var html = template('new-product', {list: result.page.list})
                    $('.area_body').html(html)
                } else {
                    alert(result.msg)
                }
            }
        })
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
    $('.area_body').on('click', '.goodsimg', function () {
        window.location.href = './product_details.html?pro_id='+ $(this).closest('div').data('categoryid')
    })
})
/**
 * 获取左侧所有商品分类
 * @param {父Id} p 
 * @param {类型} type 
 * @param {回调函数} cb 
 */
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
/**
 * 获取楼层数据列表
 * @param {大类Id} id 
 * @param {大类标题} title 
 */
function getClassifyProductList (id, title) {
    $http({
        url: 'api/product/list',
        type: 'get',
        data: {
            categoryId: id,
            currPage: 1,
            pageSize: 8
        },
        success: function (res) {
            if (res.msg == 'success') {
                if (!res.page.list || !res.page.list.length) return
                res.page.title = title
                res.page.id = id
                var html = template('forfloor', res.page)
                $('.getfloors').html(html)
                getSubNavList(id, 'hot')
            } else {
                alert(res.msg)
            }
        }
    })
}
/**
 * 获取各楼层的热销或新品
 * @param {大类Id} categoryId 
 */
function getSubNavList(categoryId, type){
    $http({
        url: 'api/product/visit/list',
        type: 'get',
        data: {
            categoryId: categoryId
        },
        success: function (res) {
            if (res.msg == 'success') {
                if (!res.list || !res.list.length) return
                var list = null, len = res.list.length
                if (type == 'hot') {
                    list = res.list.slice(0,5)
                } else {
                    len > 5 ? list = res.list.slice(len-5) : list = res.list
                }
                var html = template('floornav', {list: list})
                $('[data-category-id='+ categoryId +'] .goodsli').html(html)
            } else {
                alert(res.msg)
            }
        }
    })
}
//轮播图请求
function swiperImg (){
    $http({
        url: 'visit/banner/list',
        type: 'get',
        success: function (res) {
            if (res.msg == 'success') {
                var html = template('swiperdivimg', res.page)
                $('.swiper-wrapper').html(html)
                // 轮播图js
                var swiper = new Swiper('.swiper-container', {
                    slidesPerView: 1,
                    autoplay: true,
                    spaceBetween: 30,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            } else {
                alert(res.msg)
            }
        }
    })
}