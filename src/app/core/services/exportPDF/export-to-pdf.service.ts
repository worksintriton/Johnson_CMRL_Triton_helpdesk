import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PDF_EXTENSION = '.pdf';

@Injectable({
  providedIn: 'root'
})
export class ExportToPDFService {



  constructor() { }

  exportPdf(tableHeader: string[], tableBody: [], fileName: string, mapAttributes: Map<string, string>, heading: string, subHeading: string, userName: string) {

    var specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      '#bypassme': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true
      }
    };

    let pipe = new DatePipe('en-IN');

    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'medium');

    console.log("tableHeader", tableHeader);
    console.log("tableBody", tableBody);
    var prepare = [];
    tableBody.forEach(e => {
      var tempObj = [];
      Object.entries(e).forEach(([key, value]) => tempObj.push(value));
      prepare.push(tempObj);
    });
    console.log("prepare", prepare);
    const doc = new jsPDF('l', 'mm', [450, 315]);
    // const doc = new jsPDF('l');
    // doc.setFontSize(40);
    // doc.text("Candidate Progress Report", 35, 25);
    // doc.text(5, 7, "Candidate Progress Report");
    // doc.text(10, 17, "GENERAL - TEST - TEST");

    let x = 0;
    let y = 30;


    // var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    // let xOffset = (pageWidth / 2) - (doc.getStringUnitWidth(heading) * doc.internal.getFontSize() / 2);
    // console.log("xOffset ", xOffset);
    // if (heading) {
    //   doc.setFontSize(22);
    //   doc.setFontStyle('bold');
    //   doc.text(heading.toUpperCase(), x, y);
    // }

    // if (subHeading) {
    //   y += 10;
    //   doc.setFontSize(20);
    //   doc.setFontStyle('bold');
    //   doc.text("( " + subHeading.toUpperCase() + " )", x, y);
    // }


    // let keys = mapAttributes.keys();
    // // x = 0;
    // let rectX = 10;
    // let rectY = y + 8;
    // let rectWidth = 430;

    // for (let i = 0; i < mapAttributes.size; i++) {
    //   let key = keys.next().value;
    //   if (i == 0) {
    //     x += 15;
    //     y += 15;
    //   } else if (i % 3 == 0) {
    //     x = 15;
    //     y += 10;
    //   } else {
    //     x += 150;
    //   }
    //   doc.setFontSize(14);
    // //  doc.setFontStyle('normal');
    //   doc.text(key + ": " + mapAttributes.get(key), x, y);
    // }

    // let rectHeight = (y - rectY) + 5;
    // doc.roundedRect(rectX, rectY, rectWidth, rectHeight, 2, 2, "");
    // doc.setLineWidth(1);


    // console.log("content ", htmlsource);
    // console.log("content innerHTML ", htmlsource.innerHTML);
    // doc.fromHTML(htmlsource.innerHTML, // HTML string or DOM elem ref.
    //   margins.left, // x coord
    //   margins.top, { // y coord
    //   'width': margins.width, // max width of content on PDF
    //   'elementHandlers': specialElementHandlers
    // })



    // console.log("tableContent ", tableContent);
    // var totalPagesExp = doc.internal.pages.length;
    var totalPagesExp = "{total_pages_count_string}";

    let headX = 150;
    let headY = 20;
    let tableY = 40;

    autoTable(doc, {
      // html: tableContent,
      // console.log("test");
      headStyles: { fontSize: 10 },
      // headStyles: { fontSize: 10, fillColor: [63, 81, 181] },
      bodyStyles: { fontSize: 8 },
      theme: "grid",
      head: [tableHeader],
      body: prepare,
      margin: { left: 10, top: y + 20 },  // First page table top margin
      didDrawPage: function (data) {
        // Header
        data.settings.margin.top = tableY; // Identify second page table top margin
        doc.setFontSize(12);
        doc.setTextColor(40);
      //  doc.setFontStyle('bold');
        // if (base64Img) {
        //   doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
        // }
        doc.addImage("./../../../exemoAngular/assets/images/logo.png", "JPEG", data.settings.margin.left, 10, 20, 20);
        // doc.addImage("../../../assets/images/logo.png", "JPEG", data.settings.margin.left, 10, 20, 20);
        // doc.text("Report", data.settings.margin.left + 15, 20);
        doc.text("DATE PRINTED: " + myFormattedDate, 350, 20);
        doc.text("USER PRINTED: " + userName, 350, 28);


        if (heading) {
          doc.setFontSize(22);
        //  doc.setFontStyle('bold');
          doc.text(heading.toUpperCase(), headX, headY);
        }

        if (subHeading) {
          doc.setFontSize(20);
        //  doc.setFontStyle('bold');
          doc.text("( " + subHeading.toUpperCase() + " )", headX + 5, headY + 10);
        }

        // Footer
        var str = "Page " + doc.internal
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save(fileName + PDF_EXTENSION);
  }


}
