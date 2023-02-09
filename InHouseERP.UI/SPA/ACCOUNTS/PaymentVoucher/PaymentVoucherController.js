app.controller("PaymentVoucherController", function ($scope, $http, $window, $filter, $cookieStore) {

    $scope.Title = "PaymentVoucher";
    Clear();

    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        $scope.ac_PaymentVoucher = {};

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
        $scope.ac_PaymentVoucher.VDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.BranchList = [];
        $scope.DepartmentList = [];
        $scope.AccountHeadList = [];
        $scope.JournalList = [];
        $scope.CancelList = [];
        $scope.EmployeeList = [];
        $scope.PaymentVoucherList = [];
        $scope.PaymentVoucherFilterList = [];

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


    $scope.AddPaymentVoucher = function () {
        if ($scope.BtnName == 'Add') {
            var obj = {};

            var VoucherType = $scope.ac_PaymentVoucher.VoucherNo.substring(0, 3);
            obj.rid = $scope.ac_PaymentVoucher.rid;
            obj.VoucherType = VoucherType;
            obj.CR_DeptID = 0;
            obj.CR_DeptID = 0;
            obj.IsCancel = 0;
            obj.isConfirmed = true;
            obj.DrCode = $scope.ddlDrHead.Code;
            obj.DrHead = $scope.ddlDrHead.Head;
            obj.CrCode = $scope.ddlCrHead.Code;
            obj.CrHead = $scope.ddlCrHead.Head;
            obj.DrAmount = $scope.ac_PaymentVoucher.DrAmount;
            obj.CrAmount = $scope.ac_PaymentVoucher.CrAmount;
            obj.ChequeNo = $scope.ac_PaymentVoucher.ChequeNo;
            obj.Particulars = $scope.ac_PaymentVoucher.Particulars;
            obj.invoice_no = $scope.ac_PaymentVoucher.invoice_no;

            obj.BranchID = $scope.ddlBranch.BranchID;
            obj.DeptID = $scope.ddlDepartment.DeptID;
            obj.DepartmentName = $scope.ddlDepartment.DepartmentName;
            //obj.VoucherNo = $scope.ac_PaymentVoucher.VoucherNo;
            //obj.VDate = $scope.ac_PaymentVoucher.VDate;
            if ($scope.ddlEmployee != null) {
                obj.ReceivedBy = $scope.ddlEmployee.EmployeeId;
            }

            obj.creator = $scope.LoginUser.FullName;
            obj.modifier = $scope.LoginUser.FullName;

            $scope.PaymentVoucherList.push(obj);


        } else {
            $scope.PaymentVoucherList[$scope.EditIndex].DeptID = $scope.ddlDepartment.DeptID;
            $scope.PaymentVoucherList[$scope.EditIndex].DepartmentName = $scope.ddlDepartment.DepartmentName;
            $scope.PaymentVoucherList[$scope.EditIndex].DrCode = $scope.ddlDrHead.Code;
            $scope.PaymentVoucherList[$scope.EditIndex].DrHead = $scope.ddlDrHead.Head;
            $scope.PaymentVoucherList[$scope.EditIndex].CrCode = $scope.ddlCrHead.Code;
            $scope.PaymentVoucherList[$scope.EditIndex].CrHead = $scope.ddlCrHead.Head;
            $scope.PaymentVoucherList[$scope.EditIndex].DrAmount = $scope.ac_PaymentVoucher.DrAmount;
            $scope.PaymentVoucherList[$scope.EditIndex].CrAmount = $scope.ac_PaymentVoucher.CrAmount;
            $scope.PaymentVoucherList[$scope.EditIndex].ChequeNo = $scope.ac_PaymentVoucher.ChequeNo;
            $scope.PaymentVoucherList[$scope.EditIndex].Particulars = $scope.ac_PaymentVoucher.Particulars;
            $scope.PaymentVoucherList[$scope.EditIndex].invoice_no = $scope.ac_PaymentVoucher.invoice_no;
            $scope.PaymentVoucherList[$scope.EditIndex].creator = $scope.LoginUser.FullName;
            $scope.PaymentVoucherList[$scope.EditIndex].modifier = $scope.LoginUser.FullName;
            if ($scope.ddlEmployee != null) {
                $scope.PaymentVoucherList[$scope.EditIndex].ReceivedBy = $scope.ddlEmployee.EmployeeId;
            }
            ClearDropdown();
            $scope.BtnName = 'Add'
        }
        $scope.TotalCreditAmount = 0;
        $scope.TotalDebitAmount = 0;
        angular.forEach($scope.PaymentVoucherList, function (aData) {
            $scope.TotalCreditAmount += aData.CrAmount;
            $scope.TotalDebitAmount += aData.DrAmount;
        })

        $scope.ac_PaymentVoucher.DrAmount = null;
        $scope.ac_PaymentVoucher.CrAmount = null;
        $scope.ac_PaymentVoucher.rid = 0;

    }


    function GetByVoucherGenerate() {
        $http({
            url: '/JournalVoucher/GetByVoucherGenerate?VoucherName=PV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ac_PaymentVoucher.VoucherNo = data;

        });
    }

    $scope.RemoveBtn = function (aPayment, index) {
        //var ind = $scope.PaymentVoucherList.indexOf(aPayment);
        $scope.PaymentVoucherList.splice(index, 1);

        if (aPayment.rid != undefined) {
            aPayment.IsCancel = 1;
            $scope.CancelList.push(aPayment);
        }

        $scope.TotalCreditAmount = 0;
        $scope.TotalDebitAmount = 0;
        angular.forEach($scope.PaymentVoucherList, function (aData) {
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


    
    $scope.OnDebitAmountFilter = function (ddDr) {
        $scope.AccountHeadFilterList = [];
        angular.forEach($scope.AccountHeadList, function (aData) {
            if (ddDr.Code != aData.Code) {
                $scope.AccountHeadFilterList.push(aData);
            }
        })
    }


    $scope.CheckDebitAndCreditBlance = function () {
        if ($scope.ac_PaymentVoucher.DrAmount >= $scope.ac_PaymentVoucher.CrAmount) {


        } else {
            $scope.ac_PaymentVoucher.CrAmount = $scope.ac_PaymentVoucher.DrAmount;
            alertify.log('Credit Amount  are not Same in Debit Amount', 'error', '5000');

        }
       
    }

    $scope.CreaditBlanceCheck = function () {
        if ($scope.ac_PaymentVoucher.CrAmount == undefined || $scope.ac_PaymentVoucher.CrAmount == $scope.ac_PaymentVoucher.DrAmount) {


        } else {
            //$scope.JournalVoucher.CrAmount =
            $scope.ac_PaymentVoucher.CrAmount = null;;
            //alertify.log('Debit Amount  are not Same in Credit Amount', 'error', '5000');
            // $scope.JournalVoucher.CrAmount;

        }
       // $scope.JournalVoucher.CrAmount = $scope.JournalVoucher.DrAmount;
        $scope.ac_PaymentVoucher.CrAmount = $scope.ac_PaymentVoucher.DrAmount;
    }

    $scope.EditBtn = function (payment, index) {
        $scope.EditIndex = index;
        $scope.BtnName = 'Update';
        $scope.ac_PaymentVoucher.DrAmount = payment.DrAmount;
        $scope.ac_PaymentVoucher.CrAmount = payment.CrAmount;
        $scope.ac_PaymentVoucher.invoice_no = payment.invoice_no;
        $scope.ac_PaymentVoucher.ChequeNo = payment.ChequeNo;
        $scope.ac_PaymentVoucher.Particulars = payment.Particulars;
        $scope.ac_PaymentVoucher.rid = payment.rid;
        $scope.ddlCrHead = { Code: payment.CrCode, Head: payment.CrHead }
        $scope.ddlDepartment = { DeptID: payment.DeptID, DepartmentName: payment.DepartmentName }
        $('#PaymentddlCrHead').select2('destroy');
        $('#PaymentddlCrHead').val(payment.CrCode).select2({
            theme: "classic",
        });

        $('#PaymentddlEmployee').select2('destroy');
        $('#PaymentddlEmployee').val(payment.ReceivedBy).select2();
        $scope.ddlEmployee = { EmployeeId: payment.ReceivedBy, FullName: payment.FullName } //FullName
        $scope.ddlDrHead = { Code: payment.DrCode, Head: payment.DrHead }
        $('#PaymentddlDrHead').select2('destroy');
        $('#PaymentddlDrHead').val(payment.DrCode).select2({
            theme: "classic",
        });

        $scope.ac_PaymentVoucher.rid = payment.rid;
    }
   

    $scope.UpdatePaymentVoucher = function (PaymentVoucher) {

        $scope.ac_PaymentVoucher.VoucherNo = PaymentVoucher.VoucherNo;
        $scope.ac_PaymentVoucher.VDate = PaymentVoucher.VDate;
        angular.forEach($scope.AccountHeadList, function (aData) {
            if (PaymentVoucher.DrCode != aData.Code) {
                $scope.AccountHeadFilterList.push(aData);
            }
        })

        $http({
            url: '/JournalVoucher/GetJournalByVoucherNo?VoucherNo=' + $scope.ac_PaymentVoucher.VoucherNo,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaymentVoucherList = data;
            $scope.TotalCreditAmount = 0;
            $scope.TotalDebitAmount = 0;
            angular.forEach($scope.PaymentVoucherList, function (aData) {
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


    $scope.SavePaymentVoucher = function () {

        

        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                angular.forEach($scope.CancelList, function (aData) {
                    $scope.PaymentVoucherList.push(aData);
                });

                angular.forEach($scope.PaymentVoucherList, function (aData) {
                    aData.VoucherNo = $scope.ac_PaymentVoucher.VoucherNo;
                    aData.VDate = $scope.ac_PaymentVoucher.VDate;
                });
                var params = JSON.stringify({ journal_t: $scope.PaymentVoucherList});

                $http.post('/JournalVoucher/SaveJournal', params).success(function (data) {
                    if (data > 0) {
                        document.getElementById("txtVoucherDate").disabled = false;
                        alertify.log('Payment Voucher saved successfully!', 'success', '5000');

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

        $('#PaymentddlDrHead').select2('destroy');
        $('#PaymentddlDrHead').val('').select2({
            placeholder: "--Select Dr Head And Code --",
            theme: "classic",
        });


        $('#PaymentddlCrHead').select2('destroy');
        $('#PaymentddlCrHead').val('').select2({
            placeholder: "--Select Cr Head And Code --",
            theme: "classic",
        });

        $('#PaymentddlEmployee').select2('destroy');
        $('#PaymentddlEmployee').val('').select2({
            //placeholder: "--Paid By--",
            //theme: "classic",
        });

        $scope.ddlDepartment = null;
        $scope.ac_PaymentVoucher.DrAmount = null;
        $scope.ac_PaymentVoucher.CrAmount = null;
        $scope.ac_PaymentVoucher.invoice_no = null;
        $scope.ac_PaymentVoucher.ChequeNo = null;
        $scope.ac_PaymentVoucher.Particulars = null;
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
        var VType = "CAA";
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
            //  $scope.total_count = data.TotalRecord;
            $scope.total_count = data.TotalRecord;
            if ($scope.PaymentVoucgerGetPagedListForGrid.length > 0) {
                angular.forEach($scope.PaymentVoucgerGetPagedListForGrid, function (aData) {
                    var res1 = aData.VDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.VDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.VDate = date1;
                    }
                })

            }
            else {

                alertify.log('Payment Voucher  No Not Found', 'error', '5000');

            }

        });
    }

    $scope.getData = function (curPage) {
        // $scope.isReportDisabled = false;
        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

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
        VoucherData.ReportName = 'Payment';
        $cookieStore.put("VoucherData", VoucherData);
        event.stopPropagation();
    };
});