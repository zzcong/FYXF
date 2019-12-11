$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    
    // 拿到知识点详情
    getKnowledgeDetail()
    // 返回按钮
    $('.backbtn').on('click',function() {
        window.location.href = document.referrer;
        window.history.back(-1);
    })

})
function getKnowledgeDetail(){
    $http({
        url: 'api/knowledge/info/'+getQueryString('knowledgeId'),
        type: 'get',
        data: {
            knowledgeId: getQueryString('knowledgeId'),
        },
        success: function (res) {
            if (res.msg != 'success') {
                alert(res.msg)
            }
            $(".lorebox input").prop("disabled",'true')
            $(".remark_care").prop("disabled",'true')
            $(".lorebox input").prop("readonly",'true')
            $(".remark_care").prop("readonly",'true')
            $(".dangerType").val(res.knowledge.dangerType)
            $(".chinaName").val(res.knowledge.title)
            $(".englishNmae").val(res.knowledge.englishTitle)
            $(".alias").val(res.knowledge.alias)
            $(".molecularformula").val(res.knowledge.molecularformula)
            $(".disposalplan").val(res.knowledge.disposalplan)
            $(".extinguishingagent").val(res.knowledge.extinguishingagent)
            $(".smell").val(res.knowledge.smell)
            $(".colour").val(res.knowledge.colour)
            $(".state").val(res.knowledge.state)
            $(".meltingpoint").val(res.knowledge.meltingpoint)
            $(".boilingpoint").val(res.knowledge.boilingpoint)
            $(".relativedensity").val(res.knowledge.relativedensity)
            $(".flashpoint").val(res.knowledge.flashpoint)
            $(".explosionlimit").val(res.knowledge.explosionlimit)
            $(".decompositionproducts").val(res.knowledge.decompositionproducts)
            $(".stability").val(res.knowledge.stability)
            $(".taboo").val(res.knowledge.taboo)
            $(".skin").val(res.knowledge.skin)
            $(".eye").val(res.knowledge.eye)
            $(".respiratorytract").val(res.knowledge.respiratorytract)
            $(".suffocation").val(res.knowledge.suffocation)
            $(".centralnervous").val(res.knowledge.centralnervous)
            $(".respiratorysystem").val(res.knowledge.respiratorysystem)
            $(".circulatorysystem").val(res.knowledge.circulatorysystem)
            $(".digestivesystem").val(res.knowledge.digestivesystem)
            $(".referencechemicals").val(res.knowledge.referencechemicals)
            $(".storagepackaging").val(res.knowledge.storagepackaging)
            $(".LD50").val(res.knowledge.ld50)
            $(".LC50").val(res.knowledge.lc50)
            $(".internationalcode").val(res.knowledge.internationalcode)
            $(".other").val(res.knowledge.other)
            $(".naturalpoint").val(res.knowledge.naturalpoint)
            $(".diffusionradius").val(res.knowledge.diffusionradius)
            $(".hazardcharacteristics").val(res.knowledge.hazardcharacteristics)
            $(".mnattention").val(res.knowledge.mnattention)
            $(".breathcana").val(res.knowledge.breathcana)
            $(".fileName").html(res.knowledge.title)
            $(".fileSize").html(res.knowledge.visitNum)
            $(".changeDate").html(res.knowledge.createTime)
            if(res.knowledge.url!=''&&res.knowledge.url!=null){
                $(".downUrl").prop("href",res.knowledge.url)
                var urlArr = res.knowledge.url.indexOf('/') > -1 ? res.knowledge.url.split('/') : [res.knowledge.url],
                    urlLen = urlArr.length
                $(".downUrl").prop("download",urlArr[urlLen-1])
            } else {
                $('.downUrlbtn').css('display','none')
                $('.downUrldiv').html('没有附件,不能下载')
            }
            $(".remark_care").val(res.knowledge.describe)
            // 给文件名加title属性
            $(".downfileName").prop("title",res.knowledge.title)
        }
    })
}