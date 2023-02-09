using AccountsDAL;
using AccountsBLL;

namespace AccountsBLL
{
    public static class Facade
    {
        public static ac_ChartOfAccountBLL ac_ChartOfAccountBLL => new ac_ChartOfAccountBLL();
        public static ac_TransactionDAO transactionDAO => new ac_TransactionDAO();
        public static ac_ChartOfAccountsReportBLL ac_ChartOfAccountsReportBLL => new ac_ChartOfAccountsReportBLL();
        public static  ac_JournalVoucherBLL ac_JournalVoucherBLL => new ac_JournalVoucherBLL();
    }
}