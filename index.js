let express = require("express");
let app = express();
let graphqlhttp = require("express-graphql");
let mongoose = require("mongoose");
let { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLNonNull,GraphQLList } = require("graphql");
let GqlSchema = require("./graphql/user");

mongoose.connect("mongodb+srv://vips120:vipsrock123@cluster0-hkseo.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true}).then(() => console.log(`connected to db`)).catch(error => console.log(`something went wrong ${error.message}`));
app.use(express.json());
// let User = require("./model/index");

// console.log(ql);

// let schema = buildSchema(`
// type Query {
//     hello:String
// }
// ` );

// let root = {
//     hello: () => 'hello world'
// };

// app.use("/graphql", graphqlhttp({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }));

// const PersonType = new GraphQLObjectType({
//     name: "Users",
//     fields: {
//         id: { type: GraphQLID },
//         firstname: { type: GraphQLString },
//    lastname:{type: GraphQLString}
//     }
// });


const schema = new GraphQLSchema({
    query: GqlSchema.Fetchuser,
    mutation: GqlSchema.createUser
    
});

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: "Query",
//         fields: {
//             people: {
//                 type: GraphQLList(PersonType),
//                 resolve: (source, args, context, info) => {
//                     return User.find();
//                 }
//             },
//             person: {
//                 type: PersonType,
//                 args: {
//                     id: {type: GraphQLNonNull(GraphQLID)}
//                 },
//                 resolve: (source, args, context, info) => {
//                     return User.findById(args.id);
//                 }
//             }
//         }
//     }),
//     mutation: new GraphQLObjectType({
//         name: "Mutation",
//         fields: {
//             person: {
//                 type: PersonType,
//                 args: {
//                     firstname: { type: GraphQLNonNull(GraphQLString) },
//                    lastname:{type: GraphQLNonNull(GraphQLString)} 
//                 },
//                 resolve: (source,args,context,info) => {
//                     let person = new User(args);
//                     return person.save();
//                 }
//             }
//         }
//     })
// });

app.use("/graphql", graphqlhttp({
    schema: schema,
    graphiql: true
}));
app.listen(4000, () => {console.log(`port working on 4000`)});