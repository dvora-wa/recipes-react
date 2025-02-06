import { makeAutoObservable } from "mobx";
import axios from "axios";
import { RecipeGet, RecipeSend } from "../Types/type";

class RecipeStore {
    recipes: RecipeGet[] = [];
    selectedRecipe: RecipeGet | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/recipes');
            this.recipes = response.data;
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    selectRecipe = (id: number) => {
        this.selectedRecipe = this.recipes.find(recipe => recipe.id === id) || null;
    };

    addRecipe = async (recipeData: RecipeSend) => {
        const { title, description, ingredients, instructions, products, authorId } = recipeData;

        try {
            const response = await axios.post('http://localhost:3000/api/recipes', {
                title,
                description,
                products: products || "",
                ingredients,
                instructions
            }, {
                headers: {
                    'user-id': authorId
                }
            });
            this.recipes.push(response.data.recipe);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || "שגיאה לא ידועה");
            } else {
                console.error("Error adding recipe:", error);
                throw new Error("שגיאה לא ידועה");
            }
        }
    };
}

export const recipeStore = new RecipeStore();
