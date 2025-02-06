import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { recipeStore } from '../stores/RecipeStore';
import RecipeDetail from './RecipeDetail';

const Recipes = observer(() => {
    useEffect(() => {
        recipeStore.fetchRecipes();
    }, []);

    return (
        <Box display="flex" padding={2} sx={{ backgroundColor: '#F5F5F5',minHeight: `calc(100vh - 17vh)`, overflow: 'hidden' }}>
        <Box width="25%" borderRight={1} borderColor="divider">
        <List>
                    {recipeStore.recipes.map(recipe => (
                        <ListItem 
                            onClick={() => recipeStore.selectRecipe(recipe.id)} 
                            key={recipe.id} 
                            component="div" 
                            disableGutters
                            sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}
                        >
                            <ListItemText primary={recipe.title} sx={{ padding: 1 }} />
                        </ListItem>
                    ))}
                </List>
        </Box>
        <RecipeDetail />
    </Box>
    );
});

export default Recipes;
