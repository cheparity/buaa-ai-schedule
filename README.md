# 小爱课程表 北京航空航天大学-本科教务管理系统

<p align="center">
  <a href="https://github.com/MeanZhang" alt="原开发者">
    <img src="https://img.shields.io/badge/原开发者-Mean-blue?logo=github">
  </a>
  <a href="https://github.com/cheparity" alt="开发者">
    <img src="https://img.shields.io/badge/开发者-Niyuta-yello?logo=github">
  </a>
</p>

本项目为由[MeanZhang](https://github.com/MeanZhang)创建，现由[Niyuta](https://github.com/cheparity)维护的小爱课表北航教务自动导入系统。Niyuta作为使用了三年的受益者，谨代表所有使用过该项目的朋友感谢原开发者带来的贡献~


这是[小爱课程表](https://open-schedule-prod.ai.xiaomi.com/docs/#/help/)北航本科教务适配项目。

> 吐槽一下，北航教务系统课程信息格式极其混乱。

## 注意事项

- 暂未适配导入开学时间的功能，使用时需要自行设置开学时间。

## 更新日志

### Ver.8450

- 新增：适配了北航新教务系统
- 重构：大篇幅简化和删改原代码

### Ver.5773

- 修复教师名中带有“周”时解析错误的问题
- 修改教务链接为课表链接，在登录状态下可直达课表页面

### Ver.5015

- 修复课程信息为两行时教师姓名解析错误的问题
- 修复单双周无法解析的问题

### Ver.4610

增加新的课程信息格式解析，如基础物理实验。

### Ver.3577

- 修复课程信息为 4 行时无法导入的 Bug。
- 更新新版开发工具，使用了 IDE 本地快速编辑功能。

### Ver.2814

课程长度超过 50 字符（25 汉字）时，自动提取前 50 字符。

### Ver.2551

使用新版开发者工具，适配新版小爱课程表。
