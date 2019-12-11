$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()

    // 拿到在线培训细节
    getOnlineDetail()
    //相关视频
    getOnDataList()
    //相课程推荐
    courseRecommendation()

    $(".videorelatedli").on("click","li",function (){
        window.location.href = './online_learning.html?informationId='+$(this).attr("data-id")+'&categoryId='+getQueryString("categoryId")
    })
    $(".relatedclassli").on("click","li",function (){
        window.location.href = './online_learning.html?informationId='+$(this).attr("data-id")+'&categoryId='+getQueryString("categoryId")
    })
})
function getOnlineDetail(){
    $http({
        url: 'api/information/info/{informationId}',
        type: 'get',
        data: {
            informationId: getQueryString('informationId')
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }
            var data = res.information
            if(data.fileUrl != null && data.fileUrl != ''){
                var html_v = '<video class="learnvideo" src="" controls="controls"></video>'
                $(".videoArea").html(html_v)
                $(".learnvideo").attr("src",data.fileUrl)
            } else if(data.cover != '' && data.cover != null){
                var html_img = '<img class="learnvideo" src="" alt="">'
                $(".videoArea").html(html_img)
                $(".learnvideo").attr("src",data.cover)
            }else {
                var html_div = '<div style="font-size:30px;text-align: center;line-height: 474px;">无视屏或者图像资料</div>'
                $(".videoArea").html(html_div)
            }
            $('.videohead').html(data.title)
        }
    })
}
function getOnDataList () {
    $http({
        url: 'api/information/visit/list',
        type: 'get',
        data: {
            categoryId: getQueryString('categoryId')
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }
            if (res.list.length == 0) {
                var li = '<li style="font-size:18px;text-align:center;line-height:100px;">暂无数据</li>'
                $('.onclass').html(li)
                return
            }
            var list = res.list.splice(0,20)
            var html = template('about-list',{list: list})
            $('.videorelatedli').html(html)
        }
    })
}
function courseRecommendation () {
    $http({
        url:"api/information/visit/list",
        type:"get",
        data:{
            categoryId:getQueryString('categoryId')
        },
        success:function (res){
            var list = res.list.splice(0,4)
           var html = template('course', {list: list})
           $('.onlinelearnbottom ul').html(html)
        }
    })
}