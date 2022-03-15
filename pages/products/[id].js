import { useState } from "react";
import Layout from "../../components/layout";
import { client } from "../../utils/shopify";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useRouter } from "next/router";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "350px",
  maxHeight: "350px",
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Product = (props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addToCart = async () => {
    const storage = window.localStorage;
    let checkoutId = storage.getItem("checkoutId");
    if (!checkoutId) {
      const checkout = await client.checkout.create();
      checkoutId = checkout.id;
      storage.setItem("checkoutId", checkoutId);
    }
    const cart = await client.checkout.addLineItems(checkoutId, [
      {
        variantId: props.product.variants[0].id,
        quantity: 1,
      },
    ]);
    storage.setItem("cart", JSON.stringify(cart));
    handleClick();
    await delay(2000);
    router.push("/products");
  };

  return (
    <Layout menu={props.menu}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ mt: 5 }}
      >
        <Grid item xs={6}>
          {props.product.images.map((image) => {
            return <Img src={image.src}></Img>;
          })}
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{ typography: { xs: "h5", sm: "h4" }, textAlign: "center" }}
            component="div"
            gutterBottom
          >
            {props.product.title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              textAlign: "center",
              typography: { xs: "body1", sm: "h6" },
            }}
          >
            {props.product.description}
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={addToCart} variant="contained" size="large">
            Add to Cart
          </Button>
        </Grid>
        <Grid item>
          <Button href="/products" sx={{ mb: 3 }}>
            Back to Shop
          </Button>
        </Grid>
      </Grid>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Item Sucessfuly Added to Your Cart!
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const id = query.id;
  const product = await client.product.fetch(id);

  return { props: { product: JSON.parse(JSON.stringify(product)) } };
}

export default Product;
