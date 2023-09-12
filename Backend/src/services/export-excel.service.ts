import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import excelJS from 'exceljs';
// Types
import { Delegate, Model } from '../models/general-crud.types.js';

// Database Instance
export const prisma = new PrismaClient();

export const exportExcelFile = async (model: Model, hiddenAttributes: string[] = []) => {
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet(model);

  const path = '/uploads/sheets';

  if (!fs.existsSync(`.${path}`)) {
    fs.mkdirSync(`.${path}`, { recursive: true });
  }

  // Column for data in excel. Key must match data key
  const cols = [{ header: 'No.', key: 'no', width: 10 }];

  const records: any = await (prisma[model] as Delegate).findMany({});

  // ======= Remove sensitive data from response
  if (hiddenAttributes.length) {
    (records as any).forEach((record: any) => {
      hiddenAttributes.forEach((attribute) => {
        delete record[attribute];
      });
    });
  }

  // Add column for each key in data
  (Object.keys(records[0] || {})).forEach((key) => {
    cols.push({ header: key, key, width: 32 });
  });

  // Add data to excel
  worksheet.columns = cols;

  records.forEach((record: any, index: number) => {
    worksheet.addRow({ no: index + 1, ...record });
  });

  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  // Save excel file
  const nowDateFormatted = new Date().toLocaleString().replaceAll('/', '-').replaceAll(' ', '-').replaceAll(',', '--');
  const fileName = `${model}-${nowDateFormatted}.xlsx`;
  const filePath = `${path}/${fileName}`;

  await workbook.xlsx.writeFile(`.${filePath}`);

  return filePath;
};
