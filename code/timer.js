/**
 * 时间配置函数，此为入口函数，不要改动函数名
 * @author MeanZhang
 */
async function scheduleTimer({ providerRes, parserRes } = {}) {
  //周数，包括两周考试周，春18秋19夏9
  let totalWeek = 19;
  if (providerRes.includes("春季")) {
    totalWeek = 18;
  } else if (providerRes.includes("秋季")) {
    totalWeek = 19;
  } else if (providerRes.includes("夏季")) {
    totalWeek = 9;
  } else {
    await loadTool('AIScheduleTools')
    const userSelect = await AIScheduleSelect({
      titleText: '选择学期', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
      contentText: '自动解析周数错误，请手动选择学期', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
      selectList: [
        '春季',
        '秋季',
        '夏季',
      ], // 选项列表，数组，为必传
    })
    if (userSelect === '春季') {
      totalWeek = 18;
    } else if (userSelect === '秋季') {
      totalWeek = 19;
    } else {
      totalWeek = 9;
    }
  }
  //课程时间
  const sections = [
    {
      section: 1,
      startTime: "08:00",
      endTime: "08:45",
    },
    {
      section: 2,
      startTime: "08:50",
      endTime: "09:35",
    },
    {
      section: 3,
      startTime: "09:50",
      endTime: "10:35",
    },
    {
      section: 4,
      startTime: "10:40",
      endTime: "11:25",
    },
    {
      section: 5,
      startTime: "11:30",
      endTime: "12:15",
    },
    {
      section: 6,
      startTime: "14:00",
      endTime: "14:45",
    },
    {
      section: 7,
      startTime: "14:50",
      endTime: "15:35",
    },
    {
      section: 8,
      startTime: "15:50",
      endTime: "16:35",
    },
    {
      section: 9,
      startTime: "16:40",
      endTime: "17:25",
    },
    {
      section: 10,
      startTime: "17:30",
      endTime: "18:15",
    },
    {
      section: 11,
      startTime: "19:00",
      endTime: "19:45",
    },
    {
      section: 12,
      startTime: "19:50",
      endTime: "20:35",
    },
    {
      section: 13,
      startTime: "20:40",
      endTime: "21:25",
    },
    {
      section: 14,
      startTime: "21:30",
      endTime: "22:15",
    },
  ];
  timerRes = {
    totalWeek: totalWeek, // 总周数：[1, 30]之间的整数
    startSemester: "", // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: true, // 是否显示周末
    forenoon: 5, // 上午课程节数：[1, 10]之间的整数
    afternoon: 5, // 下午课程节数：[0, 10]之间的整数
    night: 4, // 晚间课程节数：[0, 10]之间的整数
    sections: sections, // 课程时间表，注意：总长度要和上边配置的节数加和对齐
  };
  await loadTool('AIScheduleTools')
  await AIScheduleAlert('导入成功！本导入系统为新系统，请核对周数等课程信息，如有问题请联系开发者QQ：3452811884（落*）')
  console.info(timerRes);
  return timerRes;
}