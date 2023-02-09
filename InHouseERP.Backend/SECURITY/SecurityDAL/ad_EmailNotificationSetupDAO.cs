using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_EmailNotificationSetupDAO
    {
        private static volatile ad_EmailNotificationSetupDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_EmailNotificationSetupDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_EmailNotificationSetupDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_EmailNotificationSetupDAO();
                    }

                return instance;
            }
        }

        public static ad_EmailNotificationSetupDAO GetInstance()
        {
            if (instance == null) instance = new ad_EmailNotificationSetupDAO();
            return instance;
        }

        public List<ad_ReportNotificationName> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_ReportNotificationName = new List<ad_ReportNotificationName>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_ReportNotificationName = dbExecutor.FetchDataRef<ad_ReportNotificationName>(CommandType.StoredProcedure,
                    "s_ReportNotification_GetPaged", colparameters, ref rows);
                return ad_ReportNotificationName;
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
                var ad_ReportNameLst = new List<ad_ReportNotificationName>();
                ad_ReportNameLst = dbExecutor.FetchData<ad_ReportNotificationName>(CommandType.StoredProcedure, "s_ReportNotification_Get");
                return ad_ReportNameLst;
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
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@NotificationReportDetailId", NotificationReportDetailId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "s_ReportNotificationDetail_DeleteByNotificationReportDetailId", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(ad_EmailNotificationSetupDetail _ad_EmailNotificationSetupDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@NotificationReportDetailId", _ad_EmailNotificationSetupDetail.NotificationReportDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ReportId", _ad_EmailNotificationSetupDetail.ReportId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@EmployeeId", _ad_EmailNotificationSetupDetail.EmployeeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UserName", _ad_EmailNotificationSetupDetail.UserName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@EmailId", _ad_EmailNotificationSetupDetail.EmailId, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_EmailNotificationSetupDetail.IsActive, DbType.Boolean, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "s_ReportNotificationDetail_Post",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }
        public long PostReportNotificationName(ad_ReportNotificationName ad_ReportNotificationName)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ReportId", ad_ReportNotificationName.ReportId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ReportName", ad_ReportNotificationName.ReportName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReportCode", ad_ReportNotificationName.ReportCode, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_ReportNotificationName.IsActive, DbType.Boolean, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "s_ReportNotification_Post",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }
    }
}
