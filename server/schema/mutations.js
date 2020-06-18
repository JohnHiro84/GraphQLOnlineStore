const graphql = require("graphql");
const { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");

const Category = mongoose.model("categories");
const CategoryType = require("./types/category_type");

const Product = mongoose.model("products");
const ProductType = require("./types/product_type");
const AuthService = require("../services/auth");

const User = mongoose.model("users");
const UserType = require("./types/user_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
      type: CategoryType,
      args:{
        name: { type: GraphQLString }
      },
      resolve(_, { name }){
        return new Category({ name }).save();
      }
    },
    // deleteCategory: {
    //   type: CategoryType,
    //   args:{
    //     _id: { type: GraphQLID }
    //   },
    //   resolve(_, { _id }){
    //     return Category.remove({ _id });
    //   }
    // },

    //thier solution
    deleteCategory: {
      type: CategoryType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Category.remove({ _id });
      }
    },
    newProduct: {
      type: ProductType,
      args:{
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        weight: { type: GraphQLInt }

      },
      async resolve(_, { name, description, weight }, context){



        const validUser = await AuthService.verifyUser({token: context.token});
        // console.log("ValidUser: " + validUser);
        // console.log("adsfafafadfssssssssssssssssssssssssssssssss")
        if(validUser.loggedIn){
          return new Product({ name, description, weight }).save();

        } else {
          throw new Error("Sorry, you need to be logged in to create a product.");
        }

      }
    },
    // newProduct: {
    //   type: ProductType,
    //   args:{
    //     name: { type: GraphQLString },
    //     description: { type: GraphQLString },
    //     weight: { type: GraphQLInt }
    //
    //   },
    //   resolve(_, { name, description, weight }){
    //     return new Product({ name, description, weight }).save();
    //   }
    // },
    deleteProduct: {
      type: ProductType,
      args:{
        _id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, { _id }){
        return Product.remove({ _id: _id });
      }
    },

    updateProductCategory: {
      type: ProductType,
      args: {
        productId: { type: GraphQLID },
        categoryId: { type: GraphQLID }
      },
      resolve(_, { productId, categoryId }){
        return Product.updateProductCategory(productId, categoryId);
      }
    },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString}
      },
      resolve(_, args){
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args){
        return AuthService.verifyUser(args);
      }
    }
  }
});

module.exports = mutation;
