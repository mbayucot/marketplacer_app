import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import apiClient from "../services/axiosConfig";
import ProductItem from "./ProductItem.tsx";

interface Product {
  id: number;
  name: string;
  price: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get("/products");
  return data;
};

const ProductList: React.FC = () => {
  const { data, error, isLoading } = useQuery<Product[]>(
    "products",
    fetchProducts,
  );

  return (
    <Grid container spacing={3}>
      {isLoading && <CircularProgress />}
      {error && <div>Error loading products</div>}
      {data?.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductItem key={product.id} product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
