app.controller("ChartOfAccountsController", function ($scope, $http) {
    Clear();
    function Clear() {
        //var UserData = sessionStorage.getItem("UserDataSession");
        //if (UserData != null) {
        //    $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        //}
        //$scope.UserId = $scope.LoginUser.UserId;
        //$scope.ScreenId = parseInt(sessionStorage.getItem("AccountHeadEntryScreenId"));

        //ScreenLock();

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForChartOfAccounts($scope.currentPage);

        $scope.MainGrouplist = [];
        $scope.SubMainGrouplist = [];
        $scope.SubGroupHeadlist = [];
        $scope.ChartOfAccountForGetPagedList = [];
        $scope.ac_ChartOfAccounts = {};
        $scope.ac_ChartOfAccounts.isActive = true;
        $scope.ac_ChartOfAccounts.IsUpdate = false;
        //Server side pagination
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;

        $scope.btnSave = "Save";

        GetAllMainGroup();

        $scope.ddlMainGroup = null;
        $scope.ddlSubMainGroup = null;
        $scope.ddlSubGroupHead = null;
      
    }


   
    function GetAllMainGroup() {
        $http({
            url: '/SubMainGroupEntry/GetAllMainGroup',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MainGrouplist = data;
        });
    }
    function GetAllSubMainGroup() {
        $http({
            url: '/SubMainGroupEntry/GetAllSubMainGroup',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SubMainGrouplist = [];
            angular.forEach(data, function (aData) {
                if ($scope.ddlMainGroup.MainGroupID == aData.MainGroupID) {
                    $scope.SubMainGrouplist.push(aData);
                }
            })
        });
    }
    $scope.GetAllSubMainGroup = function () {
        GetAllSubMainGroup();
    }
    function GetAllSubGroupHead() {
        $http({
            url: '/SubGroupHeadEntry/GetAllSubGroupHead',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SubGroupHeadlist = [];
            angular.forEach(data, function (aData) {
                if ($scope.ddlSubMainGroup.SubMainGroupID == aData.SubMainGroupID) {
                    $scope.SubGroupHeadlist.push(aData);
                }
            })
        });
    }
    $scope.GetAllSubGroupHead = function () {
        GetAllSubGroupHead();
    }
    $scope.AddChartOfAccounts = function () {

        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                var params = JSON.stringify({ ac_ChartOfAccount: $scope.ac_ChartOfAccounts });
                $http.post('/ChartOfAccounts/Add', params).success(function (data) {
                    if (data != "") {
                        if ($scope.ac_ChartOfAccounts.IsUpdate == true) {
                            alertify.log('Chart Of Accounts Updated Successfully!', 'success', '5000');
                        } else {
                            alertify.log('Chart Of Accounts Saved Successfully!', 'success', '5000');
                        }
                        Clear();
                        $scope.ChartOfAccountsForm.$setPristine();
                        $scope.ChartOfAccountsForm.$setUntouched();
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
            }
        })
    }

    $scope.GenerateOfAccountHeadcode = function (SubGroupHead) {

        if ($scope.ddlMainGroup != null && $scope.ddlSubMainGroup != null && SubGroupHead.SubGroupHeadID != undefined && SubGroupHead.SubGroupHeadID != 0) {
            $http({
                url: '/ChartOfAccounts/ChartOfAccountHeadCode?MainGroupID=' + $scope.ddlMainGroup.MainGroupID + '&SubMainGroupId=' + $scope.ddlSubMainGroup.SubMainGroupID + '&SubGroupHeadID=' + SubGroupHead.SubGroupHeadID,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.ac_ChartOfAccounts.Code = data;
            });
        }
       
    }




    $scope.GetChartOfAccount = function () {

        GetPagedForChartOfAccounts(1);
    }

    $scope.referesh = function () {
       
        $('#SearchChartOfAccountId').val('');
        $scope.SearchChartOfAccount = null;
        GetPagedForChartOfAccounts(1);
    }

    function GetPagedForChartOfAccounts(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var SearchCriteria = "";

       if ($scope.SearchChartOfAccount !== undefined && $scope.SearchChartOfAccount != null && $scope.SearchChartOfAccount != "") {
           SearchCriteria = "[COA].[Code] LIKE '%" + $scope.SearchChartOfAccount + "%' OR [COA].[Head] LIKE '%" + $scope.SearchChartOfAccount + "%' OR [COA].[SubGroupHeadID] LIKE '%" + $scope.SearchChartOfAccount + "%' OR [COA].[SubMainGroupID] LIKE '%" + $scope.SearchChartOfAccount + "%' OR [MG].[Name] LIKE '%" + $scope.SearchChartOfAccount + "%'  OR [SMG].[Name] LIKE '%" + $scope.SearchChartOfAccount + "%'  OR [SGH].[Name] LIKE '%" + $scope.SearchChartOfAccount + "%' " ;

        }

        $http({
            url: encodeURI('/ChartOfAccounts/GetAccountPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.ListData.length > 0) {
                $scope.ChartOfAccountForGetPagedList = data.ListData;
                $scope.total_count = data.TotalRecord;
            }
            else {
                $scope.ChartOfAccountForGetPagedList = [];
                alertify.log('Chart Of Accounts Not Found', 'error', '5000');

            }

        });
    }

    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForChartOfAccounts($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForChartOfAccounts($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForChartOfAccounts($scope.currentPage);
        }


    }

    $scope.SelChartOfAccounts = function (aChartOfAccounts) {
        $scope.ac_ChartOfAccounts = aChartOfAccounts;
        $scope.btnSave = "Update";
        $scope.ac_ChartOfAccounts.IsUpdate = true;
        $scope.ddlMainGroup = { 'MainGroupID': aChartOfAccounts.MainGroupID };
        GetAllSubMainGroup();
        $scope.ddlSubMainGroup = { 'SubMainGroupID': aChartOfAccounts.SubMainGroupID };
        GetAllSubGroupHead();
        $scope.ddlSubGroupHead = { 'SubGroupHeadID': aChartOfAccounts.SubGroupHeadID };


    }
  
   
    $scope.resetForm = function () {
        Clear();
        $scope.ChartOfAccountsForm.$setPristine();
        $scope.ChartOfAccountsForm.$setUntouched();
    }

});