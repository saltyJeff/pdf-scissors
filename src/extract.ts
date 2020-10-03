import { PDFDocument } from 'pdf-lib'
import { Command } from 'commander'
import { openPdf, writePdf } from './utils'
import type MathJS from 'mathjs'

const math: MathJS.MathJsStatic = require('mathjs')

export default async function extract(file: string, idxStrs: string[], cmdObj: Command) {
    const outPath = cmdObj.output
    const doc = await openPdf(file)

    // we have multiple possible ways to specify all valid indicies
    const allPossibleList = await doc.getPageIndices()
    let indicies: number[] = []

    // 1. is it a list of numeric indexes?
    indicies = idxStrs.map(parseInt)
    if(indicies.every(n => !isNaN(n))) {
        // yup it was a list of all numeric indicies. Let's filter out all the invalid indicies
        const allPossibleSet = new Set(allPossibleList)
        indicies = indicies.filter(x => allPossibleSet.has(x))
    }
    // 2. is it a single mathematical expression?
    else if(idxStrs.length == 1) {
        // we need to parse each expression as algebra, and then execute it
        // we use a math library so we don't do arbitrary code execution
        const scope = {
            x: -1
        }
        indicies = allPossibleList.filter(v => {
            scope.x = v
            return math.evaluate(idxStrs[0], scope)
        })
    }
    // 3. "nani"
    else {
        throw new Error('Invalid argument for indicies given. Either specify a list of integers (e.g. 0 1 2), '+
            'or a single mathematical expression involving x which evaluates to a boolean (e.g. "x > 7")')
    }

    const outFile = await PDFDocument.create()
    const pages = await outFile.copyPages(doc, indicies)
    for(let page of pages) {
        outFile.addPage(page)
    }
    await writePdf(outFile, outPath)
}

