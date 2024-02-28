function scheduleHtmlParser(html) {
  let courseInfos = []
  const days = $(".kbappTimetableDayColumnRoot___1DlDV")
  console.log("start to parse")
  // 7 lines cooresponding to 7 days
  for (let index = 0; index < days.length; index++) {
    let day = index + 1
    const daycourse = $(days[index]).find(".kbappTimetableDayColumnConflictContainer___128M6") //course info of the day
    daycourse.each((index, element) => {
      //the each course of the day
      parseDailyCourse(day, element)
    })
  }
  console.log("end to parse")
  return courseInfos
}

function parseDailyCourse(day, element) {
  $(element.children).each((index, course) => {
    $(course).find(".kbappTimetableCourseRenderCourseItem___MgPtp").each((index, piece) => {
      const name = $(piece).find(".title___3o2RH").text();
      const courseCode = $(piece).find(".courseCode___DrIml").text();
      const instructor = $(piece).find(".kbappTimetableCourseRenderCourseItemInfoText___2Zmwu").eq(0).text();
      const classroom = $(piece).find(".kbappTimetableCourseRenderCourseItemInfoText___2Zmwu").eq(1).text();
      const time = $(piece).find(".kbappTimetableCourseRenderCourseItemInfoText___2Zmwu").eq(2).text();
      const type = $(piece).find(".benType___3T-iL").text();

      const courseInfo = {
        day: day, //4
        name: name, //（本）智能软件工程
        courseCode: courseCode, //B3J213460
        instructor: instructor, //孙海龙[4周,13周,16周] 杨溢龙[3周,16周] 黎立[9-10周,15-16周] 石琳[11周,16周] 高祥[1-2周,5-8周,12-16周(双)]
        classroom: classroom, //主121
        time: time, //11-12节
        type: type //（本）
      };

      console.info('courseInfo of day' + day, courseInfo);
    });
  });
}

