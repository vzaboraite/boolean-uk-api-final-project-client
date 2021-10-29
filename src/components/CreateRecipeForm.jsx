import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const CreateRecipeForm = (props) => {
  const { recipes, setRecipes } = props;
  const { userId } = useParams();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [name, setName] = useState([]);

  console.log("Inside CreateRecipeForm State: ", {
    recipes: {
      title,
      description,
      prepTime: parseInt(prepTime, 10),
      cookingTime: parseInt(cookingTime, 10),
      name,
    },
  });

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
    event.preventDefault();
    // data: {
    //   title: req.body.title,
    //   description: req.body.description,
    //   prepTime: req.body.prepTime,
    //   cookingTime: req.body.cookingTime,
    //   user: {
    //     connect: { id: req.body.userId },
    //   },
    //   ingredients: {
    //     create: [
    //       {
    //         name: req.body.ingredients.name,
    //       },
    //     ],
    //   },
    // },
    const recipeToCreate = {
      title,
      description,
      prepTime: parseInt(prepTime, 10),
      cookingTime: parseInt(cookingTime, 10),
      userId: parseInt(userId),
      ingredients: [
        {
          name: "",
        },
      ],
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeToCreate),
    };
    fetch("http://localhost:3030/recipes", fetchOptions)
      .then((res) => res.json())
      .then((newRecipeData) => {
        console.log("Recipe Data TO POST: ", newRecipeData);
        history.push("/recipes");

        setRecipes([...recipes, newRecipeData.data]);
      });
  };
  return (
    <form className="" onSubmit={handleSubmit}>
      <h1>Recipe Form</h1>
      <div className="">
        <label for="title">Title:</label>
      </div>
      <input
        className=""
        id="title"
        name="title"
        type="text"
        placeholder="Enter......"
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
      <div className="">
        <div>
          <button className="" type="submit">
            Create
          </button>
        </div>
        <button className="" type="reset">
          Reset
        </button>
      </div>
    </form>
  );
};

export default CreateRecipeForm;
