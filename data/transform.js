const demons = require("./demons.json");

const transform = Object.keys(demons).map((name) => ({
  name,
  ...demons[name],
  skills: Object.keys(demons[name].skills).map((skillName) => ({
    name: skillName,
    level: demons[name].skills[skillName],
  })),
}));

console.log(JSON.stringify(transform));
