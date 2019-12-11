$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    Common.isHaveScore()
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
    activityInfos()
    otherclass()
    // 点击推荐课程的li
    $(".relativeclassul").on("click","li",function(){
        window.location.href ="./activity_info.html?id="+$(this).attr("data-id")+"&actvitid="+getQueryString("actvitid")
    })
    // 点击立即报名
    $(".unlinelearnmid").on("click",".signupbtn",function (event) {
        event.preventDefault()
        $http({
            url: 'api/activity/joinActive',
            type: 'post',
            data: {
                tableId:getQueryString("id")
            },
            success: function (res) {
                if (res.msg == "success") {
                    alert('操作成功')
                } else {
                    alert(res.msg)
                } 
            }
        })
        return false
    })
    $('.myconfirm').on('click', '.closedx',function (ev) {
        ev.stopPropagation()
        ev.cancelBubble = true
        $('.myconfirm').hide()
    })
})
// 获取活动细节信息
function activityInfos(){
    $http({
        url: 'api/activity/info/' + getQueryString('id'),
        success: function (res) {
            if (res.msg != 'success') {
                return
            }
            res.activity.startTime = dateFormat(res.activity.startTime)
            res.activity.endTime = dateFormat(res.activity.endTime)
            var end = res.activity.endTime.toString().replace(/-/g,"")
            var start = res.activity.startTime.toString().replace(/-/g,"")
            var timelong = end - start
            if(timelong == 0){
                timelong = 1
            }else {
                timelong = timelong + 1
            }
            res.activity["timelong"]=timelong
            var html = template('info', res.activity)
            $('.unlinelearnmid').append(html)
            var html = template('described', res.activity)
            $('.moredetail').append(html)
            var html = template('questioned', res.activity)
            $('.commonproblem').append(html)
        }
    })
}
// 获取推荐信息
function otherclass(){
    $http({
        url:"api/activity/visit/list",
        type:"get",
        data:{
            categoryId:getQueryString("actvitid")
        },
        success:function (res){
            if (res.msg != 'success') {
                return
            }
            var list = res.list.splice(0,4)
            var html = template('tuijian', {list: list})
            $('.relativeclassul').html(html)
        }
    })
}