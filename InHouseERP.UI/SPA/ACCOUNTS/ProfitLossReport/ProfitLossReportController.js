app.controller("ProfitLossReportController", function ($scope, $cookieStore, $http, $window, $filter) {

    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    $scope.ProfitLossData = $cookieStore.get("ProfitLossData");

    if ($scope.ProfitLossData == null || $scope.ProfitLossData == undefined) {
        $scope.FromDate = null;
        $scope.ToDate = null;
    } else {
        $scope.FromDate = $scope.ProfitLossData.FromDate;
        $scope.ToDate = $scope.ProfitLossData.ToDate;
        $scope.DeptID = $scope.ProfitLossData.DeptID;
    }


    Clear();

    function Clear() {
        GetProfitLossReport();
        $scope.ProfitLossReportList = [];
    }


    function GetProfitLossReport() {
        $http({
            url: '/ChartOfAccounts/ProfitLossReportDeptWise?Depart_ID=' + $scope.DeptID + '&FormDate=' + $scope.FromDate + '&ToDate=' + $scope.ToDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ProfitLossReportList = data;


            angular.forEach($scope.ProfitLossReportList, function (aData) {
                aData.Debit = parseFloat(aData.Debit);
                aData.Credit = parseFloat(aData.Credit);
            })


            //console.log($scope.ProfitLossReportList)
            //$scope.$MainGroupList = $scope.ProfitLossReportList;


            //$scope.$SubMainGroupList = $scope.ProfitLossReportList;
            //$scope.SubMainGroupList = [];

            //$scope.$SubGroupHeadList = $scope.ProfitLossReportList;
            //$scope.SubGroupHeadList = [];

            //$scope.$HeadList = $scope.ProfitLossReportList;
            //$scope.HeadList = [];


            //$scope.MainGroupList = $scope.ProfitLossReportList.reduce((r, { AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup }) => {
            //    var temp = r.find(o => o.MainGroup === MainGroup && o.MainGroup === MainGroup);
            //    if (!temp) {
            //        r.push({ AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup });
            //    } else {
            //        temp.Debit = parseFloat(temp.Debit);
            //        temp.Credit = parseFloat(temp.Credit);
            //        temp.Debit += parseFloat(Debit);
            //        temp.Credit += parseFloat(Credit);
            //    }
            //    return r;
            //}, []);

            //$scope.TotalIncome = $scope.MainGroupList[0].Credit - $scope.MainGroupList[0].Debit;
            //$scope.TotalExpense = $scope.MainGroupList[1].Debit - $scope.MainGroupList[1].Credit;
            //$scope.TotalProfitAndLoss = $scope.TotalIncome - $scope.TotalExpense;

            $scope.CalMainGroup = $scope.ProfitLossReportList.reduce((r, { AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup }) => {
                var temp = r.find(o => o.MainGroup === MainGroup && o.MainGroup === MainGroup);
                if (!temp) {
                    r.push({ AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup });
                } else {
                    temp.Debit += Debit;
                    temp.Credit += Credit;
                }
                return r;
            }, []);

            $scope.CalSubMainGroup = $scope.ProfitLossReportList.reduce((r, { AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup }) => {
                var temp = r.find(o => o.SubMainGroup === SubMainGroup && o.SubMainGroup === SubMainGroup);
                if (!temp) {
                    r.push({ AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup });
                } else {
                    temp.Debit += Debit;
                    temp.Credit += Credit;
                }
                return r;
            }, []);

            $scope.CalSubGroupHead = $scope.ProfitLossReportList.reduce((r, { AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup }) => {
                var temp = r.find(o => o.SubGroupHead === SubGroupHead && o.SubGroupHead === SubGroupHead);
                if (!temp) {
                    r.push({ AccCode, Credit, Debit, Head, MainGroup, SubGroupHead, SubMainGroup });
                } else {
                    temp.Debit += Debit;
                    temp.Credit += Credit;
                }
                return r;
            }, []);



            $scope.MainGroup = Array.from(
                $scope.ProfitLossReportList.reduce((m, o) =>
                    m.set(o.MainGroup,(m.get(o.MainGroup) || []).concat(o)), new Map),
                ([MainGroup, SubMainGroup]) => ({ MainGroup, SubMainGroup })
            );

            

            $scope.MainGroupList = $scope.CalMainGroup.map(t1 => ({ ...t1, ...$scope.MainGroup.find(t2 => t2.MainGroup === t1.MainGroup) }))



            angular.forEach($scope.MainGroupList, function (aMainGroup) {
                aMainGroup.SubMainGroup = Array.from(
                    aMainGroup.SubMainGroup.reduce((m, o) => m.set(o.SubMainGroup, (m.get(o.SubMainGroup) || []).concat(o)), new Map),
                    ([SubMainGroup, SubGroupHead]) => ({ SubMainGroup, SubGroupHead })
                );

                //aMainGroup.SubMainGroup = $scope.CalSubMainGroup.map(t1 => ({ ...t1, ...aMainGroup.SubMainGroup.find(t2 => t2.SubMainGroup === t1.SubMainGroup) }))

            })

            angular.forEach($scope.MainGroupList, function (aMainGroup) {
                angular.forEach(aMainGroup.SubMainGroup, function (aSubMainGroup) {
                    aSubMainGroup.SubGroupHead = Array.from(
                        aSubMainGroup.SubGroupHead.reduce((m, o) => m.set(o.SubGroupHead, (m.get(o.SubGroupHead) || []).concat(o)), new Map),
                        ([SubGroupHead, HeadList]) => ({ SubGroupHead, HeadList })
                    );

                    //aSubMainGroup.SubGroupHead = $scope.CalSubGroupHead.map(t1 => ({ ...t1, ...aSubMainGroup.SubGroupHead.find(t2 => t2.SubGroupHead === t1.SubGroupHead) }))

                })
            })

            console.log($scope.MainGroupList);

        });
    }
});