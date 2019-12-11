$(function () {
    Fun.isLoad()
    Fun.liHoverStyle()
    Fun.login()
    Fun.hideLoginMode()
    Fun.userTool()
    Fun.closeModel('.volunteer-close', '.volunteer')
    Fun.closeModel('.audit-close', '.auditing')
    Fun.li2page()
    Fun.getUserInfo()
    Fun.userTools('.user-center', function () {
        window.location.href = './pages/user/index.html'
    })
    Fun.userTools('.logout', function () {
        $http({
            url: 'api/logout',
            type: 'post',
            success: function (res) {
                if (res.msg == 'success') {
                    window.localStorage.clear()
                    window.location.reload()
                }
            }
        })
    })
    
})
var Fun = {
    isLoad: function () {
        if (window.localStorage.getItem('token')) {
            $('.not-login').hide()
            $('.sign-in').show()
        } else {
            $('.not-login').show()
            $('.sign-in').hide()
        }
    },
    liHoverStyle: function () {
        $('.menus li').hover(
            function () {
                var srcHover = $(this).find('img').attr('src').split('.png')[0] + '-hover.png'
                $(this).find('img').attr('src', srcHover)
            },
            function () {
                var src = $(this).find('img').attr('src').split('-hover.png')[0] + '.png'
                $(this).find('img').attr('src', src)
            }
        )
    },
    login: function () {
        $('.not-login').on('click', function () {
            // $('.login').show()
            window.location.href = './pages/login.html'
        })
    },
    hideLoginMode: function () {
        $('.login').on('click', function () {
            $('.login').hide()
            $('.not-login').hide()
            $('.sign-in').show()
        })
    },
    userTool: function () {
        $('.sign-in').on('click', function () {
            $('.user-tools').slideToggle(300);
        })
    },
    closeModel: function (ele, target) {
        $(ele).on('click', function () {
            $(target).hide()
        })
    },
    li2page: function () {
        $('.menus li').on('click', function () {
            var index = $(this).index()
            switch (index) {
                case 0:
                window.location.href = 'http://218.108.102.212:9832/enterprise-pc/login.html'
                break
                case 1:
                window.location.href = 'http://218.108.102.210:8089/fire/singleLogin.html'
                break
                case 2:
                window.location.href = 'http://218.108.102.212:9832/enterprise-pc/logins.html'
                break
                case 3:
                window.location.href = 'http://218.108.102.212:9832/operation-management/shome.html'
                break
                case 4:
                window.location.href = './pages/ConvenientServiceCenter/index.html'
                break
                case 5:
                window.location.href = './pages/train/index.html'
                break
                case 6:
                window.location.href = './pages/VolunteerCenter/index.html'
                break
                case 7:
                window.location.href = './pages/SmartServiceCenter/index.html'
            }
        })
    },
    pawLogin: function () {
        $http({
            url: 'api/login',
            type: 'post',
            data: {
                "mobile": "13612345678",
                "password": "admin"
            },
            success: function (res) {
                if (res.msg == 'success') {
                    window.localStorage.setItem('token',res.token)
                    Fun.getUserInfo()
                    $('.not-login').hide()
                    $('.sign-in').show()
                }
            }
        })
    },
    userTools: function (ele, callback) {
        $(ele).on('click', function () {
            callback()
        })
    },
    getUserInfo: function () {
        var user = JSON.parse(window.localStorage.getItem('user'))
        if (!user) return
        $('.user-name span').text(user.nickname)
        user.avatar ? $('.user-img').css({
            'background-image': 'url('+user.avatar+')'
        }) : null
    }
}