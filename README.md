# megaten-api
A REST/GraphQL API for MegaTen games

## GraphQL
The GraphQL playground is located there : https://megaten-api.now.sh/api

You can try to run a query like :
```graphql
{
  demons {
    name
    lvl
    skills {
      skillName:name
    }
  }
}
```
This one will return all demons along with their names, levels and a list of their skills containing **skillName** as their name.
