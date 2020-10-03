import { PDFDocument } from "pdf-lib"

import { promises as fs } from 'fs'

export async function openPdf(path: string) {
    const bytes = await fs.readFile(path)
    return await PDFDocument.load(bytes)
}

export async function openPdfs(paths: string[]) {
    return Promise.all(paths.map(openPdf))
}

export async function writePdf(doc: PDFDocument, path: string) {
    const bytes = await doc.save()
    await fs.writeFile(path, bytes)
}