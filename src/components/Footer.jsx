import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Link,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box
      sx={{
        width: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "3px solid #1769aa",
        marginTop: "20px",
        paddingTop: "10px",
      }}
    >
      <Typography
        sx={{ marginLeft: "20px", color: "#1769aa", fontWeight: "bold" }}
        variant="body1"
      >
        Metehan KANTEMİR
      </Typography>
      <Box mr="15px" >
       <Link sx={{padding:"10px"}} href="https://github.com/mkantemir" target="_blank">
          <GitHubIcon />
        </Link>
        <Link sx={{padding:"10px"}} href="https://www.linkedin.com/in/metehankantemir/" target="_blank">
          <LinkedInIcon />
        </Link>
        <Link sx={{padding:"10px"}} href="mailto:metehankantemir@gmail.com" target="_blank">
          <EmailIcon  />
        </Link>
      </Box>
  
    </Box>
  );
};

export default Footer;
