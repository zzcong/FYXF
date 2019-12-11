$(function () {
    Common.toHome()
    Common.userInfo()
    Common.menuHover()
    Common.tabChange()
    // Common.userImgClick()
    
    // // 获取地区
    // getArea()
    // $('#company_address1').on('change', function () {
    //     var val = $(this).val()
    //     $('#company_address3').html('')
    //     getArea(val, function (res) {
    //         var html = ''
    //         html += '<option value="">请选择</option>'
    //         $.each(res.areas, function (i, v) {
    //             html += '<option value="'+ v.areaId +'">'+ v.area +'</option>'
    //         })
    //         $('#company_address2').html(html)
    //     })
    // })
    // $('#company_address2').on('change', function () {
    //     var val = $(this).val()
    //     getArea(val, function (res) {
    //         var html = ''
    //         html += '<option value="">请选择</option>'
    //         $.each(res.areas, function (i, v) {
    //             html += '<option value="'+ v.areaId +'">'+ v.area +'</option>'
    //         })
    //         $('#company_address3').html(html)
    //     })
    // })
    // 志愿者认证资质附件上传
    $('.uploadbtn').on('click', function () {
        $('.qualification-annex').off('change')
        $('.qualification-annex').trigger('click')
        $('.qualification-annex').one('change', function (ev) {
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.qualificationsFile').val(ev.target.files[0].name)
                        $('.qualification-url').val(res.url)
                    }
                }
            })
        })
    })
    // 确认申请--志愿者认证
    $(".volunteersubmit").on("click",function (event) {
        event.preventDefault();
        if($('.certification-volunteer input').val()==''&&$('.certification-volunteer input').val()== null){
            alert('有未填写信息,请检查!')
            return false
        }
        $http({
            url: 'api/volunteer/save',
            type: 'post',
            data: {
                volunteerType:$('.volunteertype').val(),
                realName:$('.pname').val(),
                idNumber:$('.idcardnum').val(),
                qualificationsName:$('.qualificationsName').val(),
                qualificationsFile: JSON.stringify([$('.qualification-url').val()]),
                qualificationsIntroduce: $('.aboutenclosure').val()
            },
            success: function (res) {
                if (res.code == 200) {
                    alert('操作成功')
                    clearForm_v()
                } else {
                    alert(res.msg)
                } 
            }
        })
        return false
    })
    // 获取志愿者信息
    getVolunteerDetial()
