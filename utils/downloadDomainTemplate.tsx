import * as XLSX from "xlsx";

export const downloadDomainTemplate = () => {
  const worksheetData = [
    ["domainName", "url"], 
    ["example.com", "https://example.com"],
    ["mydomain.io", ""],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "adddomain");

  XLSX.writeFile(workbook, "adddomain.xlsx");
};
