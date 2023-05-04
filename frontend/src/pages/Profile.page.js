import React from "react";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { Navigation } from "../components/Navigation/Navigation";

/*
 * @Profile Page (contents of the page)
 *
 */

export const ProfilePage = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.defaultColor",
        p: 0,
        m: -1,
        height: "auto",
      }}
    >
      <div className="App">
        <Navigation />
        <Typography variant="h3" gutterBottom align="center" color="white">
          Profile Page
          ah oh didn't finish 
        </Typography>
      </div>
    </Box>
  );
};
