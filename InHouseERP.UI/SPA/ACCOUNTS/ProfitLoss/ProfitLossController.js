app.controller("ProfitLossController", function ($scope, $cookieStore, $http, $window) {
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
        $scope.ProfitLossReportList = [];
        $scope.DepartmentList = [];
        GetAllDepartment();
    }
    function GetAllDepartment() {
        $http({
            url: '/JournalVoucher/GetAllDepartment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.DepartmentList = data;
            //$scope.ddlDepartment = { DeptID: '01' };
        });
    }

    $scope.GetProfitLossReport = function (DeptID) {
        $scope.ProfitLossReportList = [];

        $http({
            url: '/ChartOfAccounts/ProfitLossReportDeptWise?Depart_ID=' + DeptID + '&FormDate=' + $scope.FormDate + '&ToDate=' + $scope.ToDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ProfitLossReportList = data;
            console.log($scope.ProfitLossReportList)
            $scope.$MainGroupList = $scope.ProfitLossReportList;


            $scope.$SubMainGroupList = $scope.ProfitLossReportList;
            $scope.SubMainGroupList = [];

            $scope.$SubGroupHeadList = $scope.ProfitLossReportList;
            $scope.SubGroupHeadList = [];

            $scope.$HeadList = $scope.ProfitLossReportList;
            $scope.HeadList = [];


            $scope.MainGroupList = $scope.ProfitLossReportList.reduce((r, { AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup }) => {
                var temp = r.find(o => o.MainGroup === MainGroup && o.MainGroup === MainGroup);
                if (!temp) {
                    r.push({ AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup });
                } else {
                    temp.Debit = parseFloat(temp.Debit);
                    temp.Credit = parseFloat(temp.Credit);
                    temp.Debit += parseFloat(Debit);
                    temp.Credit += parseFloat(Credit);
                }
                return r;
            }, []);

            $scope.TotalIncome = $scope.MainGroupList[0].Credit - $scope.MainGroupList[0].Debit;
            $scope.TotalExpense = $scope.MainGroupList[1].Debit - $scope.MainGroupList[1].Credit;
            $scope.TotalProfitAndLoss = $scope.TotalIncome - $scope.TotalExpense;

            //$scope.MainGroupList = [...new Map($scope.ProfitLossReportList.map((item) => [item["MainGroup"], item])).values()];

        });

        $scope.GetSubMainGroupList = function (aMainGroup, DisplaySta) {
            $scope.SubMainGroupList = [];
            angular.forEach($scope.$SubMainGroupList, function (aData) {
                if (aData.MainGroup == aMainGroup.MainGroup) {
                    $scope.SubMainGroupList.push(aData);
                }
            })
            $scope.SubMainGroupList = $scope.SubMainGroupList.reduce((r, { AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup }) => {
                var temp = r.find(o => o.SubMainGroup === SubMainGroup && o.SubMainGroup === SubMainGroup);
                if (!temp) {
                    r.push({ AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup });
                } else {
                    temp.Debit = parseFloat(temp.Debit);
                    temp.Credit = parseFloat(temp.Credit);
                    temp.Debit += parseFloat(Debit);
                    temp.Credit += parseFloat(Credit);
                }
                return r;
            }, []);
            //$scope.SubMainGroupList = [...new Map($scope.SubMainGroupList.map((item) => [item["SubMainGroup"], item])).values()];

            angular.forEach($scope.SubMainGroupList, function (aData) {
                aData.DisplaySta2 = false;
            })
            angular.forEach($scope.MainGroupList, function (aData) {

                if (DisplaySta == true) {
                    aData.DisplaySta = false;
                    if (aData.SubGroupHead == aMainGroup.SubGroupHead) {
                        aData.DisplaySta = true;
                    }
                    if (aData.DisplaySta == true) {
                        aData.DisplaySta = true;
                    } else {
                        aData.DisplaySta = false;
                    }
                } else {
                    if (aData.MainGroup == aMainGroup.MainGroup) {
                        aData.DisplaySta = false;
                    }
                }


            })
        }
        $scope.GetSubGroupHeadList = function (aSubMainGroup, DisplaySta2) {
            $scope.SubGroupHeadList = [];
            angular.forEach($scope.$SubGroupHeadList, function (aData) {
                if (aData.SubMainGroup == aSubMainGroup.SubMainGroup) {
                    $scope.SubGroupHeadList.push(aData);
                }
            })
            $scope.SubGroupHeadList = $scope.SubGroupHeadList.reduce((r, { AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup }) => {
                var temp = r.find(o => o.SubGroupHead === SubGroupHead && o.SubGroupHead === SubGroupHead);
                if (!temp) {
                    r.push({ AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup });
                } else {
                    temp.Debit = parseFloat(temp.Debit);
                    temp.Credit = parseFloat(temp.Credit);
                    temp.Debit += parseFloat(Debit);
                    temp.Credit += parseFloat(Credit);
                }
                return r;
            }, []);
            //$scope.SubGroupHeadList = [...new Map($scope.SubGroupHeadList.map((item) => [item["SubGroupHead"], item])).values()];

            angular.forEach($scope.SubGroupHeadList, function (aData) {
                aData.DisplaySta3 = false;
            })
            angular.forEach($scope.SubMainGroupList, function (aData) {
                if (DisplaySta2 == true) {
                    aData.DisplaySta2 = false;
                    if (aData.SubGroupHead == aSubMainGroup.SubGroupHead) {
                        aData.DisplaySta2 = true;
                    }
                    if (aData.DisplaySta2 == true) {
                        aData.DisplaySta2 = true;
                    } else {
                        aData.DisplaySta2 = false;
                    }
                } else {
                    if (aData.SubMainGroup == aSubMainGroup.SubMainGroup) {
                        aData.DisplaySta2 = false;
                    }
                }


            })
        }

        $scope.GetHeadList = function (aSubGroupHead, DisplaySta3) {
            $scope.HeadList = [];
            angular.forEach($scope.$HeadList, function (aData) {
                if (aData.SubGroupHead == aSubGroupHead.SubGroupHead) {
                    $scope.HeadList.push(aData);
                }
            })
            angular.forEach($scope.SubGroupHeadList, function (aData) {
                if (DisplaySta3 == true) {
                    aData.DisplaySta3 = false;
                    if (aData.Head == aSubGroupHead.Head) {
                        aData.DisplaySta3 = true;
                    }
                    if (aData.DisplaySta3 == true) {
                        aData.DisplaySta3 = true;
                    } else {
                        aData.DisplaySta3 = false;
                    }
                } else {
                    if (aData.SubGroupHead == aSubGroupHead.SubGroupHead) {
                        aData.DisplaySta3 = false;
                    }
                }


            })
        }

        $scope.OpenReport = function () {
            $window.open("#/ProfitLossReport", "popup", "width=800,height=550,left=280,top=80");
            var ReportData = {};
            ReportData.DeptID = $scope.ddlDepartment.DeptID;
            ReportData.ToDate = $scope.ToDate;
            ReportData.FromDate = $scope.FormDate;
            $cookieStore.put("ProfitLossData", ReportData);
            event.stopPropagation();
        };

        //$scope.Print = function () {
        //    angular.forEach($scope.MainGroupList, function (aData) {
        //        aData.DisplaySta = true;
        //    })
        //    angular.forEach($scope.SubMainGroupList, function (aData) {
        //        aData.DisplaySta2 = true;
        //    })

        //    angular.forEach($scope.SubGroupHeadList, function (aData) {
        //        aData.DisplaySta3 = true;
        //    })


        //}


    }

    $("#txtFromDate").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateProfitLossReport = function () {
        $("#txtFromDate").focus();
        $("#txtFromDate").trigger("click");
    }


    $("#txtToDate").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateProfitLossReport = function () {
        $("#txtToDate").focus();
        $("#txtToDate").trigger("click");
    }
})