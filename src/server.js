const { GraphQLServer } = require("graphql-yoga");
const Timetable = require("comcigan-parser");
const timetable = new Timetable();

const getTime = async (grade, classNum, day, period) => {
  await timetable.init();
  const school = await timetable.search("운중중학교");
  await timetable.setSchool(school[0].code);

  const result = await timetable.getTimetable();
  const classObj = result[grade][classNum][day - 1][period - 1].class;
  const gradeObj = result[grade][classNum][day - 1][period - 1].grade;
  const subjectObj = result[grade][classNum][day - 1][period - 1].subject;
  const FinalResult = { subject: subjectObj, grade:gradeObj, class:classObj };
  console.log(FinalResult);
  return FinalResult;
};

const typeDefs = `

  type periodObject {
      subject:String!
      grade:Int!
      class:Int!
  }
  type Query {
    getPeriodSubject(grade: Int!, classNum: Int!, day:Int!, period: Int!): periodObject!
  }
`;

const resolvers = {
  Query: {
    getPeriodSubject: (_, { grade, classNum, day, period }) => {
      return getTime(grade, classNum, day, period);
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Graphql Server Running"));
