import { NowRequest, NowResponse } from "@vercel/node";
import { ApolloServer, gql, IResolvers } from "apollo-server-micro";
//@ts-nocheck
import demons from "../data/demons.json";

const typeDefs = gql`
  type Affinities {
    ailment: Int
    elec: Int
    fire: Int
    phys: Int
    support: Int
    ice: Int
    force: Int
    gun: Int
    dark: Int
    recovery: Int
    light: Int
    almighty: Int
  }

  type Ailments {
    bind: String
    mute: String
    panic: String
    sleep: String
    charm: String
    poison: String
    sick: String
    daze: String
  }

  type Resists {
    elec: String
    fire: String
    dark: String
    ice: String
    force: String
    gun: String
    light: String
    phys: String
  }

  type Skill {
    name: String!
    level: Int!
  }

  type Stats {
    ag: Int!
    dx: Int!
    hp: Int!
    lu: Int!
    ma: Int!
    mp: Int!
    st: Int!
  }

  type Demon {
    name: String!
    attack: String
    affinities: Affinities!
    ailments: Ailments
    lvl: Int!
    race: String!
    resists: Resists!
    skills: [Skill!]!
    stats: Stats!
  }
  input DemonFilter {
    name: String
    lvl: Int
    race: String
  }
  input Sort {
    key: String!
    order: String
  }
  type Query {
    demons(sort: Sort, filters: DemonFilter): [Demon]
  }
`;

const from = (filters) => (value) =>
  filters ? Object.keys(filters).every((f) => value[f] === filters[f]) : true;

const sort = (sort) => (a, b) => {
  if (!sort) {
    return 0;
  }
  let comparison;
  if (a[sort.key] < b[sort.key]) {
    comparison = -1;
  } else if (a[sort.key] > b[sort.key]) {
    comparison = 1;
  } else {
    comparison = 0;
  }
  return sort.order === "DESC" ? comparison * -1 : comparison;
};

const resolvers = {
  Query: {
    demons: (_, args) =>
      demons.filter(from(args.filters)).sort(sort(args.sort)),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

module.exports = (req: NowRequest, res: NowResponse) => {
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    server.createHandler({ path: "/api" })(req, res);
  }
};
