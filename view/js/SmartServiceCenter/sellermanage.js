$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    if (getQueryString('id')) {
        getProductDetail()
    } else {
        getClassify(0,7,function(res) {
            var html = '<option value="">请选择</option>'
            res.list.forEach(function(v) {
                html += '<option value="'+ v.categoryId +'">'+ v.name +'</option>'
            })
            $('.first-category').html(html)
        })
    }
    $('.first-category').on('change', function () {
        getClassify($(this).val(), 7, function (res) {
            var html = '<option value="">请选择</option>'
            res.list.forEach(function(v, i) {
                html += '<option value="'+ v.categoryId +'">'+ v.name +'</option>'
            })
            $('.second-category').html(html)
        })
    })
    // 产品图片编辑
    $('.addgoodsbtn').on('click', function () {
        $('#product_cover').trigger('click')
        $('#product_cover').one('change', function (ev) {
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.goodsimg img').attr('src', res.url)
                    }
                }
            })
        })
    })

    $('#issue_product').on("click", function () {
        var product = {}
        product.categoryId = $('.second-category').val() ? $('.second-category').val() : $('.first-category').val()
        product.cover = $('.goodsimg img').attr('src')
        product.describe = $("#describe").val()
        product.price = $("#price").val()
        product.title = $("#title").val()
        if (!product.categoryId || !product.cover || !product.describe || !product.price || !product.title) {
            alert('请填写完整!')
            return
        }
        product.prductNo = $("#prductNo").val()
        if (!!getQueryString('id')) {
            product.productId = getQueryString('id')
        }
        $http({
            url: "api/product/save",
            type: "post",
            data: product,
            success: function (res) {
                if (res.msg == 'success') {
                    alert('操作成功')
                } else {
                    alert(res.msg)
                }
            }
        })
    });
})

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
function getProductDetail(){
    $http({
        url:"api/product/info/"+getQueryString("id"),
        type:"get",
        data:{
            productId:getQueryString("id")
        },
        success:function(res){
            getClassify(0, 7, function (result) {
                var html = '<option value="">请选择</option>'
                result.list.forEach(function(v, i) {
                    if (v.categoryId == res.product.categoryId) {
                        html += '<option selected value="'+ v.categoryId +'">'+ v.name +'</option>'
                    } else {
                        html += '<option value="'+ v.categoryId +'">'+ v.name +'</option>'
                    }
                })
                $('.first-category').html(html)
                getClassify( $('.first-category').val(),7, function (r) {
                    var html1 = '<option value="">请选择</option>'
                    r.list.forEach(function(m, n) {
                        if (m.categoryId == res.product.categoryId) {
                            html1 += '<option selected value="'+ m.categoryId +'">'+ m.name +'</option>'
                            $('.first-category').val(m.parentId)
                        } else {
                            html1 += '<option value="'+ m.categoryId +'">'+ m.name +'</option>'
                        }
                    })
                    $('.second-category').html(html1)
                })
            })
            var data = res.product
            if(res.product.categoryId == $(".first-category option").val()){
                $(".first-category option").attr("selected","selected")
            }else if(res.product.categoryId == $(".first-category option").val()){
                $(".first-category option").attr("selected","selected")
            }
            $(".goodsimg img").attr("src",data.cover)
            $("#title").val(data.title)
            $("#price").val(data.price)
            $("#describe").val(data.describe)
            $("#cover").val(data.describe)
            $("#prductId").val(data.productId)
            $("#prductNo").val(data.prductNo)
        }
    })
}