import React from "react";
import Cart from "./cart";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button href="/">Home</Button>
        <Button href="/products">Store</Button>
        <Cart />
        <Button href="https://www.ebay.com/str/btcomics">Ebay</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
