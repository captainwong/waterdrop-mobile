/* eslint-disable import/no-extraneous-dependencies */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { faker } from '@faker-js/faker/locale/zh_CN'

const typeDefs = `#graphql
type UserTypeDto {
  """用户id"""
  id: Float!

  """姓名"""
  name: String!

  """描述"""
  desc: String!

  """手机号码"""
  tel: String!

  """密码"""
  password: String!

  """账户信息"""
  account: String!
}

type Query {
  """Find user by id"""
  findOne(id: Float!): UserTypeDto!
}

type Mutation {
  """Create user"""
  createUser(params: UserInputDto!): Boolean!

  """Update user by id"""
  updateUser(id: Float!, params: UserInputDto!): Boolean!

  """Delete user by id"""
  deleteUser(id: Float!): Boolean!
}

input UserInputDto {
  """姓名"""
  name: String!

  """描述"""
  desc: String!

  """手机号码"""
  tel: String!

  """密码"""
  password: String!

  """账户信息"""
  account: String!
}
`;

const resolvers = {
  UserTypeDto: {
    name: () => faker.person.fullName(),
  },
};


const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Hello',
};


const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
});

startStandaloneServer(server, { listen: { port: 8888 } });