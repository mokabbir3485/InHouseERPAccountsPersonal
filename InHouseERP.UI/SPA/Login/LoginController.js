app.controller("LoginController", function ($scope, $cookieStore, $http) {
    $scope.UserStatus = [];
    $scope.Ip = '';
    $scope.SmsCode = '';
    $scope.LoginUser = [];
    $scope.s_User = new Object();
    $scope.ValuationSetupCurrent = {};
    $scope.IsReqSmsCode = false;

    $scope.InputType = 'password';
    $scope.showHideClass ='fa fa-eye-slash';
    $scope.isShowIconPassword = true;
    $scope.isHiddenIconPassword = false;

    $scope.PasswordShowMethod = function () {
        showPassword();
    }

    $scope.HidePassword = function () {
        $scope.InputType = 'password';
        $scope.showHideClass = 'fa fa-eye-slash';
    }
    //window.location = '/Home/Index#/SubMainGroupEntry';
   
    function showPassword () {
        if ($scope.s_User.Password != null) {
            if ($scope.InputType == 'password') {
                $scope.InputType = 'text';
                $scope.showHideClass = 'fa fa-eye';
                $scope.isShowIconPassword = false;
            } else {
                $scope.InputType = 'password';
                $scope.showHideClass = 'fa fa-eye-slash';
                $scope.isShowIconPassword = false;
                //$scope.showHideClass = 'glyphicon glyphicon-eye-open';
                
            }
        }
    }

   




    function RemoveAllScreenLock(UserId) {
        var parms = JSON.stringify({ userId: UserId });
        $http.post('/Permission/RemoveScreenLock', parms).success(function (data) {
        });
    }

    function GetUser(UserName, Password) {
        try {
            $http({
                url: '/User/GetUserForLogin',
                method: "GET",
                params: { userName: UserName, password: Password },
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.LoginUser = data;
                if ($scope.LoginUser != "" && !$scope.LoginUser.IsReqSmsCode) {
                    if ($scope.LoginUser.IsActive) {
                       // $cookieStore.put('UserData', $scope.LoginUser); // Remove cookies into the function 'RemoveCookies' of IndexController
                        sessionStorage.setItem("UserDataSession", JSON.stringify($scope.LoginUser));
                        sessionStorage.setItem("milisec", 0);
                        sessionStorage.setItem("sec", 0);
                        sessionStorage.setItem("min", 0);
                        sessionStorage.setItem("hour", 0);
                        RemoveAllScreenLock($scope.LoginUser.UserId);
                        GetUserCurrentStatus($scope.LoginUser.UserId);
                    }
                    else {
                        alertify.log('User is Inactive!', 'error', '5000');
                        // alertify.log(data, 'error', '5000');
                    }
                }
                else if ($scope.LoginUser != "" && $scope.LoginUser.IsReqSmsCode) {
                    $scope.IsReqSmsCode = true;
                    txtLoginCode.focus();
                    $scope.SmsCode = Math.floor(1000 + Math.random() * 9000);
                    document.getElementById("myText2").value = $scope.SmsCode;
                    //Send $scope.SmsCode to $scope.LoginUser.SmsMobileNo
                }
                else {
                    alertify.log('Invalid Login Information!', 'error', '5000');
                }
            })
        }
        catch (e) {
            console.log("Got an error!", e.description);
        }

    }

    function GetHasReceivable() {
        $scope.GetHasReceivable = false;
        $http({
            url: '/Setup/GetHasReceivable',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.GetHasReceivable = (data === 'true');
            if ($scope.GetHasReceivable) {
                $http({
                    url: '/Setup/GetCurrentValuationSetup',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.ValuationSetupCurrent = data;
                    if ($scope.ValuationSetupCurrent != "") {
                        //$cookieStore.put('Valuation', $scope.ValuationSetupCurrent);
                        sessionStorage.setItem("ValuationSession", JSON.stringify($scope.ValuationSetupCurrent));
                    }
                });
            }
        });
    }

    function GetUserCurrentStatus(UserId) {
        $http({
            url: '/LoginLogoutLog/GetUserCurrentStatus',
            method: "GET",
            params: { userId: UserId },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.UserStatus = data;
            if ($scope.UserStatus.IsLoggedIn) {
                //if ($scope.UserStatus.IpAddress == $scope.Ip) {
                //force log out
                $scope.ad_LoginLogoutLog = new Object();
                $scope.ad_LoginLogoutLog.UserId = $scope.UserStatus.UserId;
                $scope.ad_LoginLogoutLog.LogOutTime = new Date();
                $scope.ad_LoginLogoutLog.IsLoggedIn = false;
                var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
                $http.post('/User/UpdateLoginInfo', parms).success(function (data) { });
                //log in
                var login = sessionStorage.getItem("UserDataSession");
                if (login != null) {
                    var userStatus = JSON.parse(sessionStorage.UserDataSession);
                }
                $scope.ad_LoginLogoutLog = new Object();
                $scope.ad_LoginLogoutLog.UserId = userStatus.UserId;
                $scope.ad_LoginLogoutLog.LogInTime = new Date();
                $scope.ad_LoginLogoutLog.IpAddress = $scope.Ip;
                $scope.ad_LoginLogoutLog.IsLoggedIn = true;
                var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
                $http.post('/User/SaveLoginInfo', parms).success(function (data) { });
                window.location = '/Home/Index#/Home';

            }
            else {
                // log in
                var login = sessionStorage.getItem("UserDataSession");
                if (login != null) {
                    var userStatus = JSON.parse(sessionStorage.UserDataSession);
                }
                $scope.ad_LoginLogoutLog = new Object();
                $scope.ad_LoginLogoutLog.UserId = userStatus.UserId;
                $scope.ad_LoginLogoutLog.LogInTime = new Date();
                $scope.ad_LoginLogoutLog.IpAddress = $scope.Ip;
                $scope.ad_LoginLogoutLog.IsLoggedIn = true;
                var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
                $http.post('/User/SaveLoginInfo', parms).success(function (data) { });
                window.location = '/Home/Index#/Home';
            }
        });
    }

    function RemoveCookies() {
        //User Info remove
        sessionStorage.removeItem('UserDataSession');
        sessionStorage.removeItem('ValuationSession');
        //Permission remove
        //Security

        sessionStorage.removeItem('ScreenPermission');
        sessionStorage.removeItem('RolePermission');
        sessionStorage.removeItem('PermissionPermission');
        sessionStorage.removeItem('ModulePermission');
        sessionStorage.removeItem('PrintVoucherPermission');
        //admin
        
        sessionStorage.removeItem('ChangePasswordPermission');
        
        //Accounts
        sessionStorage.removeItem('SubMainGroupEntryPermission');
        sessionStorage.removeItem('SubGroupHeadEntryPermission');
        sessionStorage.removeItem('ProfitLossPermission');
        sessionStorage.removeItem('ChartOfAccountsPermission');
        sessionStorage.removeItem('ChartOfAccountsReportPermission');
        sessionStorage.removeItem('GeneralLedgerPermission');
        sessionStorage.removeItem('TrialBalancePermission');

        sessionStorage.removeItem('ReceiptVoucherPermission');
        sessionStorage.removeItem('PaymentVoucherPermission');
        sessionStorage.removeItem('JournalVoucherPermission');
        sessionStorage.removeItem('TransferVoucherPermission');
        sessionStorage.removeItem('ReportsPermission');

        

        //ScreenId remove
        //Security
        
        sessionStorage.removeItem('ScreenScreenId');
        sessionStorage.removeItem('RoleScreenId');
        sessionStorage.removeItem('PermissionScreenId');
        sessionStorage.removeItem('ModuleScreenId');
        //admin
       
        sessionStorage.removeItem('ChangePasswordScreenId');
       
        //Account 
        sessionStorage.removeItem('SubMainGroupEntryScreenId');
        sessionStorage.removeItem('SubGroupHeadEntryScreenId');
        sessionStorage.removeItem('ProfitLossScreenId');
        sessionStorage.removeItem('ChartOfAccountsScreenId');
        sessionStorage.removeItem('ChartOfAccountsReportScreenId');
        sessionStorage.removeItem('GeneralLedgerScreenId');
        sessionStorage.removeItem('TrialBalanceScreenId');

        sessionStorage.removeItem('ReceiptVoucherScreenId');
        sessionStorage.removeItem('PaymentVoucherScreenId');
        sessionStorage.removeItem('JournalVoucherScreenId');
        sessionStorage.removeItem('TransferVoucherScreenId');
        sessionStorage.removeItem('ReportsScreenId');
        sessionStorage.removeItem('PrintVoucherScreenId');


        

        //Error Log
        sessionStorage.removeItem('errorMassage');
    }

    window.onpopstate = function (e) { window.history.forward(1); }

    $scope.Login = function () {
        var value = $("#myText").val();
        $scope.Ip = value;
        //RemoveCookies();
        $scope.LoginUser = [];
        
        GetUser($scope.s_User.Username, $scope.s_User.Password);
        GetHasReceivable();
        //window.location = '/Home/Index#/SubMainGroupEntry';
    };

    $scope.MatchCode = function () {
        if ($scope.s_User.SmsCodeIn == $scope.SmsCode) {
            $cookieStore.put('UserData', $scope.LoginUser);
            sessionStorage.setItem("UserDataSession", JSON.stringify($scope.LoginUser));
            RemoveAllScreenLock($scope.LoginUser.UserId);
            GetUserCurrentStatus($scope.LoginUser.UserId);
        }
        else {
            alertify.log('Incorrect Code', 'error', '5000');
        }
    }
});
