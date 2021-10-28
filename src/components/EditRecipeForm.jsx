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

    console.log("recipe id", recipeId)

    const [recipeToEdit, setRecipeToEdit] = useState(foundRecipe)
    const [title, setTitle] = useState(recipeToEdit.title);
    const [description, setDescription] = useState(recipeToEdit.description);
    const [prepTime, setPrepTime] = useState(recipeToEdit.prepTime);
    const [cookingTime, setCookingTime] = useState(recipeToEdit.cookingTime);
    const [name, setName] = useState(recipeToEdit.name);

    const history = useHistory();

    const handleTitle = (event) => {
        event.preventDefault()
        setTitle(event.target.value);
    };

    const handleDescription = (event) => {
        event.preventDefault()
        setDescription(event.target.value);
    };

    const handleprepTime = (event) => {
        event.preventDefault()
        setPrepTime(event.target.value);
    };

    const handlecookingTime = (event) => {
        event.preventDefault()
        setCookingTime(event.target.value);
    };

    const handleName = (event) => {
        event.preventDefault()
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        const recipeToUpdate = {
            title,
            description,
            prepTime: parseInt(prepTime, 10),
            cookingTime: parseInt(cookingTime, 10),
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

        fetch(`http://localhost:3030/recipes/${recipes.id}`, fetchOptions)
            .then((res) => res.json())
            .then((updatedRecipe) => {

                const updatedRecipes = recipes.map((recipe) => {
                    if (updatedRecipe.id === recipe.id) {
                        return updatedRecipe;
                    } else {
                        return recipe;
                    }
                });

                setRecipes(updatedRecipes);
                history.push("/recipes")
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    className=""
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleTitle}
                    value={title}
                />
                <div className="">
                    <label for="description">Description:</label>
                </div>
                <input
                    className=""
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleDescription}
                    value={description}
                />
                <div className="">
                    <label for="prepTime">PrepTime:</label>
                </div>
                <input
                    className=""
                    id="prepTime"
                    name="prepTime"
                    type="number"
                    onChange={handleprepTime}
                    value={prepTime}
                />
                <div className="">
                    <label for="cookingTime">CookingTime:</label>
                </div>
                <input
                    className=""
                    id="cookingTime"
                    name="cookingTime"
                    type="number"
                    onChange={handlecookingTime}
                    value={cookingTime}
                />
                <div className="">
                    <label for="name">Ingredient:</label>
                </div>
                <input
                    className=""
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleName}
                    value={name}
                />
                <button type="submit">Edit</button>
            </form>
        </>
    )
}