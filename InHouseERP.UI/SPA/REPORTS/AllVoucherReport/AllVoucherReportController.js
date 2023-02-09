app.controller("AllVoucherReportController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
 
    $scope.VoucherData = $cookieStore.get("AllVoucherList");
    
    $scope.CheckList = $scope.VoucherData;

  

    console.log($scope.CheckList);

    Clear();
    function Clear() {

        GetAllVoucher();
        $scope.VoucherReportList = [];
        $scope.CheckVoucherReportList = [];
        $scope.VoucherReportList = [];
      
    }


    function GetAllVoucher() {

          $scope.TotalCreditAmount = 0;
          $scope.TotalDebitAmount = 0;
        angular.forEach($scope.CheckList, function (aVoucher) {

            $http({
                url: '/JournalVoucher/VoucherReport?VoucherNo=' + aVoucher,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {


              
               
                angular.forEach(data, function (aData) {
                    var res1 = aData.VDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.VDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.VDate = date1;
                    }

                    //aData.TotalCreditAmount = 0;
                    //aData.TotalDebitAmount = 0;
                   // $scope.TotalCreditAmount += aData.CrAmount;
                  //  $scope.TotalDebitAmount += aData.DrAmount;

                    //aData.CrAmount = aData.CrAmount.toLocaleString('en', { minimumFractionDigits: 2 });
                    //aData.DrAmount = aData.DrAmount.toLocaleString('en', { minimumFractionDigits: 2 });
                    $scope.CheckVoucherReportList.push(aData);

                  


                })

              //  $scope.TotalCreditAmount = $scope.TotalCreditAmount.toLocaleString('en', { minimumFractionDigits: 2 });
               // $scope.TotalDebitAmount = $scope.TotalDebitAmount.toLocaleString('en', { minimumFractionDigits: 2 });

               
                $scope.VoucherReportList = $scope.CheckVoucherReportList;

                $scope.VoucherReportList = Array.from(
                    $scope.VoucherReportList.reduce((m, o) => m.set(o.VoucherNo, (m.get(o.VoucherNo) || []).concat(o)), new Map),
                    ([VoucherNo, DataList]) => ({ VoucherNo, DataList })

                );


                angular.forEach($scope.VoucherReportList, function (aMainData) {
                  
                    angular.forEach(aMainData.DataList, function (aList) {
                        aMainData.VDate = aList.VDate;
                       

                     
                        if (aMainData.VoucherNo == aList.VoucherNo) {
                         

                            if (aMainData.TotalCredit == undefined) {
                                aMainData.TotalCredit = 0;
                            }
                            if (aMainData.TotalDebit == undefined) {
                                aMainData.TotalDebit = 0;
                            }
                            aMainData.TotalCredit += aList.CrAmount;
                            aMainData.TotalDebit += aList.DrAmount;

                               //$scope.TotalCreditAmount += aList.CrAmount;;
                               //$scope.TotalDebitAmount += aList.DrAmount;
                        }

                    })
                })
                   

               
              
                
                
            });


        });


      
       

    }


   

});