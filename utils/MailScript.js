/**
 * bulkMailUtil.js
 * ---------------------------------------
 * Reads Excel -> Sends mail async (one by one)
 * Saves response into new Excel file
 */

const XLSX = require("xlsx");

// ---------- CONFIG ----------
const INPUT_FILE = "./final2.xlsx";
const OUTPUT_FILE = "./mail-report.xlsx";
const ABSTRACT_LINK =
  "https://drive.google.com/drive/folders/1k6tL82LHQhJZGEuNbXegfbif2Axj3H62";

const TARGET_DATE = "21/01/2026"; // DD/MM/YYYY

// ---------- EXCEL DATE CONVERTER ----------
function excelSerialToDate(serial) {
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400;
  const date = new Date(utcValue * 1000);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

// ---------- READ EXCEL ----------
function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: ""
  });
}

// ---------- SAVE REPORT ----------
function saveReport(data, filePath) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  XLSX.writeFile(workbook, filePath);
}

// ---------- DELAY ----------
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// ---------- MAIN HANDLER ----------
async function processBulkMail(sendMailFn, delayMs = 3000) {
  const rows = readExcel(INPUT_FILE);
  const report = [];

  for (const row of rows) {
    const email = (row["Email"] || "").trim();
    let updatedDate = row["Email Updated"];

    // ❌ Email missing
    if (!email) {
      report.push({
        email: "",
        fullName: row["Full Name"] || "",
        projectTitle: row["Project Title"] || "",
        status: "NOT SENT",
        message: "Email missing",
        time: new Date().toISOString()
      });
      continue;
    }

    // ✅ Convert Excel serial date
    if (typeof updatedDate === "number") {
      updatedDate = excelSerialToDate(updatedDate);
    }

    // ❌ Date not matching
    if (updatedDate !== TARGET_DATE) {
      report.push({
        email,
        fullName: row["Full Name"],
        projectTitle: row["Project Title"],
        status: "NOT SENT",
        message: `Email not updated on ${TARGET_DATE}`,
        time: new Date().toISOString()
      });
      continue;
    }

    // ✅ Send mail
    try {
      await sendMailFn({
        email,
        fullName: row["Full Name"],
        projectTitle: row["Project Title"],
        mentor: row["Mentor"],
        abstractLink: ABSTRACT_LINK
      });

      report.push({
        email,
        fullName: row["Full Name"],
        projectTitle: row["Project Title"],
        status: "SENT",
        message: "Mail sent successfully",
        time: new Date().toISOString()
      });

      console.log(`✅ Mail sent to ${email}`);
    } catch (err) {
      report.push({
        email,
        fullName: row["Full Name"],
        projectTitle: row["Project Title"],
        status: "FAILED",
        message: err.message,
        time: new Date().toISOString()
      });

      console.error(`❌ Failed for ${email}`, err.message);
    }

    await delay(delayMs);
  }

  saveReport(report, OUTPUT_FILE);
  console.log("📁 Mail report saved:", OUTPUT_FILE);
}

// ---------- EXPORT ----------
module.exports = {
  processBulkMail
};
