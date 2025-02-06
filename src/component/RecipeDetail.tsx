import { observer } from 'mobx-react';
import { Box, Typography } from '@mui/material';
import { recipeStore } from '../stores/RecipeStore';

const RecipeDetail = observer(() => {
    const { selectedRecipe } = recipeStore;

    if (!selectedRecipe) {
        return <Box padding={2} sx={{ backgroundColor: '#FFFFFF' }}><Typography>No recipe selected</Typography></Box>; 
    }

    return (
        <Box  padding={2} flexGrow={1} width="300px" sx={{ backgroundColor: '#FFFFFF' }}>
            <Typography variant="h4" gutterBottom>{selectedRecipe.title}</Typography>
            <Typography variant="body1" paragraph>{selectedRecipe.description}</Typography>
            <Typography variant="h5" gutterBottom>Ingredients</Typography>
            <ul>
                {selectedRecipe.ingredients.map((ingredient:string, index:number) => (
                    <li key={index}><Typography variant="body2">{ingredient}</Typography></li>
                ))}
            </ul>
            <Typography variant="h5" gutterBottom>Instructions</Typography>
            <Typography variant="body1">{selectedRecipe.instructions}</Typography>
        </Box>
    );
});

export default RecipeDetail;
