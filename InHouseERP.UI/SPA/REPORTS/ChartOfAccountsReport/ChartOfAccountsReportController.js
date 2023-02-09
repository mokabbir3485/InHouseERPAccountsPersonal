app.controller("ChartOfAccountsReportController", function ($scope, $cookieStore, $http, $filter) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    var Valuation = sessionStorage.getItem("ValuationSession");
    if (Valuation != null) {
        $scope.CurrentValuationSetup = JSON.parse(sessionStorage.ValuationSession);
    }
    Clear();
    function Clear() {
        $scope.ChartOfAccountsReportList = [];
        GetChartOfAccountsReport();
    }




    $scope.AutoCollase = function (aChartOfAccountsReport) {
        angular.forEach($scope.ChartOfAccountsReportList, function (aData) {
            if (aData.MainGroupID == aChartOfAccountsReport.MainGroupID && aChartOfAccountsReport.DisplaySta == true) {
                aData.DisplaySta = true;
            } else {
                aData.DisplaySta = false;
            }
        })
    }
    $scope.AutoCollase2 = function (aChartOfAccountsReport) {
        angular.forEach($scope.ChartOfAccountsReportList, function (aData) {
            if (aData.SupplierPaymentId == aChartOfAccountsReport.SupplierPaymentId && aChartOfAccountsReport.DisplaySta == true) {
                aData.DisplaySta2 = true;
            } else {
                aData.DisplaySta2 = false;
            }
        })
    }


    function GetChartOfAccountsReport () {
        $scope.ChartOfAccountsReportList = [];
        $http({
            url: '/ChartOfAccounts/GetChartOfAccountsReport',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ChartOfAccountsReportList = data;

            $scope.$MainGroupList = $scope.ChartOfAccountsReportList;
            $scope.$SubMainGroupList = $scope.ChartOfAccountsReportList;
            $scope.SubMainGroupList = [];
            $scope.$SubGroupHeadList = $scope.ChartOfAccountsReportList;
            $scope.SubGroupHeadList = [];

            $scope.MainGroupList = [...new Map($scope.ChartOfAccountsReportList.map((item) => [item["MainGroupID"], item])).values()];

        });

        $scope.GetSubMainGroupList = function (aMainGroup, DisplaySta) {
            $scope.SubMainGroupList = [];
            angular.forEach($scope.$SubMainGroupList, function (aData) {
                if (aData.MainGroupID == aMainGroup.MainGroupID) {
                    $scope.SubMainGroupList.push(aData);
                }
            })
            $scope.SubMainGroupList = [...new Map($scope.SubMainGroupList.map((item) => [item["SubMainGroupID"], item])).values()];

            angular.forEach($scope.SubMainGroupList, function (aData) {
                aData.DisplaySta2 = false;
            })
            angular.forEach($scope.MainGroupList, function (aData) {

                if (DisplaySta == true) {
                    aData.DisplaySta = false;
                    if (aData.SubGroupHeadID == aMainGroup.SubGroupHeadID) {
                        aData.DisplaySta = true;
                    }
                    if (aData.DisplaySta == true) {
                        aData.DisplaySta = true;
                    } else {
                        aData.DisplaySta = false;
                    }
                } else {
                    if (aData.MainGroupID == aMainGroup.MainGroupID) {
                        aData.DisplaySta = false;
                    }
                }

                
            })
        }
        $scope.GetSubGroupHeadList = function (aSubMainGroup, DisplaySta2) {
            $scope.SubGroupHeadList = [];
            angular.forEach($scope.$SubGroupHeadList, function (aData) {
                if (aData.SubMainGroupID == aSubMainGroup.SubMainGroupID) {
                    $scope.SubGroupHeadList.push(aData);
                }
            })
            
            angular.forEach($scope.SubMainGroupList, function (aData) {
                if (DisplaySta2 == true) {
                    aData.DisplaySta2 = false;
                    if (aData.SubGroupHeadID == aSubMainGroup.SubGroupHeadID) {
                        aData.DisplaySta2 = true;
                    }
                    if (aData.DisplaySta2 == true) {
                        aData.DisplaySta2 = true;
                    } else {
                        aData.DisplaySta2 = false;
                    }
                } else {
                    if (aData.SubMainGroupID == aSubMainGroup.SubMainGroupID) {
                        aData.DisplaySta2 = false;
                    }
                }

                
            })
        }
    }


})