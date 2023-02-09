
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.ACCOUNTS.AccountsEntity
{
   public class ad_TrialBalance_t
    {
        public string AccCode { get; set; }
        public string Head { get; set; }
        public decimal DrAmount { get; set; }
        public decimal CrAmount { get; set; }
        public string SubGroupName { get; set; }
        public string SubMainGroupName { get; set; }
        public string MainGroupName { get; set; }
    }
}
