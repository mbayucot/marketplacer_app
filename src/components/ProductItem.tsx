import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  CardActionArea,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/axiosConfig";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product: { id, name, price },
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="140"
          image={"https://via.placeholder.com/150"}
          alt={name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ minHeight: "40px" }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginBottom: "20px" }}
          >
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
