import jsPDF from "jspdf";
import "jspdf-autotable";
import report from '../../../../assets/report.JPG'
const generatePDF = (tickets) => {

    let doc = new jsPDF('p', 'pt')
    var img = new Image;
    img.crossOrigin = "";  // for demo as we are at different origin than image
    img.src =report;
    doc.text('SOURCE DEV HIGH SCHOOL', 200, 50)
    doc.setFontSize(8);
    doc.text('P.O Box: 2681 Kigali, Rwanda',220,70)
    doc.text('Tel: 078-835-4848',240,90)
    doc.text('Website: www.sourcedev.org',210,100)
    doc.text('Email: info@sourcedev.org',205,110)
    doc.setFontSize(18);
    doc.text('STUDENT REPORT', 200, 140)
   doc.line(530, 150, 60, 150);
    let raw = tickets
    let body = []
    let foot = []
    let foot2 = []
    let footer = []
    for (let i = 0; i < raw.length-1; i++) {
      let row = []
      row.push(raw[i].subjectname,
        raw[i].catmax,
        raw[i].exammax,
        raw[i].catmax+raw[i].exammax,
        raw[i].catone,
        raw[i].cattwo,
        raw[i].exam,
        raw[i].catone+raw[i].cattwo+raw[i].exam)
       body.push(row)
    }
    // doc.setFontSize(8);
    doc.text('TERM '+raw[raw.length-2].term, 370, 140)
     foot.push('Total',raw[raw.length-1].report.maxMarks.catmax,
      raw[raw.length-1].report.maxMarks.exammax,
      raw[raw.length-1].report.maxMarks.totalmax,
      raw[raw.length-1].report.catOneSumInTerm,
      raw[raw.length-1].report.catTwoSumInTerm,
      raw[raw.length-1].report.examSumInTerm,
      raw[raw.length-1].report.catOneSumInTerm+
      raw[raw.length-1].report.catTwoSumInTerm+
      raw[raw.length-1].report.examSumInTerm,
      )
      foot2.push('Average','-','-','-','-','-','-',`${raw[raw.length-1].report.average.toFixed(2)}%`
      )
      footer.push(foot)
      footer.push(foot2)
      console.log(footer)
      doc.autoTable({
        startY:150,
        head: [
          [
            {
              content: 'NAME:',
              styles: {textColor:[65,74,76] },
            },
            {
              content:  raw[raw.length-2].studentnames,
            },
            {
              content: 'REGISTRATION NUMBER:',
              styles: {textColor:[65,74,76] },
            },
            {
              content: '1389200120',
              styles: {textColor:[65,74,76] },
            },
          ],
      [
        {
          content: 'CLASS',
          styles: {textColor:[65,74,76] },
        },
        {
          content: raw[raw.length-1].report.classname,
           styles: {textColor:[65,74,76]  },
        },
        {
          content: 'ACADEMIC YEAR:',
          styles: {textColor:[65,74,76] },
        },
        {
          content: raw[raw.length-2].year,
          styles: {textColor:[65,74,76] },
        },
      ],
        ],
       tableWidth: 'auto',
        theme: "plain",
      })
    doc.autoTable({
      startY: doc.lastAutoTable.finalY+10,
      head: [
        [
          {
            content: 'SUBJECTS',
            rowSpan:2,
            styles: { fillColor: [228, 242, 239] ,halign: 'left',textColor:[65,74,76] },
          },
          {
            content: 'Maximum',
            colSpan: 3,
             styles: {fillColor: [228, 242, 239],textColor:[65,74,76]  },
          },
          {
            content: 'Marks',
            colSpan: 4,
            styles: {fillColor: [228, 242, 239],textColor:[65,74,76] },
          },
        ],
        [
          {
            content: 'CT',
            // colSpan: 5,
             styles: {fillColor: [228, 242, 239],textColor:[65,74,76]  },
          },
          {
            content: 'EX',
            // colSpan: 5,
             styles: {fillColor: [228, 242, 239],textColor:[65,74,76]},
          },
          {
            content: 'TOT',
            // colSpan: 5,
             styles: {fillColor: [228, 242, 239],textColor:[65,74,76]  },
          },
          {
            content: 'CT1',
            // colSpan: 5,
             styles: {fillColor: [228, 242, 239],textColor:[65,74,76]  },
          },
          {
            content: 'CT2',
            // colSpan: 5,
             styles: {fillColor: [228, 242, 239],textColor:[65,74,76]  },
          },
          {
            content: 'EX',
            // colSpan: 5,
             styles: {fillColor: [228, 242, 239],textColor:[65,74,76]  },
          },
          {
            content: 'TOT',
            // colSpan: 5,
             styles: {fillColor: [228, 242, 239],textColor:[65,74,76]  },
          },
        ],
      ],
      headerStyles: {
        lineWidth: 0.5,
        lineColor: [65,74,76]
    },
    footStyles: {
      lineWidth: 0.5,
      lineColor: [65,74,76]
  },
    bodyStyles: {
      lineWidth: 0.5,
      lineColor: [65,74,76]
  },
 
      body: body,
      tableLineColor: [65,74,76],
      tableLineWidth: 0.5,
      theme: "plain",
      foot: footer,
      tableWidth: 'auto',
    })
    doc.autoTable({
      startY:doc.lastAutoTable.finalY+10,
      head: [[
        {
          content: 'Position',
          colSpan:7,
          rowSpan:2,
          styles: {halign: 'left'},
        },
        {
          content: raw[raw.length-1].report.position+'/'+raw[raw.length-1].report.studentsInClass,
          // rowSpan:2,
          styles: {halign: 'right'},
        },
      ],
      ],
      headerStyles: {
        lineWidth: 0.5,
        lineColor: [65,74,76]
    },
     tableWidth: '300',
      theme: "plain",
    })
    doc.autoTable({
      startY:doc.lastAutoTable.finalY+10,
      head: [
        [
          {
            content: 'Head Teacher Signature',
            styles: { fillColor: [228, 242, 239] ,halign: 'left',textColor:[65,74,76] },
          },
          {
            content: 'Teacher Signature',
             styles: {fillColor: [228, 242, 239],textColor:[65,74,76]  },
          },
          {
            content: 'Parent Signature',
            styles: {fillColor: [228, 242, 239],textColor:[65,74,76] },
          },
        ],
      ],
      headerStyles: {
        lineWidth: 0.5,
        lineColor: [65,74,76],
        rowHeight :70,
    },
    
     tableWidth: 'auto',
      theme: "plain",
    })
    // console.log(doc.output('bloburl'))
    img.onload = function() {
      doc.addImage(this, 50, 10);
      window.open(doc.output('bloburl'), '_blank');
  };
  
  // return doc.output('bloburl');

};

export default generatePDF;