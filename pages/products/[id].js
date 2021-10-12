import { useState } from "react";
import Link from "next/link";
import Layout from "../../components/layout";
import { client } from "../../utils/shopify";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Product = (props) => {
  const [open, setOpen] = useState(false);

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
    window.location.reload();
  };

  return (
    <Layout menu={props.menu}>
      <div>
        <div key={`${props.product.id}`}>
          <p>{props.product.title}</p>
          <img
            src={`${props.product.images[0].src}`}
            className="productImage"
          ></img>
          <p>{props.product.description}</p>
          <button onClick={addToCart}>Add to Cart</button>
          <div>
            <Link href="/products">Back</Link>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Item Sucessfuly Added to Your Cart!
          </Alert>
        </Snackbar>
      </div>
      <style jsx>{`
        .productImage {
          max-height: 350px;
          max-width: 350px;
        }
      `}</style>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const id = query.id;
  const product = await client.product.fetch(id);

  return { props: { product: JSON.parse(JSON.stringify(product)) } };
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Product;
