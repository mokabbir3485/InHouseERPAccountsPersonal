using System;
using System.Collections.Generic;
using AccountsDAL;
using AccountsEntity;
namespace AccountsBLL
{
    public class ac_ChartOfAccountsReportBLL
    {
        public ac_ChartOfAccountsReportBLL()
        {
            ac_ChartOfAccountsReportDAO = new ac_ChartOfAccountsReportDAO();
        }

        public ac_ChartOfAccountsReportDAO ac_ChartOfAccountsReportDAO { get; set; }

        public List<ac_ChartOfAccountsReport> GetChartOfAccountsReport()
        {
            try
            {
                return ac_ChartOfAccountsReportDAO.GetChartOfAccountsReport();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
