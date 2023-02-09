using SecurityBLL;
using SecurityEntity;
using System;
using System.Web.Mvc;
using DbExecutor;
using Security.UI.Controllers;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Collections.Generic;

namespace InHouseERP.UI.Controllers
{
    public class SubMainGroupEntryController : Controller
    {
        //public class MainGroup
        //{
        //    public string ID { get; set; }
        //    public string Name { get; set; }
        //    public string Type { get; set; }
        //}

        public JsonResult GetAllMainGroup()
        {

            /////////////////
            ////string connectionString = ConfigurationManager.ConnectionStrings["dbCon"].ConnectionString;
            ////SqlConnection con = new SqlConnection(connectionString);
            try
            {
                var list = Facade.ad_SubMainGroupBLL.GetAllMainGroup();
                return Json(list, JsonRequestBehavior.AllowGet);

                //List<MainGroup> MainGroupList = new List<MainGroup>();
                //string connectionString = ConfigurationManager.ConnectionStrings["dbCon"].ConnectionString;

                //using (var con = new SqlConnection(connectionString))
                //using (var command = new SqlCommand("MainGroup_t_Get", con)
                //{
                //    CommandType = CommandType.StoredProcedure
                //})
                //{
                //    con.Open();
                //    command.ExecuteNonQuery();
                //    SqlDataReader rdr = command.ExecuteReader();
                //    while (rdr.Read())
                //    {
                //        var MainGroup = new MainGroup();

                //        MainGroup.Name = rdr["Name"].ToString();
                //        MainGroup.ID = rdr["MainGroupId"].ToString();
                //        MainGroup.Type = rdr["Type"].ToString();

                //        MainGroupList.Add(MainGroup);
                //    }

                //    con.Close();
                //}
                //return Json(MainGroupList, JsonRequestBehavior.AllowGet);




                //var list = Facade.ad_MainGroupBLL.GetAllMainGroup();
                //return Json(list, JsonRequestBehavior.AllowGet);

                //List<MainGroup> MainGroupList = new List<MainGroup>();

                //using (SqlConnection con = new SqlConnection(CS))
                //{

                //string connectionString = @"Data Source=192.168.4.15; Initial Catalog=Accounts_2016; User Id=sa; Password=sql@123; Connect Timeout=90;";

                //    con.Open();
                //SqlCommand cmd = new SqlCommand("SELECT * FROM MainGroup_t", con);
                //cmd.CommandType = CommandType.Text;


                //SqlDataReader rdr = cmd.ExecuteReader();
                //while (rdr.Read())
                //{
                //    var MainGroup = new MainGroup();

                //    MainGroup.Name = rdr["Name"].ToString();
                //    MainGroup.ID = rdr["ID"].ToString();
                //    MainGroup.Type = rdr["Type"].ToString();

                //    MainGroupList.Add(MainGroup);
                //}

                //con.Close();
                //con.Dispose();
                //return Json(MainGroupList, JsonRequestBehavior.AllowGet);
                //}

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
            //finally
            //{
            //    con.Close();
            //    con.Dispose();
            //}
        }
        public JsonResult GetAllSubMainGroup()
        {
            try
            {
                var list = Facade.ad_SubMainGroupBLL.GetAllSubMainGroup();
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

        [HttpGet]
        public JsonResult GetBySubMainGroupId(string MainGroupID)
        {
            try
            {
                var list = Facade.ad_SubMainGroupBLL.GetBySubMainGroupId(MainGroupID);
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
        public string Save(ad_SubMainGroup ad_SubMainGroup)
        {
            if (ad_SubMainGroup.Name == null) { ad_SubMainGroup.Name = ""; }
            if (ad_SubMainGroup.Description == null) { ad_SubMainGroup.Description = ""; }
            string ret = "";
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    if(ad_SubMainGroup.IsUpdate == false)
                    {
                        ret = Facade.ad_SubMainGroupBLL.Add(ad_SubMainGroup);
                    }
                    else
                    {
                        ret = Facade.ad_SubMainGroupBLL.Update(ad_SubMainGroup);
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
                error.FileName = "SubMainGroupEntryController";
                new ErrorLogController().CreateErrorLog(error);
            }

            return ret;
        }

        public JsonResult GetSubMainGroupPaged(int StartRecordNo, int RowPerPage, string SearchCr, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.ad_SubMainGroupBLL.GetPaged(StartRecordNo, RowPerPage, SearchCr, "SM.ID", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
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
    }
}