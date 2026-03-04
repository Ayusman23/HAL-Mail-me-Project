const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelFilePath = path.join(__dirname, '..', 'data.xlsx');

const appendToExcel = (sheetName, data) => {
    try {
        let workbook;
        if (fs.existsSync(excelFilePath)) {
            workbook = xlsx.readFile(excelFilePath);
        } else {
            workbook = xlsx.utils.book_new();
        }

        let worksheet = workbook.Sheets[sheetName];
        let jsonData = [];
        if (worksheet) {
            jsonData = xlsx.utils.sheet_to_json(worksheet);
        }

        // Add timestamp
        data.timestamp = new Date().toLocaleString();
        jsonData.push(data);

        let newWorksheet = xlsx.utils.json_to_sheet(jsonData);
        workbook.Sheets[sheetName] = newWorksheet;

        // Ensure sheet exists in workbook
        if (!workbook.SheetNames.includes(sheetName)) {
            xlsx.utils.book_append_sheet(workbook, newWorksheet, sheetName);
        }

        xlsx.writeFile(workbook, excelFilePath);
    } catch (error) {
        console.error("Error writing to excel:", error);
    }
};

module.exports = { appendToExcel };
