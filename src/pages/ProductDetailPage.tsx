import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { useStore } from "../store/useStore";
import apiClient from "../services/axiosConfig";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const fetchProduct = async (id: number): Promise<Product> => {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
};

interface AddProductResponse {
  product: Product;
}

const ProductDetailPage: React.FC = () => {
  const addProductToCart = useStore((state) => state.addProductToCart);
  const { id } = useParams<{ id: string }>();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const queryClient = useQueryClient();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery<Product>(["product", id], () => fetchProduct(Number(id)), {
    enabled: !!id,
  });

  const mutation = useMutation<AddProductResponse, Error, number>(
    async (productId: number) => {
      const response = await apiClient.post("/carts/add_product", {
        product_id: productId,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        addProductToCart(data.product);
        queryClient.invalidateQueries("cartQuantity");
        setSnackbarMessage("Product added to cart successfully!");
        setIsSnackbarOpen(true);
      },
      onError: (error) => {
        setSnackbarMessage(
          error.message ||
            "An error occurred while adding the product to the cart",
        );
        setIsSnackbarOpen(true);
      },
    },
  );

  const handleAddToCart = () => {
    mutation.mutate(product.id);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Layout>
      {isLoading && <CircularProgress />}
      {error && <div>Error loading product</div>}
      {product && (
        <>
          <Helmet>
            <title>{product.name}</title>
            <meta
              name="description"
              content={`Buy ${product.name} for just $${product.price}`}
            />
          </Helmet>
          <Grid container spacing={2}>
            <Grid item>
              <img
                src={"https://via.placeholder.com/300"}
                alt={product.name}
                width="300"
              />
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h1" gutterBottom>
                {product?.name}
              </Typography>
              <Typography variant="h6" component="p" gutterBottom>
                ${product.price}
              </Typography>
              <Box sx={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleAddToCart}
                  disabled={mutation.isLoading}
                  startIcon={
                    mutation.isLoading ? <CircularProgress size={20} /> : null
                  }
                >
                  {mutation.isLoading ? "Adding..." : "Add to Cart"}
                </Button>
              </Box>
            </Grid>
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={mutation.isError ? "error" : "success"}
                sx={{ width: "100%" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </>
      )}
    </Layout>
  );
};

export default ProductDetailPage;
