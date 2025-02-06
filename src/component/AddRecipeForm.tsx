import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { UserContext } from "../context/userContext";
import { observer } from "mobx-react-lite";
import { recipeStore } from "../stores/RecipeStore";
import { RecipeSend } from "../Types/type";
import { cancelButtonStyles, registerButtonStyles } from "../styles/buttonStyles";

const schema = yup.object().shape({
  title: yup.string().required("שדה זה נדרש"),
  description: yup.string().required("שדה זה נדרש"),
  ingredients: yup.string().required("שדה זה נדרש"),
  instructions: yup.string().required("שדה זה נדרש"),
});

type Inputs = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
};

const AddRecipeForm = observer(({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { user } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
        const recipeData: RecipeSend = {
            authorId: user.id.toString(), 
            products: "", 
            title: data.title,
            description: data.description,
            ingredients: data.ingredients.split(",").map(ingredient => ingredient.trim()), 
            instructions: data.instructions,
        };
        await recipeStore.addRecipe(recipeData);
        onClose(); 
    } catch (error) {
        if (error instanceof Error) {
            alert(`שגיאה: ${error.message}`);
        } else {
            alert("שגיאה לא ידועה");
        }
    }
};
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>הוסף מתכון</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="שם המתכון"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
          />
          <TextField
            label="תיאור"
            fullWidth
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
          />
          <TextField
            label="מרכיבים (עם פסיקים)"
            fullWidth
            {...register("ingredients")}
            error={!!errors.ingredients}
            helperText={errors.ingredients ? errors.ingredients.message : ""}
          />
          <TextField
            label="הוראות הכנה"
            fullWidth
            multiline
            rows={4}
            {...register("instructions")}
            error={!!errors.instructions}
            helperText={errors.instructions ? errors.instructions.message : ""}
          />
          <DialogActions>
            <Button onClick={onClose} sx={cancelButtonStyles}>ביטול</Button>
            <Button type="submit" sx={registerButtonStyles}>שמור</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
});
export default AddRecipeForm;

