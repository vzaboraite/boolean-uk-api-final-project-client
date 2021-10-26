import React from "react";
import { useState } from "react";

const CreateRecipeForm = (props) => {
  const { recipes, setRecipes } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  console.log("Inside CreateRecipeForm State: ", {
    recipes: {
      title,
      description,
      prepTime: parseInt(prepTime, 10),
      cookingTime: parseInt(cookingTime, 10),

    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const recipeToCreate = {
      title,
      description,
      prepTime: parseInt(prepTime, 10),
      cookingTime: parseInt(cookingTime, 10),
    //   userId: 1,
    //   ingredients:[]
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
        console.log("Recipe Data TO POST: ", { newRecipeData });

        const recipeToAdd = {
          ...newRecipeData,
        };
        setRecipes([...recipeToAdd]);
      });
  };

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
        type="text"
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
        type="text"
        onChange={handlecookingTime}
        value={cookingTime}
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
