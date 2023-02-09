using AccountsEntity;
using AccountsBLL;
using DbExecutor;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Security.UI.Controllers;

namespace InHouseERP.UI.Controllers
{
    public class JournalVoucherController : Controller
    {
        // GET: JournalVoucher


        [HttpPost]
        public Int32 SaveJournal(List<ac_journal_t> journal_t)
        {
            Int32 ret =0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {

                    foreach (ac_journal_t journal in journal_t)
                    {
                        if (journal.BranchID == null) { journal.BranchID = ""; }
                        if (journal.ReceivedBy == null) { journal.ReceivedBy = ""; }
                        if (journal.CR_DeptID == null) { journal.CR_DeptID = ""; }
                        if (journal.VoucherNo == null) { journal.VoucherNo = ""; }

                        if (journal.DrCode == null) { journal.DrCode = ""; }
                        if (journal.CrCode == null) { journal.CrCode = ""; }
                        if (journal.ChequeNo == null) { journal.ChequeNo = ""; }
                        if (journal.Particulars == null) { journal.Particulars = ""; }
                        if (journal.invoice_no == null) { journal.invoice_no = ""; }
                        if (journal.creator == null) { journal.creator = ""; }
                        if (journal.modifier == null) { journal.modifier = "0"; }

                        if (journal.rid==0)
                        {
                            ret = Facade.ac_JournalVoucherBLL.Add(journal);
                        }
                        else
                        {
                            ret = Facade.ac_JournalVoucherBLL.Update(journal);

                        }
                       

                    }

                    if (ret != 0)
                    ts.Complete();
                }
            }
            catch (Exception ex)
            {
              
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JournalVoucherController";
                new ErrorLogController().CreateErrorLog(error);
                return ret;
            }

            return ret;
        }



        [HttpGet]
        public JsonResult JournalVoucherGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.ac_JournalVoucherBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "J.VoucherNo", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JournalVoucherController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult GetByVoucherGenerate(string VoucherName)
        {
            try
            {

                var Voucherno = Facade.ac_JournalVoucherBLL.GetByVoucherGenerate(VoucherName);
                return Json(Voucherno, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JournalVoucherController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult VoucherReport(string VoucherNo)
        {
            try
            {

                var Voucherno = Facade.ac_JournalVoucherBLL.VoucherReport(VoucherNo);
                return Json(Voucherno, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JournalVoucherController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult GetJournalByVoucherNo(string VoucherNo)
        {
            try
            {

                var JournalList = Facade.ac_JournalVoucherBLL.GetJournalByVoucherNo(VoucherNo);
                return Json(JournalList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JournalVoucherController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllJournalVoucherReportdata(Int32 JournalVoucherId)
        {
            try
            {
                var JournalVoucherList = Facade.ac_JournalVoucherBLL.GetAllJournalVoucherReportdata(JournalVoucherId); //pos_StockDeliveryDetail
                return Json(JournalVoucherList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JournalVoucherController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult AllVoucherReport(DateTime FormDate,DateTime ToDate,string VoucherType)
        {
            try
            {
                var JournalVoucherList = Facade.ac_JournalVoucherBLL.AllVoucherReport(FormDate, ToDate, VoucherType); //pos_StockDeliveryDetail
                return Json(JournalVoucherList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JournalVoucherController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult GetAllDepartment()
        {
            try
            {
                var DepartmentList = Facade.ac_JournalVoucherBLL.GetAllDepartment();
                return Json(DepartmentList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JournalVoucherController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult GetAllBranch()
        {
            try
            {
                var BranchList = Facade.ac_JournalVoucherBLL.GetAllBranch();
                return Json(BranchList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JournalVoucherController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }


    }
}