using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AccountsEntity;
using DbExecutor;
using SecurityEntity.ACCOUNTS.AccountsEntity;

namespace AccountsDAL
{
    public class ac_ChartOfAccountDAO //: IDisposible
    {
        private static volatile ac_ChartOfAccountDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ac_ChartOfAccountDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ac_ChartOfAccountDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ac_ChartOfAccountDAO();
                    }

                return instance;
            }
        }

        public static ac_ChartOfAccountDAO GetInstance()
        {
            if (instance == null) instance = new ac_ChartOfAccountDAO();
            return instance;
        }

        public List<ac_ChartOfAccount> GetChartOfAccountsReport(int? accountId = null)
        {
            try
            {
                var ac_ChartOfAccountLst = new List<ac_ChartOfAccount>();
                //var colparameters = new Parameters[1]
                //{
                //    new Parameters("@AccountId", accountId, DbType.Int32, ParameterDirection.Input)
                //};
                ac_ChartOfAccountLst = dbExecutor.FetchData<ac_ChartOfAccount>(CommandType.StoredProcedure,
                    "Rpt_ChartOfAccounts", null);
                return ac_ChartOfAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ac_ChartOfAccount> GetAllChartOfAccountHead(Int32 ? slno  = null)
        {
            try
            {
                var ac_ChartOfAccountLst = new List<ac_ChartOfAccount>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@slno",slno, DbType.String, ParameterDirection.Input)
                };
                ac_ChartOfAccountLst = dbExecutor.FetchData<ac_ChartOfAccount>(CommandType.StoredProcedure,
                    "chartOfAccounts_t_Get", colparameters);
                return ac_ChartOfAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_journal_t> GeneralLedgerReport(string AccountsCode, string FormDate, string ToDate)
        {
            try
            {
                var ac_journalList = new List<ac_journal_t>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@AccountsCode",AccountsCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@from_Date",FormDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@endDate",ToDate, DbType.String, ParameterDirection.Input),
                };
                ac_journalList = dbExecutor.FetchData<ac_journal_t>(CommandType.StoredProcedure,
                    "proc_Leadger", colparameters);
                return ac_journalList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_ProfitLoss_t> ProfitLossReportDeptWise2(string Depart_ID, string FormDate, string ToDate)
        {
            try
            {
                var ac_ProfitLossList = new List<ac_ProfitLoss_t>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@begDate",FormDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@enddate",ToDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@deptid",Depart_ID, DbType.String, ParameterDirection.Input),
                };
                ac_ProfitLossList = dbExecutor.FetchData<ac_ProfitLoss_t>(CommandType.StoredProcedure,
                    "proc_ProfitLossRpt_DeptWise", colparameters);
                return ac_ProfitLossList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IList ProfitLossReportDeptWise(string Depart_ID, string FormDate, string ToDate)
        {
            var finalList = new ArrayList();
            try
            {
                IList myList = new ArrayList();
                var dataTable = new DataTable();

                var cmdText = $"proc_ProfitLossRpt_DeptWise {"'"+FormDate+"'"+','+"'"+ToDate + "'"+',' + "'"+Depart_ID+"'"}";

                dataTable = dbExecutor.GetDataTable(CommandType.Text, cmdText, true);


                myList = dataTable.AsEnumerable().Select(
                    row => dataTable.Columns.Cast<DataColumn>().ToDictionary(
                        column => column.ColumnName,
                        column => row[column].ToString()
                    )).ToList();


                return myList;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ad_TrialBalance_t> TrialBalanceReport(string enddate)
        {
            try
            {
                var ad_TrialBalanceList = new List<ad_TrialBalance_t>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@enddate",enddate, DbType.String, ParameterDirection.Input),
                  
                };
                ad_TrialBalanceList = dbExecutor.FetchData<ad_TrialBalance_t>(CommandType.StoredProcedure,
                    "proc_TrialBalance", colparameters);
                return ad_TrialBalanceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public string ChartOfAccountHeadCode(string MainGroupID, string SubMainGroupId, string SubGroupHeadID)
        {
            try
            {
                Parameters[] colparameters;
                colparameters = new Parameters[3]
                {
                        new Parameters("@MainGroupID", MainGroupID, DbType.String, ParameterDirection.Input),
                        new Parameters("@SubMainGroupId", SubMainGroupId, DbType.String, ParameterDirection.Input),
                        new Parameters("@SubGroupHeadID", SubGroupHeadID, DbType.String, ParameterDirection.Input)
                };
                string chartofAccNo = "";
                dbExecutor.ManageTransaction(TransactionType.Open);
                chartofAccNo = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "spgetMaxSlChartAcc", colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return chartofAccNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_ChartOfAccount> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ac_ChartOfAccountLst = new List<ac_ChartOfAccount>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ac_ChartOfAccountLst = dbExecutor.FetchData<ac_ChartOfAccount>(CommandType.StoredProcedure,
                    "ac_ChartOfAccount_GetDynamic", colparameters);
                return ac_ChartOfAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_ChartOfAccount> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ac_ChartOfAccountLst = new List<ac_ChartOfAccount>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ac_ChartOfAccountLst = dbExecutor.FetchDataRef<ac_ChartOfAccount>(CommandType.StoredProcedure,
                    "chartOfAccounts_t_GetPaged", colparameters, ref rows);
                return ac_ChartOfAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Add(ac_ChartOfAccount ac_ChartOfAccount)
        {
            string ret = "";
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@SubGroupHeadID", ac_ChartOfAccount.SubGroupHeadID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MainGroupID", ac_ChartOfAccount.MainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SubMainGroupID", ac_ChartOfAccount.SubMainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Code", ac_ChartOfAccount.Code, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Head", ac_ChartOfAccount.Head, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Description", ac_ChartOfAccount.Description, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@isActive", ac_ChartOfAccount.isActive, DbType.Boolean, ParameterDirection.Input)

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "chartOfAccounts_t_Create",
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
        public string Update(ac_ChartOfAccount ac_ChartOfAccount)
        {
            string ret = "";
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@slno", ac_ChartOfAccount.slno, DbType.Int32,
                        ParameterDirection.Input),
                     new Parameters("@SubGroupHeadID", ac_ChartOfAccount.SubGroupHeadID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MainGroupID", ac_ChartOfAccount.MainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SubMainGroupID", ac_ChartOfAccount.SubMainGroupID, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Code", ac_ChartOfAccount.Code, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Head", ac_ChartOfAccount.Head, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Description", ac_ChartOfAccount.Description, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@isActive", ac_ChartOfAccount.isActive, DbType.Boolean, ParameterDirection.Input)

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "chartOfAccounts_t_Update",
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