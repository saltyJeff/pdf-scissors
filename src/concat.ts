import { PDFDocument } from 'pdf-lib'
import { Command } from 'commander'
import { openPdfs, writePdf } from './utils'

export default async function concat(files: string[], cmdObj: Command): Promise<void> {
    const outPath = cmdObj.output
    const docs = await openPdfs(files)
    const outFile = await PDFDocument.create()
    for(const doc of docs) {
        const pageIdxs = await doc.getPageIndices()
        const pages = await outFile.copyPages(doc, pageIdxs)
        for(const page of pages) {
            outFile.addPage(page)
        }
    }
    await writePdf(outFile, outPath)
}

