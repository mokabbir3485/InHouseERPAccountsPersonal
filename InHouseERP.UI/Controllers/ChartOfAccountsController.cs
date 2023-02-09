using AccountsEntity;
using AccountsBLL;
using DbExecutor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Collections;

namespace Security.UI.Controllers
{
    public class ChartOfAccountsController : Controller
    {
        //
        // GET: /ChartOfAccounts/


        [HttpPost]
        public string Add(ac_ChartOfAccount ac_ChartOfAccount)
        {
            if (ac_ChartOfAccount.Code == null) { ac_ChartOfAccount.Code = ""; }
            if (ac_ChartOfAccount.Description == null) { ac_ChartOfAccount.Description = ""; }
            string ret = "";
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {

                    if (ac_ChartOfAccount.IsUpdate == false)
                    {
                        ret = Facade.ac_ChartOfAccountBLL.Add(ac_ChartOfAccount);
                    }
                    else
                    {
                        ret = Facade.ac_ChartOfAccountBLL.Update(ac_ChartOfAccount);
                    }
                    



                    if (ret != "")
                        ts.Complete();
                }
                return ret;
            }
            catch (Exception ex)
            {
                ret = "";
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ChartOfAccountsController";
                new ErrorLogController().CreateErrorLog(error);
            }

            return ret;
        }

        public JsonResult GetChartOfAccountsReport()
        {
            try
            {
                var list = Facade.ac_ChartOfAccountBLL.GetChartOfAccountsReport();
                return Json(list, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ChartOfAccountsController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult GetAllChartOfAccountHead()
        {
            try
            {
                var iwolist = Facade.ac_ChartOfAccountBLL.GetAllChartOfAccountHead();
                return Json(iwolist, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ChartOfAccountsController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult ProfitLossReportDeptWise(string Depart_ID, string FormDate,string ToDate)
        {
            try
            {
                var list = Facade.ac_ChartOfAccountBLL.ProfitLossReportDeptWise(Depart_ID, FormDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ChartOfAccountsController";
                new ErrorLogController().CreateErrorLog(error);
                throw ex;
            }
        }

        [HttpGet]
        public JsonResult GeneralLedgerReport(string AccountsCode,string FormDate,string ToDate)
        {
            try
            {
                var iwolist = Facade.ac_ChartOfAccountBLL.GeneralLedgerReport(AccountsCode, FormDate, ToDate);
                return Json(iwolist, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ChartOfAccountsController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult TrialBalanceReport(string enddate)
        {
            try
            {
                var iwolist = Facade.ac_ChartOfAccountBLL.TrialBalanceReport(enddate);
                return Json(iwolist, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ChartOfAccountsController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult ChartOfAccountHeadCode(string MainGroupID ,string SubMainGroupId,string SubGroupHeadID)
        {
            try
            {
                var iwolist = Facade.ac_ChartOfAccountBLL.ChartOfAccountHeadCode(MainGroupID, SubMainGroupId, SubGroupHeadID);
                return Json(iwolist, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ChartOfAccountsController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult GetAccountPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.ac_ChartOfAccountBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "[Code]", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ChartOfAccountsController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        //public int SaveAccountTypeDetail(ac_AccountTypeDetail accountTypeDetail)
        //{
        //    int ret = 0;
        //    //accountTypeDetail.IsActive = true;
        //    accountTypeDetail.IsDefault = false;
        //    accountTypeDetail.DetailDisplayName = accountTypeDetail.AccountTypeDetailName;
        //    accountTypeDetail.UpdatorId = 1;
        //    accountTypeDetail.UpdateDate = DateTime.Now;
        //    try
        //    {
        //        if (accountTypeDetail.AccountTypeDetailId == 0)
        //        {
        //            ret = Facade.accountTypeDetailBLL.Add(accountTypeDetail);
        //        }
        //        else
        //        {
        //            ret = Facade.accountTypeDetailBLL.Update(accountTypeDetail);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "AccountTypeDetailController";
        //        new ErrorLogController().CreateErrorLog(error);
        //    }
        //    return ret;
        //}

        public JsonResult GetChartOfAcountsPaged( int StartRecordNo, int RowPerPage, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.ac_ChartOfAccountBLL.GetPaged(StartRecordNo, RowPerPage, "", "AccountName", "ASC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ChartOfAccountsController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


	}
}