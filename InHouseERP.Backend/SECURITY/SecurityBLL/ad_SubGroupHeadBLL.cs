using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_SubGroupHeadBLL
    {
        public ad_SubGroupHeadBLL()
        {
            //ad_ItemSubCategoryDAO = ad_ItemSubCategory.GetInstanceThreadSafe;
            ad_SubGroupHeadDAO = new ad_SubGroupHeadDAO();
        }

        public ad_SubGroupHeadDAO ad_SubGroupHeadDAO { get; set; }
        public List<ad_SubGroupHead> GetAllSubGroupHead(string SubGroupHeadID = null)
        {
            try
            {
                return ad_SubGroupHeadDAO.GetAllSubGroupHead(SubGroupHeadID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Add(ad_SubGroupHead ad_SubGroupHead)
        {
            try
            {
                return ad_SubGroupHeadDAO.Add(ad_SubGroupHead);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetBySubMainHeadGroupId(string MainGroupID, string SubMainGroupId)
        {
            try
            {
                return ad_SubGroupHeadDAO.GetBySubMainHeadGroupId(MainGroupID, SubMainGroupId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Update(ad_SubGroupHead ad_SubGroupHead)
        {
            try
            {
                return ad_SubGroupHeadDAO.Update(ad_SubGroupHead);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_SubGroupHead> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_SubGroupHeadDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
