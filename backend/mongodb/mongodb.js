import { config } from "dotenv";
import mongoose from "mongoose";
import moment from "moment";
const { mongoURI } = config().parsed;

//opens DB connection
export const connectDB = () => {
  try {
    mongoose.connect(mongoURI);
    
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log(err);
  }
};
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
});

//adds item to the Meals table

export const addItem = async (payload, model) => {
  connectDB();
  const { mealItem, mealQty, mealCals, mealProtein, userId, date } = payload;
  const newMealItem = new model({
    mealItem,
    mealQty,
    mealCals,
    mealProtein,
    userId,
    date,
  });
  try {
    await newMealItem.save();
  } catch (err) {
    console.log(err);
  }
};

/*
 * gets meal items from DB
 */
export const getItems = async (model, userId, date) => {
  connectDB();
  try {
    const meals = await model.find({ userId, date });
    return meals;
  } catch (err) {
    console.log(err);
  }
};


/*
 * clears meal items from DB
 */
export const clearItems = async (model) => {
  connectDB();
  try {
    await model.deleteMany({});
  } catch (err) {
    console.log(err);
  }
};

/*
 * removes 1 meal item from DB
 */
export const removeItem = async (id, model) => {
  connectDB();
  try {
    await model.deleteOne({ _id: id });
  } catch (err) {
    console.log(err);
  }
};
/*
 * logs user in
 *
 * params:
 * {
 *  payload (contains user credentials)
 *  model: mongoose model (User)
 * }
 */
export const logIn = async (credentials, model) => {
  try { 
    const { email, password } = credentials;
    const usr = await model.findOne({ email }).exec();
    if (usr) {
      if (usr.password === password) {
        return { token: "someTokenHere", userId: usr._id };
      } else {
        return { msg: "bad credentials" };
      }
    } else {
      return { msg: "bad credentials" };
    }
  } catch (err) {
    console.log(err);
    return 'someErr';
  }
};


    


/*
 * signs user up
 */
export const signUp = async (credentials, model) => {
  const { email, password } = credentials;
  const userId =
    Math.random().toString(12).substring(2, 17) +
    Math.random().toString(12).substring(2, 17);

  const newUser = new model({
    userId,
    email,
    password,
  });

  try {
    await newUser.save();
    console.log(`signing user ${JSON.stringify(credentials)} up...`);
    return { msg: "user signed up successfully" };
  } catch (err) {
    console.log(err.code, typeof err.code);
    if (err.code === 11000) {
      return {
        msg: "duplicate entry a user with this email address already exists",
      };
    } else {
      console.log(err);
      return;
    }
  }
};

/*
 * edits 1 meal item from DB
 */
export const editItem = async (payload, model) => {
  connectDB();
  const { idToEdit: _id, mealItem, mealQty, mealCals, mealProtein} = payload;
  try {
    await model.findOneAndUpdate(
      { _id},
      { mealItem, mealQty, mealCals, mealProtein },
      {new: true}
    );
  } catch (err) {
    console.log(err);
  }
};

/*
 * weekly calorie summary
 */
export const getWeeklySummary = async (model, userId) => {
  connectDB();

  const startOfWeek = moment().startOf("week").toISOString().substring(0, 10);
  const endOfWeek = moment().endOf("week").toISOString().substring(0, 10);

  console.log("Start of week:", startOfWeek);
  console.log("End of week:", endOfWeek);
  try {
    const meals = await model.find({
      userId,
      date: { $gte: startOfWeek, $lte: endOfWeek },
    });
    console.log("Meals:", meals);

    const dailyTotals = Array(7).fill(0);

    meals.forEach((meal) => {
      const dayOfWeek = moment(meal.date).day();
      dailyTotals[dayOfWeek] += meal.mealCals;
    });
    console.log("Daily totals:", dailyTotals);
    return dailyTotals;

  } catch (err) {
    console.log(err);
  }
};
    