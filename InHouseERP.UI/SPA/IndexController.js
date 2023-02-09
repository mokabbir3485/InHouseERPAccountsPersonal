app.controller("IndexController", function ($scope, $cookieStore, $route,  $templateCache, $window, MyService, $http, $filter) {
    load();

    function load() {
        $scope.LoginUser = [];
        $scope.NoticeList = [];
        $scope.UnreadMessageNo = 0;
        //All menu control hidden default ----Start

        $scope.AdminView = "menuViewHide";
        $scope.SecurityView = "menuViewHide";
        
        $scope.AccountsView = "menuViewHide";
        

        

        $scope.ModuleView = "menuViewHide";
        $scope.RoleView = "menuViewHide";
        $scope.ScreenView = "menuViewHide";
        $scope.PermisionView = "menuViewHide";
        $scope.ChangePasswordView = "menuViewHide";
        
        //Accounts
        $scope.SubMainGroupEntryView = "menuViewHide";
        $scope.SubGroupHeadEntryView = "menuViewHide";
        $scope.ProfitLossView = "menuViewHide";
        $scope.ChartOfAccountsView = "menuViewHide";
        $scope.ReceiptVoucherView = "menuViewHide";
        $scope.PaymentVoucherView = "menuViewHide";
        $scope.JournalVoucherView = "menuViewHide";
        $scope.TransferVoucherView = "menuViewHide";
        $scope.ReportsView = "menuViewHide";
        //$scope.AccountView = "menuViewHide";
        $scope.ChartOfAccountsReportView = "menuViewHide";
        $scope.GeneralLedgerView = "menuViewHide";
        $scope.TrialBalanceView = "menuViewHide";
        $scope.PrintVoucherView = "menuViewHide";



        //All menu control hidden default ----End
        GetUser(); //Get logged in user Info from cookies
    }
    $scope.ReloadPage = function () {
        //$templateCache.removeAll();
        var currentPageTemplate = $route.current.templateUrl;
        console.log(currentPageTemplate);
        $templateCache.remove(currentPageTemplate);
        $window.location.reload();
    }
    function GetUser() {
        //$scope.LoginUser = $cookieStore.get('UserData');
        var login = sessionStorage.getItem("UserDataSession");
        if (login != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.UserName = $scope.LoginUser.Username;
        $scope.RoleId = $scope.LoginUser.RoleId;
        $scope.RoleName = $scope.LoginUser.RoleName;
        GetPermissionByRoleId($scope.RoleId);
    }

    function GetPermissionByRoleId(roleId) {
        $http({
            url: '/Permission/GetPermissionByRoleId?roleId=' + roleId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            MyService.data.permission = data;
            angular.forEach(data, function (aPermission) {
                //Set Sitebar and Page Permission
                
               
                if (aPermission.ScreenName == "Sub Main Group Entry" && aPermission.CanView) {
                    $scope.PrintVoucherView = "menuViewShow";
                    $scope.PrintVoucherView = "menuViewShow";
                    sessionStorage.setItem("SubMainGroupEntryScreenId", aPermission.ScreenId);
                    sessionStorage.setItem("SubMainGroupEntryPermission", 'true');
                }

                if (aPermission.ScreenName == "Sub Group Head Entry" && aPermission.CanView) {
                    $scope.AdminView = "menuViewShow";
                    $scope.SubGroupHeadEntryView = "menuViewShow";
                    sessionStorage.setItem("SubGroupHeadEntryScreenId", aPermission.ScreenId);
                    sessionStorage.setItem("SubGroupHeadEntryPermission", 'true');
                }
                

                if (aPermission.ScreenName == "Module" && aPermission.CanView) {
                    $scope.SecurityView = "menuViewShow";
                    $scope.ModuleView = "menuViewShow";
                    sessionStorage.setItem("ModuleScreenId", aPermission.ScreenId);
                    sessionStorage.setItem("ModulePermission", 'true');
                }
                if (aPermission.ScreenName == "Role" && aPermission.CanView) {
                    $scope.SecurityView = "menuViewShow";
                    $scope.RoleView = "menuViewShow";
                    sessionStorage.setItem("RoleScreenId", aPermission.ScreenId);
                    sessionStorage.setItem("RolePermission", 'true');
                }
                if (aPermission.ScreenName == "Screen" && aPermission.CanView) {
                    $scope.SecurityView = "menuViewShow";
                    $scope.ScreenView = "menuViewShow";
                    sessionStorage.setItem("ScreenScreenId", aPermission.ScreenId);
                    sessionStorage.setItem("ScreenPermission", 'true');
                }
                if (aPermission.ScreenName == "Permission" && aPermission.CanView) {
                    $scope.SecurityView = "menuViewShow";
                    $scope.PermisionView = "menuViewShow";
                    sessionStorage.setItem("PermissionScreenId", aPermission.ScreenId);
                    sessionStorage.setItem("PermissionPermission", 'true');
                }
                if (aPermission.ScreenName == "Change Password" && aPermission.CanView) {
                    $scope.SecurityView = "menuViewShow";
                    $scope.ChangePasswordView = "menuViewShow";
                    sessionStorage.setItem("ChangePasswordScreenId", aPermission.ScreenId);
                    sessionStorage.setItem("ChangePasswordPermission", 'true');

                }
               

                
                if (aPermission.ScreenName == "Chart of Accounts" && aPermission.CanView) {
                    $scope.AccountsView = "menuViewShow";
                    $scope.ChartOfAccountsView = "menuViewShow";
                    sessionStorage.setItem('ChartOfAccountsScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('ChartOfAccountsPermission', 'true');
                }
                if (aPermission.ScreenName == "Receipt Voucher" && aPermission.CanView) {
                    $scope.AccountsView = "menuViewShow";
                    $scope.ReceiptVoucherView = "menuViewShow";
                    sessionStorage.setItem('ReceiptVoucherScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('ReceiptVoucherPermission', 'true');
                }

                if (aPermission.ScreenName == "Payment Voucher" && aPermission.CanView) {
                    $scope.AccountsView = "menuViewShow";
                    $scope.PaymentVoucherView = "menuViewShow";
                    sessionStorage.setItem('PaymentVoucherScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('PaymentVoucherPermission', 'true');
                }

                if (aPermission.ScreenName == "Journal Voucher" && aPermission.CanView) {
                    $scope.AccountsView = "menuViewShow";
                    $scope.JournalVoucherView = "menuViewShow";
                    sessionStorage.setItem('JournalVoucherScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('JournalVoucherPermission', 'true');
                }

                if (aPermission.ScreenName == "Transfer Voucher" && aPermission.CanView) {
                    $scope.AccountsView = "menuViewShow";
                    $scope.TransferVoucherView = "menuViewShow";
                    sessionStorage.setItem('TransferVoucherScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('TransferVoucherPermission', 'true');
                }
                if (aPermission.ScreenName == "Reports" && aPermission.CanView) {
                    $scope.AccountsView = "menuViewShow";
                    $scope.ReportsView = "menuViewShow";
                    sessionStorage.setItem('ReportsrScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('ReportsPermission', 'true');
                }
                if (aPermission.ScreenName == "Chart Of Accounts Report" && aPermission.CanView) {
                    $scope.ReportsView = "menuViewShow";
                    $scope.ChartOfAccountsReportView = "menuViewShow";
                    sessionStorage.setItem('ChartOfAccountsReportScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('ChartOfAccountsReportPermission', 'true');
                }
                if (aPermission.ScreenName == "Profit Loss" && aPermission.CanView) {
                    $scope.ReportsView = "menuViewShow";
                    $scope.ProfitLossView = "menuViewShow";
                    sessionStorage.setItem('ProfitLossScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('ProfitLossPermission', 'true');
                }
                if (aPermission.ScreenName == "Chart Of Accounts Report" && aPermission.CanView) {
                    $scope.ReportsView = "menuViewShow";
                    $scope.GeneralLedgerView = "menuViewShow";
                    sessionStorage.setItem('GeneralLedgerScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('GeneralLedgerPermission', 'true');
                }


                if (aPermission.ScreenName == "Trial Balance" && aPermission.CanView) {
                    $scope.ReportsView = "menuViewShow";
                    $scope.TrialBalanceView = "menuViewShow";
                    sessionStorage.setItem('TrialBalanceScreenId', aPermission.ScreenId);
                    sessionStorage.setItem('TrialBalancePermission', 'true');
                }


                
                if (aPermission.ScreenName == "Accounts" && aPermission.CanView) {
                    $scope.AccountView = "menuViewShow";
                    sessionStorage.setItem('AccountsPermission', 'true');
                }
                if (aPermission.ModuleName == "Report") {
                    $scope.ReportView = "menuViewShow";
                }

                if (aPermission.ScreenName == "Sub Main Group Entry" && aPermission.CanView) {
                    $scope.ReportsView = "menuViewShow";
                    $scope.PrintVoucherView = "menuViewShow";
                    sessionStorage.setItem("PrintVoucherScreenId", aPermission.ScreenId);
                    sessionStorage.setItem("PrintVoucherPermission", 'true');
                }

            });
        })
    }

    function RemoveSession() {
        //User Info remove
        sessionStorage.removeItem('UserDataSession');
        sessionStorage.removeItem('ValuationSession');
        //Permission remove
        
        sessionStorage.removeItem('ScreenPermission');
        sessionStorage.removeItem('RolePermission');
        sessionStorage.removeItem('SyncPermission');
        sessionStorage.removeItem('PermissionPermission');
        sessionStorage.removeItem('ModulePermission');
        
        sessionStorage.removeItem('ChangePasswordPermission');
        
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
        sessionStorage.removeItem('PrintVoucherPermission');
        
        sessionStorage.removeItem('RoleScreenId');
        sessionStorage.removeItem('SyncScreenId');
        sessionStorage.removeItem('PermissionScreenId');
        sessionStorage.removeItem('ModuleScreenId');
        
        sessionStorage.removeItem('ChangePasswordScreenId');
        
        //account
        sessionStorage.removeItem('ProfitLossScreenId');
        sessionStorage.removeItem('ChartOfAccountsReportScreenId');
        sessionStorage.removeItem('GeneralLedgerScreenId');

        sessionStorage.removeItem('TrialBalanceScreenId');


        sessionStorage.removeItem('ReceiptVoucherScreenId');
        sessionStorage.removeItem('PaymentVoucherScreenId');
        sessionStorage.removeItem('JournalVoucherScreenId');
        sessionStorage.removeItem('ReportsScreenId');
        sessionStorage.removeItem('PrintVoucherScreenId');
        //Error Log
        sessionStorage.removeItem('errorMassage');
    }

    $scope.SignOut = function () {
        //$scope.User = $cookieStore.get('UserData');
        var login = sessionStorage.getItem("UserDataSession");
        if (login != null) {
            $scope.User = JSON.parse(sessionStorage.UserDataSession);
        }
        //sessionStorage.setItem('UserData', null);
        sessionStorage.setItem("UserDataSession", null);

        sessionStorage.setItem("milisec", null);
        sessionStorage.setItem("sec", null);
        sessionStorage.setItem("min", null);
        sessionStorage.setItem("hour", null);

        $scope.ad_LoginLogoutLog = new Object();
        $scope.ad_LoginLogoutLog.UserId = $scope.User.UserId;
        $scope.ad_LoginLogoutLog.LogOutTime = new Date();
        $scope.ad_LoginLogoutLog.IsLoggedIn = false;
        var parms = JSON.stringify({ logInLogOutLog: $scope.ad_LoginLogoutLog });
        $http.post('/User/UpdateLoginInfo', parms).success(function (data) { });
        RemoveAllScreenLock();
        RemoveSession();
        window.location = '/Home/Login#/';
    }

    function RemoveAllScreenLock() {
        var parms = JSON.stringify({ userId: $scope.UserId });
        $http.post('/Permission/RemoveScreenLock', parms).success(function (data) {
        });
    }

    $scope.RemoveScreenLock = function () {
        RemoveAllScreenLock();
        window.location = '/Home/Index#/Home';
    }

    // Proxy created on the fly StudentHub NotificationHub
    var job = $.connection.notificationHub;
    $.connection.hub.start();
    //// Declare a function on the job hub so the server can invoke it


    /////////////////////////
    var x;
    var startstop = 0;
    //startStop();
    function startStop() { 

        startstop = startstop + 1;

        if (startstop === 1) {
            start();
            //document.getElementById("start").innerHTML = "Stop";
        } else if (startstop === 2) {
            //document.getElementById("start").innerHTML = "Start";
            startstop = 0;
            stop();
        }

    }


    function start() {
        x = setInterval(timer, 10);
    } 

    function stop() {
        clearInterval(x);
    }

    //$scope.milisec = 0;
    //$scope.sec = 0;
    //$scope.min = 0;
    //$scope.hour = 0;
    //$cookieStore.put("milisec", 0);
    //$cookieStore.put("sec", 0);
    //$cookieStore.put("min", 0);
    //$cookieStore.put("hour", 0);

    //$scope.milisec = $cookieStore.get("milisec");
    //$scope.sec = $cookieStore.get("sec");
    //$scope.min = $cookieStore.get("min");
    //$scope.hour = $cookieStore.get("hour");

    $scope.milisec = parseInt(sessionStorage.getItem("milisec"));
    $scope.sec = parseInt(sessionStorage.getItem("sec"));
    $scope.min = parseInt(sessionStorage.getItem("min"));
    $scope.hour = parseInt(sessionStorage.getItem("hour"));

    $scope.miliSecOut = 0;
    $scope.secOut = 0;
    $scope.minOut = 0;
    $scope.hourOut = 0;

    function timer() {
        $scope.miliSecOut = checkTime($scope.milisec);
        $scope.secOut = checkTime($scope.sec);
        $scope.minOut = checkTime($scope.min);
        $scope.hourOut = checkTime($scope.hour);

        $scope.milisec = ++$scope.milisec;
        $cookieStore.put("milisec", $scope.milisec);
        if ($scope.milisec === 100) {
            $scope.milisec = 0;
            $scope.sec = ++$scope.sec;
            //$cookieStore.put("sec", $scope.sec);
            sessionStorage.setItem("sec", $scope.sec);
        }

        if ($scope.sec == 60) {
            $scope.min = ++$scope.min;
            $scope.sec = 0;
            //$cookieStore.put("min", $scope.min);
            sessionStorage.setItem("min", $scope.min);
        }

        if ($scope.min == 60) {
            $scope.min = 0;
            $scope.hour = ++$scope.hour;
            //$cookieStore.put("hour", $scope.hour);
            sessionStorage.setItem("hour", $scope.hour);
        }


        document.getElementById("milisec").innerHTML = $scope.miliSecOut;
        document.getElementById("sec").innerHTML = $scope.secOut;
        document.getElementById("min").innerHTML = $scope.minOut;
        document.getElementById("hour").innerHTML = $scope.hourOut;

    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function reset() {


        /*Reset*/

        $scope.milisec = 0;
        $scope.sec = 0;
        $scope.min = 0
        $scope.hour = 0;

        document.getElementById("milisec").innerHTML = "00";
        document.getElementById("sec").innerHTML = "00";
        document.getElementById("min").innerHTML = "00";
        document.getElementById("hour").innerHTML = "00";

    }
});

app.run(function ($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
            $rootScope.online = false;
        });
    }, false);

    $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
            $rootScope.online = true;
        });
    }, false);
});