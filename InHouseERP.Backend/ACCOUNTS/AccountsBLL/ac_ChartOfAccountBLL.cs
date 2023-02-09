using System;
using System.Collections;
using System.Collections.Generic;
using AccountsDAL;
using AccountsEntity;
using SecurityEntity.ACCOUNTS.AccountsEntity;

namespace AccountsBLL
{
    public class ac_ChartOfAccountBLL //: IDisposible
    {
        public ac_ChartOfAccountBLL()
        {
            //ac_ChartOfAccountDAO = ac_ChartOfAccount.GetInstanceThreadSafe;
            ac_ChartOfAccountDAO = new ac_ChartOfAccountDAO();
        }

        public ac_ChartOfAccountDAO ac_ChartOfAccountDAO { get; set; }

        public List<ac_ChartOfAccount> GetChartOfAccountsReport()
        {
            try
            {
                return ac_ChartOfAccountDAO.GetChartOfAccountsReport();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_ChartOfAccount> GetAllChartOfAccountHead()
        {
            try
            {
                return ac_ChartOfAccountDAO.GetAllChartOfAccountHead();
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
                return ac_ChartOfAccountDAO.GeneralLedgerReport(AccountsCode, FormDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IList ProfitLossReportDeptWise(string Depart_ID, string FormDate, string ToDate)
        {
            try
            {
                return ac_ChartOfAccountDAO.ProfitLossReportDeptWise(Depart_ID, FormDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_TrialBalance_t> TrialBalanceReport(string enddate)
        {
            try
            {
                return ac_ChartOfAccountDAO.TrialBalanceReport(enddate);
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
                return ac_ChartOfAccountDAO.ChartOfAccountHeadCode(MainGroupID, SubMainGroupId, SubGroupHeadID);
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
                return ac_ChartOfAccountDAO.GetDynamic(whereCondition, orderByExpression);
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
                return ac_ChartOfAccountDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(ac_ChartOfAccount ac_ChartOfAccount)
        {
            try
            {
                return ac_ChartOfAccountDAO.Add(ac_ChartOfAccount);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Update(ac_ChartOfAccount ac_ChartOfAccount)
        {
            try
            {
                return ac_ChartOfAccountDAO.Update(ac_ChartOfAccount);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}