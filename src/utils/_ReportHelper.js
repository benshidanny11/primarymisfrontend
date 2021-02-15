import _ from "lodash";
export const ReportDataHandlerInYear = (points) => {
    points.splice(points.length - 1, 1);
    let subjects = [];
    points.forEach(function (point) {
      subjects.push(point.subjectname);
    });
    subjects = _.uniq(subjects);
    let newPoints = [];
    let finalMarks = [];
    let subMarks = {};
  
    subjects.forEach((subject) => {
      let waiting = points.length;
      points.forEach((point, index) => {
        //Execute at each iteration
        ((pointEntry, callback) => {
          if (pointEntry.subjectname.includes(subject)) {
            if (pointEntry.term === "1") {
              subMarks = {
                subject: subject,
                marks: [point],
              };
              newPoints.push(subMarks);
            } else if (pointEntry.term === "2" || pointEntry.term === "3") {
              subMarks.marks.push(pointEntry);
            }
          }
  
          callback();
        })(point, () => {
          waiting--;
          //Chech if iteration is done
          if (waiting === 0) {
            newPoints.forEach((newPoint) => {
              finalMarks.push(newPoint);
            });
            newPoints = [];
            subMarks = {};
          }
        });
      });
    });
    return finalMarks;
  };