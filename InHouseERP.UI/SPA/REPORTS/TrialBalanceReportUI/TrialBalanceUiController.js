
app.controller("TrialBalanceUiController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    Clear();

    function Clear() {
        $scope.name = "Trial Balance Report";
        $scope.TrailBalanceList = [];
        $scope.TrailBalanceFilterList = [];
        $scope.TrailBalanceIndexList = [];
    }

    $("#txtEndDate").datepicker({
        dateFormat: "M dd, yy"
    });

    $scope.OnEndTrialBalanceDate = function () {
        $("#txtEndDate").focus();
        $("#txtEndDate").trigger("click");
    }


    $scope.TrialBalanceLoad = function () {
        var newDate = new Date($scope.EndTrialBalanceDate);
        var date = newDate.getDate();
        var month = newDate.getMonth();
        var year = newDate.getFullYear();
        var EndTrialBalanceDate = date + '/' + (++month) + '/' + year;

        $http({
            url: '/ChartOfAccounts/TrialBalanceReport?enddate=' + EndTrialBalanceDate,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.TrailBalanceIndexList = data;
                $scope.TrailBalanceList = data;

                $scope.$TrailBalanceList = $scope.TrailBalanceList;
                $scope.TrailBalanceList = Array.from(
                    $scope.TrailBalanceList.reduce((m, o) => m.set(o.SubMainGroupName, (m.get(o.SubMainGroupName) || []).concat(o)), new Map),
                    ([SubMainGroupName,DataList]) => ({ SubMainGroupName, DataList })
                );


                $scope.TrailBalanceFilterList = $scope.TrailBalanceList;

                var num = 0;
                angular.forEach($scope.TrailBalanceList,function (aData) {

                    angular.forEach(aData.DataList, function (ad) {

                        num = ++num;
                        ad.SN = num;
                       // aData.AccCode = ad.AccCode;
                    })

                })
             
            });

      


       

   
    }

    $scope.TrialBalanceClear = function () {
        Clear();
        $scope.EndTrialBalanceDate = '';
    }

    $scope.OnReport = function () {
        var newDate = new Date($scope.EndTrialBalanceDate);
        var date = newDate.getDate();
        var month = newDate.getMonth();
        var year = newDate.getFullYear();
        var EndTrialBalanceDate = date + '/' + (++month) + '/' + year;

        $window.open("#/TrialBalanceReport", "popup", "width=850,height=550,left=280,top=80");

        $cookieStore.put("TrailBalance", EndTrialBalanceDate);
        event.stopPropagation();


    }

});