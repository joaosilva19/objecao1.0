import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Objection } from '../App';

export function exportToExcel(objections: Objection[]) {
  // Cria um array de objetos para cada linha da planilha
  const data: any[] = [];

  data.push({
    Objeção: 'Título',
    'Resposta 1 (Pos)': '',
    'Resposta 1 (Neg)': '',
    'Resposta 2 (Pos)': '',
    'Resposta 2 (Neg)': '',
    'Resposta 3 (Pos)': '',
    'Resposta 3 (Neg)': '',
    'Resposta 4 (Pos)': '',
    'Resposta 4 (Neg)': '',
    Cliques: 'Cliques'
  });

  objections.forEach((obj) => {
    data.push({
      Objeção: obj.title,
      'Resposta 1 (Pos)': obj.responses[0].positive,
      'Resposta 1 (Neg)': obj.responses[0].negative,
      'Resposta 2 (Pos)': obj.responses[1].positive,
      'Resposta 2 (Neg)': obj.responses[1].negative,
      'Resposta 3 (Pos)': obj.responses[2].positive,
      'Resposta 3 (Neg)': obj.responses[2].negative,
      'Resposta 4 (Pos)': obj.responses[3].positive,
      'Resposta 4 (Neg)': obj.responses[3].negative,
      Cliques: obj.clicks
    });
  });

  // Cria uma planilha a partir do array data
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Objections');

  // Converte para arquivo Excel e salva
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'objections-report.xlsx');
}
