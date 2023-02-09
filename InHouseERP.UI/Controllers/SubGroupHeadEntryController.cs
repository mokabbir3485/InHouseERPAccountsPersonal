using SecurityBLL;
using SecurityEntity;
using System;
using System.Web.Mvc;
using DbExecutor;
using Security.UI.Controllers;

namespace InHouseERP.UI.Controllers
{
    public class SubGroupHeadEntryController : Controller
    {
        
        public JsonResult GetAllSubGroupHead()
        {
            try
            {
                var list = Facade.ad_SubGroupHeadBLL.GetAllSubGroupHead();
                return Json(list, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SubGroupHeadEntryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        //[HttpPost]
        //public string Save2(ad_SubGroupHead ad_SubGroupHead)
        //{
        //    string ret = "";


        //    return ret;
        //}

        [HttpGet]
        public JsonResult GetBySubMainHeadGroupId(string MainGroupID ,string SubMainGroupId)
        {
            try
            {
                var list = Facade.ad_SubGroupHeadBLL.GetBySubMainHeadGroupId(MainGroupID, SubMainGroupId);
                return Json(list, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SubMainGroupEntryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public string SubGroupHeadSave(ad_SubGroupHead ad_SubGroupHead)
        {

            ad_SubGroupHead.SubGroupHeadID = ad_SubGroupHead.SubGroupHeadCode;

            if (ad_SubGroupHead.Name == null) { ad_SubGroupHead.Name = ""; }
            if (ad_SubGroupHead.Description == null) { ad_SubGroupHead.Description = ""; }
            string ret = "";
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                  
                    if (ad_SubGroupHead.IsUpdate==true)
                    {
                        ret = Facade.ad_SubGroupHeadBLL.Update(ad_SubGroupHead);

                    }
                    else
                    {
                        ret = Facade.ad_SubGroupHeadBLL.Add(ad_SubGroupHead);

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
                error.FileName = "SubGroupHeadEntryController";
                new ErrorLogController().CreateErrorLog(error);
            }

            return ret;
        }

        [HttpGet]
        public JsonResult GetSubGroupHeadPaged(int StartRecordNo, int RowPerPage, string SearchCr, int rows)
       {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.ad_SubGroupHeadBLL.GetPaged(StartRecordNo, RowPerPage, SearchCr, "SGH.ID", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SubGroupHeadEntryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

    }
}