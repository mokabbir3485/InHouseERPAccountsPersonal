using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;


namespace SecurityDAL
{
    public class ad_SubGroupHeadDAO
    {
        private static volatile ad_SubGroupHeadDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_SubGroupHeadDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_SubGroupHeadDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_SubGroupHeadDAO();
                    }

                return instance;
            }
        }

        public static ad_SubGroupHeadDAO GetInstance()
        {
            if (instance == null) instance = new ad_SubGroupHeadDAO();
            return instance;
        }

        

        public string GetBySubMainHeadGroupId(string MainGroupID, string SubMainGroupId)
        {
            try
            {
                Parameters[] colparameters;
                colparameters = new Parameters[2]
                {
                        new Parameters("@MainGroupID", MainGroupID, DbType.String, ParameterDirection.Input),
                        new Parameters("@SubMainGroupId", SubMainGroupId, DbType.String, ParameterDirection.Input)
                };
                string maxInvoiceNo = "";
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxInvoiceNo = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "Sp_GetMaxSubGroupHeadID", colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxInvoiceNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_SubGroupHead> GetAllSubGroupHead(string SubGroupHeadID = null)
        {
            try
            {
                var ad_SubGroupHeadLst = new List<ad_SubGroupHead>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SubGroupHeadID", SubGroupHeadID, DbType.String, ParameterDirection.Input)
                };
                ad_SubGroupHeadLst = dbExecutor.FetchData<ad_SubGroupHead>(CommandType.StoredProcedure,
                    "SubGroupHead_t_Get", colparameters);
                return ad_SubGroupHeadLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(ad_SubGroupHead ad_SubGroupHead)
        {
            string ret = "";
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@SubGroupHeadID", ad_SubGroupHead.SubGroupHeadID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MainGroupID", ad_SubGroupHead.MainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SubMainGroupID", ad_SubGroupHead.SubMainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Name", ad_SubGroupHead.Name, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Description", ad_SubGroupHead.Description, DbType.String,
                        ParameterDirection.Input)
                    //new Parameters("@bs_sl_no", ad_SubMainGroup.bs_sl_no, DbType.Int32, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "SubGroupHead_t_Create",
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


        public string Update(ad_SubGroupHead ad_SubGroupHead)
        {
            string ret = "";
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@SubGroupHeadID", ad_SubGroupHead.SubGroupHeadID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MainGroupId", ad_SubGroupHead.MainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SubMainGroupId", ad_SubGroupHead.SubMainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Name", ad_SubGroupHead.Name, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Description", ad_SubGroupHead.Description, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@balance_sl_no", ad_SubGroupHead.balance_sl_no, DbType.Int32, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "SubGroupHead_t_Update",
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

        public List<ad_SubGroupHead> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_SubGroupHeadLst = new List<ad_SubGroupHead>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_SubGroupHeadLst = dbExecutor.FetchDataRef<ad_SubGroupHead>(CommandType.StoredProcedure,
                    "SubGroupHead_t_GetPaged", colparameters, ref rows);
                return ad_SubGroupHeadLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
