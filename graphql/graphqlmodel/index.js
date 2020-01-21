let { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

let Ptype = new GraphQLObjectType({
    name: "Users",
    fields: {
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        mobileno: { type: GraphQLString },
        UserLogin: {
            EmailId: { type: GraphQLString },
            Password: {type: GraphQLString}
        }
    }
});

module.exports = Ptype;