import { PDFDocument } from 'pdf-lib'
import { Command } from 'commander'
import { openPdfs, writePdf } from './utils'

export default async function concat(files: string[], cmdObj: Command) {
    const outPath = cmdObj.output
    const docs = await openPdfs(files)
    const outFile = await PDFDocument.create()
    for(let doc of docs) {
        const pageIdxs = await doc.getPageIndices()
        const pages = await outFile.copyPages(doc, pageIdxs)
        for(let page of pages) {
            outFile.addPage(page)
        }
    }
    await writePdf(outFile, outPath)
}

