import React from "react";
import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import ProductList from "../components/ProductList";

const ProductListingPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Typography variant="h4" component="h1" gutterBottom>
        Product Listing
      </Typography>
      <ProductList />
    </Layout>
  );
};

export default ProductListingPage;
