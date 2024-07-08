import React from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import apiClient from "../services/axiosConfig";

interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartData {
  products: CartProduct[];
  total: number;
  discount: number;
  totalAfterDiscount: number;
}

const fetchCart = async (): Promise<CartData> => {
  const response = await apiClient.get(`/carts`);
  return response.data;
};

const CartPage: React.FC = () => {
  const { data, error, isLoading } = useQuery<CartData>(["cart"], () =>
    fetchCart(),
  );

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <div>Error loading cart</div>}
      {data && (
        <>
          <Helmet>
            <title>Cart</title>
          </Helmet>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <List>
                {data?.products.map((product) => (
                  <ListItem
                    key={product.id}
                    sx={{
                      paddingLeft: 0,
                      boxShadow:
                        "0px 1px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)",
                      borderRadius: "5px",
                      padding: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <ListItemText
                      primary={`${product.name} - $${product.price}`}
                      secondary={`Quantity: ${product.quantity}`}
                    />
                    <ListItemSecondaryAction>
                      <Typography variant="body2">
                        ${(product.price * product.quantity).toFixed(2)}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" component="p" gutterBottom mb={2}>
                  Order Summary
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body1">
                    Subtotal ({data.summary.items_count} items)
                  </Typography>
                  <Typography variant="body1">
                    ${data.summary.subtotal}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body1">Promotion</Typography>
                  <Typography variant="body1">
                    -${data.summary.discount}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="caption" color="info">
                    {data.promotion_message}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={5}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    ${data.summary.total}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Layout>
  );
};

export default CartPage;
