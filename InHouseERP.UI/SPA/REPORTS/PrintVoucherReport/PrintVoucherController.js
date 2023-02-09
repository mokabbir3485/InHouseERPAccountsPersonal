app.controller("PrintVoucherController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }



    Clear();

    function Clear() {
        $scope.example8data = [];
        $scope.VoucherTypeIdList = [];
        $scope.VoucherReportList = [];

        $scope.CheckVoucherReportList = [];
        GetAllSubCategory();
        $scope.example8settings = {
            scrollableHeight: '200px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
           // enableSearch: true,
        };
     

       
        
       // $scope.example8data = [];
       
       // $scope.VoucherTypeList = [];
       
        $scope.VoucherTypePlaceholder = {
            buttonDefaultText: "Voucher Type",
            searchPlaceholder: "Voucher Type"
        };
        $scope.selectSubcategory = document.getElementById("selectVoucherType").getElementsByTagName('button')[0];
        $scope.selectSubcategoryMenu = document.getElementById("selectVoucherType").getElementsByClassName('dropdown-menu')[0];
        $scope.selectSubcategory.style.width = "100%";
        $scope.selectSubcategoryMenu.style.width = "100%";
       
        $scope.VoucherListForGrid = [];
        $scope.CheckAll = false;
    }

    function GetAllSubCategory() {
       
        $scope.VoucherTypeList = [

            { TypeId: 1, TypeName: "Journal Voucher" },
            { TypeId: 2, TypeName: "Receipt Voucher" },
            { TypeId: 3, TypeName: "Payment Voucher" },
        ];

        angular.forEach($scope.VoucherTypeList, function (aData) {
            $scope.example8data.push({ id: aData.TypeId, label: aData.TypeName });
        });

      
       
    }


    $("#txtFromJV").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForJournalVoucher = function () {
        $("#txtFromJV").focus();
        $("#txtFromJV").trigger("click");
    }


    $("#txtToDateForJV").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForJournalVoucher = function () {
        $("#txtToDateForJV").focus();
        $("#txtToDateForJV").trigger("click");
    }

    $scope.fousSearchBox = function () {
       
    }

    $scope.LoadBtn = function () {
        $scope.CheckAll = false;
        $scope.TotalDebitAmount = 0;
        $scope.TotalCreditAmount = 0;
        if ($scope.VoucherTypeIdList.length > 0) {
            $scope.TypeIds = '';
            angular.forEach($scope.VoucherTypeIdList, function (data) {
                $scope.TypeIds += $scope.TypeIds == '' ? data.id : (',' + data.id)
            });

            $http({
                url: "/JournalVoucher/AllVoucherReport?FormDate=" + $scope.FromDate + "&ToDate=" + $scope.ToDate + "&VoucherType=" + $scope.TypeIds,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.VoucherListForGrid = data;
                angular.forEach($scope.VoucherListForGrid, function (aData) {
                    var res1 = aData.VDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.VDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.VDate = date1;
                    }

                    $scope.TotalDebitAmount += aData.DrAmount;
                    $scope.TotalCreditAmount += aData.CrAmount;
                })


            });
        } else {
            alertify.log('Voucher Type can`t empty', 'error', '5000');
        }
      

        //$scope.VoucherTypeList = [];
        //$scope.example8data = [];
    }

    $scope.fousSearchBox = function () {
        $scope.CheckVoucherReportList = [];
       
    }

    $scope.CheckAllBtn = function () {
      
        if ($scope.CheckAll == true) {
            angular.forEach($scope.VoucherListForGrid, function (aData) {
                aData.IsCheck = true;
                $scope.CheckVoucherReportList.push(aData.VoucherNo);
                
            })
        } else {
            angular.forEach($scope.VoucherListForGrid, function (aData) {
                aData.IsCheck = false;
                var index = $scope.CheckVoucherReportList.indexOf(aData);
                $scope.CheckVoucherReportList.splice(index, 1);

                
            })
        }
    }

    $scope.CheckBtn = function (Voucher) {
       
        if (Voucher.IsCheck == true) {
          
            $scope.CheckVoucherReportList.push(Voucher.VoucherNo);

        } else {
            $scope.CheckAll = false;
            var index = $scope.CheckVoucherReportList.indexOf(Voucher);
            $scope.CheckVoucherReportList.splice(index, 1);

        }

        if ($scope.CheckVoucherReportList.length == $scope.VoucherListForGrid.length) {
            $scope.CheckAll = true;
        }

    }


    
    $scope.ReportBtn = function () {
       // $cookieStore.put("AllVoucherData", $scope.CheckVoucherReportList);
        if ($scope.CheckVoucherReportList.length > 0) {
            $window.open("#/AllVoucherReport", "popup", "width=800,height=550,left=280,top=80");
            $cookieStore.put("AllVoucherList", $scope.CheckVoucherReportList);
            event.stopPropagation();
        } else {
            alertify.log('Voucher details can`t empty', 'error', '5000');
        }
       
    }

    $scope.ClearBtn = function () {
        Clear();
        $scope.FromDate =null;
        $scope.ToDate = null;
        $scope.CheckAll = false;
        $scope.TotalDebitAmount = 0;
        $scope.TotalCreditAmount = 0;
        $scope.VoucherTypeIdList = [];
    }

   

});