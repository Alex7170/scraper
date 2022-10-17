import xls from "excel4node"

export const excel = (data) =>{
    const options = {
        'margins': {
          'left': 1.5,
          'right': 1.5,
        },
    }
    const wb = new xls.Workbook({
        'defaultFont':{
            'size': 10
        },
        'printOptions':{
            'centerHorizontal': true,
            'centerVertical': true,
        },
        'sheetFormat': {
            'defaultColWidth': 30,
        }
    })
    const page = wb.addWorksheet('Page', options)
    page.cell(1,1).string("POBOČKA")
    page.cell(1,2).string("ADRESA")
    page.cell(1,3).string("TELEFON")
    page.cell(1,4).string("E-MAIL")
    page.cell(1,5).string("DOCTOŘI")
    for (let i=0; i<data.length; i++){
        page.cell(i+2,1).string(data[i].title)
        page.cell(i+2,2).string(data[i].adres)
        page.cell(i+2,3).string(data[i].tel)
        page.cell(i+2,4).string(data[i].email)
        page.cell(i+2,5).string(data[i].doctors)
    }
    wb.write('File.xlsx')
    return 
}

