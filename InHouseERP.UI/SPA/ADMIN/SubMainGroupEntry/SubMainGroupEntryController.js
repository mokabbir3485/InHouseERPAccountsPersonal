app.controller("SubMainGroupEntryController", function ($scope, $http, $window) {
    Clear();
    function Clear() {
        $scope.MainGrouplist = [];
        $scope.SubcategoryList = [];
        //Server side pagination
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;

        $scope.ad_SubMainGroup = {};
        $scope.btnSave = "Save";
        $scope.ad_SubMainGroup.IsUpdate = false;
        GetAllMainGroup();
        GetAllActiveInActiveCategory();

        $scope.ddlMainGroup = null;
        GetSubMainGroupPaged($scope.currentPage);
    }

    ///====>>> Sub Main Group Id========

    $scope.OnChangeSubMainGroupId = function (subMainObj) {

        $http({
            url: '/SubMainGroupEntry/GetBySubMainGroupId?MainGroupID=' + subMainObj.MainGroupID,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ad_SubMainGroup.SubMainGroupID = data;
        });
    }

   
 


    $scope.GetCropTypeSearch = function () {
        GetSubMainGroupPaged(1);
    }
    function GetSubMainGroupPaged(curPage) {
        var SearchCriteria = "";
        if ($scope.SearchCropTypeName != null && $scope.SearchCropTypeName != '' && $scope.SearchCropTypeName != undefined) {
            SearchCriteria += "MG.Name LIKE '" + $scope.SearchCropTypeName + "%' OR SM.MainGroupID LIKE '" + $scope.SearchCropTypeName + "%' OR SM.Name LIKE '" + $scope.SearchCropTypeName + "%' OR SM.ID LIKE '" + $scope.SearchCropTypeName + "%'";
        }

        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
        $http({
            url: '/SubMainGroupEntry/GetSubMainGroupPaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + '&SearchCr=' + SearchCriteria + '&rows=' + 0,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SubMainGroupList = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
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


    $scope.AddSubMainGroup = function() {

        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                var params = JSON.stringify({ ad_SubMainGroup: $scope.ad_SubMainGroup });
                $http.post('/SubMainGroupEntry/Save', params).success(function (data) {
                    if (data != "") {
                        if ($scope.ad_SubMainGroup.IsUpdate == true) {
                            alertify.log('Sub Main Group Updated Successfully!', 'success', '5000');
                        } else {
                            alertify.log('Sub Main Group Saved Successfully!', 'success', '5000');
                        }
                        
                        Clear();
                        $scope.SubMainGroupEntryForm.$setPristine();
                        $scope.SubMainGroupEntryForm.$setUntouched();
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
            GetSubMainGroupPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetSubMainGroupPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetSubMainGroupPaged($scope.currentPage);
        }
    }

    $scope.SelSubMainGroup = function (aSubMainGroup) {
        $scope.ad_SubMainGroup = aSubMainGroup;
        $scope.btnSave = "Update";
        $scope.ad_SubMainGroup.IsUpdate = true;
        $scope.ddlMainGroup = { "MainGroupID": aSubMainGroup.MainGroupID };
    }
    
    $scope.resetForm = function () {
        Clear();
        $scope.SubMainGroupEntryForm.$setPristine();
        $scope.SubMainGroupEntryForm.$setUntouched();
    }
});