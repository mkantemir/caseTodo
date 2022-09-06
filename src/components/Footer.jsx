import { Button, Link, Typography } from "@mui/material";
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
      <Typography sx={{marginLeft:"20px", color:"#1769aa", fontWeight:"bold"}} variant="body1">Metehan KANTEMİR</Typography>
      <Box >
        <Button >
          <GitHubIcon />
        </Button>
        <Button>
          <LinkedInIcon />
        </Button>
        <Button>
          <EmailIcon  />
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
