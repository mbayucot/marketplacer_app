import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Button,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import useCartQuantity from "../store/useCartQuantity";
import { useAuthStore } from "../store/useAuthStore";

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const { data: totalQuantity = 0, isLoading } = useCartQuantity();

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    closeMenu();
    clearAuth();
    navigate("/");
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="static" sx={{ marginBottom: "30px" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div" sx={{ marginRight: "16px" }}>
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              style={{ verticalAlign: "middle" }}
            />
          </Typography>
          <Button color="inherit" onClick={() => navigate("/products")}>
            Products
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton size="large" color="inherit" onClick={navigateToCart}>
          <Badge badgeContent={isLoading ? 0 : totalQuantity} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={openMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
