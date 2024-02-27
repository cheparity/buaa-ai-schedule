async function scheduleHtmlProvider(
  iframeContent = "",
  frameContent = "",
  dom = document
) {
  let table
  table = dom.getElementsByClassName("kbappTimetableContentContainer___1Uhus")[0].innerHTML
  return table
}
