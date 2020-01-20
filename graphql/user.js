let { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = require("graphql");
let PersonType = require("./graphqlmodel/index");
let User = require("../model/index");
let Fetchuser = new GraphQLObjectType({
    name: "fetchusers",
    fields: {
        people:{
        type: GraphQLList(PersonType),
            resolve:(source, args, context,info) =>{
                return User.find();
            }
        },
        user: {
            type: PersonType,
            args: {
                id: {type: GraphQLID }  
            },
            resolve: (source, args, context, info) => {
                return User.findById(args.id);
            }
        }
    }
});

let createUser = new GraphQLObjectType({
    name: "createuser",
    fields: {
        user: {
            type: PersonType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString }
            },
            resolve: (source, args, context, info) => {
                let data = new User(args);
                return data.save();
            }
        }
    }
});

module.exports = { Fetchuser, createUser };
