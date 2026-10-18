import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface ExportPdfColumn {
  header: string
  dataKey: string
}

export interface ExportPdfOptions {
  title: string
  fileName: string
  columns: ExportPdfColumn[]
  rows: Record<string, unknown>[]
}

export const exportPdf = ({
  title,
  fileName,
  columns,
  rows,
}: ExportPdfOptions): void => {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text(title, 14, 18)

  autoTable(doc, {
    startY: 26,
    head: [columns.map((column) => column.header)],
    body: rows.map((row) =>
      columns.map((column) => String(row[column.dataKey] ?? '')),
    ),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [226, 184, 74], textColor: [12, 31, 60] },
  })

  doc.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`)
}
