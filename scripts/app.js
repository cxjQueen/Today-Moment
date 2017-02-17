var Yike = angular.module('Yike', ['ngRoute']);


Yike.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/today', {
            templateUrl: './views/today.html',
            controller: 'TodayCtrl'
        })
        .when('/older', {
            templateUrl: './views/older.html',
            controller: 'OlderCtrl'
        })
        .when('/author', {
            templateUrl: './views/author.html',
            controller: 'AuthorCtrl'
        })
        .when('/category', {
            templateUrl: './views/category.html',
            controller: 'CategoryCtrl'
        })
}]);

//添加一个全局方法用来实现页页交互

Yike.run(['$rootScope', function($rootScope) {
    //导航初始化
    $rootScope.collapsed = false;
    //导航交互
    $rootScope.collapse = function() {
        //导航开关切换
        $rootScope.collapsed = !$rootScope.collapsed;
        //导航dd内容动画
        var navs = document.querySelectorAll('.navs dd');
        //当前导航状态判断        
        if ($rootScope.collapsed) {
            //所有dd位置从-100%到0
            for (var i = 0; i < navs.length; i++) {
                navs[i].style.transform = 'translate(0)';
                navs[i].style.transitionDelay = '0.2s';
                navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
            }
        } else {
            //所有dd位置从0到-100%
            for (var j = navs.length; j > 0; j--) {
                navs[j - 1].style.transform = 'translate(-100%)';
                navs[j - 1].style.transitionDelay = '';
                navs[j - 1].style.transitionDuration = (navs.length - j + 1) * 0.15 + 's';
            }
        }
    }
}]);

Yike.controller('NavsCtrl', ['$scope', function($scope) {
    $scope.navs = [
        { text: '今日一刻', link: '#/today', icon: 'icon-home' },
        { text: '往期内容', link: '#/older', icon: 'icon-file-empty' },
        { text: '热门作者', link: '#/author', icon: 'icon-pencil' },
        { text: '栏目浏览', link: '#/category', icon: 'icon-menu' }
    ]

}]);
//今日内容
Yike.controller('TodayCtrl', ['$scope', '$http', function($scope, $http) {
    $http({
        url: './api/today.php'
    }).success(function(info) {
        $scope.posts = info.posts;
        $scope.date = info.date;
    })
}]);
//往期内容
Yike.controller('OlderCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    $rootScope.loaded = false;
    $rootScope.key = 1;
    $rootScope.title = '往期内容';
    $http({
        url: './api/older.php'
    }).success(function(info) {
        $rootScope.loaded = true;
        $scope.posts = info.posts;
        $scope.date = info.date;
    });
}]);
//热门作者
Yike.controller('AuthorCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $rootScope.loaded = false;
    $rootScope.title = '热门作者';
    $rootScope.key = 2;

    $http({
        url: './api/author.php'
    }).success(function(info) {
        $scope.rec = info.rec.authors;
        $scope.all = info.all.authors;
        $rootScope.loaded = true;
    });
}]);
//栏目浏览
Yike.controller('CategoryCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $http({
        url: './api/category.php'
    }).success(function(info) {
        console.log(info);
        $scope.columns = info.columns;
    });

}]);