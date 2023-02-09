using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityEntity
{
    public class ad_MaterialPaperType
    {
        public Int32 PaperTypeId { get; set; }
        public string PaperTypeName { get; set; }
        public string PaperTypeDescription { get; set; }
        public string PaperCode { get; set; }
        public bool IsActive { get; set; }
        public Int32 CreatorId { get; set; }
        public Int32 UpdatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        

    }
}
