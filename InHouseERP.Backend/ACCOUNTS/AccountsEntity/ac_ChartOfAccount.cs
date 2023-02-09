using System;

namespace AccountsEntity
{
    public class ac_ChartOfAccount
    {
        public string MainGroupID { get; set; }
        public string MainGroupName { get; set; }
       
        public string SubMainGroupID { get; set; }
        public string SubMainGroupName { get; set; }

        public string SubGroupHeadID { get; set; }
        public string SubGroupHeadName { get; set; }

        public string Head { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int? slno { get; set; }
        public bool isActive { get; set; }
        public bool IsUpdate { get; set; }

        public string creator { get; set; }
        public DateTime creationdate { get; set; }
        public string modifier { get; set; }
        public DateTime modificationdate { get; set; }
    }
}