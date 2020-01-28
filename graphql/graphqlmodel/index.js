let { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
let userLogin = new GraphQLObjectType({
    name: "Login",
    fields: {
        EmailId: { type: GraphQLString },
        Password:{type: GraphQLString}
    }
  
})
let Ptype = new GraphQLObjectType({
    name: "Users",
    fields: {
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        mobileno: { type: GraphQLString },
        UserLogin:{type: userLogin}
    }
});
 
module.exports = Ptype;