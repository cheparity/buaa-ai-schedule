/**
 * 入口函数，小爱同学提供的API
 * @param {HTMLElement} html 
 * @returns {Array<Object>} 课程信息数组
 * @author Niyuta
 */
function scheduleHtmlParser(html) {
  let courseInfos = []
  const days = $(".kbappTimetableDayColumnRoot___1DlDV")
  console.log("start to parse")
  // 7 lines cooresponding to 7 days
  for (let index = 0; index < days.length; index++) {
    let day = index + 1
    const daycourse = $(days[index]).find(".kbappTimetableDayColumnConflictContainer___128M6") //course info of the day
    daycourse.each((_, element) => parseDailyCourse(day, element, courseInfos))
  }
  console.log("end to parse")
  return courseInfos
}

/**
 * 解析一天的课程
 * @param {number} day 一周中的第几天
 * @param {HTMLElement} element 包含当天课程信息的元素
 * @param {Array<Object>} courseList 课程信息数组
 * @returns {void}
 * @author Niyuta
 */
function parseDailyCourse(day, element, courseList) {
  $(element.children).each((index, course) => {
    $(course).find(".kbappTimetableCourseRenderCourseItem___MgPtp").each((index, piece) => {
      const name = $(piece).find(".title___3o2RH").text()
      const courseCode = $(piece).find(".courseCode___DrIml").text()
      const instructor = $(piece).find(".kbappTimetableCourseRenderCourseItemInfoText___2Zmwu").eq(0).text()
      const classroom = $(piece).find(".kbappTimetableCourseRenderCourseItemInfoText___2Zmwu").eq(1).text()
      const time = $(piece).find(".kbappTimetableCourseRenderCourseItemInfoText___2Zmwu").eq(2).text()
      const type = $(piece).find(".benType___3T-iL").text()

      let courseInfo = {
        name: name, //（本）智能软件工程
        position: classroom, //主121
        teacher: getTeacher(instructor), //孙海龙[4周,13周,16周] 杨溢龙[3周,16周] 黎立[9-10周,15-16周] 石琳[11周,16周] 高祥[1-2周,5-8周,12-16周(双)]
        weeks: getWeeks(instructor),
        day: day, // 4
        sections: getSections(time)
        // sections: getSections(time), //11-12节
        // courseCode: courseCode, //B3J213460 no such field in API
        // type: type //（本）no such field in API
      }

      console.info(courseInfo)
      courseList.push(courseInfo)
    })
  })
}


/**
 * 提取教师姓名，由于字符限制，只提取第一个
 * @param {string} str 包含教师姓名的字符串，如`孙海龙[4周,13周,16周] 杨溢龙[3周,16周] 黎立[9-10周,15-16周] 石琳[11周,16周] 高祥[1-2周,5-8周,12-16周(双)]`
 * @returns {string} 教师姓名
 * @author MeanZhang Niyuta
 */
function getTeacher(str) {
  // if (str.indexOf("\n") !== -1) {
  //   str = str.split("\n")[1]
  // }
  // if (/^第.*节/.exec(str)) {
  //   str = str.split("节")[1]
  // }
  return /[^\[0-9]+(?=[\[0-9])/.exec(str)[0].replace(/\s*/g, "")
}


/**
 * 提取课程周数
 * @param {string} str 包含周数的字符串，如`[1-9，11]`、`12，14`、`[2，4，12，14双]`、`[14]`
 * @returns {Array<number>} 包含`str`中所有周数的数组
 * @author MeanZhang Niyuta
 */
function getWeeks(str) {
  let weeks = []
  const regex = /\[(.*?)\]/g
  const matches = str.match(regex)

  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      const weekStr = matches[i].slice(1, -1)
      const weekRanges = weekStr.split(",")

      for (let j = 0; j < weekRanges.length; j++) {
        const weekRange = weekRanges[j].trim()

        if (weekRange.includes("-")) {
          const [start, end] = weekRange.split("-")

          for (let k = parseInt(start); k <= parseInt(end); k++) {
            weeks.push(k)
          }
        } else {
          weeks.push(parseInt(weekRange))
        }
      }
    }
  } else {
    console.warn("No weeks found in", str)
  }

  return weeks
}

/**
 * 提取课程节数
 * @param {string} str 包含节数的字符串，如 `8-9节`
 * @returns {Array<number>} 包含 `str` 中所有节数的数组
 * @author MeanZhang Niyita
 */
function getSections(str) {
  let sections = []
  const regex = /(\d+)-(\d+)节/g
  const matches = str.match(regex)

  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i]
      const [start, end] = match.split("-")

      for (let j = parseInt(start); j <= parseInt(end); j++) {
        sections.push(j)
      }
    }
  }

  return sections
}