import PptxGenJS from 'pptxgenjs'
import type { ReportDefinition } from './report.types'

export const exportReport = async ({
  title,
  fileName,
  slides,
}: ReportDefinition): Promise<void> => {
  const pptx = new PptxGenJS()
  pptx.title = title
  pptx.defineLayout({ name: 'ATEMPO', width: 13.33, height: 7.5 })
  pptx.layout = 'ATEMPO'

  const cover = pptx.addSlide()
  cover.background = { color: '0F1A18' }
  cover.addText(title, {
    x: 0.8,
    y: 3.1,
    w: 11.7,
    fontSize: 40,
    bold: true,
    color: 'EEF4F1',
    fontFace: 'Bricolage Grotesque',
  })

  for (const slide of slides) {
    const page = pptx.addSlide()
    page.addText(slide.title, {
      x: 0.6,
      y: 0.4,
      w: 12,
      fontSize: 26,
      bold: true,
      color: '182420',
    })
    if (slide.subtitle) {
      page.addText(slide.subtitle, {
        x: 0.6,
        y: 1.0,
        w: 12,
        fontSize: 14,
        color: '5A6A64',
      })
    }
    if (slide.bullets?.length) {
      page.addText(
        slide.bullets.map((bullet) => ({ text: bullet, options: { bullet: true, breakLine: true } })),
        { x: 0.8, y: 1.6, w: 11.6, fontSize: 14, color: '182420' },
      )
    }
    if (slide.table) {
      const head = slide.table.columns.map((cell) => ({
        text: cell,
        options: { bold: true, fill: { color: '0E7C66' }, color: 'F4FAF8' },
      }))
      const body = slide.table.rows.map((row) =>
        row.map((cell) => ({ text: cell })),
      )
      page.addTable([head, ...body], {
        x: 0.6,
        y: 1.6,
        w: 12,
        fontSize: 11,
        border: { color: 'D8DDD9' },
      })
    }
  }

  await pptx.writeFile({
    fileName: fileName.endsWith('.pptx') ? fileName : `${fileName}.pptx`,
  })
}
