app.controller("GeneralLedgerController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    Clear();

    function Clear() {
        $scope.name = "General Ledger Report";
        $scope.ddlAccounthead = null;
        $scope.AccountHeadList = [];
        $scope.GeneralLedgerList = [];
        $scope.TempLedgerData = [];
        GetAllChartOfAccountHead();
    }

    function GetAllChartOfAccountHead() {
        $http({
            url: '/ChartOfAccounts/GetAllChartOfAccountHead',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AccountHeadList = data;
        });
    }


    $scope.OnReport = function () {
        if ( $scope.ddlAccounthead != null || $scope.ddlAccounthead != undefined) {

            var obj = {};

            var newDate = new Date($scope.generalFormDate);
            var date = newDate.getDate();
            var month = newDate.getMonth();
            var year = newDate.getFullYear();
            var FormDate = date + '/' + (++month) + '/' + year;

            var newDate = new Date($scope.generalToDate);
            var date = newDate.getDate();
            var month = newDate.getMonth();
            var year = newDate.getFullYear();
            var ToDate = date + '/' + (++month) + '/' + year;

            obj.FormDate = FormDate;
            obj.generalFormDate = $scope.generalFormDate;

            obj.generalToDate = $scope.generalToDate;
            obj.ToDate = ToDate;
            obj.Head = $scope.ddlAccounthead.Head;

            obj.Code = $scope.ddlAccounthead.Code;
            $window.open("#/GeneralLedgerReport", "popup", "width=850,height=550,left=280,top=80");

            $cookieStore.put("GeneralLedger", obj);
            event.stopPropagation();
        }
       
    }

    $scope.GeneralLedgerLoad = function () {

        $scope.TotalTempDebitBlance = 0;
        var newDate = new Date($scope.generalFormDate);
        var date = newDate.getDate();
        var month = newDate.getMonth();
        var year = newDate.getFullYear();
        var FormDate = date + '/' + (++month) + '/' + year;

        var newDate = new Date($scope.generalToDate);
        var date = newDate.getDate();
        var month = newDate.getMonth();
        var year = newDate.getFullYear();
        var ToDate = date + '/' + (++month) + '/' + year;

        if ($scope.ddlAccounthead != null || $scope.ddlAccounthead != undefined) {
        $http({
            url: '/ChartOfAccounts/GeneralLedgerReport?AccountsCode=' + $scope.ddlAccounthead.Code + '&FormDate=' + FormDate + '&ToDate=' + ToDate,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
           
            if (data[0].VDate !== "/Date(-62135596800000)/" || data[0].VoucherNo =="") {
                $scope.OpeningBalanceDebitTemp = 0;
                $scope.OpeningBalanceCreditTemp = 0;
            } else {
                $scope.OpeningBalanceDebitTemp = data[0].DrAmount;
                $scope.OpeningBalanceCreditTemp = data[0].CrAmount;
            }
          

           
            $scope.GeneralLedgerList = data.filter((aData) => aData.VDate !== "/Date(-62135596800000)/");

         

          

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


            //angular.forEach(data,function (aD) {
            //    if (aD.VDate !== "/Date(-62135596800000)/") {
            //        aD.VDate = "";
            //        $scope.GeneralLedgerList.push(aD);
            //    }


            //})

           
               

                $scope.TotalTempDebitBlance = $scope.TotalDebitBlance ;
                $scope.TotalTempCreditBlance = $scope.TotalCreditBlance ;

                //if ($scope.OpeningBalanceDebitTemp <= 0) {
                //    $scope.TotalDebitClosingBlance = ($scope.TotalTempDebitBlance - $scope.TotalTempCreditBlance) + $scope.OpeningBalanceDebitTemp;
                //}
                //if ($scope.OpeningBalanceDebitTemp == 0) {
                //    $scope.TotalDebitClosingBlance = 0;
                //}

                //if ($scope.OpeningBalanceCreditTemp < 0) {
                //    var OpeningCredit = ($scope.TotalTempCreditBlance - $scope.TotalTempDebitBlance) + $scope.OpeningBalanceCreditTemp;
                //    $scope.TotalCreditClosingBlance = OpeningCredit * (-1);
                  

                //}
                var TotalDebitCurrent = $scope.OpeningBalanceDebitTemp + $scope.TotalTempDebitBlance;
                var TotalCreditCurrent = $scope.OpeningBalanceCreditTemp + $scope.TotalTempCreditBlance;

                var TempDebitval = TotalDebitCurrent - $scope.TotalTempCreditBlance;
                var TempCreditval =TotalDebitCurrent - TotalCreditCurrent;

                if (TempCreditval <= 0) {
                    $scope.TotalCreditClosingBlance = TempCreditval * (-1);
                } else {
                    $scope.TotalDebitClosingBlance = TempCreditval;

                    //if (TempCreditval > TempDebitval) {
                    //    $scope.TotalDebitClosingBlance = TempDebitval;
                    //} else {
                    //    $scope.TotalDebitClosingBlance = TempCreditval;
                    //}
                }

                //if (TempDebitval <= 0) {
                //    $scope.TotalCreditClosingBlance = TempDebitval * (-1);
                //} else {
                //    $scope.TotalDebitClosingBlance = TempDebitval;
                //}
               


                //if ($scope.OpeningBalanceCreditTemp <= 0) {
                //    var OpeningCredit = ($scope.TotalTempCreditBlance - $scope.TotalTempDebitBlance) + $scope.OpeningBalanceCreditTemp;
                    
                //    $scope.TotalCreditClosingBlance = 0;
                //    if (OpeningCredit < 0) {
                //        $scope.TotalCreditClosingBlance = OpeningCredit * (-1);
                //    } else {
                //        $scope.TotalDebitClosingBlance = ($scope.TotalTempDebitBlance - $scope.TotalTempCreditBlance) + $scope.OpeningBalanceDebitTemp;
                //    }

                //}

                


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

                //if ($scope.TotalClosingBlance < 0) {
                //    $scope.TotalAmount = $scope.TotalCreditBlance;
                //}
                


            }
        });
    }
  }


    $scope.GeneralLedgerAndAccountHeadClear = function () {


        $scope.generalToDate = "";
        $scope.generalFormDate = "";

        $('#accountHead').select2('destroy');
        $('#accountHead').val('').select2({
            placeholder: "--Select Account Head --",
            theme: "classic",
            dropdownAutoWidth: false
        });

        Clear();
    }


    $("#txtFromDate").datepicker({
        dateFormat: "M dd, yy"
    });

    $scope.FormDateGeneralLedger = function () {
        $("#txtFromDate").focus();
        $("#txtFromDate").trigger("click");
    }


    $("#txtToDate").datepicker({
        dateFormat: "M dd, yy"
    });

    $scope.ToDateGeneralLedger = function () {
        $("#txtToDate").focus();
        $("#txtToDate").trigger("click");
    }

});