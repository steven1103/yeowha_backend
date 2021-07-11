const { GraphQLServer } = require("graphql-yoga");
const Timetable = require("comcigan-parser");
const timetable = new Timetable();

const getTime = async (grade, classNum, day, period) => {
  await timetable.init();
  const school = await timetable.search("운중중학교");
  await timetable.setSchool(school[0].code);

  const result = await timetable.getTimetable();
  const FinalResult = result[grade][classNum][day - 1][period - 1].subject;
  console.log(FinalResult)
  return FinalResult
};

const typeDefs = `
  type Query {
    getPeriodSubject(grade: Int!, classNum: Int!, day:Int!, period: Int!): String!
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
