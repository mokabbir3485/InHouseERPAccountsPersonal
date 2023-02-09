using DbExecutor;
using SecurityDAL;

namespace SecurityBLL
{
    public static class Facade
    {
        public static s_RoleBLL Role { get { return new s_RoleBLL(); } }
        public static ad_DomainBLL Domain { get { return new ad_DomainBLL(); } }
        public static s_UserBLL User { get { return new s_UserBLL(); } }
        public static s_ModuleBLL Module { get { return new s_ModuleBLL(); } }
        public static s_ScreenBLL Screen { get { return new s_ScreenBLL(); } }
        public static s_PermissionBLL Permission { get { return new s_PermissionBLL(); } }
        public static s_PermissionDetailBLL PermissionDetail { get { return new s_PermissionDetailBLL(); } }
        
        public static ad_LoginLogoutLogBLL LoginLogoutLog { get { return new ad_LoginLogoutLogBLL(); } }
        public static ad_TransactionTypeBLL TransactionType { get { return new ad_TransactionTypeBLL(); } }
        public static s_ScreenLockBLL ScreenLock { get { return new s_ScreenLockBLL(); } }
        public static error_LogBLL ErrorLog { get { return new error_LogBLL(); } }
        public static s_ScreenDetailBLL ScreenDetail { get { return new s_ScreenDetailBLL(); } }
       
        public static s_UserDepartmentBLL s_UserDepartment { get { return new s_UserDepartmentBLL(); } }
        
        public static ad_NoticeBLL ad_Notice { get { return new ad_NoticeBLL(); } }
        public static ad_NoticeDetailBLL ad_NoticeDetail { get { return new ad_NoticeDetailBLL(); } }
        
        public static ad_SubMainGroupBLL ad_SubMainGroupBLL { get { return new ad_SubMainGroupBLL(); } }
        public static ad_SubGroupHeadBLL ad_SubGroupHeadBLL { get { return new ad_SubGroupHeadBLL(); } }

        public static ad_EmployeeBLL Employee { get { return new ad_EmployeeBLL(); } }
    }
}