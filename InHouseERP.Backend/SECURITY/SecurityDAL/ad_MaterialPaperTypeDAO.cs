using DbExecutor;
using SecurityDAL;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityDAL
{
    public class ad_MaterialPaperTypeDAO
    {
        private static volatile ad_BondDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_MaterialPaperTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_BondDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_BondDAO();
                    }

                return instance;
            }
        }

        public static ad_BondDAO GetInstance()
        {
            if (instance == null) instance = new ad_BondDAO();
            return instance;
        }

        public int Post(ad_MaterialPaperType _ad_MaterialPaperType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                  new Parameters("@PaperTypeId", _ad_MaterialPaperType.PaperTypeId, DbType.Int32, ParameterDirection.Input),
                  new Parameters("@PaperTypeName", _ad_MaterialPaperType.PaperTypeName, DbType.String, ParameterDirection.Input),
                  new Parameters("@PaperCode", _ad_MaterialPaperType.PaperCode, DbType.String, ParameterDirection.Input),
                  new Parameters("@PaperTypeDescription", _ad_MaterialPaperType.PaperTypeDescription, DbType.String, ParameterDirection.Input),
                  new Parameters("@IsActive", _ad_MaterialPaperType.IsActive, DbType.Boolean, ParameterDirection.Input),
                  new Parameters("@CreatorId", _ad_MaterialPaperType.CreatorId, DbType.Int32, ParameterDirection.Input),
                  new Parameters("@UpdatorId", _ad_MaterialPaperType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_MaterialPaperType_Post",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }

        public List<ad_MaterialPaperType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                var ad_MaterialPaperTypeList = new List<ad_MaterialPaperType>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_MaterialPaperTypeList = dbExecutor.FetchDataRef<ad_MaterialPaperType>(CommandType.StoredProcedure,
                    "ad_MaterialPaperType_GetPaged", colparameters, ref rows);
                return ad_MaterialPaperTypeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_MaterialPaperType> GetAll(int? PaperTypeId = null)
        {
            try
            {
                var ad_MaterialPaperTypeList = new List<ad_MaterialPaperType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PaperTypeId", PaperTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_MaterialPaperTypeList =
                    dbExecutor.FetchData<ad_MaterialPaperType>(CommandType.StoredProcedure, "ad_MaterialPaperType_Get", colparameters);
                return ad_MaterialPaperTypeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
