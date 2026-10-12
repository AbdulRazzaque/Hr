import React, { useEffect, useState, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Dashhead from "../Dashhead";
import './absenceLeavereport.scss';
import MaterialTable from 'material-table';
import { useLocation } from "react-router-dom";
import config from "../auth/Config";
import axios from "axios";
import moment from "moment";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable, { applyPlugin } from "jspdf-autotable";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Apply jspdf-autotable plugin if not automatically applied
try {
  applyPlugin(jsPDF);
} catch (e) {
  // Plugin already initialized
}

/**
 * Helper to consistently format dates as DD/MM/YYYY
 */
const formatDate = (dateValue) => {
  if (!dateValue) return '';
  const m = moment.parseZone(dateValue);
  return m.isValid() ? m.local().format('DD/MM/YYYY') : '';
};

/**
 * Extract resolved Leave Start Date respecting leave types
 */
const getLeaveStartDate = (item) => {
  if (!item) return '';
  const type = (item.leaveType || '').toLowerCase();
  let startDate = item.leaveStartDate;
  if (type === 'absent' && item.AbsenceLeaveStartDate) startDate = item.AbsenceLeaveStartDate;
  if (type === 'maternity' && item.maternityLeaveStartDate) startDate = item.maternityLeaveStartDate;
  return formatDate(startDate);
};

/**
 * Extract resolved Leave End Date respecting leave types
 */
const getLeaveEndDate = (item) => {
  if (!item) return '';
  const type = (item.leaveType || '').toLowerCase();
  let endDate = item.leaveEndDate;
  if (type === 'absent' && item.AbsenceLeaveEndDate) endDate = item.AbsenceLeaveEndDate;
  if (type === 'maternity' && item.maternityLeaveEndDate) endDate = item.maternityLeaveEndDate;
  return formatDate(endDate);
};

/**
 * Calculate numeric Leave Days based on leave type
 */
const getLeaveDays = (item) => {
  if (!item) return 0;
  const type = (item.leaveType || '').toLowerCase();
  let days = 0;
  if (type === 'sick' && item.totalSickLeaveDays !== undefined && item.totalSickLeaveDays !== null && item.totalSickLeaveDays !== '') {
    days = item.totalSickLeaveDays;
  } else if (type === 'absent' && item.totalAbsenceLeaveDays !== undefined && item.totalAbsenceLeaveDays !== null && item.totalAbsenceLeaveDays !== '') {
    days = item.totalAbsenceLeaveDays;
  } else if (type === 'maternity' && item.totalMaternityLeaveDays !== undefined && item.totalMaternityLeaveDays !== null && item.totalMaternityLeaveDays !== '') {
    days = item.totalMaternityLeaveDays;
  } else if (item.numberOfDayLeave !== undefined && item.numberOfDayLeave !== null && item.numberOfDayLeave !== '') {
    days = item.numberOfDayLeave;
  }
  const numericDays = Number(days);
  return isNaN(numericDays) ? 0 : numericDays;
};

/**
 * Extract employee name with multi-source fallback
 */
const getEmployeeName = (item, empInfo) => {
  return (
    item?.employeeName ||
    item?.employeeId?.name ||
    item?.employeeDetails?.name ||
    empInfo?.name ||
    ''
  );
};

/**
 * Extract profile image URL
 */
const getProfileImage = (item, empInfo) => {
  return (
    item?.employeeId?.employeeImage ||
    item?.employeeDetails?.employeeImage ||
    empInfo?.employeeImage ||
    null
  );
};

/**
 * Generate sanitized meaningful filename for exports
 */
const getReportFileName = (empInfo, extension) => {
  const rawName = empInfo?.name ? empInfo.name.trim() : 'Employee';
  const sanitized = rawName.replace(/[^a-zA-Z0-9_-]+/g, '_');
  return `Employee_Absence_Leave_Report_${sanitized}.${extension}`;
};

/**
 * Trigger browser file download and safely revoke Blob URL to avoid memory leaks
 */
const downloadBlobFile = (blob, fileName) => {
  try {
    saveAs(blob, fileName);
  } catch (err) {
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 1000);
  }
};

