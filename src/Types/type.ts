
export type TwoFuncProps = {
    onOneClick: () => void;
    onTwoClick: () => void;
}

export type UseStateProps = {
    open: boolean;
    onClose: (value: boolean) => void;
};

export type RecipeGet = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
};

export type RecipeSend = {
  authorId: string; 
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  products: string;
};