
app.controller("VoucherReportController", function ($scope, $cookieStore, $http, $filter) {

    //$scope.SalesInvoiceId = parseInt(sessionStorage.getItem("SalesInvoiceId"));
    $scope.VoucherData = $cookieStore.get("VoucherData");
    Clear();

    function Clear() {

        $scope.VoucherReportList = [];
        GetAllVoucherReportdata();

    }


    function GetAllVoucherReportdata() {
        $http({
            url: '/JournalVoucher/VoucherReport?VoucherNo=' + $scope.VoucherData.VoucherNo,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.VoucherReportList = data;
            $scope.TotalCreditAmount = 0;
            $scope.TotalDebitAmount = 0;
            angular.forEach($scope.VoucherReportList, function (aData) {
                var res1 = aData.VDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.VDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.VDate = date1;
                }

                $scope.TotalCreditAmount += aData.CrAmount;
                $scope.TotalDebitAmount += aData.DrAmount;

                aData.CrAmount = aData.CrAmount.toLocaleString('en', { minimumFractionDigits: 2 });
                aData.DrAmount = aData.DrAmount.toLocaleString('en', { minimumFractionDigits: 2 });
            })

            

            $scope.TotalCreditAmount = $scope.TotalCreditAmount.toLocaleString('en', { minimumFractionDigits: 2 });
            $scope.TotalDebitAmount = $scope.TotalDebitAmount.toLocaleString('en', { minimumFractionDigits: 2 });
        });

    }


    


});




