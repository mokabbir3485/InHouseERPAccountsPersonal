using System;
using System.Collections.Generic;
using AccountsDAL;
using AccountsEntity;


namespace AccountsBLL
{
   public class ac_JournalVoucherBLL
    {
        public ac_JournalVoucherBLL()
        {
            //ac_ChartOfAccountDAO = ac_ChartOfAccount.GetInstanceThreadSafe;
            AC_JournalVoucherDAO = new ac_JournalVoucherDAO();
        }

        public ac_JournalVoucherDAO AC_JournalVoucherDAO { get; set; }


        public Int32 Add(ac_journal_t _journal_t)
        {
            try
            {
                return AC_JournalVoucherDAO.Add(_journal_t);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int32 Update(ac_journal_t _journal_t)
        {
            try
            {
                return AC_JournalVoucherDAO.Update(_journal_t);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_journal_t> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                return AC_JournalVoucherDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
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
                return AC_JournalVoucherDAO.GetAllJournalVoucherReportdata(JournalVoucherId);
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
                return AC_JournalVoucherDAO.AllVoucherReport(FormDate, ToDate, VoucherType);
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
                return AC_JournalVoucherDAO.GetAllBranch();
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
                return AC_JournalVoucherDAO.GetAllDepartment();
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
                return AC_JournalVoucherDAO.GetByVoucherGenerate(VoucherName);
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
                return AC_JournalVoucherDAO.VoucherReport(VoucherNo);
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
                return AC_JournalVoucherDAO.GetJournalByVoucherNo(VoucherNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        


    }
}

