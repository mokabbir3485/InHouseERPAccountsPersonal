using System;


namespace AccountsEntity
{
    public class ac_ChartOfAccountsReport
    {
        public string MainGroupID { get; set; }
        public string MainGroupName { get; set; }
        public string SubMainGroupID { get; set; }
        public string SubMainGroupName { get; set; }
        public string SubGroupHeadID { get; set; }
        public string SubGroupHeadName { get; set; }
        public string SubMainGroupDescription { get; set; }
        public string SubGroupHeadDescription { get; set; }
        public string TypeCode { get; set; }
        public int balance_sl_no { get; set; }
    }
}
