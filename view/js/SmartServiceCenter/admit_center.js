$(function () {
    Common.toHome()
    Common.userInfo()
    Common.userImgClick()
    getArea()
    allImgTool()

    $('.facilitator').validate({
        errorLabelContainer:"#messageBox",
        errorElement: 'li',
        errorPlacement:function(error,element) {
            element.next('.table_cell').before(error)
        },
        rules: {
            pro_type: 'required',
            companyName: 'required',
            companyCode: 'required',
            zipCode: 'required',
            company_address1: 'required',
            company_address2: 'required',
            company_address3: 'required',
            company_address: 'required',
            starttime: 'required',
            branch_Office: 'required',
            listed_Office: 'required',
            companydescribe: 'required',

            legalPerson: 'required',
            companyTel: 'required',
            companyMobilr: 'required',
            companyEmail: 'required',
            linkmanTel: 'required'
        },
        messages: {
            pro_type: '请选择认证类型',
            companyName: '请输入申报单位',
            companyCode: '请输入组织机构代码',
            zipCode: '请输入邮编',
            company_address1: '请选择公司所属省市',
            company_address2: '请选择公司地址',
            company_address3: '请选择公司地址',
            company_address: '请输入公司详细地址',
            starttime: '请选择成立日期',
            branch_Office: '请选择是否成立分公司',
            listed_Office: '请选择是否上市',
            companydescribe: '请输入公司介绍',
            legalPerson: '请输入法人',
            companyTel: '请输入单位电话',
            companyMobilr: '请输入手机号',
            companyEmail: '请输入邮箱',
            linkmanTel: '请输入法人联系电话'
        }
    })


    $('#company_address1').on('change', function () {
        var val = $(this).val()
        $('#company_address3').html('')
        getArea(val, function (res) {
            var html = ''
            html += '<option value="">请选择</option>'
            $.each(res.areas, function (i, v) {
                html += '<option value="'+ v.areaId +'">'+ v.area +'</option>'
            })
            $('#company_address2').html(html)
        })
    })
    $('#company_address2').on('change', function () {
        var val = $(this).val()
        getArea(val, function (res) {
            var html = ''
            html += '<option value="">请选择</option>'
            $.each(res.areas, function (i, v) {
                html += '<option value="'+ v.areaId +'">'+ v.area +'</option>'
            })
            $('#company_address3').html(html)
        })
    })
    // 确认申请--合格服务商认证
    $(".sellersubmit").on("click",function (event) {
        event.preventDefault()
        // console.log($('.facilitator').valid())
        // return
        var pro = [], dataImg = {}, dataImgList = []
        $("input.checkinput:checked").each(function(){
            pro.push($(this).val())
        })
        dataImg.cardPositive = $('.idcard1 img').attr('src') || '' // 身份证正面
        dataImg.cardTails = $('.idcard2 img').attr('src') || '' // 身份证反面
        dataImg.companyData = $('.companydataimg img').attr('src') || '' // 公司营业资料
        dataImg.companyTax = $('.companytaximg img').attr('src') || '' // 税务登记证
        dataImg. companyOrganizational= $('.companyNumimg img').attr('src') || '' // 组织机构代码证
        dataImg.qualifiedPositive = $('.qualifications1 img').attr('src') || '' // 资质证明正面  
        dataImg.qualifiedTails = $('.qualifications2 img').attr('src') || '' // 资质证明反面 
        for(var i in dataImg) {
            dataImgList.push(dataImg[i])
        }
        $http({
            url: 'api/facilitator/save',
            type: 'post',
            data: {
                address: $(".company_address").val(),
                areaId: $("#company_address3").val(),
                branchOffice: $("input[name='branch_Office']:checked").val(),
                companyCode:$(".companyCode").val(),
                companyListing:$("input[name='listed_Office']:checked").val(),
                companyLogo:$(".logoupload img").attr("src"),
                companyMobilr:$(".companyMobilr").val(),
                companyName:$(".companyName").val(),
                companyTel:$(".companyTel").val(),
                describe:$(".companydescribe").val(),
                email:$(".companyEmail").val(),
                establishmentTime:new Date($(".starttime").val()),
                facilitatorCertificate: JSON.stringify(dataImgList),
                facilitatorType: pro.join(' '),
                legalPerson:$(".legalPerson").val(),
                linkmanTel:$(".linkmanTel").val(),
                zipCode:$(".zipCode").val()
            },
            success: function (res) {
                if (res.code == 200) {
                    alert('操作成功')
                    clearForm_company()
                } else {
                    alert(res.msg)
                } 
            }
        })
        return false
    })

})

function clearForm_company() {
    $('.sellerdetail input').val('')
    $('.sellerdetail select').val('')
    $('.sellerdetail textarea').val('')
}
function getArea (id, cb) {
    $http({
        url: 'api/area/list',
        type: 'get',
        data: {
            id: id ? id : 0
        },
        success: function (res) {
            if (res.msg == 'success') {
                if (!cb) {
                    var html = ''
                    html += '<option value="">请选择</option>'
                    $.each(res.areas, function (i, v) {
                        html += '<option value="'+ v.areaId +'">'+ v.area +'</option>'
                    })
                    $('#company_address1').html(html)
                } else {
                    cb(res)
                }
            } else {
                alert(res.msg)
            }
        }
    })
}
function imgUpload (ele, target) {
    $(ele).trigger('click')
    $(ele).one('change', function (ev) {
        var formData = new FormData()
        formData.append("file", ev.target.files[0]);
        $uploadfile({
            url: 'api/oss/upload',
            type: 'post',
            data: formData, 
            success: function (res) {
                if (res.msg == 'success') {
                    $(target + ' img').attr('src', res.url)
                }
            }
        })
    })
}
function allImgTool () {
    // 企业logo上传
    $('.logo_uploadbtn').on('click', function () {
        imgUpload('.companylogo', '.logoupload')
    })
    // 身份证上传---正面
    $('.idcard1btn').on('click', function () {
        imgUpload('.idcard1input', '.idcard1')
    })
    // 身份证上传---反面
    $('.idcard2btn').on('click', function () {
        imgUpload('.idcard2input', '.idcard2')
    })
    // 企业营业资料信息上传
    $('.companydatabtn').on('click', function () {
        imgUpload('.companydataup', '.companydataimg')
    })
    // 非三证合一上传---税务登记证
    $('.companytaxbtn').on('click', function () {
        imgUpload('.companytaxup', '.companytaximg')
    })
    // 非三证合一上传---组织机构代码证
    $('.companyNumbtn').on('click', function () {
        imgUpload('.companyNumup', '.companyNumimg')
    })
    // 资质证明上传---1
    $('.qualifications1btn').on('click', function () {
        imgUpload('.qualifications1up', '.qualifications1')
    })
    // 资质证明上传---2
    $('.qualifications2btn').on('click', function () {
        imgUpload('.qualifications2up', '.qualifications2')
    })
}