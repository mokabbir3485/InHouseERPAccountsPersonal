using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;


namespace SecurityBLL
{
    public class s_SystemNotificationBLL
    {
        public s_SystemNotificationBLL()
        {
            //MeetingMinutesDAO = ad_Employee.GetInstanceThreadSafe;
            s_SystemNotificationDAO = new s_SystemNotificationDAO();
        }

        public s_SystemNotificationDAO s_SystemNotificationDAO { get; set; }

        public Int64 AddSystemMaintenance(s_SystemNotification s_SystemNotification)
        {
            try
            {
                return s_SystemNotificationDAO.AddSystemMaintenance(s_SystemNotification);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 UpdateSystemMaintenance(s_SystemNotification s_SystemNotification)
        {
            try
            {
                return s_SystemNotificationDAO.UpdateSystemMaintenance(s_SystemNotification);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_SystemNotification> GetMaintenanceData(DateTime now)
        {
            try
            {
                return s_SystemNotificationDAO.GetMaintenanceData(now);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
