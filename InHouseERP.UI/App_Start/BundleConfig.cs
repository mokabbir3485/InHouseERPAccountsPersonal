using System.Web.Optimization;

namespace Security.UI
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"
                        ));
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/vendors").Include(
                "~/Scripts/sitebar.js",
                 "~/Scripts/jquery.signalR-2.2.1.min.js",
                 "~/Scripts/multiple-select.js",
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-route.min.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-filter.min.js",
                "~/Scripts/angularjs-dropdown-multiselect.js",
                "~/Scripts/ngAutocomplete.js",
                "~/Scripts/moment.min.js",
                "~/Scripts/bootstrap-datetimepicker.js",
                "~/Scripts/daterangepicker.min.js",
                "~/Scripts/pikaday.js",
                "~/Scripts/alertify.js",
                "~/Scripts/awesomplete.js",
                "~/Scripts/ui-bootstrap-tpls-1.3.3.min.js",
                "~/Scripts/Chart.min.js",
                "~/Scripts/Custom.js",
                "~/Scripts/typeahead.js",
                "~/Scripts/CommonScript.js",
                "~/Scripts/xlsx.full.min.js",
                "~/Scripts/ods.js",
                "~/Scripts/linq.js",
                "~/Scripts/select2.min.js",
                "~/Scripts/select.js",
                "~/Scripts/alasql.min.js",
                "~/Scripts/jquery-3.5.1.min",
                "~/Scripts/jquery-ui.js",

                "~/Scripts/select.js",
                "~/Scripts/angular-sanitize.js",
                
                "~/Scripts/ng-file-upload.min.js",
                "~/Scripts/summernote.min.js",
                "~/Scripts/hotkeys.js",
                "~/Scripts/mousetrap.js",
                "~/Scripts/dataTables.bootstrap.min.js",
                "~/Scripts/jquery.rowspanizer.js",
                "~/Scripts/kendo.all.min.js",
                "~/Scripts/bootstrap3.4.1.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/spa").Include(
                "~/SPA/app.js",
                "~/Scripts/dirPagination.js",
                "~/SPA/ChangePassword/ChangePasswordController.js",
                "~/SPA/Sync/Sync.js",
                "~/SPA/ModiulEntry/ModiulEntryController.js",
                "~/SPA/PermissionEntry/PermissionEntryController.js",
                "~/SPA/RoleEntry/RoleEntryController.js",
                "~/SPA/ScreenEntry/ScreenEntryController.js",

                "~/SPA/ADMIN/SubMainGroupEntry/SubMainGroupEntryController.js",
                "~/SPA/ADMIN/SubGroupHeadEntry/SubGroupHeadEntryController.js",

                "~/SPA/ACCOUNTS/ProfitLossReport/ProfitLossReportController.js",
                "~/SPA/ACCOUNTS/ProfitLoss/ProfitLossController.js",
                "~/SPA/ACCOUNTS/ChartOfAccounts/ChartOfAccountsController.js",
                "~/SPA/ACCOUNTS/ReceiptVoucher/ReceiptVoucherController.js",
                "~/SPA/ACCOUNTS/ReceiptVoucherReport/ReceiptVoucherReportController.js",
                "~/SPA/ACCOUNTS/PaymentVoucher/PaymentVoucherController.js",
                "~/SPA/ACCOUNTS/PaymentVoucherReport/PaymentVoucherReportController.js",
                "~/SPA/ACCOUNTS/JournalVoucher/JournalVoucherController.js",
                "~/SPA/ACCOUNTS/VoucherReport/VoucherReportController.js",
                "~/SPA/ACCOUNTS/TransferVoucher/TransferVoucherController.js",
                "~/SPA/ACCOUNTS/Reports/ReportsController.js",

                "~/SPA/REPORTS/AllVoucherReport/AllVoucherReportController.js",

                  "~/SPA/REPORTS/PrintVoucherReport/PrintVoucherController.js",

                "~/SPA/REPORTS/ChartOfAccountsReport/ChartOfAccountsReportController.js",

                "~/SPA/REPORTS/GeneralLedger/GeneralLedgerController.js",
                "~/SPA/REPORTS/GeneralLedgerReport/GeneralLedgerReportController.js",


                "~/SPA/REPORTS/TrialBalanceReport/TrialBalanceReportController.js",

                "~/SPA/REPORTS/TrialBalanceReportUI/TrialBalanceUiController.js",


                "~/SPA/Home/HomeController.js",
                "~/SPA/ACCOUNTS/AccountsWindow/AccountsWindowController.js",
                   "~/SPA/LazyLoad/LazyController.js",
                 "~/SPA/IndexController.js"
                ));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      //"~/Scripts/bootstrap-timepicker.min.js",
                      "~/Scripts/respond.js"

                     ));
            bundles.Add(new StyleBundle("~/Content/css").Include(

                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap3.4.1.min.css",
                      "~/Content/bootstrap-datetimepicker.css",
                       "~/Content/summernote.min.css",
                      //"~/Content/bootstrap-timepicker.min.css",
                      "~/Content/multiple-select.css",
                      "~/Content/font-awesome.min.css",
                       "~/Content/pikaday.css",
                       "~/Content/jquery-ui.css",
                      "~/Content/theme.css",
                      "~/Content/skins.css",
                      "~/Content/sitebar.css",
                      "~/Content/alertify.core.css",
                      "~/Content/alertify.default.css",
                      "~/Content/select2.css",
                       "~/Content/select.css",
                      "~/Content/awesomplete.css",
                       "~/Content/dataTables.min.css",
                        "~/Content/dataTables.bootstrap.min.css",
                           "~/Content/kendo.common.min.css",
                              "~/Content/kendo.blueopal.min.css",
                          "~/Content/select.css",
                          "~/Content/Custom.css",
                          "~/Content/daterangepicker.css",
                          "~/Content/Loading.css"

                      //"~/Content/dx.common.css",
                      //"~/Content/dx.light.css"
                      //"~/Content/dist/css/select2.css",
                      //"~/Content/dist/css/select2.min.css"
                      ));
            BundleTable.EnableOptimizations = false;
        }
    }
}