const EmployeeAbsenceLeaveReport = () => {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [empInfo, setEmpInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const absenceLeaveData = location?.state?.data;

  const targetEmpId =
    searchParams.get("employeeId") ||
    location?.state?.employeeId ||
    absenceLeaveData?.employeeDetails?._id ||
    absenceLeaveData?.employeeId?._id ||
    (typeof absenceLeaveData?.employeeId === "string" ? absenceLeaveData?.employeeId : null) ||
    absenceLeaveData?._id;

  /**
   * Fetch report data from API
   */
  const fetchData = useCallback(async () => {
    if (!targetEmpId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${config.baseUrl}/api/getEmployeeAbsenceLeave/${targetEmpId}`);
      if (res.data?.employeeDetails) {
        setEmpInfo(res.data.employeeDetails);
      }
      const rawAbsence = res.data?.getEmployeeAbsence || [];
      const arr = rawAbsence.map((item, index) => {
        const empName =
          item.employeeId?.name ||
          item.employeeDetails?.name ||
          res.data?.employeeDetails?.name ||
          empInfo?.name ||
          '';

        const rowDate = formatDate(item.date || item.createdAt || item.leaveStartDate);
        const rowStartDate = getLeaveStartDate(item);
        const rowEndDate = getLeaveEndDate(item);
        const rowDays = getLeaveDays(item);

        return {
          ...item,
          id: index + 1,
          employeeName: empName,
          formattedDate: rowDate,
          formattedStartDate: rowStartDate,
          formattedEndDate: rowEndDate,
          calculatedLeaveDays: rowDays,
        };
      });
      setData(arr);
    } catch (error) {
      console.error("Error fetching employee absence leave:", error);
      toast.error("Failed to load employee absence leave records.");
    } finally {
      setLoading(false);
    }
  }, [targetEmpId, empInfo?.name]);

  useEffect(() => {
    if (absenceLeaveData?.employeeDetails) {
      setEmpInfo(absenceLeaveData.employeeDetails);
    } else if (absenceLeaveData?.employeeId && typeof absenceLeaveData.employeeId === 'object') {
      setEmpInfo(absenceLeaveData.employeeId);
    }
    fetchData();
  }, [targetEmpId]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Handle Excel (.xlsx) Export
   */
  const handleExportExcel = useCallback(async () => {
    setExportingExcel(true);
    try {
      const fileName = getReportFileName(empInfo, "xlsx");
      const hasRecords = data && data.length > 0;

      if (!hasRecords) {
        toast.info("Exporting empty absence leave report.");
      }

      // Build data rows matching all required columns
      const exportRows = hasRecords
        ? data.map((item, index) => {
          const profileImg = getProfileImage(item, empInfo);
          const profileStatus = profileImg ? "Available" : "N/A";
          const empName = getEmployeeName(item, empInfo);
          const dateStr = item.formattedDate || formatDate(item.date || item.createdAt || item.leaveStartDate);
          const startDateStr = item.formattedStartDate || getLeaveStartDate(item);
          const endDateStr = item.formattedEndDate || getLeaveEndDate(item);
          const leaveDaysVal = item.calculatedLeaveDays !== undefined ? item.calculatedLeaveDays : getLeaveDays(item);

          return {
            "SR NO": index + 1,
            "Profile": profileStatus,
            "Employee Name": empName,
            "Date": dateStr,
            "Leave Type": item.leaveType || "",
            "Leave Start Date": startDateStr,
            "Leave End Date": endDateStr,
            "Leave Days": Number(leaveDaysVal) || 0,
            "Comment": item.comment || "",
          };
        })
        : [
          {
            "SR NO": "-",
            "Profile": "N/A",
            "Employee Name": empInfo?.name || "Employee",
            "Date": "-",
            "Leave Type": "-",
            "Leave Start Date": "-",
            "Leave End Date": "-",
            "Leave Days": 0,
            "Comment": "No absence leave records available",
          },
        ];

      // Generate worksheet from JSON
      const worksheet = XLSX.utils.json_to_sheet(exportRows);

      // Define default column widths and dynamically expand for readable text
      const baseColWidths = [
        { key: "SR NO", wch: 10 },
        { key: "Profile", wch: 12 },
        { key: "Employee Name", wch: 25 },
        { key: "Date", wch: 15 },
        { key: "Leave Type", wch: 16 },
        { key: "Leave Start Date", wch: 18 },
        { key: "Leave End Date", wch: 18 },
        { key: "Leave Days", wch: 14 },
        { key: "Comment", wch: 35 },
      ];

      const colWidths = baseColWidths.map((col, idx) => {
        let maxLen = col.wch;
        exportRows.forEach((r) => {
          const val = Object.values(r)[idx];
          if (val !== undefined && val !== null) {
            const str = String(val);
            if (str.length + 3 > maxLen) {
              maxLen = Math.min(str.length + 4, 60);
            }
          }
        });
        return { wch: maxLen };
      });
      worksheet['!cols'] = colWidths;

      // Style header cells with bold font and professional navy background color
      const headerCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      headerCols.forEach((col) => {
        const cellRef = `${col}1`;
        if (worksheet[cellRef]) {
          worksheet[cellRef].s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "1E3A8A" } },
            alignment: { horizontal: "center", vertical: "center" },
          };
        }
      });

      // Build workbook and write as .xlsx
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Absence Leave Report");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
        cellStyles: true,
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      downloadBlobFile(blob, fileName);
      toast.success("Excel report exported successfully!");
    } catch (error) {
      console.error("Excel Export Error:", error);
      toast.error("Failed to export Excel report. Please try again.");
    } finally {
      setExportingExcel(false);
    }
  }, [data, empInfo]);

  /**
   * Handle PDF Export
   */
  const handleExportPdf = useCallback(async () => {
    setExportingPdf(true);
    try {
      const empName = empInfo?.name ? empInfo.name.trim() : 'Employee';
      const fileName = getReportFileName(empInfo, "pdf");
      const hasRecords = data && data.length > 0;

      if (!hasRecords) {
        toast.info("Exporting empty absence leave report.");
      }

      // Landscape A4 document: 297mm x 210mm
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Top professional navy accent bar
      doc.setFillColor(30, 58, 138); // #1E3A8A
      doc.rect(0, 0, pageWidth, 6, 'F');

      // Main Report Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(30, 41, 59); // slate-800
      doc.text("Employee Absence Leave Report", 14, 18);

      // Report Header Details & Metadata
      const reportDate = moment().format("DD/MM/YYYY HH:mm");

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Employee Name:", 14, 25);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(71, 85, 105);
      doc.text(`${empName}`, 48, 25);

      if (empInfo?.department) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Department:", 14, 31);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`${empInfo.department}`, 48, 31);
      }

      if (empInfo?.position) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Position:", 115, 25);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`${empInfo.position}`, 135, 25);
      }

      if (empInfo?.employeeNumber) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Emp No:", 115, 31);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`${empInfo.employeeNumber}`, 135, 31);
      }

      // Generation date and total records summary on right side
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Report Date:", pageWidth - 78, 25);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(71, 85, 105);
      doc.text(`${reportDate}`, pageWidth - 50, 25);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59);
      doc.text("Total Records:", pageWidth - 78, 31);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(71, 85, 105);
      doc.text(`${data ? data.length : 0}`, pageWidth - 50, 31);

      // Dividing rule
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(14, 35, pageWidth - 14, 35);

      // Table columns & rows
      const tableHead = [[
        'SR NO',
        'Employee Name',
        'Date',
        'Leave Type',
        'Leave Start Date',
        'Leave End Date',
        'Leave Days',
        'Comment',
      ]];

      const tableBody = hasRecords
        ? data.map((item, index) => {
          const rowEmpName = getEmployeeName(item, empInfo);
          const rowDate = item.formattedDate || formatDate(item.date || item.createdAt || item.leaveStartDate);
          const rowStartDate = item.formattedStartDate || getLeaveStartDate(item);
          const rowEndDate = item.formattedEndDate || getLeaveEndDate(item);
          const rowDays = item.calculatedLeaveDays !== undefined ? item.calculatedLeaveDays : getLeaveDays(item);

          return [
            index + 1,
            rowEmpName,
            rowDate,
            item.leaveType || '',
            rowStartDate,
            rowEndDate,
            rowDays,
            item.comment || '',
          ];
        })
        : [
          [
            "-",
            empName,
            "-",
            "-",
            "-",
            "-",
            0,
            "No absence leave records available",
          ],
        ];

      // Generate AutoTable with repeating headers, line wrapping and proper alignments
      autoTable(doc, {
        startY: 38,
        margin: { left: 14, right: 14, top: 38, bottom: 18 },
        head: tableHead,
        body: tableBody,
        theme: 'grid',
        showHead: 'everyPage',
        headStyles: {
          fillColor: [30, 58, 138], // Navy blue
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9,
          halign: 'center',
          valign: 'middle',
          cellPadding: 3,
        },
        bodyStyles: {
          fontSize: 8.5,
          textColor: [30, 41, 59],
          cellPadding: 2.5,
          overflow: 'linebreak',
          valign: 'middle',
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        columnStyles: {
          0: { cellWidth: 16, halign: 'center' }, // SR NO
          1: { cellWidth: 38, halign: 'left' },   // Employee Name
          2: { cellWidth: 24, halign: 'center' }, // Date
          3: { cellWidth: 24, halign: 'center' }, // Leave Type
          4: { cellWidth: 26, halign: 'center' }, // Leave Start Date
          5: { cellWidth: 26, halign: 'center' }, // Leave End Date
          6: { cellWidth: 20, halign: 'center' }, // Leave Days
          7: { cellWidth: 'auto', halign: 'left' }, // Comment
        },
      });

      // Post-table pass: render consistent footer on all pages with actual total page count
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.4);
        doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(148, 163, 184);
        doc.text("HR Management System - Employee Absence Leave Report (Confidential)", 14, pageHeight - 7);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - 14, pageHeight - 7, { align: 'right' });
      }

      // Download PDF using doc.save with downloadBlobFile fallback
      try {
        doc.save(fileName);
      } catch (saveErr) {
        const pdfBlob = doc.output('blob');
        downloadBlobFile(pdfBlob, fileName);
      }
      toast.success("PDF report exported successfully!");
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("Failed to export PDF report. Please try again.");
    } finally {
      setExportingPdf(false);
    }
  }, [data, empInfo]);

  // Table Columns Definition
  const columns = [
    { field: 'id', title: 'SR NO', width: 'auto' },
    {
      field: 'image',
      title: 'Profile',
      width: 'auto',
      export: false,
      render: (rowData) => {
        const imgSrc = getProfileImage(rowData, empInfo);
        return imgSrc ? (
          <img
            src={imgSrc}
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
            alt="Profile"
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              color: '#475569',
              fontWeight: 600,
            }}
          >
            {(rowData.employeeName || empInfo?.name || 'E').charAt(0).toUpperCase()}
          </div>
        );
      },
    },
    {
      field: 'employeeName',
      title: 'Employee Name',
      width: 'auto',
      render: (rowData) => rowData.employeeName || getEmployeeName(rowData, empInfo),
    },
    {
      field: 'formattedDate',
      title: 'Date',
      width: 'auto',
      render: (rowData) =>
        rowData.formattedDate ||
        formatDate(rowData?.date || rowData?.createdAt || rowData?.leaveStartDate),
    },
    { field: 'leaveType', title: 'Leave Type', width: 'auto' },
    {
      field: 'formattedStartDate',
      title: 'Leave Start Date',
      width: 'auto',
      render: (rowData) => rowData.formattedStartDate || getLeaveStartDate(rowData),
    },
    {
      field: 'formattedEndDate',
      title: 'Leave End Date',
      width: 'auto',
      render: (rowData) => rowData.formattedEndDate || getLeaveEndDate(rowData),
    },
    {
      field: 'calculatedLeaveDays',
      title: 'Leave Days',
      width: 'auto',
      render: (rowData) =>
        rowData.calculatedLeaveDays !== undefined
          ? rowData.calculatedLeaveDays
          : getLeaveDays(rowData),
    },
    { field: 'comment', title: 'Comment', width: 'auto' },
  ];

  return (
    <div className="row">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={7} display={display} />
      </div>

      <div
        className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container"
        onClick={() => display && setDisplay(false)}
      >
        <span className="iconbutton display-mobile">
          <IconButton
            size="large"
            aria-label="Menu"
            onClick={() => setDisplay(true)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </span>

        <div className="container">
          <h2 className="text-center my-4">
            {`${empInfo?.name || 'Employee'} Absence Leave Report`}
          </h2>
        </div>

        <div>
          <MaterialTable
            title={empInfo?.name ? `${empInfo.name} Absence Leave Report` : 'Employee Absence Leave Report'}
            columns={columns}
            data={data}
            isLoading={loading}

            options={{
              paging: false,
              exportButton: true,
              exportCsv: handleExportExcel,
              exportPdf: handleExportPdf,
            }}
            localization={{
              toolbar: {
                exportTitle: 'Export Report',
                exportCSVName: 'Export as Excel (.xlsx)',
                exportPDFName: 'Export as PDF (.pdf)',
              },
            }}
            exportCsv={handleExportExcel}
            exportPdf={handleExportPdf}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAbsenceLeaveReport;

