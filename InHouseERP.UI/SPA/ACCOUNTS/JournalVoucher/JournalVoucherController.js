app.controller("JournalVoucherController", function ($scope, $http, $cookieStore, $window, $filter) {

    $scope.Title = "JournalVoucher";
    Clear();

    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForJournalVoucher($scope.currentPage);

        $scope.BranchList = [];
        $scope.DepartmentList = [];
        $scope.AccountHeadList = [];
        $scope.JournalList = [];
        $scope.CancelList = [];
        $scope.EmployeeList = [];
        $scope.JournalGetPagedListForGrid = [];
        $scope.AccountHeadFilterList = [];
        $scope.ddlDrHead = null;
        $scope.ddlCrHead = null;
        $scope.ddlEmployee = null;
        $scope.TotalCreditAmount = 0;
        $scope.TotalDebitAmount = 0;
       
        $scope.JournalVoucher = {};

        $scope.JournalVoucher.VDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.BtnName = 'Add';
        GetAllBranch();
        GetAllDepartment();
        GetAllEmployee();
        GetAllChartOfAccountHead();
        GetByVoucherGenerate();
       
    }



    $("#textVoucherDate").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.VoucherDateChange = function () {
        $("#textVoucherDate").focus();
        $("#textVoucherDate").trigger("click");
    }

   


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

    
    $scope.AddJournal = function () {
        if ($scope.BtnName == 'Add') {
            var obj = {};

            var VoucherType = $scope.JournalVoucher.VoucherNo.substring(0, 3);
            obj.rid = $scope.JournalVoucher.rid;
            obj.VoucherType = VoucherType;
            obj.CR_DeptID = 0;
            obj.CR_DeptID = 0;
            obj.IsCancel = 0;
            obj.isConfirmed = true;
            obj.DrCode = $scope.ddlDrHead.Code;
            obj.DrHead = $scope.ddlDrHead.Head;
            obj.CrCode = $scope.ddlCrHead.Code;
            obj.CrHead = $scope.ddlCrHead.Head;
            obj.DrAmount = $scope.JournalVoucher.DrAmount;
            obj.CrAmount = $scope.JournalVoucher.CrAmount;
            obj.ChequeNo = $scope.JournalVoucher.ChequeNo;
            obj.Particulars = $scope.JournalVoucher.Particulars;
            obj.invoice_no = $scope.JournalVoucher.invoice_no;

            obj.BranchID = $scope.ddlBranch.BranchID;
            obj.DeptID = $scope.ddlDepartment.DeptID;
            obj.DepartmentName = $scope.ddlDepartment.DepartmentName;
            //obj.VoucherNo = $scope.JournalVoucher.VoucherNo;
            //obj.VDate = $scope.JournalVoucher.VDate;
            if ($scope.ddlEmployee != null) {
                obj.ReceivedBy = $scope.ddlEmployee.EmployeeId;
            }

            obj.creator = $scope.LoginUser.FullName;
            obj.modifier = $scope.LoginUser.FullName;

            $scope.JournalList.push(obj);

            
        } else {
            $scope.JournalList[$scope.EditIndex].DeptID = $scope.ddlDepartment.DeptID;
            $scope.JournalList[$scope.EditIndex].DepartmentName = $scope.ddlDepartment.DepartmentName;
            $scope.JournalList[$scope.EditIndex].DrCode = $scope.ddlDrHead.Code;
            $scope.JournalList[$scope.EditIndex].DrHead = $scope.ddlDrHead.Head;
            $scope.JournalList[$scope.EditIndex].CrCode = $scope.ddlCrHead.Code;
            $scope.JournalList[$scope.EditIndex].CrHead = $scope.ddlCrHead.Head;
            $scope.JournalList[$scope.EditIndex].DrAmount = $scope.JournalVoucher.DrAmount;
            $scope.JournalList[$scope.EditIndex].CrAmount = $scope.JournalVoucher.CrAmount;
            $scope.JournalList[$scope.EditIndex].ChequeNo = $scope.JournalVoucher.ChequeNo;
            $scope.JournalList[$scope.EditIndex].Particulars = $scope.JournalVoucher.Particulars;
            $scope.JournalList[$scope.EditIndex].invoice_no = $scope.JournalVoucher.invoice_no;
            $scope.JournalList[$scope.EditIndex].creator = $scope.LoginUser.FullName;
            $scope.JournalList[$scope.EditIndex].modifier = $scope.LoginUser.FullName;
            if ($scope.ddlEmployee != null) {
                $scope.JournalList[$scope.EditIndex].ReceivedBy = $scope.ddlEmployee.EmployeeId;
            }
            ClearDropdown();
            $scope.BtnName = 'Add'
        }
        $scope.TotalCreditAmount = 0;
        $scope.TotalDebitAmount = 0;
        angular.forEach($scope.JournalList, function (aData) {
            $scope.TotalCreditAmount += aData.CrAmount;
            $scope.TotalDebitAmount += aData.DrAmount;
        })

        $scope.JournalVoucher.DrAmount = null;
        $scope.JournalVoucher.CrAmount = null;
        $scope.JournalVoucher.rid = 0;
    }



    function GetByVoucherGenerate() {
        $http({
            url: '/JournalVoucher/GetByVoucherGenerate?VoucherName=JV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.JournalVoucher.VoucherNo = data;
        });
    }

  
    $scope.RemoveBtn = function (aJournal, index) {
        //var ind = $scope.JournalList.indexOf(aJournal);
        $scope.JournalList.splice(index, 1);

        if (aJournal.rid != undefined) {
            aJournal.IsCancel = 1;
            $scope.CancelList.push(aJournal);
        }


        $scope.TotalCreditAmount = 0;
        $scope.TotalDebitAmount = 0;
        angular.forEach($scope.JournalList, function (aData) {
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


   
    $scope.CheckDebitAndCreditBlance = function () {
       // $scope.JournalVoucher.CrAmount = $scope.JournalVoucher.DrAmount;
        if ($scope.JournalVoucher.DrAmount >= $scope.JournalVoucher.CrAmount) {
          
           
        } else {
            $scope.JournalVoucher.CrAmount = $scope.JournalVoucher.DrAmount;
            alertify.log('Credit Amount  are not Same in Debit Amount', 'error', '5000');
           // $scope.JournalVoucher.CrAmount;
           
        }
       
    }

    $scope.CreaditBlanceCheck = function () {

        if ($scope.JournalVoucher.CrAmount == undefined || $scope.JournalVoucher.CrAmount == $scope.JournalVoucher.DrAmount) {


        } else {
            //$scope.JournalVoucher.CrAmount =
             $scope.JournalVoucher.CrAmount= null;;
            //alertify.log('Debit Amount  are not Same in Credit Amount', 'error', '5000');
            // $scope.JournalVoucher.CrAmount;

        }
        $scope.JournalVoucher.CrAmount = $scope.JournalVoucher.DrAmount;
    }

    
    $scope.OnDebitAmountFilter = function (ddDr) {
        $scope.AccountHeadFilterList = [];
        angular.forEach($scope.AccountHeadList,function (aData) {
            if (ddDr.Code != aData.Code) {
                $scope.AccountHeadFilterList.push(aData);
            } 
        })

    }
    $scope.EditBtn = function (jornal, index) {
        $scope.EditIndex = index;
        $scope.BtnName = 'Update';
        $scope.JournalVoucher.DrAmount = jornal.DrAmount;
        $scope.JournalVoucher.CrAmount = jornal.CrAmount;
        $scope.JournalVoucher.invoice_no = jornal.invoice_no;
        $scope.JournalVoucher.ChequeNo = jornal.ChequeNo;
        $scope.JournalVoucher.Particulars = jornal.Particulars;
        $scope.JournalVoucher.rid = jornal.rid;
        $scope.ddlCrHead = { Code: jornal.CrCode, Head: jornal.CrHead }
        $scope.ddlDepartment = { DeptID: jornal.DeptID, DepartmentName: jornal.DepartmentName }
        $('#ddlCrHead').select2('destroy');
        $('#ddlCrHead').val(jornal.CrCode).select2({
            theme: "classic",
        });

        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').val(jornal.ReceivedBy).select2();
        $scope.ddlEmployee = { EmployeeId: jornal.ReceivedBy, FullName: jornal.FullName } //FullName
        $scope.ddlDrHead = { Code: jornal.DrCode, Head: jornal.DrHead}
        $('#ddlDrHead').select2('destroy');
        $('#ddlDrHead').val(jornal.DrCode).select2({
            theme: "classic",
        });

        $scope.JournalVoucher.rid = jornal.rid;
    }

    $scope.JornalVoucherUpdate = function (jornal) {
        $scope.JournalVoucher.VoucherNo = jornal.VoucherNo;
        $scope.JournalVoucher.VDate = jornal.VDate;
        angular.forEach($scope.AccountHeadList, function (aData) {
            if (jornal.DrCode != aData.Code) {
                $scope.AccountHeadFilterList.push(aData);
            }
        })

        $http({
            url: '/JournalVoucher/GetJournalByVoucherNo?VoucherNo=' + $scope.JournalVoucher.VoucherNo,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.JournalList = data;
            $scope.TotalCreditAmount = 0;
            $scope.TotalDebitAmount = 0;
            angular.forEach($scope.JournalList, function (aData) {
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

  


    function ClearDropdown() {
        $('#ddlDrHead').select2('destroy');
        $('#ddlDrHead').val('').select2({
            placeholder: "--Select Dr Head And Code --",
            theme: "classic",
        });


        $('#ddlCrHead').select2('destroy');
        $('#ddlCrHead').val('').select2({
            placeholder: "--Select Cr Head And Code --",
            theme: "classic",
        });

        $('#ddlEmployee').select2('destroy');
        $('#ddlEmployee').val('').select2({
            //placeholder: "--Prepared By--",
            //theme: "classic",
        });

        $scope.ddlDepartment = null;
        $scope.JournalVoucher.DrAmount = null;
        $scope.JournalVoucher.CrAmount = null;
        $scope.JournalVoucher.invoice_no = null;
        $scope.JournalVoucher.ChequeNo = null;
        $scope.JournalVoucher.Particulars = null;
    }

    $scope.resetForm = function () {
        $scope.JournalVoucher.VDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
         Clear();
         ClearDropdown();
    }


    
    $scope.JournalVoucherSave = function () {

        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                angular.forEach($scope.CancelList, function (aData) {
                    $scope.JournalList.push(aData);
                });

                angular.forEach($scope.JournalList, function (aData) {
                    aData.VoucherNo = $scope.JournalVoucher.VoucherNo;
                    aData.VDate = $scope.JournalVoucher.VDate;
                });

                var params = JSON.stringify({ journal_t: $scope.JournalList});

                $http.post('/JournalVoucher/SaveJournal', params).success(function (data) {
                    if (data > 0) {
                        document.getElementById("textVoucherDate").disabled = false;
                        alertify.log('Journal Voucher saved successfully!', 'success', '5000');

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
        GetPagedForJournalVoucher(1);
       // $scope.isReportDisabled = false;
    }

    $scope.JVGetPagedSearch = function () {
        GetPagedForJournalVoucher(1);

    }

    function GetPagedForJournalVoucher(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromJV").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForJV").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";
        var VType = "JAA";
        //SearchCriteria = "J.[VoucherType]='" + VType + "'";

        //if ($scope.SearchInputFiled != undefined && $scope.SearchInputFiled != "" && $scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria = "J.[VoucherType]='" + VType + "' AND (J.[VDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and (J.[VoucherNo] LIKE '%" + $scope.SearchInputFiled + "%'  OR J.ChequeNo LIKE '%" + $scope.SearchInputFiled + "%' OR J.Particulars LIKE '%" + $scope.SearchInputFiled + "%' OR D.Name LIKE '%" + $scope.SearchInputFiled + "%')";

        //}
        //else if ($scope.SearchInputFiled !== undefined && $scope.SearchInputFiled != null && $scope.SearchInputFiled != "") {
        //    SearchCriteria = "J.[VoucherType]='" + VType + "' AND (J.[VoucherNo] LIKE '%" + $scope.SearchInputFiled + "%' OR D.Name LIKE '%" + $scope.SearchInputFiled + "%' OR J.ChequeNo LIKE '%" + $scope.SearchInputFiled + "%' OR J.Particulars LIKE '%" + $scope.SearchInputFiled + "%')";

        //}
        //else if ($scope.FromDate != "" && $scope.ToDate != "") {
        //    SearchCriteria = "J.[VoucherType]='" + VType + "' AND J.[VDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        //}

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
          
            $scope.JournalGetPagedListForGrid = data.ListData;
            $scope.total_count = data.TotalRecord;

            if ($scope.JournalGetPagedListForGrid.length > 0) {

                angular.forEach($scope.JournalGetPagedListForGrid, function (aData) {
                    var res1 = aData.VDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aData.VDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aData.VDate = date1;
                    }

                })

            }
            else {

                alertify.log('Journal Voucher No Not Found', 'error', '5000');

            }

        });
    }

    $scope.getData = function (curPage) {
       // $scope.isReportDisabled = false;
        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForJournalVoucher($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForJournalVoucher($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForJournalVoucher($scope.currentPage);
        }
        //  }


    }


 
    $scope.OpenVoucherReport = function (VoucherNo) {
        $window.open("#/VoucherReport", "popup", "width=800,height=550,left=280,top=80");
        var VoucherData = {};
        VoucherData.VoucherNo = VoucherNo;
        VoucherData.ReportName = 'Journal';
        $cookieStore.put("VoucherData", VoucherData);
        event.stopPropagation();
    };





});