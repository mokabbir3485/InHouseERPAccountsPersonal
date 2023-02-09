using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_EmailNotificationSetupBLL
    {
        public ad_EmailNotificationSetupBLL()
        {
            //ad_BankDAO = ad_Bank.GetInstanceThreadSafe;
            ad_EmailNotificationSetupDAO = new ad_EmailNotificationSetupDAO();
        }

        public ad_EmailNotificationSetupDAO ad_EmailNotificationSetupDAO { get; set; }

        public List<ad_ReportNotificationName> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_EmailNotificationSetupDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_ReportNotificationName> GetReportNameForNotification()
        {
            try
            {
                return ad_EmailNotificationSetupDAO.GetReportNameForNotification();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteEmailNotificationSetupDetailByNotificationReportDetailId(long NotificationReportDetailId)
        {
            try
            {
                return ad_EmailNotificationSetupDAO.DeleteEmailNotificationSetupDetailByNotificationReportDetailId(NotificationReportDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(ad_EmailNotificationSetupDetail _ad_EmailNotificationSetupDetail)
        {
            try
            {
                return ad_EmailNotificationSetupDAO.Post(_ad_EmailNotificationSetupDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostReportNotificationName(ad_ReportNotificationName ad_ReportNotificationName)
        {
            try
            {
                return ad_EmailNotificationSetupDAO.PostReportNotificationName(ad_ReportNotificationName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
