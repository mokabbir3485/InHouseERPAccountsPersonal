<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RV_hr_AttendanceDetail.aspx.cs" Inherits="Security.UI.ErpReports.RV_hr_AttendanceDetail" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager1" runat="server">
            </asp:ScriptManager>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Height="600px" Width="900px">
                <LocalReport ReportPath="ErpReports\rpt_hr_AttendanceDetail.rdlc" ReportEmbeddedResource="Security.UI.ErpReports.rpt_hr_AttendanceDetail.rdlc">
                    <DataSources>
                        <rsweb:ReportDataSource DataSourceId="ObjectDataSource1" Name="ds_hr_AttendanceDetail" />
                    </DataSources>
                </LocalReport>
            </rsweb:ReportViewer>
            <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" OldValuesParameterFormatString="original_{0}" SelectMethod="GetData" TypeName="InHouseERP.UI.App_Code.DataSet.ds_hr_AttendanceDetailTableAdapters.xRpt_hr_AttendanceDetailTableAdapter" OnSelecting="ObjectDataSource1_Selecting">
                <SelectParameters>
                    <asp:Parameter Name="fdt" Type="DateTime" />
                    <asp:Parameter Name="tdt" Type="DateTime" />
                    <asp:Parameter Name="EmployeeId" Type="Int32" />
                </SelectParameters>
            </asp:ObjectDataSource>
            <br />
        </div>
    </form>
</body>
</html>
