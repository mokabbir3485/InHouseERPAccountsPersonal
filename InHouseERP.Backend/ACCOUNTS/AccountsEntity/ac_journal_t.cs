using System;


namespace AccountsEntity
{
    public class ac_journal_t
    {
        public string BranchID { get; set; }
        public string DeptID { get; set; }
        public string CR_DeptID { get; set; }
        public string VoucherNo { get; set; }
        public Int32 rid { get; set; }
        public DateTime  VDate { get; set; }
        public string DrCode { get; set; }
        //public string CreditHead { get; set; }
        public string DrHead { get; set; }
        public string CrCode { get; set; }
        public string CrHead { get; set; }
        public decimal DrAmount { get; set; }
        public decimal CrAmount { get; set; }
        public string ChequeNo { get; set; }
        public string Particulars { get; set; }
        public Int16 IsCancel { get; set; }
        public bool isConfirmed { get; set; }
        public string invoice_no { get; set; }
        public string ReceivedBy { get; set; }
        public string creator { get; set; }
        //public string AccCode { get; set; }
        //public string Head { get; set; }
        //public string OpositCode { get; set; }
        //public string OppositHead { get; set; }
    
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string VoucherType { get; set; }
        public string modifier { get; set; }
        public string OppositHead { get; set; }
        public string OpositCode { get; set; }



    }
}
