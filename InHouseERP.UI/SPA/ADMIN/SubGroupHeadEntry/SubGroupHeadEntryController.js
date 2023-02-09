app.controller("SubGroupHeadEntryController", function ($scope, $cookieStore, $http, $window) {
    //For Screen lock


    Clear();
    function Clear() {
        //var UserData = sessionStorage.getItem("UserDataSession");
        //if (UserData != null) {
        //    $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        //}
        //$scope.UserId = $scope.LoginUser.UserId;
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SubGroupHeadEntryScreenId"));

        $scope.ScreenLockInfo = [];
        //ScreenLock();
        $scope.MainGrouplist = [];
        $scope.SubMainGrouplist = [];
        $scope.ad_SubGroupHead = {};
        $scope.ad_SubGroupHead.IsUpdate = false;
        //Server side pagination
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;

        $scope.btnSave = "Save";

        GetAllMainGroup();
        GetAllActiveInActiveCategory();
        $scope.ddlMainGroup = null;
        $scope.ddlSubMainGroup = null;
        GetSubGroupHeadPaged($scope.currentPage);
    }

    $scope.GetCropTypeSearch = function () {
        GetSubGroupHeadPaged(1);
    }



    $scope.OnChangeSubMainGroupId = function (subMainObj) {
        $scope.ddlMainGroup.MainGroupID;
       // $scope.ddlSubMainGroup.SubMainGroupID;
        
        $http({
            url: '/SubGroupHeadEntry/GetBySubMainHeadGroupId?MainGroupID=' + $scope.ddlMainGroup.MainGroupID + '&SubMainGroupID=' + subMainObj.SubMainGroupID,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ad_SubGroupHead.SubGroupHeadCode = data;
        });
    }

    function GetSubGroupHeadPaged(curPage) {
        //var SearchCriteria = "";

        //if ($scope.SearchCropTypeName != null && $scope.SearchCropTypeName != '' && $scope.SearchCropTypeName != undefined) {
        //    SearchCriteria += "Name LIKE '" + $scope.SearchCropTypeName + "%' OR ID LIKE '" + $scope.SearchCropTypeName + "%'";
        //}

        //if (curPage == null) curPage = 1;
        //var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;



        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

    

        var SearchCriteria = "";

        
        if ($scope.SearchCropTypeName !== undefined && $scope.SearchCropTypeName != null && $scope.SearchCSearchCropTypeNameopTypeName != "") {
            SearchCriteria = "[SGH].[Name] LIKE '%" + $scope.SearchCropTypeName + "%' OR [SGH].[TypeCode] LIKE '%" + $scope.SearchCropTypeName + "%'  OR [SGH].[ID] LIKE '%" + $scope.SearchCropTypeName + "%' OR [MG].[Name] LIKE '%" + $scope.SearchCropTypeName + "%' OR [SMG].[Name] LIKE '%" + $scope.SearchCropTypeName + "%' OR [SGH].[MainGroupID] LIKE '%" + $scope.SearchCropTypeName + "%' OR [SGH].[SubMainGroupID] LIKE '%" + $scope.SearchCropTypeName + "%'";

        }
       

        $http({
            url: encodeURI('/SubGroupHeadEntry/GetSubGroupHeadPaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + '&SearchCr=' + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SubGroupHeadList = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }


    $scope.getData = function (curPage) {
       // $scope.isReportDisabled = false;
        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetSubGroupHeadPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSubGroupHeadPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSubGroupHeadPaged($scope.currentPage);
        }
        //  }


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
    $scope.GetAllSubMainGroup = function () {
        AllSubMainGroup();
    }

    $scope.SubMainGrouplist = [];

    function AllSubMainGroup() {
        $scope.SubMainGrouplist = [];
        $http({
            url: '/SubMainGroupEntry/GetAllSubMainGroup',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
         /* $scope.SubMainGrouplist = data;*/
         
            angular.forEach(data, function (aData) {
                if ($scope.ddlMainGroup.MainGroupID == aData.MainGroupID) {
                    $scope.SubMainGrouplist.push(aData);
                }
            })
        });
    }


    function GetAllActiveInActiveCategory() {
        var criteria = '1=1';
        $http({
            url: '/Category/GetCategoryDynamic?searchCriteria=' + criteria + '&orderBy=CategoryName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AllActiveInActiveCategory = data;
        });
    }



    

    //$scope.Save2 = function () {
    //    var params = JSON.stringify({ ad_SubGroupHead: $scope.ad_SubGroupHead });
    //    $http.post('/SubGroupHeadEntry/Save2', params).success(function (data) {
          
    //    }).error(function (msg) {
    //        alertify.log('Save failed, refresh page and try again', 'error', '5000');
    //    });
    //}

    $scope.SaveSubGroupHead = function () {

        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                var params = JSON.stringify({ ad_SubGroupHead: $scope.ad_SubGroupHead });

                $http.post('/SubGroupHeadEntry/SubGroupHeadSave', params).success(function (data) {
                    if (data != "") {
                        if ($scope.ad_SubGroupHead.IsUpdate == true) {
                            alertify.log('Sub Group Head Updated Successfully!', 'success', '5000');
                        } else {
                            alertify.log('Sub Group Head Saved Successfully!', 'success', '5000');
                        }
                        
                        Clear();
                        $scope.SubGroupHeadEntryForm.$setPristine();
                        $scope.SubGroupHeadEntryForm.$setUntouched();
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
            }
        })
    }

    $scope.getData = function (curPage) {
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetSubGroupHeadPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSubGroupHeadPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSubGroupHeadPaged($scope.currentPage);
        }
    }

    $scope.SelSubGroupHead = function (aSubGroupHead) {
        AllSubMainGroup();
        $scope.ad_SubGroupHead = aSubGroupHead;
        $scope.ad_SubGroupHead.SubGroupHeadCode = aSubGroupHead.SubGroupHeadID;
        $scope.btnSave = "Update";
        $scope.ad_SubGroupHead.IsUpdate = true;
        $scope.ddlMainGroup = { "MainGroupID": aSubGroupHead.MainGroupID };
        $scope.ddlSubMainGroup = { "SubMainGroupID": aSubGroupHead.SubMainGroupID };
        
    }

    $scope.resetForm = function () {
        Clear();
        $scope.SubGroupHeadEntryForm.$setPristine();
        $scope.SubGroupHeadEntryForm.$setUntouched();
    }
});