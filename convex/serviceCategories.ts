import { mutation, query } from "./_generated/server";

type Disco = {
  name: string
  states: string[]
}

export const getByState = query({
  handler: async ({ db }, {state}:{state: string}) => {
    const discos = await db.query("discos").collect();
    const categories = await db.query("serviceCategories").collect();
    const possibilities = discos.filter((disco: Disco)=> disco.states.includes(state))
    return categories.filter(category=> possibilities.find(possibility=> possibility.name == category.name))
  },
});