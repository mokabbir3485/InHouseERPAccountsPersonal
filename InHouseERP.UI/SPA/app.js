var app = angular.module('AngularDemoApp', ['ngRoute', 'ngCookies', 'angular.filter', 'cfp.hotkeys', 'ngSanitize', 'ui.select', 'angularUtils.directives.dirPagination',  'ui.bootstrap', 'components', 'angularjs-dropdown-multiselect']);


//Check page parmission from cookies which is defined by 'IndexController'
app.config( function ($routeProvider, $controllerProvider) {
    $routeProvider
        .when('/Attendee', {
            templateUrl: '/SPA/Attendee/Attendee.html',
            controller: 'AttendeeController'
        }).when('/FiscalYearEntry', {
            title: "Fiscal Year",
            templateUrl: '/SPA/ADMIN/FiscalYear/FiscalYearEntry.html',
            controller: 'FiscalYearEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); } //Check Logged In or not
                    if (login != undefined) {
                        var permission = sessionStorage.getItem("FiscalYearEntryPermission")
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CustomerType', {
            title: "Customer Type",
            templateUrl: '/SPA/ADMIN/CustomerType/CustomerType.html',
            controller: 'CustomerTypeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);} //Check Logged In or not
                    if (login != undefined) {
                        var permission = sessionStorage.getItem("CustomerPermission")
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CustomerEntry', {
            title: 'Customer Entry',
            templateUrl: '/SPA/ADMIN/CustomerEntry/CustomerEntry.html',
            controller: 'CustomerEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);} //Check Logged In or not
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CustomerPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CompanyEntry', {
            title: 'Company Entry',
            templateUrl: '/SPA/ADMIN/CompanyEntry/CompanyEntry.html',
            controller: 'CompanyEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);} //Check Logged In or not
                    if (login != undefined) {
                        var permission = sessionStorage.getItem("CompanyEntryPermission"); //Check Logged In or not
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/PaymentGroup', {
            templateUrl: '/SPA/PaymentGroup/PaymentGroup.html',
            controller: 'PaymentGroupController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);} //Check Logged In or not
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PaymentGroupPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/BankEntry', {
            templateUrl: '/SPA/ADMIN/BankEntry/BankEntry.html',
            controller: 'BankEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);} //Check Logged In or not
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('BankEntryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/BondEntry', {
            templateUrl: '/SPA/ADMIN/BondEntry/BondEntry.html',
            controller: 'BondEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);} //Check Logged In or not
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CustomBondPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/BillOfMaterial', {
            templateUrl: '/SPA/ADMIN/BillOfMaterial/BillOfMaterial.html',
            controller: 'BillOfMaterialController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('BillOfMaterialPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/Overhead', {
            templateUrl: '/SPA/ADMIN/OverheadEntry/OverheadEntry.html',
            controller: 'OverheadEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('OverheadPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/BarcodePrint', {
            templateUrl: '/SPA/ADMIN/BarcodePrint/BarcodePrint.html',
            controller: 'BarcodePrintControlloer',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('BarcodePrintPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/StockValuationSetup', {
            templateUrl: '/SPA/INVENTORY/Setup/Setup.html',
            controller: 'StockValuationSetupController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('StockValuationSetupPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PurchaseOrder', {
            templateUrl: '/SPA/INVENTORY/PurchaseOrder/PurchaseOrderEntry.html',
            controller: 'PurchaseOrderEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PurchaseOrderPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page3");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }

                }
            }
        })
        .when('/SupplierEntry', {
            templateUrl: '/SPA/ADMIN/SupplierEntry/SupplierEntry.html',
            controller: 'SupplierEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SupplierPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/BranchEntry', {
            templateUrl: '/SPA/ADMIN/BranchEntry/BranchEntry.html',
            controller: 'BranchEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('BranchPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ReportNotificationName', {
            templateUrl: '/SPA/EMAIL/ReportNotificationName/ReportNotificationName.html',
            controller: 'ReportNotificationNameController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ReportNotificationNamePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/EmailNotificationSetup', {
            templateUrl: '/SPA/EMAIL/EmailNotificationSetup/EmailNotificationSetup.html',
            controller: 'EmailNotificationSetupController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('EmailNotificationSetupPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/EmailSendEntry', {
            templateUrl: '/SPA/EMAIL/EmailSendEntry/EmailSendEntry.html',
            controller: 'EmailSendEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('EmailSendPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/BranchTypeEntry', {
            templateUrl: '/SPA/BranchTypeEntry/BranchTypeEntry.html',
            controller: 'BranchTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('BranchTypePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CategoryEntry', {
            templateUrl: '/SPA/ADMIN/CategoryEntry/CategoryEntry.html',
            controller: 'CategoryEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CategoryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SubMainGroupEntry', {
            templateUrl: '/SPA/ADMIN/SubMainGroupEntry/SubMainGroupEntry.html',
            controller: 'SubMainGroupEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SubMainGroupEntryPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SubGroupHeadEntry', {
            templateUrl: '/SPA/ADMIN/SubGroupHeadEntry/SubGroupHeadEntry.html',
            controller: 'SubGroupHeadEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SubGroupHeadEntryPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        
        .when('/ChangePassword', {
            templateUrl: '/SPA/ChangePassword/ChangePassword.html',
            controller: 'ChangePasswordController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ChangePasswordPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/Sync', {
            templateUrl: '/SPA/Sync//Sync.html',
            controller: 'SyncController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SyncPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/PaymentType', {
            templateUrl: '/SPA/ADMIN/PaymentType/PaymentType.html',
            controller: 'PaymentTypeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ChangePasswordPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/DepartmentEntry', {
            templateUrl: '/SPA/ADMIN/DepartmentEntry/DepartmentEntry.html',
            controller: 'DepartmentEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('DepartmentPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/DepartmentTypeEntry', {
            templateUrl: '/SPA/ADMIN/DepartmentTypeEntry/DepartmentTypeEntry.html',
            controller: 'DepartmentTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('DepartmentTypePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/DesignationEntry', {
            templateUrl: '/SPA/ADMIN/DesignationEntry/DesignationEntry.html',
            controller: 'DesignationEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('DesignationPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/DeclarationTypeEntry', {
            templateUrl: '/SPA/ADMIN/DeclarationTypeEntry/DeclarationTypeEntry.html',
            controller: 'DeclarationTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('DeclarationTypePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/Employee', {
            templateUrl: '/SPA/ADMIN/EmployeeEntry/EmployeeEntry.html',
            controller: 'EmployeeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('EmployeePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ItemAdditionalAttribute', {
            templateUrl: '/SPA/ADMIN/ItemAdditionalAttribute/ItemAdditionalAttribute.html',
            controller: 'ItemAdditionalAttributeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ItemAdditionalAttributePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ItemAdditionalAttributeValue', {
            templateUrl: '/SPA/ADMIN/ItemAdditionalAttributeValue/ItemAdditionalAttributeValue.html',
            controller: 'ItemAdditionalAttributeValueController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ItemAdditionalAttributeValuePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ItemAdditionalAttributePrice', {
            templateUrl: '/SPA/ItemAdditionalAttributePrice/ItemAdditionalAttributePrice.html',
            controller: 'ItemAdditionalAttributePriceController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ItemAdditionalAttributePricePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ItemEntry', {
            templateUrl: '/SPA/ADMIN/ItemEntry/ItemEntryTwo.html',
            controller: 'ItemEntryTwoController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ProductPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/MaterialPaperTypeEntry', {
            templateUrl: '/SPA/ADMIN/MaterialPaperTypeEntry/MaterialPaperTypeEntry.html',
            controller: 'MaterialPaperTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('MaterialPaperTypePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/ModuleEntry', {
            templateUrl: '/SPA/ModuleEntry/ModuleEntry.html',
            controller: 'ModuleEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ModulePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PermissionEntry', {
            templateUrl: '/SPA/PermissionEntry/PermissionEntry.html',
            controller: 'PermissionEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PermissionPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/RoleEntry', {
            templateUrl: '/SPA/RoleEntry/RoleEntry.html',
            controller: 'RoleEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('RolePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ScreenEntry', {
            templateUrl: '/SPA/ScreenEntry/ScreenEntry.html',
            controller: 'ScreenEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ScreenPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SubcategoryEntry', {
            templateUrl: '/SPA/ADMIN/SubcategoryEntry/SubcategoryEntry.html',
            controller: 'SubcategoryEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SubcategoryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/Unit', {
            templateUrl: '/SPA/ADMIN/Unit/Unit.html',
            controller: 'UnitController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('UnitPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PriceType', {
            templateUrl: '/SPA/ADMIN/PriceTypeEntry/PriceTypeEntry.html',
            controller: 'PriceTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PriceTypePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ChargeTypeEntry', {
            templateUrl: '/SPA/ADMIN/ChargeTypeEntry/ChargeTypeEntry.html',
            controller: 'ChargeTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ChargeTypePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/FinalPriceConfig', {
            templateUrl: '/SPA/ADMIN/FinalPriceConfig/FinalPriceConfig.html',
            controller: 'FinalPriceConfigController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('FinalPriceConfigPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/AuditType', {
            templateUrl: '/SPA/AuditTypeEntry/AuditTypeEntry.html',
            controller: 'AuditTypeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('AuditTypePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/Terminal', {
            templateUrl: '/SPA/ADMIN/TerminalEntry/TerminalEntry.html',
            controller: 'TerminalEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('TerminalPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/RequisitionPurposeEntry', {
            templateUrl: '/SPA/ADMIN/RequisitionPurposeEntry/RequisitionPurposeEntry.html',
            controller: 'RequisitionPurposeEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('RequisitionPurposeEntryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ReturnReasonEntry', {
            templateUrl: '/SPA/ReturnReasonEntry/ReturnReasonEntry.html',
            controller: 'ReturnReasonEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ReturnReasonEntryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/VoidReasonEntry', {
            templateUrl: '/SPA/ADMIN/VoidReasonEntry/VoidReasonEntry.html',
            controller: 'VoidReasonEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('VoidReasonEntryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ApprovalSetup', {
            templateUrl: '/SPA/Approval/Approval.html',
            controller: 'ApprovalController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ApprovalSetupPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        //HR ADDED BY RAJU 31/12/17
        .when('/AttendancePolicy', {
            templateUrl: '/SPA/HR/AttendancePolicy/AttendancePolicy.html',
            controller: 'AttendancePolicyController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('AttendancePolicyPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

     


        .when('/ProductionEntry', {
            templateUrl: '/SPA/PRODUCTION/ProductionEntry/ProductionEntry.html',
            controller: 'ProductionEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ProductionEntryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/StockReceiveEntry', {

            templateUrl: '/SPA/INVENTORY/StockReceive/StockReceive.html',
            controller: 'StockReceiveController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('StockReceivePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }

                }
            }
        })
        .when('/SupplierPaymentHistory', {
            templateUrl: '/SPA/PAYABLE/SupplierPaymentHistory/SupplierPaymentHistory.html',
            controller: 'SupplierPaymentHistoryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SupplierPaymentHistoryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/StockStatus', {

            templateUrl: '/SPA/INVENTORY/StockStatus/StockStatus.html',
            controller: 'StockStatusController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('StockStatusPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }

                }
            }
        })
        .when('/MaterialsDemand', {

            templateUrl: '/SPA/INVENTORY/MaterialsDemand/MaterialsDemand.html',
            controller: 'MaterialsDemandController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('MaterialsDemandPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }

                }
            }
        })
        .when('/ProductionStatus', {

            templateUrl: '/SPA/PRODUCTION/ProductionStatus/ProductionStatus.html',
            controller: 'ProductionStatusController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ProductionStatusPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }

                }
            }
        })
        .when('/ProductionDashboard', {

            templateUrl: '/SPA/PRODUCTION/ProductionDashboard/ProductionDashboard.html',
            controller: 'ProductionDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ProductionDashboardPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }

                }
            }
        })
        .when('/OpeningQuantity', {
            templateUrl: '/SPA/INVENTORY/OpeningQtyEntry/OpeningQtyEntry.html',
            controller: 'OpeningQtyEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('OpeningQuantityPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/StockIssue', {
            templateUrl: '/SPA/INVENTORY/IssueEntry/IssueEntry.html',
            controller: 'IssueEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('StockIssuePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/JumboStockIssueEntry', {
            templateUrl: '/SPA/INVENTORY/JumboStockIssueEntry/JumboStockIssueEntry.html',
            controller: 'JumboStockIssueEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('JumboStockIssueEntryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/JumboStockIssueReport', {
            templateUrl: '/SPA/INVENTORY/JumboStockIssueReport/JumboStockIssueReport.html',
            controller: 'JumboStockIssueReportController'
        })
        .when('/AllVoucherReport', {
            templateUrl: '/SPA/REPORTS/AllVoucherReport/AllVoucherReport.html',
            controller: 'AllVoucherReportController'
        })
        .when('/StockIssueWithoutRequisition', {
            templateUrl: '/SPA/INVENTORY/IssueWithoutRequisition/IssueWithoutRequisition.html',
            controller: 'IssueWithoutRequisitionController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('StockIssueWithoutRequisitionPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/IssueApprove', {   //added by tofael 26102016
            templateUrl: '/SPA/INVENTORY/IssueApprove/IssueApprove.html',
            controller: 'IssueApproveController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('IssueApprovePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })


        .when('/PrintVoucherReport', {   //added by tofael 26102016
            templateUrl: '/SPA/REPORTS/PrintVoucherReport/PrintVoucher.html',
            controller: 'PrintVoucherController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PrintVoucherPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/CIFReport', {
            templateUrl: '/SPA/POS/CIFReport/CIFReport.html',
            controller: 'CIFReportController'
        })
        .when('/WagesSlipReport', {
            templateUrl: '/SPA/HRAndPayroll/WagesSlipReport/WagesSlipReport.html',
            controller: 'WagesSlipReportController'
        })
        
        .when('/WarrentyAndSerialNoReport', {
            templateUrl: '/SPA/Procurement/WarrentyAndSerialNoReport/WarrentyAndSerialReport.html',
            controller: 'WarrentyAndSerialReportController'
        })

        .when('/StockReciveReport', {
            templateUrl: '/SPA/INVENTORY/StockReciveReport/StockReciveReport.html',
            controller: 'StockReciveReportController'
        })

        .when('/StockDeclarationReport', {
            templateUrl: '/SPA/INVENTORY/StockDeclarationReport/StockDeclarationReport.html',
            controller: 'StockDeclarationReportController'
        })


        .when('/CompanyPaymentReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyPaymentReport/CompanyPaymentReportEntry.html',
            controller: 'CompanyPaymentReportController'
        })

        .when('/CompanyAdjustmentReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyAdjustmentReport/CompanyAdjustmentReportEntry.html',
            controller: 'CompanyAdjustmentReportController'
        })

        .when('/CompanyRefundReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyRefundReport/CompanyRefundReportEntry.html',
            controller: 'CompanyRefundReportController'
        })


        .when('/GeneralLedgerReport', {
            templateUrl: '/SPA/REPORTS/GeneralLedgerReport/GeneralLedgerReport.html',
            controller: 'GeneralLedgerReportController'
        })

        .when('/HRReports', {   //added by tofael 28102016
            templateUrl: '/SPA/HRAndPayroll/HRReports/HRReports.html',
            controller: 'HRReportsController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('HRReportsPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        
        .when('/InventoryAndSaleReportsMushak', {   
            templateUrl: '/SPA/INVENTORY/InventoryReportsMushak/InventoryReportsMushak.html',
            controller: 'InventoryReportsMushakController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('InventoryAndSaleReportsMushakPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })


        
        .when('/Delivery', {   //added by tofael 09112016
            templateUrl: '/SPA/INVENTORY/Delivery/Delivery.html',
            controller: 'DeliveryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('DeliveryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        

        .when('/InventoryApprovals', {
            templateUrl: '/SPA/POS/InventoryApprovals/InventoryApprovals.html',
            controller: 'InventoryApprovalsController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('InventoryApprovalsPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PurchaseRequisition', {
            templateUrl: '/SPA/INVENTORY/PurchaseRequisition/PurchaseRequisitionEntry.html',
            controller: 'PurchaseRequisitionEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PurchaseRequisitionPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        
        
        .when('/ImportPurchaseBill', {
            templateUrl: '/SPA/Procurement/ImportPurchaseBill/ImportPurchaseBillEntry.html',
            controller: 'ImportPurchaseBillEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ImportPurchaseBillPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        

        .when('/LocalPurchaseBillEntry', {
            templateUrl: '/SPA/Procurement/LocalPurchaseBillEntry/LocalPurchaseBill.html',
            controller: 'LocalPurchaseBillController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('LocalPurchaseBillPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ProcurementDashboard', {
            templateUrl: '/SPA/Procurement/ProcurementDashboard/ProcurementDashboard.html',
            controller: 'ProcurementDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ProcurementDashboardPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SupplierDashboard', {
            templateUrl: '/SPA/PAYABLE/SupplierDashboard/SupplierDashboardEntry.html',
            controller: 'SupplierDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SupplierDashboardPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PayableDashboard', {
            templateUrl: '/SPA/PAYABLE/PayableDashboard/PayableDashboard.html',
            controller: 'PayableDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PayableDashboardPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/SupplierPayment', {
            templateUrl: '/SPA/PAYABLE/SupplierPaymentEntry/SupplierPayment.html',
            controller: 'SuppilerPaymentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SupplierPaymentPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        

        

        .when('/WarrentyAndSerialNo', {
            templateUrl: '/SPA/Procurement/WarrentyAndSerialNo/WarrentyAndSerialNoEntry.html',
            controller: 'WarrentyAndSerialNoEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('WarrentyAndSerialNoPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ImportReportUI', {
            templateUrl: '/SPA/Procurement/ImportReportUI/ImportReportUI.html',
            controller: 'ImportReportUIController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ImportReportUIPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        //.when('/SupplierPaymentAdjustment', {
        //    templateUrl: '/SPA/Procurement/SupplierPaymentAdjustment/SupplierPaymentAdjustment.html',
        //    controller: 'SupplierPaymentAdjustmentController',
        //    resolve: {
        //        "check": function () {
        //            var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
        //            if (login != undefined) {
        //                var permission = sessionStorage.getItem('SupplierPaymentAdjustmentPermission');
        //                if (permission != 'true') {
        //                    alertify.alert("You don't have parmission to access this page");
        //                    window.location = '/Home/Index#/Home';
        //                }
        //            }
        //            else {
        //                window.location = '/Home/Login#/';
        //            }
        //        }
        //    }
        //})

        .when('/MaterialReturnSlipReport', {
            templateUrl: '/SPA/INVENTORY/MaterialReturnSlipReport/MaterialReturnSlipReport.html',
            controller: 'MaterialReturnSlipReportController'
        })
        .when('/MaterialsDemandReport', {
            templateUrl: '/SPA/INVENTORY/MaterialsDemandReport/MaterialsDemandReport.html',
            controller: 'MaterialsDemandReportController'
        })
        .when('/MaterialDemandedIssuedReport', {
            templateUrl: '/SPA/INVENTORY/MaterialDemandedIssuedReport/MaterialDemandedIssuedReport.html',
            controller: 'MaterialDemandedIssuedReportController'
        })
        .when('/ISTMReport', {
            templateUrl: '/SPA/INVENTORY/ISTMReport/ISTMReport.html',
            controller: 'ISTMReportController'
        })

           //INVENTORY REPORT

        .when('/LocalPurchaseReport', {
            templateUrl: '/SPA/Procurement/LocalPurchaseReport/LocalPBReport.html',
            controller: 'LocalPBReportController'
        })

        .when('/SupplierPaymentReport', {
            templateUrl: '/SPA/PAYABLE/SupplierPaymentReport/SupplierPaymentReport.html',
            controller: 'SupplierPaymentReportController'
        })



        .when('/Sale', {
            templateUrl: '/SPA/POS/Sale/Sale.html',
            controller: 'SaleController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SalePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SalesInvoice', {
            templateUrl: '/SPA/POS/SalesInvoice/SalesInvoice.html',
            controller: 'SalesInvoiceController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem("SalesInvoicePermission");
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SalesInvoiceReport', {
            templateUrl: '/SPA/POS/SalesInvoiceReport/SalesInvoiceReportEntry.html',
            controller: 'SalesInvoiceReportController'
        })
        .when('/Exchange', {
            templateUrl: '/SPA/POS/Exchange/Exchange.html',
            controller: 'ExchangeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ExchangePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/Offer', {
            templateUrl: '/SPA/POS/Offer/Offer.html',
            controller: 'OfferController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('OfferPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SaleVoid', {
            templateUrl: '/SPA/POS/SaleVoid/SaleVoid.html',
            controller: 'SaleVoidController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SaleVoidPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CashDeposit', {
            templateUrl: '/SPA/POS/CashTransfer/CashTransfer.html',
            controller: 'CashTransferController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CashDepositPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/RequisitionEntry', {
            templateUrl: '/SPA/PRODUCTION/RequisitionEntry/RequisitionEntry.html',
            controller: 'RequisitionController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('RequisitionPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ReorderLevelSetup', {
            templateUrl: '/SPA/INVENTORY/ReorderLevelSetup/ReorderLevelSetup.html',
            controller: 'ReorderLevelSetupController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ReorderLevelSetupPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ReturnToSupplier', {
            templateUrl: '/SPA/INVENTORY/ReturnToSupplier/ReturnToSupplier.html',
            controller: 'ReturnToSupplierController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ReturnToSupplierPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ReturnFromDepartment', {
            templateUrl: '/SPA/INVENTORY/ReturnFromDepartment/ReturnFromDepartment.html',
            controller: 'ReturnFromDepartmentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ReturnFromDepartmentPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/StockAuditEntry', {
            templateUrl: '/SPA/INVENTORY/StockAuditEntry/StockAuditEntry.html',
            controller: 'StockAuditEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('StockAuditEntryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/StockDeclarationEntry', {
            templateUrl: '/SPA/INVENTORY/StockDeclarationEntry/StockDeclarationEntry.html',
            controller: 'StockDeclarationEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('StockDeclarationEntryPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SalesOrder', {
            templateUrl: '/SPA/POS/SalesOrder/SalesOrderEntry.html',
            controller: 'SalesOrderEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem("SalesOrderPermission");
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PosDashboard', {
            templateUrl: '/SPA/POS/PosDashboard/PosDashboard.html',
            controller: 'PosDashboardController',
            resolve: {
                "check": function () {
                    
                    var login = sessionStorage.getItem("UserDataSession");
                    if (login != null) {
                        var login = JSON.parse(sessionStorage.UserDataSession);
                    }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PosDashboardPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ReviseSalesOrder', {
            templateUrl: '/SPA/POS/ReviseSalesOrder/ReviseSalesOrderEntry.html',
            controller: 'ReviseSalesOrderEntryController',
            resolve: {
                "check": function () {
                    
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) {
                        var login = JSON.parse(sessionStorage.UserDataSession);
                    }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ReviseSalesOrderPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CustomerInformationFormation', {
            templateUrl: '/SPA/POS/CustomerInformationFormation/CustomerInformationFormation.html',
            controller: 'CustomerInformationFormationController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem("CustomerInformationFormationPermission");
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CIFDashboard', {
            templateUrl: '/SPA/POS/CIFDashboard/CIFDashboard.html',
            controller: 'CIFDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem("CIFDashboardPermission");
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SalesOrderApprove', {
            templateUrl: '/SPA/POS/SalesOrderApprove/SalesOrderApprove.html',
            controller: 'SalesOrderApproveController',
            resolve: {
                "check": function () {
                    
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) {
                        var login = JSON.parse(sessionStorage.UserDataSession);
                    }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SalesOrderApprovePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SalesOrderReport', {
            templateUrl: '/SPA/POS/SalesOrderReport/SalesOrderReport.html',
            controller: 'SalesOrderReportController'
        })

        .when('/ReviseInternalWorkOrder', {
            templateUrl: '/SPA/POS/ReviseInternalWorkOrder/ReviseInternalWorkOrderEntry.html',
            controller: 'ReviseInternalWorkOrderController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ReviseInternalWorkOrderPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/InternalWorkOrder', {
            templateUrl: '/SPA/POS/InternalWorkOrder/InternalWorkOrderEntry.html',
            controller: 'InternalWorkOrderEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('InternalWorkOrderPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CompanyAdvance', {
            templateUrl: '/SPA/RECEIVABLE/CompanyAdvance/CompanyAdvanceEntry.html',
            controller: 'CompanyAdvanceEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CompanyAdvancePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PaymentOnAccount', {
            templateUrl: '/SPA/RECEIVABLE/PaymentOnAccount/PaymentOnAccount.html',
            controller: 'PaymentOnAccountController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PaymentOnAccountPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PaymentOnAccountReport', {
            templateUrl: '/SPA/RECEIVABLE/PaymentOnAccountReport/PaymentOnAccountReport.html',
            controller: 'PaymentOnAccountReportController'
        })
        .when('/CompanyOpeningReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyOpeningReport/CompanyOpeningReport.html',
            controller: 'CompanyOpeningReportController'
        })
        .when('/CompanyDashboard', {
            templateUrl: '/SPA/RECEIVABLE/CompanyDashboard/CompanyDashboard.html',
            controller: 'CompanyDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CompanyDashboardPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CompanyPayment', {
            templateUrl: '/SPA/RECEIVABLE/CompanyPayment/CompanyPaymentEntry.html',
            controller: 'CompanyPaymentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CompanyPaymentPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CompanyAdjustment', {
            templateUrl: '/SPA/RECEIVABLE/CompanyAdjustment/CompanyAdjustmentEntry.html',
            controller: 'CompanyAdjustmentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CompanyAdjustmentPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CompanyOpening', {
            templateUrl: '/SPA/RECEIVABLE/CompanyOpening/CompanyOpening.html',
            controller: 'CompanyOpeningController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CompanyOpeningPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ReceivableDashboard', {
            templateUrl: '/SPA/RECEIVABLE/ReceivableDashboard/ReceivableDashboard.html',
            controller: 'ReceivableDashboardController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ReceivableDashboardPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CompanyRefund', {
            templateUrl: '/SPA/RECEIVABLE/CompanyRefund/CompanyRefundEntry.html',
            controller: 'CompanyRefundEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CompanyRefundPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/AgingReport', {
            templateUrl: '/SPA/RECEIVABLE/AgingReport/AgingReport.html',
            controller: 'AgingReportController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('AgingReportPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/CompanyVatAit', {
            templateUrl: '/SPA/RECEIVABLE/CompanyVatAit/CompanyVatAit.html',
            controller: 'CompanyVatAitController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('CompanyVatAitPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SaleAcknowledgement', {
            templateUrl: '/SPA/RECEIVABLE/SaleAcknowledgement/SaleAcknowledgementEntry.html',
            controller: 'SaleAcknowledgementEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SaleAcknowledgementPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SaleAdjustment', {
            templateUrl: '/SPA/RECEIVABLE/SaleAdjustment/SaleAdjustmentEntry.html',
            controller: 'SaleAdjustmentEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SaleAdjustmentPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SaleRealization', {
            templateUrl: '/SPA/RECEIVABLE/SaleRealization/SaleRealizationEntry.html',
            controller: 'SaleRealizationEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SaleRealizationPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SupplierRefund', {
            templateUrl: '/SPA/PAYABLE/SupplierRefund/SupplierRefundEntry.html',
            controller: 'SupplierRefundEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SupplierRefundPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SupplierRefundReport', {
            templateUrl: '/SPA/PAYABLE/SupplierRefundReport/SupplierRefundReport.html',
            controller: 'SupplierRefundReportController'
        })
        .when('/SupplierAdvance', {
            templateUrl: '/SPA/PAYABLE/SupplierAdvance/SupplierAdvanceEntry.html',
            controller: 'SupplierAdvanceEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SupplierAdvancePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SupplierAdvanceReport', {
            templateUrl: '/SPA/PAYABLE/SupplierAdvanceReport/SupplierAdvanceReport.html',
            controller: 'SupplierAdvanceReportController'
        })
        .when('/CompanyAdvanceReport', {
            templateUrl: '/SPA/RECEIVABLE/CompanyAdvanceReport/CompanyAdvanceReport.html',
            controller: 'CompanyAdvanceReportController'
        })
        .when('/SupplierPaymentAdjustment', {
            templateUrl: '/SPA/PAYABLE/SupplierAdjustment/SupplierAdjustmentEntry.html',
            controller: 'SupplierAdjustmentController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SupplierPaymentAdjustmentPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SupplierAdjustmentReport', {
            templateUrl: '/SPA/PAYABLE/SupplierAdjustmentReport/SupplierAdjustmentReport.html',
            controller: 'SupplierAdjustmentReportController'
        })
        .when('/SupplierOpeningBalance', {
            templateUrl: '/SPA/PAYABLE/SupplierOpeningBalance/SupplierOpeningBalanceEntry.html',
            controller: 'SupplierOpeningBalanceEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SupplierOpeningBalancePermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/SupplierOpeningBalanceReport', {
            templateUrl: '/SPA/PAYABLE/SupplierOpeningBalanceReport/SupplierOpeningBalanceReport.html',
            controller: 'SupplierOpeningBalanceReportController'
        })
        
        .when('/SupplierLedger', {
            templateUrl: '/SPA/PAYABLE/SupplierLedger/SupplierLedgersEntry.html',
            controller: 'SupplierLedgersController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('SupplierLedgerPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PurchaseAcknowledgement', {
            templateUrl: '/SPA/PAYABLE/PurchaseAcknowledgement/PurchaseAcknowledgementEntry.html',
            controller: 'PurchaseAcknowledgementEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PurchaseAcknowledgementPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PurchaseAdjustment', {
            templateUrl: '/SPA/PAYABLE/PurchaseAdjustment/PurchaseAdjustmentEntry.html',
            controller: 'PurchaseAdjustmentEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PurchaseAdjustmentPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/PurchaseRealization', {
            templateUrl: '/SPA/PAYABLE/PurchaseRealization/PurchaseRealizationEntry.html',
            controller: 'PurchaseRealizationEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('PurchaseRealizationPermission');
                        if (permission != 'true') {
                            alertify.alert("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/Accounts', {
            templateUrl: '/SPA/ACCOUNTS/AccountsWindow/AccountsWindow.html',
            controller: 'AccountsWindowController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('AccountsPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/AttendancePunchUpload', {
            templateUrl: '/SPA/AttendancePunchUpload/AttendancePunchUpload.html',
            controller: 'AttendancePunchUploadController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('AttendancePunchUploadPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        
        ///IwoReport
        .when('/IWOReport', {
            templateUrl: '/SPA/POS/IWOReport/InternalWorkOrderReport.html',
            controller: 'InternalWorkOrderReportController'
        })

        .when('/ImportPurchaseReport', {
            templateUrl: '/SPA/Procurement/ImportPurchaseReport/ImportPurchaseReport.html',
            controller: 'ImportPurchaseReportController'
        })

        .when('/ProductionReport', {
            templateUrl: '/SPA/PRODUCTION/ProductionReport/ProductionReportEntry.html',
            controller: 'ProductionReportController'
        })
        .when('/DeliveryReport', {
            templateUrl: '/SPA/Inventory/DeliveryReport/DeliveryReport.html',
            controller: 'DeliveryReportController'
        })
        .when('/Mushak4_3', {
            templateUrl: '/SPA/VAT/Mushak4_3/Mushak4_3Report.html',
            controller: 'Mushak4_3ReportController'
        })
        .when('/Mushak6_1', {
            templateUrl: '/SPA/VAT/Mushak6_1/Mushak6_1Report.html',
            controller: 'Mushak6_1ReportController'
        })

        .when('/Mushak6_2', {
            templateUrl: '/SPA/VAT/Mushak6_2/Mushak6_2Report.html',
            controller: 'Mushak6_2ReportController'
        })
        .when('/SupplierLedgerReport', {
            templateUrl: '/SPA/PAYABLE/SupplierLedgerReport/SupplierLedgerReport.html',
            controller: 'SupplierLedgerReportController'
        })

        


        .when('/ImportReport', {
            templateUrl: '/SPA/Procurement/ImportReport/ImportRecordReport.html',
            controller: 'ImportRecordReportController'
        })

        .when('/ProfitLossReport', {
            templateUrl: '/SPA/ACCOUNTS/ProfitLossReport/ProfitLossReport.html',
            controller: 'ProfitLossReportController'
        })

        

        
        .when('/ProfitLoss', {
            templateUrl: '/SPA/ACCOUNTS/ProfitLoss/ProfitLoss.html',
            controller: 'ProfitLossController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ProfitLossPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ChartOfAccounts', {
            templateUrl: '/SPA/ACCOUNTS/ChartOfAccounts/ChartOfAccounts.html',
            controller: 'ChartOfAccountsController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ChartOfAccountsPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/ChartOfAccountsReport', {
            templateUrl: '/SPA/REPORTS/ChartOfAccountsReport/ChartOfAccountsReport.html',
            controller: 'ChartOfAccountsReportController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ChartOfAccountsReportPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/GeneralLedger', {
            templateUrl: '/SPA/REPORTS/GeneralLedger/GeneralLedgerReport.html',
            controller: 'GeneralLedgerController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('GeneralLedgerPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })


        .when('/TrialBalanceReportUI', {
            templateUrl: '/SPA/REPORTS/TrialBalanceReportUI/TrialBalanceUiEntry.html',
            controller: 'TrialBalanceUiController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) { var login = JSON.parse(sessionStorage.UserDataSession); }
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('TrialBalancePermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/TrialBalanceReport', {
            templateUrl: '/SPA/REPORTS/TrialBalanceReport/TrialBalanceReport.html',
            controller: 'TrialBalanceReportController'
        })

        .when('/ReceiptVoucher', {
            templateUrl: '/SPA/ACCOUNTS/ReceiptVoucher/ReceiptVoucher.html',
            controller: 'ReceiptVoucherController',
            resolve: {
                "check": function () {
                    //var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    //if (login != undefined) {
                    //    var permission = sessionStorage.getItem('ReceiptVoucherPermission');
                    //    if (permission != 'true') {
                    //        alertify.log("You don't have parmission to access this page");
                    //        window.location = '/Home/Index#/Home';
                    //    }
                    //}
                    //else {
                    //    window.location = '/Home/Login#/';
                    //}
                }
            }
        })
        .when('/PaymentVoucher', {
            templateUrl: '/SPA/ACCOUNTS/PaymentVoucher/PaymentVoucher.html',
            controller: 'PaymentVoucherController',
            resolve: {
                "check": function () {
                    //var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    //if (login != undefined) {
                    //    var permission = sessionStorage.getItem('PaymentVoucherPermission');
                    //    if (permission != 'true') {
                    //        alertify.log("You don't have parmission to access this page");
                    //        window.location = '/Home/Index#/Home';
                    //    }
                    //}
                    //else {
                    //    window.location = '/Home/Login#/';
                    //}
                }
            }
        })

        
        .when('/JournalVoucher', {
            templateUrl: '/SPA/ACCOUNTS/JournalVoucher/JournalVoucher.html',
            controller: 'JournalVoucherController',
            resolve: {
                "check": function () {
                    //var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    //if (login != undefined) {
                    //    var permission = sessionStorage.getItem('JournalVoucherPermission');
                    //    if (permission != 'true') {
                    //        alertify.log("You don't have parmission to access this page");
                    //        window.location = '/Home/Index#/Home';
                    //    }
                    //}
                    //else {
                    //    window.location = '/Home/Login#/';
                    //}
                }
            }
        })
        .when('/VoucherReport', {
            templateUrl: '/SPA/ACCOUNTS/VoucherReport/VoucherReport.html',
            controller: 'VoucherReportController'
        })
        .when('/TransferVoucher', {
            templateUrl: '/SPA/ACCOUNTS/TransferVoucher/TransferVoucher.html',
            controller: 'TransferVoucherController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('TransferVoucherPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/Reports', {
            templateUrl: '/SPA/ACCOUNTS/Reports/Reports.html',
            controller: 'ReportsController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('ReportsPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/BankAccount', {
            templateUrl: '/SPA/ADMIN/BankAccount/BankAccount.html',
            controller: 'BankAccountController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('BankAccountPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })
        .when('/BankDocumentEntry', {
            templateUrl: '/SPA/ADMIN/BankDocumentEntry/BankDocumentEntry.html',
            controller: 'BankDocumentEntryController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession"); if (UserData != null) {var login = JSON.parse(sessionStorage.UserDataSession);}
                    if (login != undefined) {
                        var permission = sessionStorage.getItem('BankDocumentEntryPermission');
                        if (permission != 'true') {
                            alertify.log("You don't have parmission to access this page");
                            window.location = '/Home/Index#/Home';
                        }
                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })

        .when('/Home', {
            templateUrl: '/SPA/Home/Home.html',
            controller: 'HomeController',
            resolve: {
                "check": function () {
                    var UserData = sessionStorage.getItem("UserDataSession");
                    if (UserData != null) {
                        var login = JSON.parse(sessionStorage.UserDataSession);
                    }
                    if (login != undefined) {

                    }
                    else {
                        window.location = '/Home/Login#/';
                    }
                }
            }
        })


        .when('/', {
            templateUrl: '/SPA/Login/Login.html',
            controller: 'LoginController'
        })

        //.when('/LazyLoad', {
        //    templateUrl: '/SPA/LazyLoad/LazyEntry.html',
        //    controller: 'LazyController',
        //    resolve: {
        //        load: function () {
        //            controllers(['LazyController'])
        //        }
        //    }
        //})
        .otherwise({ redirectTo: '/' });


    app.registerCtrl = $controllerProvider.register;

    //jquery to dynamically include controllers as needed
    function controllers(controllers) {
        var numLoaded = 0;
        for (i = 0; i < controllers.length; i++) {
            $.ajaxSetup({ async: false });
            $.getScript('js/controllers/' + controllers[i] + '.js').success(function () {
                numLoaded++;
                if (numLoaded == controllers.length) {
                    return true; //only return after all scripts are loaded, this is blocking, and will fail if all scripts aren't loaded.
                }
            });
        }
    }



});
//app.registerCtrl = $controllerProvider.register;
//var dateTimePicker = function () {
//    return {
//        restrict: "A",
//        require: "ngModel",
//        link: function (scope, element, attrs, ngModelCtrl) {
//            var parent = $(element).parent();
//            var dtp = parent.datetimepicker({
//                format: "LL",
//                showTodayButton: true
//            });
//            dtp.on("dp.change", function (e) {
//                ngModelCtrl.$setViewValue(moment(e.date).format("LL"));
//                scope.$apply();
//            });
//        }
//    };
//};

app.directive('moveNextOnEnter', function () {
    return {
        restrict: "A",
        link: function ($scope, element) {
            element.bind("keyup", function (e) {
                if (e.which == 13) {
                    var $nextElement = element.next();
                    //if ($nextElement.length) {
                    $nextElement[0].focus();
                    //}
                }
            });
            event.preventDefault();
        }
    }
});
app.directive("selectNgFiles", function () {
    return {
        require: "ngModel",
        link: function postLink(scope, elem, attrs, ngModel) {
            elem.on("change", function (e) {
                var files = elem[0].files;
                ngModel.$setViewValue(files);
            })
        }
    }
});
app.factory('MyService', function () {
    return {
        data: {
            userName: '',
            role: '',
            permission: []
        },
        update: function (username, role) {
            this.data.userName = username;
            this.data.role = role;
        },
        permissionUpdate: function (permission) {
            this.data.permission = permission;
        }
    };
});

app.config(function ($provide) {
    $provide.decorator('$exceptionHandler', function ($delegate, $cookieStore) {
        return function (exception, cause) {
            $delegate(exception, cause);
            var message = exception.message;
            $cookieStore.put('errorMassage', message);
        };

    });
});

app.run(function ($http, $cookieStore, $rootScope, $templateCache) {
    var message = $cookieStore.get('errorMassage');
    if (message != undefined) {
        var megs = $cookieStore.get('errorMassage');
        var parms = { message: megs };
        $http.post('/ErrorLog/CreateErrorLogForClintSite', parms).success(function (data) {
        });
    }

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (typeof (current) !== 'undefined') {
            $templateCache.remove(current.templateUrl);
        }
    });
});

