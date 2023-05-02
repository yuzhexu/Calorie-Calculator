import React, { useContext } from "react";

import { MealItemsContext } from "../state/MealItems.module";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { MealItem } from "./MealItem/MealItem";

/*
 * MealItems (functional component) returns multiple MealItem components
 * and passes down the delete and edit handlers to them
 */


export const MealItems = () => {
  const { meals } = useContext(MealItemsContext);

  let totalCals = 0;
  let totalP = 0;
  meals.map((i) => (totalCals += i.mealCals));
  meals.map((i) => (totalP += i.mealProtein));

  if (meals.length === 0) {
    return;
  } else {
    return (
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} md={7}>
          <Typography variant="h4" component="div">
            Meal Items:
          </Typography>
        </Grid>
        {meals.map((i) => {
          return <MealItem item={i} key={i._id} />;
        })}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" component="div">
            Total Calories: {totalCals.toFixed(2)}
            <br />({totalP.toFixed(2)} g Protein)
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
