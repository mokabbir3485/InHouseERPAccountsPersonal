using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_SubMainGroupBLL
    {
        public ad_SubMainGroupBLL()
        {
            //ad_ItemSubCategoryDAO = ad_ItemSubCategory.GetInstanceThreadSafe;
            ad_SubMainGroupDAO = new ad_SubMainGroupDAO();
        }

        public ad_SubMainGroupDAO ad_SubMainGroupDAO { get; set; }

        public List<ad_MainGroup> GetAllMainGroup(string SubMainGroupID = null)
        {
            try
            {
                return ad_SubMainGroupDAO.GetAllMainGroup(SubMainGroupID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_SubMainGroup> GetAllSubMainGroup(string MainGroupID = null)
        {
            try
            {
                return ad_SubMainGroupDAO.GetAllSubMainGroup(MainGroupID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetBySubMainGroupId(string MainGroupID )
        {
            try
            {
                return ad_SubMainGroupDAO.GetBySubMainGroupId(MainGroupID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




       
        public List<ad_SubMainGroup> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_SubMainGroupDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Add(ad_SubMainGroup ad_SubMainGroup)
        {
            try
            {
                return ad_SubMainGroupDAO.Add(ad_SubMainGroup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Update(ad_SubMainGroup ad_SubMainGroup)
        {
            try
            {
                return ad_SubMainGroupDAO.Update(ad_SubMainGroup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
