using System;

namespace AccountsEntity
{
    public class ac_ProfitLoss_t
    {
        public string MainGroup { get; set; }
        public string SubMainGroup { get; set; }
        public string SubGroupHead { get; set; }
        public string AccHead { get; set; }
        public string AccCode { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
    }
}