// 合格服务商认证开始
    // 企业logo上传
    $('.logo_uploadbtn').on('click', function () {
        $('.companylogo').off('change')
        $('.companylogo').trigger('click')
        $('.companylogo').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.logoupload img').attr('src', '')
                $('.logo_care').show(400)
                return
            }
            $('.logo_care').hide()
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.logoupload img').attr('src', res.url)
                    }
                }
            })
        })
    })
    // 身份证上传---正面
    $('.idcard1btn').on('click', function () {
        $('.idcard1input').off('change')
        $('.idcard1input').trigger('click')
        $('.idcard1input').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.idcard1 img').attr('src', '')
                $('.idcardcare').show(400)
                return
            }
            $('.idcardcare').hide()
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.idcard1 img').attr('src', res.url)
                    }
                }
            })
        })
    })
    // 身份证上传---反面
    $('.idcard2btn').on('click', function () {
        $('.idcard2input').off('change')
        $('.idcard2input').trigger('click')
        $('.idcard2input').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.idcard2 img').attr('src', '')
                $('.idcardcare').show(400)
                return
            }
            $('.idcardcare').hide()
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.idcard2 img').attr('src', res.url)
                    }
                }
            })
        })
    })
    // 企业营业资料信息上传
    $('.companydatabtn').on('click', function () {
        $('.companydataup').off('change')
        $('.companydataup').trigger('click')
        $('.companydataup').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.companydataimg img').attr('src', '')
                $('.companydatacare').show(400)
                return
            }
            $('.companydatacare').hide()
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.companydataimg img').attr('src', res.url)
                    }
                }
            })
        })
    })
    // 非三证合一上传---税务登记证
    $('.companytaxbtn').on('click', function () {
        $('.companytaxup').off('change')
        $('.companytaxup').trigger('click')
        $('.companytaxup').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.companytaximg img').attr('src', '')
                $('.companyofcare').show(400)
                return
            }
            $('.companyofcare').hide()
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.companytaximg img').attr('src', res.url)
                    }
                }
            })
        })
    })
    // 非三证合一上传---组织机构代码证
    $('.companyNumbtn').on('click', function () {
        $('.companyNumup').off('change')
        $('.companyNumup').trigger('click')
        $('.companyNumup').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.companyNumimg img').attr('src', '')
                $('.companyofcare').show(400)
                return
            }
            $('.companyofcare').hide()
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.companyNumimg img').attr('src', res.url)
                    }
                }
            })
        })
    })
    // 资质证明上传---1
    $('.qualifications1btn').on('click', function () {
        $('.qualifications1up').off('change')
        $('.qualifications1up').trigger('click')
        $('.qualifications1up').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.qualifications1 img').attr('src', '')
                $('.qualificationsofcare').show(400)
                return
            }
            $('.qualificationsofcare').hide()
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.qualifications1 img').attr('src', res.url)
                    }
                }
            })
        })
    })
    // 资质证明上传---2
    $('.qualifications2btn').on('click', function () {
        $('.qualifications2up').off('change')
        $('.qualifications2up').trigger('click')
        $('.qualifications2up').one('change', function (ev) {
            var reg = /image\/png|image\/jpeg|image\/jpg/
            var fileType = ev.target.files[0].type
            if (!reg.test(fileType)) {
                $('.qualifications2 img').attr('src', '')
                $('.qualificationsofcare').show(400)
                return
            }
            $('.qualificationsofcare').hide()
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.qualifications2 img').attr('src', res.url)
                    }
                }
            })
        })
    })
    // 添加资质上传
    $('.addqualifications').on('click', function () {
        $('.addqualificationsup').off('change')
        $('.addqualificationsup').trigger('click')
        $('.addqualificationsup').one('change', function (ev) {
            var formData = new FormData()
            formData.append("file", ev.target.files[0]);
            $uploadfile({
                url: 'api/oss/upload',
                type: 'post',
                data: formData, 
                success: function (res) {
                    if (res.msg == 'success') {
                        $('.addqualificationsinput').val(res.url)
                        $('.qualificationsname').val(ev.target.files[0].name)
                        $('.qualificationsname').show(400)
                    }
                }
            })
        })
    })
    // 确认申请--合格服务商认证
    $(".sellersubmit").on("click",function (event) {
        event.preventDefault()
        // if(!$('.sellerdetail input:not([type="file"])') || !$('warpper img').attr('src')){
        //     alert('信息不完整,请检查!')
        //     return false
        // }
        // var pro = ''
        var pro = [], dataImg = {},dataImgList = []
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
                address: $(".dressdetail").val(),
                areaId: $("#company_address3").val(),
                branchOffice: $("input[name='branch_Office']").val(),
                companyCode:$(".sellercompanynum").val(),
                companyListing:$("input[name='listed_Office']").val(),
                companyLogo:$(".logoupload img").attr("src"),
                companyMobilr:$(".personnum").val(),
                companyName:$(".sellercompany").val(),
                companyTel:$(".companyphone").val(),
                describe:$(".aboutcompany").val(),
                email:$(".mailbox").val(),
                establishmentTime:new Date($(".starttime").val()),
                facilitatorCertificate: JSON.stringify(dataImgList),
                facilitatorType: pro.join(' '),
                legalPerson:$(".legalperson").val(),
                linkmanTel:$(".personalphone").val(),
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

// 合格服务商认证结束

    // 获取合格服务商信息
    getSellerDetial()

})
// 获取志愿者信息
function getVolunteerDetial(){
    var user = JSON.parse(window.localStorage.getItem('user'))
    $http({
        url: 'api/volunteer/getVolunteer',
        type: 'get',
        data: {
            userId:user.userId
        },
        success: function (res) {
            if (res.msg == 'success') {
                if (!res.volunteer) return
                if(res.volunteer.volunteerStatus =='0'){
                    $(".volunteertype").val("全部")
                }else if(res.volunteer.volunteerStatus =='1'){
                    $(".volunteertype").val("普通志愿者")
                }else if(res.volunteer.volunteerStatus =='2'){
                    $(".volunteertype").val("专业志愿者")
                }
                $(".pname").val(res.volunteer.realName)
                $(".idcardnum").val(res.volunteer.idNumber)
                $(".qualificationsName").val(res.volunteer.qualificationsName)
                var arr = JSON.parse(res.volunteer.qualificationsFile)
                if(arr.length) {
                    $('.qualification-url').val(arr[0])
                    if (arr[0].indexOf('/') > -1) {
                        var len = arr[0].split('/').length
                        $(".qualificationsFile").val(arr[0].split('/')[len-1])
                    }
                }
                $(".aboutenclosure").val(res.volunteer.qualificationsIntroduce)
            } else {
                alert(res.msg)
            } 
        }
    })
}
// 获取合格服务商信息
function getSellerDetial(){
    var user = JSON.parse(window.localStorage.getItem('user'))
    $http({
        url: 'api/facilitator/getFacilitator',
        type: 'get',
        data: {
            userId:user.userId
        },
        success: function (res) {
            var s = res.facilitator.areaId.toString().substr(0,2) + '0000',
                sh = res.facilitator.areaId.toString().substr(0,4) + '00'
                q = res.facilitator.areaId.toString()
            getArea(function (res) {
                var html = ''
                html += '<option value="">请选择</option>'
                $.each(res.areas, function (i, v) {
                    if (v.areaId.toString() === s) {
                        html += '<option selected value="'+ v.areaId +'">'+ v.area +'</option>'
                        getArea(function (res) {
                            var html1 = ''
                            html1 += '<option value="">请选择</option>'
                            $.each(res.areas, function (m, n) {
                                if (n.areaId.toString() === sh) {
                                    html1 += '<option selected value="'+ n.areaId +'">'+ n.area +'</option>'
                                    getArea(function (res) {
                                        var html2 = ''
                                        html2 += '<option value="">请选择</option>'
                                        $.each(res.areas, function (x, y) {
                                            if (y.areaId.toString() === q) {
                                                html2 += '<option selected value="'+ y.areaId +'">'+ y.area +'</option>'
                                                
                                            } else {
                                                html2 += '<option value="'+ y.areaId +'">'+ y.area +'</option>'
                                            }
                                        })
                                        $('#company_address3').html(html2)
                                    },n.areaId)
                                    
                                } else {
                                    html1 += '<option value="'+ n.areaId +'">'+ n.area +'</option>'
                                }
                            })
                            $('#company_address2').html(html1)
                        },v.areaId)
                    } else {
                        html += '<option value="'+ v.areaId +'">'+ v.area +'</option>'
                    }
                })
                $('#company_address1').html(html)
            },0)
            var data = res.facilitator
            if (res.msg == 'success') {
                $('.sellercheck .checkinput').each(function () {
                    var val = $(this).val()
                    if (data.facilitatorType.indexOf(val) > -1) {
                        $(this).prop('checked', true)
                    }
                })
                $(".logoupload img").attr("src",data.companyLogo)
                $(".sellercompany").val(data.companyName)
                $(".sellercompanynum").val(data.companyCode)
                $(".zipCode").val(data.zipCode)
                $(".dressdetail").val(data.address)
                $(".starttime").val(dateFormat(data.establishmentTime))
                if(data.branchOffice == '0'){
                    $(".branchOffice input[value='0']").attr("checked",true)
                }else if(data.branchOffice == '1'){
                    $(".branchOffice input[value='1']").attr("checked",true)
                }else if(data.branchOffice == '2'){
                    $(".branchOffice input[value='2']").attr("checked",true)
                }
                if(data.companyListing == '0'){
                    $(".listedOffice input[value='0']").attr("checked",true)
                }else if(data.companyListing == '1'){
                    $(".listedOffice input[value='1']").attr("checked",true)
                }else if(data.companyListing == '2'){
                    $(".listedOffice input[value='2']").attr("checked",true)
                }
                $(".aboutcompany").val(data.describe)
                $(".legalperson").val(data.legalPerson)
                $(".companyphone").val(data.companyTel)
                $(".personnum").val(data.linkmanTel)
                $(".personalphone").val(data.companyMobilr)
                $(".mailbox").val(data.email)

                var qualificationsFile = JSON.parse(data.facilitatorCertificate)
                $('.idcard1 img').attr('src', qualificationsFile[0]) // 身份证正面
                $('.idcard2 img').attr('src', qualificationsFile[1]) // 身份证反面
                $('.companydataimg img').attr('src', qualificationsFile[2]) // 公司营业资料
                $('.companytaximg img').attr('src', qualificationsFile[3]) // 税务登记证
                $('.companyNumimg img').attr('src', qualificationsFile[4]) // 组织机构代码证
                $('.qualifications1 img').attr('src', qualificationsFile[5]) // 资质证明正面  
                $('.qualifications2 img').attr('src', qualificationsFile[6]) // 资质证明反面
                // $(".aboutenclosure").val(data.areaId)//预留areaId回显
                // $(".idcard1 img").attr("src",data.qualificationsFile)//预留法人身份证回显
                // $(".idcard2 img").attr("src",data.qualificationsFile)//预留法人身份证回显
                // $(".companydataimg img").attr("src",data.qualificationsIntroduce)//预留企业资料图的回显
                // $(".companytaximg img").attr("src",data.qualificationsFile)//预留非三证合一回显
                // $(".companyNumimg img").attr("src",data.qualificationsFile)//预留非三证合一回显
                // $(".qualifications1 img").attr("src",data.facilitatorCertificate)
                // $(".qualifications2 img").attr("src",data.qualificationsFile)//预留资质证明回显
                // $(".certname").val(data.realName)
                // $(".certnumber").val(data.idNumber)
                // $(".addqualificationsinput").val(data.qualificationsName)//预留添加资质回显
                // $(".qualificationsname").val(data.qualificationsFile)//预留加资质回显
            } else {
                alert(res.msg)
            } 
        }
    })
}
// 获取所有地区
function getArea (cb,id) {
    $http({
        url: 'api/area/list',
        type: 'get',
        data: {
            id: id ? id : 0
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
function clearForm_v () {
    $('.volunteertype').val('')
    $('.pname').val('')
    $('.idcardnum').val('')
    $('.qualificationsName').val('')
    $('.qualificationsFile').val('')
    $('.aboutenclosure').val('')
}
function clearForm_company () {
    window.location.reload(true)
}