import React from 'react';
import Recipes from './Recipes';
import fetch from '../../core/fetch';

const fetchRecipes = async (query, dataField) => {
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query }),
    credentials: 'include'
  });

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  const { data } = await resp.json();
  if (!data || !data[dataField]) {
    return undefined;
  }

  return data[dataField];
};

export default {
  path: '/recipes',
  async action({ user }) {
    if (user) {
      const query = `{recipes(userId:${user.id}){id,name,style}}`;
      const recipes = await fetchRecipes(query, 'recipes');
      return <Recipes recipes={recipes}/>;
    } else {
      return <div>Log in to see your recipes</div>;
    }
  }
};
