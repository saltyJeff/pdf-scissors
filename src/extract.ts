import { PDFDocument } from 'pdf-lib'
import { Command } from 'commander'
import { openPdf, writePdf } from './utils'

export default async function extract(file: string, idxStrs: string[], cmdObj: Command) {
    const indicies = idxStrs.map(s => {
        const i = parseInt(s)
        if(isNaN(i)) {
            throw new Error('Invalid index specified!: '+i)
        }
        return i
    })
    const outPath = cmdObj.output
    const doc = await openPdf(file)
    const outFile = await PDFDocument.create()
    const pages = await outFile.copyPages(doc, indicies)
    for(let page of pages) {
        outFile.addPage(page)
    }
    await writePdf(outFile, outPath)
}

