import { createTheme } from "@mui/material/styles";
import {
  green,
  purple,
  red,
  deepOrange,
  grey,
  indigo,
  blue,
} from "@mui/material/colors";

/*
 * getTheme (function)
 * returns Theme object
 */

export const getTheme = ({ mode }) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            background: {
              defaultColor: blue[200],
            },
            primary: {
              main: green[500],
            },
            appBarColor: {
              main: blue[400],
            },
            submitBtnColor: {
              main: blue[300],
            },
            secondary: {
              main: purple[500],
            },
            error: {
              main: red[400],
            },
            toggleSwitch: {
              main: grey[800],
            },
            outlineColor: {
              main: grey[50],
            },
          }
        : {
            // palette values for dark mode
            background: {
              paper: `${indigo[800]}!important`,
              defaultColor: indigo[200],
            },
            primary: {
              main: deepOrange[800],
            },
            appBarColor: {
              main: `${indigo[600]}!important`,
            },
            submitBtnColor: {
              main: `${indigo[300]}!important`,
            },
            secondary: {
              main: grey[400],
            },
            error: {
              main: red[700],
            },
            toggleSwitch: {
              main: grey[800],
            },
            outlineColor: {
              main: grey[50],
            },
          }),
    },
  });
};
