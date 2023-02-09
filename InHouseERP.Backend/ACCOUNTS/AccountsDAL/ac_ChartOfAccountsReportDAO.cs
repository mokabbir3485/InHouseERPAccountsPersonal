using System;
using System.Collections.Generic;
using System.Data;
using AccountsEntity;
using DbExecutor;


namespace AccountsDAL
{
    public class ac_ChartOfAccountsReportDAO
    {
        private static volatile ac_ChartOfAccountsReportDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ac_ChartOfAccountsReportDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ac_ChartOfAccountsReportDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ac_ChartOfAccountsReportDAO();
                    }

                return instance;
            }
        }

        public static ac_ChartOfAccountsReportDAO GetInstance()
        {
            if (instance == null) instance = new ac_ChartOfAccountsReportDAO();
            return instance;
        }

        public List<ac_ChartOfAccountsReport> GetChartOfAccountsReport()
        {
            try
            {
                var ac_ChartOfAccountsReportLst = new List<ac_ChartOfAccountsReport>();
                ac_ChartOfAccountsReportLst = dbExecutor.FetchData<ac_ChartOfAccountsReport>(CommandType.StoredProcedure,
                    "Rpt_ChartOfAccounts", null);
                return ac_ChartOfAccountsReportLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
