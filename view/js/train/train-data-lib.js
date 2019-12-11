$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    getFireDatatype(function () {
        getDataList(1)
        downloadList()
    })
    $('.allclassify').on('click', '.classify_name', function () {
        $('.classify_name').removeClass('classify_nameact')
        $(this).addClass('classify_nameact')
        getDataList(1)
        downloadList()
    })
    $('.train_lib_list').on('click', '.lib_download', function () {
        var a = document.createElement('a')
        $(a).attr('href', $(this).data('file-id'))
        $(a).prop('download', '')
        $(a).prop('target', '_blank')
        a.style.display = 'none'
        $('body').append(a)
        a.click()
        // $('body').remove(a)
        downloadNumber($(this).closest('li').data('id'))
    })
    $('.rankinglist').on('click', 'li', function () {
        var a = document.createElement('a')
        $(a).attr('href', $(this).data('file-url'))
        $(a).prop('download', '')
        $(a).prop('target', '_blank')
        a.style.display = 'none'
        $('body').append(a)
        a.click()
        // $('body').remove(a)
        downloadNumber($(this).data('id'))
    })
})

function getFireDatatype (callback) {
    $http({
        url: 'api/category/list',
        data: {
            type: 3
        },
        success: function (res) {
            if (res.code == 0) {
                var html = template('classifywidth', res)
                $('.allclassify').html(html).find('li').eq(0).find('span').addClass('classify_nameact')
                actId = $('.allclassify').find('li').eq(0).data('id')
                callback()
            } else {
                alert(res.msg)
            }
        }
    })
}

function getDataList (page) {
    $http({
        url: 'api/information/list',
        type: 'get',
        data: {
            categoryId: $('.classify_nameact').closest('li').data('id'),
            currPage: page,
            pageSize: 5
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }
            if (res.page.list.length == 0) {
                var li = '<div style="font-size:18px;text-align:center;line-height:100px;">暂无数据</div>'
                $('.train_lib_list').html(li)
                $('.M-box').css('display','none')
                return
            }
            var data = res.page
            var html = template('data-list', data)
            $('.train_lib_list').html(html)
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
                    getDataList(index)
                }
            })
        }
    })
}

function downloadNumber (id) {
    $http({
        url: 'api/information/download/' + id,
        type: 'get',
        data: {
            informationId: id
        },
        success: function (res) {
        }
    })
}

function downloadList () {
    $http({
        url: 'api/information/down/list',
        type: 'get',
        data: {
            categoryId: $('.classify_nameact').closest('li').data('id'),
        },
        success: function (res) {
            if (!(res.msg == 'success') || !res.list || !res.list.length) {
                $('.rankinglist').hide()
                return
            }
            $('.rankinglist').show()
           var html = template('download-list', res)
           $('.rankingli').html(html)
        }
    })
}