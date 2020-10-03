import { PDFDocument } from 'pdf-lib'
import { Command } from 'commander'
import { openPdf, writePdf } from './utils'

interface PdfMetadata {
    author: string
    creator: string
    keywords: string[]
    language: string
    producer: string
    subject: string
    creationDate: Date
    modificationDate: Date
    title: string
}
export default async function metadata(files: string[], cmdObj: Command & Partial<PdfMetadata>): Promise<void> {
    cmdObj.creationDate = tryParseDate(cmdObj.creationDate as unknown as string)
    cmdObj.modificationDate = tryParseDate(cmdObj.modificationDate as unknown as string)
    for(const file of files) {
        const doc = await openPdf(file)
        await applyMetadata(doc, cmdObj)
        await writePdf(doc, file)
    }
}
const keys: Array<keyof PdfMetadata> = [ 'author', 'creator', 'keywords', 'language', 'producer', 'subject', 'creationDate', 'modificationDate', 'title' ]
async function applyMetadata(doc: PDFDocument, metadata: Partial<PdfMetadata>) {
    keys.forEach(key => {
        const val = metadata[key]
        if(val != null) {
            doc['set'+capFirstLetter(key)](val)
        }
    })
}
function capFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
function tryParseDate(str?: string) {
    if(str == null) {
        return str
    }
    const date = new Date(str)
    if(isNaN(date.getTime())) {
        throw new Error('Invalid date provided: '+str)
    }
    return date
}