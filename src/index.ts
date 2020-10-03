#!/usr/bin/env node

import { program } from 'commander'
program.version('0.0.1')

// import the subcommands
import concat from './concat'
import extract from './extract'
import rotate from './rotate'
import metadata from './metadata'
program
    .command('concat <files...>')
    .description('Concatenate PDFs together')
    .requiredOption('-o, --output <output>', 'Output path for the new PDF')
    .action(concat)
program
    .command('extract <file> <indicies...>')
    .description('Extracts the specified pages from a file by indicies (starting from zero). Alternatively, you can specify a '+
        'mathematical expression involving "x". Pages will be included when the expression evalutes to true')
    .requiredOption('-o, --output <output>', 'Output path for the new PDF')
    .action(extract)
program
    .command('rotate <file> <degrees>')
    .description('Rotates all pages in a specified file by degrees clockwise')
    .requiredOption('-o, --output <output>', 'Output path for the new PDF')
    .action(rotate)
program
    .command('metadata <files...>')
    .description('Edits the metadata of a specified list of files')
    .option('-a, --author <author>', 'author of the document')
    .option('-c, --creator <creator>', 'creator of the document')
    .option('-k, --keywords <keywords...>', 'keywords for the document')
    .option('-l, --language <language>', 'ISO-language string for the document (e.g. en-us)')
    .option('-p, --producer <producer>', 'The producer of the document')
    .option('-s, --subject <subject>', 'The subject of the document')
    .option('-d, --creation-date <date>', 'The creation date of the document in ISO-8601 (e.g. 2020-01-01)')
    .option('-m, --modification-date <date>', 'The modification date of the document in ISO-8601 (e.g. 2020-01-01)')
    .option('-t, --title <title>', 'The title of the document')
    .action(metadata)

program.parse(process.argv)