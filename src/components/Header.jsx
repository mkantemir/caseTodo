import { AccountCircle } from "@mui/icons-material";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Header = ({name, setName}) => {
 
  const addName = () => {
    setName(localStorage.getItem("name"));
  };
  return (
    <Box
      sx={{
        width: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "3px solid #1769aa",
        marginBottom: "10px",
      }}
    >
      <Typography textAlign="center" variant="h5" sx={{ color: "#1769aa" }}>
        ToDo App w/ React & Mui
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ margin: "20px 0", width: "150px" }}
          label="Enter Your Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle sx={{ color: "#1769aa" }} />
              </InputAdornment>
            ),
          }}
          onChange={(e) =>
            localStorage.setItem("name", e.target.value)
          }
          variant="standard"
        />
        <Button
          variant="contained"
          sx={{
            margin: " 0 10px",
            height: "30px",
            fontSize: "12px",
            textTransform: "none",
          }}
          onClick={addName}
        >
          Enter
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
