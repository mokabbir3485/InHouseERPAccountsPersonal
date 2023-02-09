
app.controller("TrialBalanceReportController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.TrialBlance = $cookieStore.get("TrailBalance");

    Clear();
    function Clear() {
        $scope.name = "Trial Balance Report";
        $scope.TrailBalanceList = [];
        $scope.TrailBalanceFilterList = [];
        $scope.TrailBalanceIndexList = [];
    }

    $http({
        url: '/ChartOfAccounts/TrialBalanceReport?enddate=' + $scope.TrialBlance,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).success(function (data) {
        $scope.TrailBalanceIndexList = data;
        $scope.TrailBalanceList = data;

        $scope.$TrailBalanceList = $scope.TrailBalanceList;
        $scope.TrailBalanceList = Array.from(
            $scope.TrailBalanceList.reduce((m, o) => m.set(o.SubMainGroupName, (m.get(o.SubMainGroupName) || []).concat(o)), new Map),
            ([SubMainGroupName, DataList]) => ({ SubMainGroupName, DataList })
        );

        $scope.TrailBalanceFilterList = $scope.TrailBalanceList;
        $scope.TrailBalanceFilterList = $scope.TrailBalanceList;

        var num = 0;
        angular.forEach($scope.TrailBalanceList, function (aData) {

            angular.forEach(aData.DataList, function (ad) {

                num = ++num;
                ad.SN = num;
                // aData.AccCode = ad.AccCode;
            })

        })

    });



});