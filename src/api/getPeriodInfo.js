const Timetable = require("comcigan-parser");
const timetable = new Timetable();

const getTime = async (grade, classNum, day, period) => {
  await timetable.init();
  const school = await timetable.search("운중중학교");
  await timetable.setSchool(school[0].code);

  const result = await timetable.getTimetable();
  console.log(result[grade][classNum][day - 1][period - 1]);
};

export default getTime