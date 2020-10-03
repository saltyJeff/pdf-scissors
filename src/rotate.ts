import { degrees, PDFDocument } from 'pdf-lib'
import { Command } from 'commander'
import { openPdf, writePdf } from './utils'

export default async function extract(file: string, degStr: string, cmdObj: Command): Promise<void> {
    const degs = parseInt(degStr)
    if(isNaN(degs)) {
        throw new Error('Invalid degrees specified!: '+degs)
    }
    const outPath = cmdObj.output
    const doc = await openPdf(file)
    const outFile = await PDFDocument.create()
    const pages = await outFile.copyPages(doc, await doc.getPageIndices())
    for(const page of pages) {
        page.setRotation(degrees(degs))
        outFile.addPage(page)
    }
    await writePdf(outFile, outPath)
}

