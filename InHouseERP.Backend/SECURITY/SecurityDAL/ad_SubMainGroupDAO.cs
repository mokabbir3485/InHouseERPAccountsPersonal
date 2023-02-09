using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DbExecutor;
using SecurityEntity;


namespace SecurityEntity
{
    public class ad_SubMainGroupDAO
    {
        private static volatile ad_SubMainGroupDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_SubMainGroupDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_SubMainGroupDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_SubMainGroupDAO();
                    }

                return instance;
            }
        }

        public static ad_SubMainGroupDAO GetInstance()
        {
            if (instance == null) instance = new ad_SubMainGroupDAO();
            return instance;
        }

        public List<ad_MainGroup> GetAllMainGroup(string MainGroupID = null)
        {
            try
            {
                var ad_MainGroupLst = new List<ad_MainGroup>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@MainGroupID", MainGroupID, DbType.String, ParameterDirection.Input)
                };
                ad_MainGroupLst = dbExecutor.FetchData<ad_MainGroup>(CommandType.StoredProcedure,
                    "MainGroup_t_Get", colparameters);
                return ad_MainGroupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_SubMainGroup> GetAllSubMainGroup(string SubMainGroupID = null)
        {
            try
            {
                var ad_SubMainGroupLst = new List<ad_SubMainGroup>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SubMainGroupID", SubMainGroupID, DbType.String, ParameterDirection.Input)
                };
                ad_SubMainGroupLst = dbExecutor.FetchData<ad_SubMainGroup>(CommandType.StoredProcedure,
                    "SubMainGroup_t_Get", colparameters);
                return ad_SubMainGroupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetBySubMainGroupId(string MainGroupId)
        {
            try
            {
                Parameters[] colparameters;
                colparameters = new Parameters[1]
                {
                        new Parameters("@MainGroupId", MainGroupId, DbType.String, ParameterDirection.Input)
                };
                string maxInvoiceNo = "";
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxInvoiceNo = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "Sp_GetMaxSubMainGroupID", colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxInvoiceNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_SubMainGroup> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_SubMainGroupLst = new List<ad_SubMainGroup>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_SubMainGroupLst = dbExecutor.FetchDataRef<ad_SubMainGroup>(CommandType.StoredProcedure,
                    "SubMainGroup_t_GetPaged", colparameters, ref rows);
                return ad_SubMainGroupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(ad_SubMainGroup ad_SubMainGroup)
        {
            string ret = "";
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@SubMainGroupID", ad_SubMainGroup.SubMainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MainGroupID", ad_SubMainGroup.MainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Name", ad_SubMainGroup.Name, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Description", ad_SubMainGroup.Description, DbType.String,
                        ParameterDirection.Input)
                    //new Parameters("@bs_sl_no", ad_SubMainGroup.bs_sl_no, DbType.Int32, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "SubMainGroup_t_Create",
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
        public string Update(ad_SubMainGroup ad_SubMainGroup)
        {
            string ret = "";
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@SubMainGroupID", ad_SubMainGroup.SubMainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MainGroupID", ad_SubMainGroup.MainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Name", ad_SubMainGroup.Name, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Description", ad_SubMainGroup.Description, DbType.String,
                        ParameterDirection.Input)
                    //new Parameters("@bs_sl_no", ad_SubMainGroup.bs_sl_no, DbType.Int32, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "SubMainGroup_t_Update",
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
