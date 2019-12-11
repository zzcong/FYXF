$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick() 
    // table栏切换(公用)
    for (var i = 0; i < $(".tablecolumn > .tableswitch").length; i++) {
        $(".tablecolumn > .tableswitch")[i].onclick = function () {
            var index = $(this).index();//获取当前.tableswitch标签的个数
            $(this).parent().siblings().hide();//返回上一层，在下面要隐藏的div
            $(this).parent().siblings().eq(index).show(); //返回上一层，在下面查要显示的div，然后选中的显示
            $(this).addClass("clickswitchtb");//为选中的标题框加样式
            $(this).siblings().removeClass("clickswitchtb"); //没有选中的标题框去掉样式
        };
    }

    // 拿到线下培训细节
    getUnlineDetail()
    // 课程推荐
    courseRecommendation()

    $(".relativeclassul").on("click","li",function(){
        window.location.href = './unline_learning.html?informationId='+$(this).attr("data-id")+'&categoryId='+getQueryString("categoryId")
    })
    // 报名
    $('.signupbtn').on('click',function(){
        $http({
            url: 'api/information/signUp',
            type: 'post',
            data: {
                tableId: getQueryString('informationId')
            },
            success: function (res) { 
                if (res.msg != 'success') {
                    alert(res.msg)
                } else {
                    alert('操作成功')
                }
            }
        })
    })
    $('.myconfirm').on('click', '.closedx',function (ev) {
        ev.stopPropagation()
        ev.cancelBubble = true
        $('.myconfirm').hide()
    })

})
function getUnlineDetail(){
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
            var openTime = myDate(data.openTime)
            if(data.fileUrl != null && data.fileUrl != ''){
                var html_v = '<video class="unlearnvideo" src="" controls="controls"></video>'
                $(".classimg").html(html_v)
                $(".unlearnvideo").attr("src",data.fileUrl)
            } else if(data.cover != '' && data.cover != null){
                var html_img = '<img class="unlearnvideo" src="" alt="">'
                $(".classimg").html(html_img)
                $(".unlearnvideo").attr("src",data.cover)
            }else {
                var html_div = '<div style="font-size:30px;text-align:center;line-height:380px;">无视屏或者图像资料</div>'
                $(".classimg").html(html_div)
            }
            $('.underclassname').html(data.title)
            $('.menNum').html(data.menNum)
            $('.openTime').html(openTime)
            $('.classLength').html(data.classLength)
            $('.classTeacher').html(data.classTeacher)
            $('.classAddress').html(data.classAddress)
            $('.moredetail').html(data.describe)
            $('.commonproblem').html(data.quest)
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
           var html = template('course',{list: list})
           $('.relativeclassul').html(html)
        }
    })
}
// 日期格式化
function myDate(mydate){
    var dateee = new Date(mydate).toJSON();
    var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
    return date
}