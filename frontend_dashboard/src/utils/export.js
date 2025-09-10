import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// PUBLIC_INTERFACE
export function exportCSV(rows, filename = 'report.csv') {
  /** Export an array of objects to CSV with header row. */
  if (!rows || rows.length === 0) {
    // eslint-disable-next-line no-alert
    alert('No data to export');
    return;
  }
  const headers = Object.keys(rows[0]);
  const csvRows = [headers.join(',')].concat(
    rows.map((row) =>
      headers.map((h) => JSON.stringify(row[h] ?? '')).join(',')
    )
  );
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// PUBLIC_INTERFACE
export function exportPDF(title, rows, filename = 'report.pdf') {
  /** Export data rows to a basic PDF table. */
  if (!rows || rows.length === 0) {
    // eslint-disable-next-line no-alert
    alert('No data to export');
    return;
  }
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(title || 'Report', 14, 18);
  const columns = Object.keys(rows[0]).map((k) => ({ header: k, dataKey: k }));
  autoTable(doc, {
    columns,
    body: rows,
    startY: 24
  });
  doc.save(filename);
}
