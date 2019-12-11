$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    // 获取危险品分类
    getCategoryId(6, function (res) {
        var html = '',
            val = ''
        res.forEach(function (v, i) {
            if (i == 0) {
                val = v.categoryId
            }
            html += '<option value="'+ v.categoryId +'">'+ v.name +'</option>'
        })
        $('.dangertype').append(html)
        $('.dangertype').val(val)
        // 获取列表
        getList(1)
    })
    

    $('.searchbtn').on('click', function() {
        getList(1)
    })
    
    $('.resetbtn').on('click', function () {
        $('.dangertype').val('')
        $('.nameinchina').val('')
        $('.statusselect').val('')
        $('.storagebag').val('')
        $('.dangerspecial').val('')
        getList(1)
    })

    $('tbody').on('click', 'tr', function () {
        window.location.href = './train-center.html?knowledgeId=' + $(this).data('id')
    })
    $("tbody").on('click','.down_annex a' ,function (ev) {
        ev.stopPropagation()
        ev.preventDefault()
        var a = document.createElement('a')
        $(a).attr('href', $(this).attr('href'))
        $(a).prop('download', '')
        $(a).prop('target', '_blank')
        a.style.display = 'none'
        $('body').append(a)
        a.click()
        // $('body').remove(a)
        downloadNumber($(this).closest('tr').data('id'))
    })
    $(document).on('click', '.download-file', function () {
        var url = $(this).data('href'),
            n = url.indexOf('/') ? url.split('/') : ''
        if (url) {
            // download(url, n)
            window.open(url)
        }
    })
})
function getList (page) {
    $http({
        url: 'api/knowledge/list',
        type: 'get',
        data: {
            title: $('.nameinchina').val() || null,
            danger_status: $('.statusselect').val() || null,
            storage: $('.storagebag').val() || null,
            danger_type: $('.dangerspecial').val() || null,
            categoryId: $('.dangertype').val() || 8,
            currPage: page,
            pageSize: 10
        },
        success: function(res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }
            if (res.page.list.length == 0) {
                var tr = '<td colspan="7"style="font-size:18px;text-align:center;line-height:50px;">暂无数据</td>'
                $('.classtable tbody').html(tr)
                return
            }
            if (res.code == 0) {
                var data = res.page
                var html = template('tr-list', data)
                $('.M-box').pagination({
                    mode: 'fixed',
                    pageCount: data.totalCount ? Math.ceil(data.totalCount/10) : 0,
                    totalData: data.totalCount,
                    current: data.currPage,
                    isHide: true,
                    showData:5,
                    count: 4,
                    callback: function (api) {
                        var index = api.getCurrent()
                        getList(index)
                    }
                })
                $('tbody').html(html)
            } else {
                alert(res.msg)
            }
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