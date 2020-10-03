import { program } from 'commander'
program.version('0.0.1')

// import the subcommands
import concat from './concat'
import extract from './extract'
import rotate from './rotate'
program
    .command('concat <files...>')
    .description('Concatenate PDFs together')
    .requiredOption('-o, --output <output>', 'Output path for the new PDF')
    .action(concat)
program
    .command('extract <file> <indicies...>')
    .description('Extracts the specified pages from a file by indicies (starting from zero)')
    .requiredOption('-o, --output <output>', 'Output path for the new PDF')
    .action(extract)
program
    .command('rotate <file> <degrees>')
    .description('Rotates all pages in a specified file by degrees clockwise')
    .requiredOption('-o, --output <output>', 'Output path for the new PDF')
    .action(rotate)

program.parse(process.argv)