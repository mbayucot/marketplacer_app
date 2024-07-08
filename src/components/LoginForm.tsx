import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Box, Alert, Snackbar } from "@mui/material";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import apiClient from "../services/axiosConfig";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginResponse {
  headers: {
    authorization: string;
    [key: string]: string;
  };
  data: any;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const setToken = useAuthStore((state) => state.setToken);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation(
    async (data: LoginFormInputs): Promise<AxiosResponse<LoginResponse>> => {
      const response = await apiClient.post<LoginResponse>("/login", {
        user: data,
      });
      return response;
    },
    {
      onSuccess: (response) => {
        const authorizationHeader = response.headers.authorization;
        if (authorizationHeader) {
          setToken(authorizationHeader);
          navigate("/products");
        } else {
          setOpenSnackbar(true);
        }
      },
      onError: () => {
        setOpenSnackbar(true);
      },
    },
  );

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    mutation.mutate(data);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        {...register("email")}
        label="Email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
      />
      <TextField
        {...register("password")}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Logging in..." : "Login"}
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid email or password
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
