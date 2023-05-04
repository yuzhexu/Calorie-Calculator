import express from "express";
import {
  addItem,
  getItems,
  clearItems,
  removeItem,
  editItem,
  getWeeklySummary,
} from "../mongodb/mongodb.js";

import { MealItem } from "../mongodb/models/MealItem.js";

export const mealRoutes = express();

/*
 * GET /meals
 * returns array of meal items
 */
mealRoutes.get("/meals", async (req, res) => {
  const { date } = req.query;
  const { userid } = req.headers;
  const meals = await getItems(MealItem, userid,date);
  return res.send(meals);
});

/*
 * POST /meals (creates new meal)
 *
 * returns success reply
 */
mealRoutes.post("/meals", async (req, res) => {
  await addItem(req.body, MealItem);
  res.send(JSON.stringify({ msg: "post successfull" }));
});

/*
 * POST /meals/clearAll (deletes all meals)
 * returns success reply
 */
mealRoutes.post("/meals/clearAll", async (req, res) => {
  await clearItems(MealItem);
  res.send(JSON.stringify({ msg: "delete all successfull" }));
});

/*
 * POST /meals/:id (deletes meal item based on id)
 *
 * returns success reply
 */
mealRoutes.post("/meals/:id", async (req, res) => {
  const { id } = req.params;
  await removeItem(id, MealItem);
  res.send(JSON.stringify({ msg: `id ${id} deleted successfully` }));
});

/*
 * POST /meals/:id (edits meal item based on id)
 *
 *returns success reply
 */
mealRoutes.post("/edit/meal", async (req, res) => {
  await editItem(req.body, MealItem);
  const { idToEdit: id } = req.body;
  res.send(JSON.stringify({ msg: `id ${id} edited successfully` }));
});

mealRoutes.get("/meals/weekly-summary", async (req, res) => {
  const { userid } = req.headers;
  const weeklySummary = await getWeeklySummary(MealItem, userid);
  return res.send(weeklySummary);
});