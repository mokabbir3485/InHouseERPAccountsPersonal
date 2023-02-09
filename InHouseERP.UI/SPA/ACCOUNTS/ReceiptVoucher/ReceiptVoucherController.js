app.controller("ReceiptVoucherController", function ($scope, $http, $window, $filter, $cookieStore) {

    $scope.Title = "ReceiptVoucher";

    Clear();

    function Clear() {
        $scope.ac_ReceiptVoucher = {};

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        PaymentVoucherGetPaged($scope.currentPage);

        $scope.ddlDrHead = null;
        $scope.ddlCrHead = null;
        $scope.ddlEmployee = null;
        $scope.ddlDepartment = null;
        $scope.ddlBranch = null;
        $scope.BtnName = 'Add';
        $scope.TotalCreditAmount = 0;
        $scope.TotalDebitAmount = 0;
        $scope.ac_ReceiptVoucher.VDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.BranchList = [];
        $scope.DepartmentList = [];
        $scope.AccountHeadList = [];
        $scope.JournalList = [];
        $scope.EmployeeList = [];
        $scope.CancelList = [];
        $scope.ReceiptVoucherList = [];
        $scope.ReceiptVoucherFilterList = [];
        $scope.AccountHeadFilterList = [];

        $scope.PaymentVoucgerGetPagedListForGrid = [];

        $scope.AccountHeadFilterList = [];

        GetAllEmployee();
        GetByVoucherGenerate();
        GetAllDepartment();
        GetAllBranch();
        GetAllChartOfAccountHead();

    }

    $("#txtVoucherDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.PaymentVoucherDateChange = function () {
        $("#txtVoucherDate").focus();
        $("#txtVoucherDate").trigger("click");
    }

    //$("#txtVoucherDate").datepicker({
    //    dateFormat: "M d yy",

    //});
    //$("#txtChequeDate").datepicker({
    //    dateFormat: "M d yy",

    //});


    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            angular.forEach(data, function (aData) {
                aData.FullName = aData.FullName + ' ~ ' + aData.DesignationName;
                $scope.EmployeeList.push(aData);
            })
        });
    }

    $scope.AddReceiptVoucher = function () {
        if ($scope.BtnName == 'Add') {
            var obj = {};

            var VoucherType = $scope.ac_ReceiptVoucher.VoucherNo.substring(0, 3);
            obj.rid = $scope.ac_ReceiptVoucher.rid;
            obj.VoucherType = VoucherType;
            obj.CR_DeptID = 0;
            obj.CR_DeptID = 0;
            obj.IsCancel = 0;
            obj.isConfirmed = true;
            obj.DrCode = $scope.ddlDrHead.Code;
            obj.DrHead = $scope.ddlDrHead.Head;
            obj.CrCode = $scope.ddlCrHead.Code;
            obj.CrHead = $scope.ddlCrHead.Head;
            obj.DrAmount = $scope.ac_ReceiptVoucher.DrAmount;
            obj.CrAmount = $scope.ac_ReceiptVoucher.CrAmount;
            obj.ChequeNo = $scope.ac_ReceiptVoucher.ChequeNo;
            obj.Particulars = $scope.ac_ReceiptVoucher.Particulars;
            obj.invoice_no = $scope.ac_ReceiptVoucher.invoice_no;

            obj.BranchID = $scope.ddlBranch.BranchID;
            obj.DeptID = $scope.ddlDepartment.DeptID;
            obj.DepartmentName = $scope.ddlDepartment.DepartmentName;
            //obj.VoucherNo = $scope.ac_ReceiptVoucher.VoucherNo;
            //obj.VDate = $scope.ac_ReceiptVoucher.VDate;
            if ($scope.ddlEmployee != null) {
                obj.ReceivedBy = $scope.ddlEmployee.EmployeeId;
            }

            obj.creator = $scope.LoginUser.FullName;
            obj.modifier = $scope.LoginUser.FullName;

            $scope.ReceiptVoucherList.push(obj);


        } else {
            $scope.ReceiptVoucherList[$scope.EditIndex].DeptID = $scope.ddlDepartment.DeptID;
            $scope.ReceiptVoucherList[$scope.EditIndex].DepartmentName = $scope.ddlDepartment.DepartmentName;
            $scope.ReceiptVoucherList[$scope.EditIndex].DrCode = $scope.ddlDrHead.Code;
            $scope.ReceiptVoucherList[$scope.EditIndex].DrHead = $scope.ddlDrHead.Head;
            $scope.ReceiptVoucherList[$scope.EditIndex].CrCode = $scope.ddlCrHead.Code;
            $scope.ReceiptVoucherList[$scope.EditIndex].CrHead = $scope.ddlCrHead.Head;
            $scope.ReceiptVoucherList[$scope.EditIndex].DrAmount = $scope.ac_ReceiptVoucher.DrAmount;
            $scope.ReceiptVoucherList[$scope.EditIndex].CrAmount = $scope.ac_ReceiptVoucher.CrAmount;
            $scope.ReceiptVoucherList[$scope.EditIndex].ChequeNo = $scope.ac_ReceiptVoucher.ChequeNo;
            $scope.ReceiptVoucherList[$scope.EditIndex].Particulars = $scope.ac_ReceiptVoucher.Particulars;
            $scope.ReceiptVoucherList[$scope.EditIndex].invoice_no = $scope.ac_ReceiptVoucher.invoice_no;
            $scope.ReceiptVoucherList[$scope.EditIndex].creator = $scope.LoginUser.FullName;
            $scope.ReceiptVoucherList[$scope.EditIndex].modifier = $scope.LoginUser.FullName;
            if ($scope.ddlEmployee != null) {
                $scope.ReceiptVoucherList[$scope.EditIndex].ReceivedBy = $scope.ddlEmployee.EmployeeId;
            }

            ClearDropdown();

            $scope.BtnName = 'Add'
        }
        $scope.TotalCreditAmount = 0;
        $scope.TotalDebitAmount = 0;
        angular.forEach($scope.ReceiptVoucherList, function (aData) {
            $scope.TotalCreditAmount += aData.CrAmount;
            $scope.TotalDebitAmount += aData.DrAmount;
        })

        $scope.ac_ReceiptVoucher.DrAmount = null;
        $scope.ac_ReceiptVoucher.CrAmount = null;
        $scope.ac_ReceiptVoucher.rid = 0;

    }


    function GetByVoucherGenerate() {
        $http({
            url: '/JournalVoucher/GetByVoucherGenerate?VoucherName=RV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ac_ReceiptVoucher.VoucherNo = data;
        });
    }



    $scope.RemoveBtn = function (aRecipt, index) {
        //var ind = $scope.ReceiptVoucherList.indexOf(aPayment);
        $scope.ReceiptVoucherList.splice(index, 1);

        if (aRecipt.rid != undefined) {
            aRecipt.IsCancel = 1;
            $scope.CancelList.push(aRecipt);
        }

        $scope.TotalCreditAmount = 0;
        $scope.TotalDebitAmount = 0;
        angular.forEach($scope.ReceiptVoucherList, function (aData) {
            $scope.TotalCreditAmount += aData.CrAmount;
            $scope.TotalDebitAmount += aData.DrAmount;
        })
    }

    function GetAllDepartment() {
        $http({
            url: '/JournalVoucher/GetAllDepartment',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.DepartmentList = data;
/*            $scope.ddlDepartment = { DeptID: '01' };*/
        });
    }
    function GetAllBranch() {
        $http({
            url: '/JournalVoucher/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BranchList = data;
            $scope.ddlBranch = { BranchID: '101' };
        });
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


  

    $scope.CheckDebitAndCreditBlance = function () {
        if ($scope.ac_ReceiptVoucher.DrAmount >= $scope.ac_ReceiptVoucher.CrAmount) {


        } else {
            $scope.ac_ReceiptVoucher.CrAmount = $scope.ac_ReceiptVoucher.DrAmount;
            alertify.log('Credit Amount  are not Same in Debit Amount', 'error', '5000');

        }

    }

    $scope.CreaditBlanceCheck = function () {

        if ($scope.ac_ReceiptVoucher.CrAmount == undefined || $scope.ac_ReceiptVoucher.CrAmount == $scope.ac_ReceiptVoucher.DrAmount) {


        } else {
            $scope.ac_ReceiptVoucher.CrAmount = null;;

        }
        $scope.ac_ReceiptVoucher.CrAmount = $scope.ac_ReceiptVoucher.DrAmount;
    }



    $scope.OnDebitAmountFilter = function (ddDr) {
        $scope.AccountHeadFilterList = [];
        angular.forEach($scope.AccountHeadList, function (aData) {
            if (ddDr.Code != aData.Code) {
                $scope.AccountHeadFilterList.push(aData);
            }
        })

    }
    $scope.EditBtn = function (receipt, index) {
        $scope.EditIndex = index;
        $scope.BtnName = 'Update';
        $scope.ac_ReceiptVoucher.DrAmount = receipt.DrAmount;
        $scope.ac_ReceiptVoucher.CrAmount = receipt.CrAmount;
        $scope.ac_ReceiptVoucher.invoice_no = receipt.invoice_no;
        $scope.ac_ReceiptVoucher.ChequeNo = receipt.ChequeNo;
        $scope.ac_ReceiptVoucher.Particulars = receipt.Particulars;
        $scope.ac_ReceiptVoucher.rid = receipt.rid;
        $scope.ddlCrHead = { Code: receipt.CrCode, Head: receipt.CrHead }
        $scope.ddlDepartment = { DeptID: receipt.DeptID, DepartmentName: receipt.DepartmentName }
        $('#ReceiptddlCrHead').select2('destroy');
        $('#ReceiptddlCrHead').val(receipt.CrCode).select2({
            theme: "classic",
        });

        $('#ReceiptddlEmployee').select2('destroy');
        $('#ReceiptddlEmployee').val(receipt.ReceivedBy).select2();
        $scope.ddlEmployee = { EmployeeId: receipt.ReceivedBy, FullName: receipt.FullName } //FullName
        $scope.ddlDrHead = { Code: receipt.DrCode, Head: receipt.DrHead }
        $('#ReceiptddlDrHead').select2('destroy');
        $('#ReceiptddlDrHead').val(receipt.DrCode).select2({
            theme: "classic",
        });

        $scope.ac_ReceiptVoucher.rid = receipt.rid;
    }
    $scope.UpdateReceiptVoucher = function (ReceiptVoucher) {

        $scope.ac_ReceiptVoucher.VoucherNo = ReceiptVoucher.VoucherNo;
        $scope.ac_ReceiptVoucher.VDate = ReceiptVoucher.VDate;
        angular.forEach($scope.AccountHeadList, function (aData) {
            if (ReceiptVoucher.DrCode != aData.Code) {
                $scope.AccountHeadFilterList.push(aData);
            }
        })

        $http({
            url: '/JournalVoucher/GetJournalByVoucherNo?VoucherNo=' + $scope.ac_ReceiptVoucher.VoucherNo,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ReceiptVoucherList = data;
            $scope.TotalCreditAmount = 0;
            $scope.TotalDebitAmount = 0;
            angular.forEach($scope.ReceiptVoucherList, function (aData) {
                var res1 = aData.VDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.VDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.VDate = date1;
                }


                $scope.TotalCreditAmount += aData.CrAmount;
                $scope.TotalDebitAmount += aData.DrAmount;
            })
        });
    }

    $scope.SaveReceiptVoucher = function () {

        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                angular.forEach($scope.CancelList, function (aData) {
                    $scope.ReceiptVoucherList.push(aData);
                });

                angular.forEach($scope.ReceiptVoucherList, function (aData) {
                    aData.VoucherNo = $scope.ac_ReceiptVoucher.VoucherNo;
                    aData.VDate = $scope.ac_ReceiptVoucher.VDate;
                });

                var params = JSON.stringify({ journal_t: $scope.ReceiptVoucherList });

                $http.post('/JournalVoucher/SaveJournal', params).success(function (data) {
                    if (data > 0) {
                        document.getElementById("txtVoucherDate").disabled = false;
                        alertify.log('Receipt Voucher saved successfully!', 'success', '5000');

                        Clear();
                        ClearDropdown();
                    } else {
                        alertify.log('Server Error', 'error', '5000');
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
            }
        });

    }

   
    function ClearDropdown() {
        $('#ReceiptddlDrHead').select2('destroy');
        $('#ReceiptddlDrHead').val('').select2({
            placeholder: "--Select Dr Head And Code --",
            theme: "classic",
        });


        $('#ReceiptddlCrHead').select2('destroy');
        $('#ReceiptddlCrHead').val('').select2({
            placeholder: "--Select Cr Head And Code --",
            theme: "classic",
        });

        $('#ReceiptddlEmployee').select2('destroy');
        $('#ReceiptddlEmployee').val('').select2({
            //placeholder: "--Received by --",
            //theme: "classic",
        });

        $scope.ddlDepartment = null;
        $scope.ac_ReceiptVoucher.DrAmount = null;
        $scope.ac_ReceiptVoucher.CrAmount = null;
        $scope.ac_ReceiptVoucher.invoice_no = null;
        $scope.ac_ReceiptVoucher.ChequeNo = null;
        $scope.ac_ReceiptVoucher.Particulars = null;
    }
    $scope.resetForm = function () {
        Clear();
        ClearDropdown();
      
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

    $scope.reloadBtn = function () {
        $('#txtFromJV').val('');
        $('#txtToDateForJV').val('');
        $('#textVoucherNo').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchInputFiled = null;
        PaymentVoucherGetPaged(1);
        // $scope.isReportDisabled = false;
    }

    $scope.JVGetPagedSearch = function () {
        PaymentVoucherGetPaged(1);

    }

    function PaymentVoucherGetPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromJV").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForJV").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";


        var VType = "DAA";
        //SearchCriteria = "J.[VoucherType]='" + VType + "'";

        //if ($scope.SearchInputFiled != undefined && $scope.SearchInputFiled != "" && $scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria = "J.[VoucherType]='" + VType + "' AND (J.[VDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and (J.[VoucherNo] LIKE '%" + $scope.SearchInputFiled + "%')";

        //}
        //else if ($scope.SearchInputFiled !== undefined && $scope.SearchInputFiled != null && $scope.SearchInputFiled != "") {
        //    SearchCriteria = "J.[VoucherType]='" + VType + "' AND J.[VoucherNo] LIKE '%" + $scope.SearchInputFiled + "%'";

        //}
        //else if ($scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria = "J.[VoucherType]='" + VType + "' AND J.[VDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        //}

        SearchCriteria = "J.[VoucherType]='" + VType + "'";

        if ($scope.SearchInputFiled != undefined && $scope.SearchInputFiled != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "J.[VoucherType]='" + VType + "' AND (J.[VDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') AND (J.[VoucherNo] LIKE '%" + $scope.SearchInputFiled + "%'  OR  J.DrHead LIKE '%" + $scope.SearchInputFiled + "%' OR J.DrHead LIKE '%" + $scope.SearchInputFiled + "%' OR  J.DrCode LIKE '%" + $scope.SearchInputFiled + "%' OR J.CrCode LIKE '%" + $scope.SearchInputFiled + "%'";

        }
        else if ($scope.SearchInputFiled !== undefined && $scope.SearchInputFiled != null && $scope.SearchInputFiled != "") {
            SearchCriteria = "J.[VoucherType]='" + VType + "' AND J.[VoucherNo] LIKE '%" + $scope.SearchInputFiled + "%' OR  J.DrHead LIKE '%" + $scope.SearchInputFiled + "%' OR  J.CrHead LIKE '%" + $scope.SearchInputFiled + "%' OR  J.DrCode LIKE '%" + $scope.SearchInputFiled + "%' OR  J.CrCode LIKE '%" + $scope.SearchInputFiled + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "J.[VoucherType]='" + VType + "' AND J.[VDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "' OR  J.DrHead LIKE '%" + $scope.SearchInputFiled + "%' OR  J.CrHead LIKE '%" + $scope.SearchInputFiled + "%' OR  J.DrCode LIKE '%" + $scope.SearchInputFiled + "%' OR  J.CrCode LIKE '%" + $scope.SearchInputFiled + "%'";

        }



        $http({
            url: encodeURI('/JournalVoucher/JournalVoucherGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

          
            $scope.PaymentVoucgerGetPagedListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;
           
            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aData) {
                    var Voucher = aData.VoucherNo.substring(0,3);

                    var res1 = aData.VDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.VDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.VDate = date1;
                    }
                    
                })
               
            }
            else {

                alertify.log('Receipt Voucher  No Not Found', 'error', '5000');

            }

        });
    }

    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            PaymentVoucherGetPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            PaymentVoucherGetPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            PaymentVoucherGetPaged($scope.currentPage);
        }
        //  }


    }

    $scope.OpenVoucherReport = function (VoucherNo) {
        $window.open("#/VoucherReport", "popup", "width=800,height=550,left=280,top=80");
        var VoucherData = {};
        VoucherData.VoucherNo = VoucherNo;
        VoucherData.ReportName = 'Receipt';
        $cookieStore.put("VoucherData", VoucherData);
        event.stopPropagation();
    };


});