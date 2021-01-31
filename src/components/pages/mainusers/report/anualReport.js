import jsPDF from "jspdf";
import "jspdf-autotable";
import report from "../../../../assets/report.JPG";
import {  ReportDataHandler } from "../../../../utils/_ReportHelper";
const generateReport = (tickets) => {
  // info of maximu marks
  const maxCatMarksPerYer =
    tickets[tickets.length - 1].report.maxMarks.maxCatMarks;
  const maxExamMarksPer =
    tickets[tickets.length - 1].report.maxMarks.maxExamMarks;
  let maxTotalMarksPer =
    tickets[tickets.length - 1].report.maxMarks.maxTotalMarks;
  // info on term one
  const catOneSum =
    tickets[tickets.length - 1].report.dataForTerms.term1.catOneSum.sum;
  const catTwoSum =
    tickets[tickets.length - 1].report.dataForTerms.term1.catTwoSum.sum;
  const examSum =
    tickets[tickets.length - 1].report.dataForTerms.term1.examSum.sum;
  // info on second termS
  const catOneSum2 =
    tickets[tickets.length - 1].report.dataForTerms.term2.catOneSum.sum;
  const catTwoSum2 =
    tickets[tickets.length - 1].report.dataForTerms.term2.catTwoSum.sum;
  const examSum2 =
    tickets[tickets.length - 1].report.dataForTerms.term2.examSum.sum;
  // info on third term
  const catOneSum3 =
    tickets[tickets.length - 1].report.dataForTerms.term3.catOneSum.sum;
  const catTwoSum3 =
    tickets[tickets.length - 1].report.dataForTerms.term3.catTwoSum.sum;
  const examSum3 =
    tickets[tickets.length - 1].report.dataForTerms.term3.examSum.sum;
  // info on year
  const totmarks =
    catOneSum +
    catTwoSum +
    examSum +
    catOneSum2 +
    catTwoSum2 +
    examSum2 +
    catTwoSum3 +
    catOneSum3 +
    examSum3;
  const totmax = maxTotalMarksPer * 3;
  const totaverage = ((totmarks * 100) / totmax).toFixed(1);
  const classname = tickets[tickets.length - 1].report.classname;
  const studentsInClass = tickets[tickets.length - 1].report.studentsInClass;
  //positions
  const term1position =
    tickets[tickets.length - 1].report.dataForTerms.term1.position;
  const term2position =
    tickets[tickets.length - 1].report.dataForTerms.term2.position;
  const term3position =
    tickets[tickets.length - 1].report.dataForTerms.term3.position;
  const yearposition = tickets[tickets.length - 1].report.position;
  let raw = ReportDataHandler(tickets);
  let body = [];
  let foot = [];
  let footer = [];
  for (let i = 0; i < raw.length; i++) {
    let row = [];
    let term1 = [];
    let term2 = [];
    let term3 = [];
    term1.push(
      raw[i].marks[0].catone,
      raw[i].marks[0].cattwo,
      raw[i].marks[0].exam,
      raw[i].marks[0].catone + raw[i].marks[0].cattwo + raw[i].marks[0].exam
    );
    term2.push(
      raw[i].marks[1].catone,
      raw[i].marks[1].cattwo,
      raw[i].marks[1].exam,
      raw[i].marks[1].catone + raw[i].marks[1].cattwo + raw[i].marks[1].exam
    );
    term3.push(
      raw[i].marks[2].catone,
      raw[i].marks[2].cattwo,
      raw[i].marks[2].exam,
      raw[i].marks[2].catone + raw[i].marks[2].cattwo + raw[i].marks[2].exam
    );
    row.push(
      raw[i].subject,
      raw[i].marks[0].catmax,
      raw[i].marks[0].exammax,
      raw[i].marks[0].catmax + raw[i].marks[0].exammax,
      //term one marks
      term1[0],
      term1[1],
      term1[2],
      term1[0] + term1[1] + term1[2],
      // term two marks
      term2[0],
      term2[1],
      term2[2],
      term2[0] + term2[1] + term2[2],
      //term 3 marks
      term3[0],
      term3[1],
      term3[2],
      term3[0] + term3[1] + term3[2],
      term1[0] +
        term1[1] +
        term1[2] +
        term2[0] +
        term2[1] +
        term2[2] +
        term3[0] +
        term3[1] +
        term3[2],
      (raw[i].marks[0].catmax + raw[i].marks[0].exammax) * 3,
      (
        ((term1[0] +
          term1[1] +
          term1[2] +
          term2[0] +
          term2[1] +
          term2[2] +
          term3[0] +
          term3[1] +
          term3[2]) *
          100) /
        ((raw[i].marks[0].catmax + raw[i].marks[0].exammax) * 3)
      ).toFixed(1)
    );
    body.push(row);
    // body.push(term1);
  }
  foot.push(
    "Total",
    //maximum info
    maxCatMarksPerYer,
    maxExamMarksPer,
    maxTotalMarksPer,
    //first term
    catOneSum,
    catTwoSum,
    examSum,
    catOneSum + catTwoSum + examSum,
    // second term
    catOneSum2,
    catTwoSum2,
    examSum2,
    catOneSum2 + catTwoSum2 + examSum2,
    // third term
    catOneSum3,
    catTwoSum3,
    examSum3,
    catOneSum3 + catTwoSum3 + examSum3,
    // info on year
    totmarks,
    totmax,
    totaverage
  );
  //  foot2.push('Average',
  //  '-','-','-','-','-','-',''
  //  )
  footer.push(foot);
  //  footer2.push(foot2)

  let doc = new jsPDF("p", "pt", "a4");
  var img = new Image();
  img.crossOrigin = ""; // for demo as we are at different origin than image
  img.src = report;
  doc.text("SOURCE DEV HIGH SCHOOL", 200, 50);
  doc.setFontSize(8);
  doc.text("P.O Box: 2681 Kigali, Rwanda", 240, 80);
  doc.text("Tel: 078-835-4848", 240, 90);
  doc.text("Website: www.sourcedev.org", 240, 100);
  doc.text("Email: info@sourcedev.org", 240, 110);
  doc.setFontSize(18);
  doc.text("STUDENT YEAR REPORT", 200, 140);
  doc.line(530, 150, 60, 150);
  //  doc.text('TERM '+'1', 370, 140)
  doc.autoTable({
    startY: 150,
    head: [
      [
        {
          content: "NAME:",
          styles: { textColor: [65, 74, 76] },
        },
        {
          content: raw[0].marks[0].studentnames,
        },
        {
          content: "REGISTRATION NUMBER:",
          styles: { textColor: [65, 74, 76] },
        },
        {
          content: raw[0].marks[0].regestrationnumber,
          styles: { textColor: [65, 74, 76] },
        },
      ],
      [
        {
          content: "CLASS",
          styles: { textColor: [65, 74, 76] },
        },
        {
          content: classname,
          styles: { textColor: [65, 74, 76] },
        },
        {
          content: "ACADEMIC YEAR:",
          styles: { textColor: [65, 74, 76] },
        },
        {
          content: raw[0].marks[0].year,
          styles: { textColor: [65, 74, 76] },
        },
      ],
    ],

    tableWidth: "auto",
    theme: "plain",
  });
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [
      [
        {
          content: "SUBJECTS",
          rowSpan: 2,
          styles: {
            fillColor: [228, 242, 239],
            halign: "left",
            textColor: [65, 74, 76],
          },
        },
        {
          content: "MAX POINTS",
          colSpan: 3,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "FIRST TERM",
          colSpan: 4,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "SECOND TERM",
          colSpan: 4,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "THIRD TERM",
          colSpan: 4,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "ANNUAL POINTS",
          colSpan: 3,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
      ],
      [
        {
          content: "CT",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "EX",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "TOT",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "CT1",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "CT2",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "EX",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "TOT",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "CT1",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "CT2",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "EX",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "TOT",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "CT1",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "CT2",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "EX",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "TOT",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "TOT",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "MAX",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "%",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
      ],
    ],
    columnStyles: {
      0: { columnWidth: 60 },
      1: { columnWidth: 25 },
      2: { columnWidth: 25 },
      3: { columnWidth: 25 },
      4: { columnWidth: 25 },
      5: { columnWidth: 25 },
      6: { columnWidth: 25 },
      7: { columnWidth: 25 },
      8: { columnWidth: 25 },
      9: { columnWidth: 25 },
      10: { columnWidth: 25 },
      11: { columnWidth: 25 },
      12: { columnWidth: 25 },
      13: { columnWidth: 25 },
      14: { columnWidth: 25 },
      15: { columnWidth: 25 },
      17: { columnWidth: 25 },
      18: { columnWidth: 25 },
    },
    headerStyles: {
      lineWidth: 0.5,
      lineColor: [65, 74, 76],
      // fontStyle: 'majalla',
      fontSize: 4,
    },
    footStyles: {
      lineWidth: 0.5,
      lineColor: [65, 74, 76],
    },
    bodyStyles: {
      lineWidth: 0.5,
      lineColor: [65, 74, 76],
      fontSize: 6,
    },
    footStyles: {
      fontSize: 6,
      lineWidth: 0.5,
      lineColor: [65, 74, 76],
    },
    body: body,
    foot: footer,
    tableLineColor: [65, 74, 76],
    tableLineWidth: 0.5,
    theme: "plain",
    tableWidth: "wrap",
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY,
    head: [
      [
        {
          content: "Average",
          colSpan: 2,
          rowSpan: 2,
          styles: {
            fillColor: [228, 242, 239],
            halign: "left",
            textColor: [65, 74, 76],
          },
        },
        {
          content: "",
          colSpan: 3,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: (
            ((catOneSum + catTwoSum + examSum) * 100) /
            maxTotalMarksPer
          ).toFixed(1),
          colSpan: 4,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: (
            ((catOneSum2 + catTwoSum2 + examSum2) * 100) /
            maxTotalMarksPer
          ).toFixed(1),
          colSpan: 4,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: (
            ((catOneSum3 + catTwoSum3 + examSum3) * 100) /
            maxTotalMarksPer
          ).toFixed(1),
          colSpan: 4,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: ((totmarks * 100) / totmax).toFixed(1),
          colSpan: 3,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
      ],
      [
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
      ],
    ],
    columnStyles: {
      0: { columnWidth: 35 },
      1: { columnWidth: 25 },
      2: { columnWidth: 25 },
      3: { columnWidth: 25 },
      4: { columnWidth: 25 },
      5: { columnWidth: 25 },
      6: { columnWidth: 25 },
      7: { columnWidth: 25 },
      8: { columnWidth: 25 },
      9: { columnWidth: 25 },
      10: { columnWidth: 25 },
      11: { columnWidth: 25 },
      12: { columnWidth: 25 },
      13: { columnWidth: 25 },
      14: { columnWidth: 50 },
      15: { columnWidth: 25 },
      17: { columnWidth: 25 },
      18: { columnWidth: 45 },
    },
    headerStyles: {
      lineWidth: 0.5,
      lineColor: [65, 74, 76],
      // fontStyle: 'majalla',
      rowHeight: 30,
      fontSize: 9,
    },
    tableLineColor: [65, 74, 76],
    tableLineWidth: 0.5,
    theme: "plain",
    tableWidth: "wrap",
  });
  doc.autoTable({
    startY: doc.lastAutoTable.finalY,
    head: [
      [
        {
          content: "Position",
          colSpan: 2,
          rowSpan: 2,
          styles: {
            fillColor: [228, 242, 239],
            halign: "left",
            textColor: [65, 74, 76],
          },
        },
        {
          content: "",
          colSpan: 3,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: term1position + "/" + studentsInClass,
          colSpan: 4,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: term2position + "/" + studentsInClass,
          colSpan: 4,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: term3position + "/" + studentsInClass,
          colSpan: 4,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: yearposition + "/" + studentsInClass,
          colSpan: 3,
          rowSpan: 2,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
      ],
      [
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
        {
          content: "",
          // colSpan: 5,
          styles: { fillColor: [228, 242, 239], textColor: [65, 74, 76] },
        },
      ],
    ],
    columnStyles: {
      0: { columnWidth: 35 },
      1: { columnWidth: 25 },
      2: { columnWidth: 25 },
      3: { columnWidth: 25 },
      4: { columnWidth: 25 },
      5: { columnWidth: 25 },
      6: { columnWidth: 25 },
      7: { columnWidth: 25 },
      8: { columnWidth: 25 },
      9: { columnWidth: 25 },
      10: { columnWidth: 25 },
      11: { columnWidth: 25 },
      12: { columnWidth: 25 },
      13: { columnWidth: 25 },
      14: { columnWidth: 50 },
      15: { columnWidth: 25 },
      17: { columnWidth: 25 },
      18: { columnWidth: 45 },
    },
    headerStyles: {
      lineWidth: 0.5,
      lineColor: [65, 74, 76],
      // fontStyle: 'majalla',
      rowHeight: 30,
      fontSize: 9,
    },
    tableLineColor: [65, 74, 76],
    tableLineWidth: 0.5,
    theme: "plain",
    tableWidth: "wrap",
  });
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [
      [
        {
          content: "Head Teacher Signature",
          styles: { halign: "left", textColor: [65, 74, 76] },
        },
        {
          content: "Teacher Signature",
          styles: { textColor: [65, 74, 76] },
        },
        {
          content: "Parent Signature",
          styles: { textColor: [65, 74, 76] },
        },
      ],
    ],
    headerStyles: {
      // lineWidth: 0.5,
      // lineColor: [65,74,76],
      // rowHeight :70,
    },

    tableWidth: "auto",
    theme: "plain",
  });
  img.onload = function () {
    doc.addImage(this, 50, 10);
    window.open(doc.output("bloburl"), "_blank");
  };

  // return doc.output('bloburl');
};

export default generateReport;
