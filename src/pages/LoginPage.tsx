import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { Helmet } from "react-helmet";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Container component="main">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "25vh",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;
