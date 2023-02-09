app.controller("GeneralLedgerReportController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.GLedger = $cookieStore.get("GeneralLedger");
    Clear();

    function Clear() {
        $scope.name = "General Ledger Report";
        $scope.ddlAccounthead = null;
        $scope.AccountHeadList = [];
        AccountGeneralLedger();
    }

   

   function AccountGeneralLedger() {

      
        $http({
            url: '/ChartOfAccounts/GeneralLedgerReport?AccountsCode=' + $scope.GLedger.Code + '&FormDate=' + $scope.GLedger.FormDate + '&ToDate=' + $scope.GLedger.ToDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data[0].VDate !== "/Date(-62135596800000)/" || data[0].VoucherNo == "") {
                $scope.OpeningBalanceDebitTemp = 0;
                $scope.OpeningBalanceCreditTemp =0;
            } else {
                $scope.OpeningBalanceDebitTemp = data[0].DrAmount;
                $scope.OpeningBalanceCreditTemp = data[0].CrAmount;
            }

         
            $scope.GeneralLedgerList = data.filter((aData) => aData.VDate !== "/Date(-62135596800000)/");

         //   $scope.GeneralLedgerList = data;
            //$scope.TotalDebitBlance = 0;
            //$scope.TotalCreditBlance = 0;
            //$scope.TotalClosingBlance = 0;
            //$scope.TotalAmount = 0;

            $scope.TotalDebitBlance = 0;
            $scope.TotalCreditBlance = 0;
            $scope.TotalDebitClosingBlance = 0;
            $scope.TotalCreditClosingBlance = 0;

            if ($scope.GeneralLedgerList.length > 0) {

                $scope.TotalDrAmount = 0;
                $scope.TotalCrAmount = 0;

                angular.forEach($scope.GeneralLedgerList, function (aData) {
                    $scope.TotalDebitBlance += aData.DrAmount;
                    $scope.TotalCreditBlance += aData.CrAmount;

                  

                    if (aData.VDate == "/Date(-62135596800000)/") {
                        aData.VDate = "";
                    }
                    var res1 = aData.VDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.VDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.VDate = date1;
                    }
                    $scope.TotalDrAmount += aData.DrAmount;
                    $scope.TotalCrAmount += aData.CrAmount;

                  

                })
               // $scope.TotalClosingBlance = ($scope.TotalDebitBlance - $scope.TotalCreditBlance) + $scope.GeneralLedgerList[0].DrAmount;
                $scope.TotalTempDebitBlance = $scope.TotalDebitBlance;
                $scope.TotalTempCreditBlance = $scope.TotalCreditBlance;

                var TotalDebitCurrent = $scope.OpeningBalanceDebitTemp + $scope.TotalTempDebitBlance;
                var TotalCreditCurrent = $scope.OpeningBalanceCreditTemp + $scope.TotalTempCreditBlance;

                var TempDebitval = TotalDebitCurrent - $scope.TotalTempCreditBlance;
                var TempCreditval = TotalDebitCurrent - TotalCreditCurrent;

                if (TempCreditval <= 0) {
                    $scope.TotalCreditClosingBlance = TempCreditval * (-1);
                } else {
                    $scope.TotalDebitClosingBlance = TempCreditval;
                }

                //if ($scope.GeneralLedgerList.length == 1) {
                //    $scope.TotalClosingBlance = $scope.GeneralLedgerList[0].DrAmount;
                //} else {
                //    var totalAmount = ($scope.TotalDebitBlance - $scope.TotalCreditBlance);
                  
                //    if (totalAmount < 0) {
                //        $scope.TotalClosingBlance = 0;
                //        $scope.TotalAmount = totalAmount * (-1);
                //    } else {
                //        $scope.TotalClosingBlance = totalAmount;
                //    }


                //}
            }
        });
    }



    

});