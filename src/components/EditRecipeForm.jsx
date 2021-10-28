import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function EditRecipeForm(props) {
    const { recipes, setRecipes } = props;

    const { recipeId } = useParams();
    const foundRecipe = recipes.find((recipe) => {
        console.log({ recipe });
        console.log({ id: recipe.id })
        console.log(recipe.id === parseInt(recipeId))
        return recipe.id === parseInt(recipeId)
    })

    const [recipeToEdit, setRecipeToEdit] = useState(foundRecipe)
    const [title, setTitle] = useState(recipeToEdit.title);
    const [description, setDescription] = useState(recipeToEdit.description);
    const [prepTime, setPrepTime] = useState(recipeToEdit.prepTime);
    const [cookingTime, setCookingTime] = useState(recipeToEdit.cookingTime);
    const [name, setName] = useState(recipeToEdit.name);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleprepTime = (event) => {
        setPrepTime(event.target.value);
    };

    const handlecookingTime = (event) => {
        setCookingTime(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        const recipeToUpdate = {
            title,
            description,
            prepTime: parseInt(prepTime, 10),
            cookingTime: parseInt(cookingTime, 10),
            userId: 1,
            ingredients: [
                {
                    name: "",
                },
            ],
        }

        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeToUpdate),
        };

        fetch(`http://localhost:3030/recipes/${recipeId}`, fetchOptions)
            .then((res) => res.json())
            .then((updatedRecipe) => {

                const updatedRecipes = recipes.map((recipe) => {
                    if (updatedRecipe.id === recipeId) {
                        return updatedRecipe;
                    } else {
                        return recipe;
                    }
                });

                setRecipes(updatedRecipes);
            })
    }

    return (
        <>

        </>
    )
}