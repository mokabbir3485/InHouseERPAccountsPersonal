using System;
using System.Collections.Generic;
using System.Data;
using AccountsEntity;
using DbExecutor;

namespace AccountsDAL
{

   
    public class ac_JournalVoucherDAO
    {
        private static volatile ac_JournalVoucherDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;
        public ac_JournalVoucherDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }
        public static ac_JournalVoucherDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ac_JournalVoucherDAO();
                    }

                return instance;
            }
        }
        public static ac_JournalVoucherDAO GetInstance()
        {
            if (instance == null) instance = new ac_JournalVoucherDAO();
            return instance;
        }


        public Int32 Add(ac_journal_t _journal_t)
        {
            Int32 ret = 0;
            try
            {
                var colparameters = new Parameters[17]
                {
                    new Parameters("@BranchID", _journal_t.BranchID, DbType.String, ParameterDirection.Input),
                    new Parameters("@VoucherType", _journal_t.VoucherType, DbType.String, ParameterDirection.Input),
                    new Parameters("@DeptID", _journal_t.DeptID, DbType.String, ParameterDirection.Input),
                    new Parameters("@CR_DeptID", _journal_t.CR_DeptID, DbType.String, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _journal_t.VoucherNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@VDate", _journal_t.VDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@DrCode", _journal_t.DrCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@CrCode", _journal_t.CrCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@DrAmount", _journal_t.DrAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@CrAmount", _journal_t.CrAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ChequeNo", _journal_t.ChequeNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Particulars", _journal_t.Particulars, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsCancel", _journal_t.IsCancel, DbType.Int16, ParameterDirection.Input),
                    new Parameters("@isConfirmed", _journal_t.isConfirmed, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@invoice_no", _journal_t.invoice_no, DbType.String, ParameterDirection.Input),
                    new Parameters("@ReceivedBy", _journal_t.ReceivedBy, DbType.String, ParameterDirection.Input),
                    new Parameters("@creator", _journal_t.creator, DbType.String, ParameterDirection.Input),
          
                 
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "journal_t_JVCreate",
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


        public Int32 Update(ac_journal_t _journal_t)
        {
            Int32 ret = 0;
            try
            {
                var colparameters = new Parameters[18]
                {
                    new Parameters("@rid", _journal_t.rid, DbType.String, ParameterDirection.Input),
                    new Parameters("@VoucherType", _journal_t.VoucherType, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchID", _journal_t.BranchID, DbType.String, ParameterDirection.Input),
                    new Parameters("@DeptID", _journal_t.DeptID, DbType.String, ParameterDirection.Input),
                    new Parameters("@CR_DeptID", _journal_t.CR_DeptID, DbType.String, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _journal_t.VoucherNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@VDate", _journal_t.VDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@DrCode", _journal_t.DrCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@CrCode", _journal_t.CrCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@DrAmount", _journal_t.DrAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@CrAmount", _journal_t.CrAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ChequeNo", _journal_t.ChequeNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Particulars", _journal_t.Particulars, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsCancel", _journal_t.IsCancel, DbType.Int16, ParameterDirection.Input),
                    new Parameters("@isConfirmed", _journal_t.isConfirmed, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@invoice_no", _journal_t.invoice_no, DbType.String, ParameterDirection.Input),
                    new Parameters("@ReceivedBy", _journal_t.ReceivedBy, DbType.String, ParameterDirection.Input),
                   
                    new Parameters("@modifier", _journal_t.modifier, DbType.String, ParameterDirection.Input),


                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "journal_t_JV_Update",
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


        public List<ac_journal_t> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
         string sortOrder, ref int rows)
        {
            try
            {
                var ac_journal_List = new List<ac_journal_t>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ac_journal_List = dbExecutor.FetchDataRef<ac_journal_t>(CommandType.StoredProcedure,
                    "journal_t_GetPaged", colparameters, ref rows);
                return ac_journal_List;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string GetByVoucherGenerate(string VoucherName)
        {
            try
            {
                Parameters[] colparameters;
                colparameters = new Parameters[1]
                {
                        new Parameters("@VoucherName",VoucherName, DbType.String, ParameterDirection.Input)
                };
                string maxInvoiceNo = "";
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxInvoiceNo = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure,"sp_GetMaxVoucherNo", colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxInvoiceNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

      
        public List<ac_journal_t> VoucherReport(string VoucherNo)
        {
            try
            {
                var JournalVoucherReportList = new List<ac_journal_t>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@VoucherNo", VoucherNo, DbType.String, ParameterDirection.Input)
                };
                JournalVoucherReportList = dbExecutor.FetchData<ac_journal_t>(CommandType.StoredProcedure,
                    "XRpt_journal_t_GetByVoucherNo", colparameters);

                return JournalVoucherReportList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ac_journal_t> GetJournalByVoucherNo(string VoucherNo)
        {
            try
            {
                var JournalList = new List<ac_journal_t>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@VoucherNo", VoucherNo, DbType.String, ParameterDirection.Input)
                };
                JournalList = dbExecutor.FetchData<ac_journal_t>(CommandType.StoredProcedure,
                    "journal_t_VoucherNo_GetAll", colparameters);

                return JournalList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public List<ac_journal_t> GetAllJournalVoucherReportdata(Int32 JournalVoucherId)
        {
            try
            {
                var JournalVoucherReportList = new List<ac_journal_t>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@VoucherId", JournalVoucherId, DbType.Int32, ParameterDirection.Input)
                };
                JournalVoucherReportList = dbExecutor.FetchData<ac_journal_t>(CommandType.StoredProcedure,
                    "xRpt_journal_t_GetByVoucherId", colparameters);

                return JournalVoucherReportList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ac_journal_t> AllVoucherReport(DateTime FormDate, DateTime ToDate, string VoucherType)
        {
            try
            {
                var JournalVoucherReportList = new List<ac_journal_t>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@FromDate", FormDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@VoucherType", VoucherType, DbType.String, ParameterDirection.Input),
                };
                JournalVoucherReportList = dbExecutor.FetchData<ac_journal_t>(CommandType.StoredProcedure,
                    "journal_t_GetVoucherByVoucherType", colparameters);

                return JournalVoucherReportList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ac_journal_t> GetAllDepartment()
        {
            try
            {
                var DepartmentList = new List<ac_journal_t>();
                //var colparameters = new Parameters[1]
                //{
                //    new Parameters("@VoucherId", JournalVoucherId, DbType.Int32, ParameterDirection.Input)
                //};
                DepartmentList = dbExecutor.FetchData<ac_journal_t>(CommandType.StoredProcedure,
                    "Department_t_Get", null);

                return DepartmentList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ac_journal_t> GetAllBranch()
        {
            try
            {
                var BranchAccountList = new List<ac_journal_t>();
                //var colparameters = new Parameters[1]
                //{
                //    new Parameters("@VoucherId", JournalVoucherId, DbType.Int32, ParameterDirection.Input)
                //};
                BranchAccountList = dbExecutor.FetchData<ac_journal_t>(CommandType.StoredProcedure,
                    "BranchAccount_t_Get", null);

                return BranchAccountList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
