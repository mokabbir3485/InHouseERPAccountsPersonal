using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_SupplierAddress : BaseAddress, IEntityBase
    {
        public int SupplierId { get; set; }
        public string Fax { get; set; }
        public string Port { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}