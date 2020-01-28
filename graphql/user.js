let { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString,GraphQLNonNull,GraphQLInputObjectType} = require("graphql");
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
                if (!args.id) { throw new Error("id not found") };
                return User.findById(args.id);
            }
        }
    }
});

let Login = new GraphQLInputObjectType({
    name: "UserLogin",
    fields: () => ({
        EmailId: { type: GraphQLString },
        Password: {type: GraphQLString}
    })
});

let createUser = new GraphQLObjectType({
    name: "createuser",
    fields: () => ({
        user: {
            type: PersonType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                mobileno: { type: GraphQLString },
                UserLogin: { 
                   type: new GraphQLNonNull(Login)
                }
            },
            resolve: async (source, args, context, info) => {
                console.log(args);
                let user = await User.findOne({ "UserLogin.EmailId": args.UserLogin.EmailId });
                if (user) { throw new Error("user already in database") };
                let data = new User(args);
                return await data.save();
            }
        },

        auth: {
            type: PersonType,
            args: {
                UserLogin:{type: new GraphQLNonNull(Login)}
            },
            resolve: async (parentvalue, args, context) => {
                let user = await User.findOne({"UserLogin.EmailId": args.UserLogin.EmailId });
                if (!user) { throw new Error("invalid email id") };
                let password = await User.findOne({ "UserLogin.Password": args.UserLogin.Password });
                if (!password) { throw new Error("invalid password") };
                return user;
            }
    
        },
        updateuser: {
            type: PersonType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)},
                firstname: { type: GraphQLNonNull(GraphQLString) },
                lastname: { type: GraphQLNonNull(GraphQLString) },
                mobileno: { type: GraphQLNonNull(GraphQLString) },
                    EmailId: { type: GraphQLString },
                    Password: {type: GraphQLString}
            },
            resolve: async (source, args, context, info) => {
                let data = await User.findById(arg.id);
                if (!data) { throw new Error("invalid user id") };
               return data.update(args);
            }
        }, 
        removeuser: {
            type: PersonType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (source, args, context, info) => {
                let data = User.findById(arg.id);
                if (!data) { throw new Error("invalid user id") };
                return data.findOneAndRemove(data);
            }
        }
    })
});

module.exports = { Fetchuser, createUser };


/******
 * 
 * one type can not use another type thats why make objecttype should be new GraphQLInputObjectType for nested schema
 * 
 */