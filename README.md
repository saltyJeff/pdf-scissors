# pdf-scissors

PDF scissors is a small CLI wrapper around [pdf-lib](https://www.npmjs.com/package/pdf-lib)

The CLI is designed to allow you to cut, rotate, and glue back together the pages of a PDF.

## Help
You can find more details by running the standard

`pdf-scissors --help`

## Example Operations:
`pdf-scissors concat -o joined.pdf x.pdf y.pdf`

Joins together x.pdf and y.pdf into a new PDF named joined.pdf

---

`pdf-scissors extract -o first-two-pages.pdf x.pdf 0 1`

Extracts the first two pages from x.pdf (indicies 0 and 1) and stores them into a new PDF named first-two-pages.pdf

`pdf-scissors extract -o every-third.pdf x.pdf "x % 3 == 0"`

Extracts every third page from x.pdf and stores them into a new PDF called every-third.pdf

---

`pdf-scissors rotate -o rot.pdf x.pdf 90`

Rotates every page of x.pdf by 90 degrees clockwise and saves them to rot.pdf

---

`pdf-scissors metadata mine.pdf --author saltyJeff`

Sets the metadata "author" field of mine.pdf to saltyJeff
