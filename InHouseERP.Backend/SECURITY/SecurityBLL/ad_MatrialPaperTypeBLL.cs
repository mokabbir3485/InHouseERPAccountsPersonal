using SecurityEntity.SECURITY.SecurityDAL;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityBLL
{
   public class ad_MatrialPaperTypeBLL
    {
        public ad_MatrialPaperTypeBLL()
        {
            //ad_CompanyDAO = ad_Company.GetInstanceThreadSafe;
            _ad_MatrialPaperType = new ad_MaterialPaperTypeDAO();
        }

        public ad_MaterialPaperTypeDAO _ad_MatrialPaperType { get; set; }


        public int Post(ad_MaterialPaperType _ad_MaterialPaperType)
        {
            try
            {
                return _ad_MatrialPaperType.Post(_ad_MaterialPaperType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_MaterialPaperType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
         string sortOrder, ref int rows)
        {
            try
            {
                return _ad_MatrialPaperType.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


       public List<ad_MaterialPaperType> GetAll()
        {
            try
            {
                return _ad_MatrialPaperType.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
