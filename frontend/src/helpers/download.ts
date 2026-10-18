// Descarga de archivos generados en el cliente (reportes mock).

export const downloadText = (fileName: string, content: string, mime = 'text/plain'): void => {
  const blob = new Blob(['﻿', content], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

export const downloadJson = (fileName: string, data: unknown): void =>
  downloadText(fileName.endsWith('.json') ? fileName : `${fileName}.json`, JSON.stringify(data, null, 2), 'application/json')

const csvCell = (value: unknown): string => {
  const s = String(value ?? '')
  return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export const downloadCsv = (fileName: string, columns: string[], rows: unknown[][]): void => {
  const lines = [columns.map(csvCell).join(','), ...rows.map((r) => r.map(csvCell).join(','))]
  downloadText(fileName.endsWith('.csv') ? fileName : `${fileName}.csv`, lines.join('\n'), 'text/csv')
}
