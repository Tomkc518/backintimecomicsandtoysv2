import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../utils/shopify";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const Cart = () => {
  const router = useRouter();

  const [state, setState] = useState(false);
  const [quantityState, setQuantityState] = useState([]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  useEffect(() => {
    const storage = window.localStorage;
    const cart = JSON.parse(storage.getItem("cart"));
    if (cart) {
      cart.lineItems.forEach((lineItem) => {
        setQuantityState((quantityState) => [
          ...quantityState,
          {
            id: lineItem.id,
            price: lineItem.variant.price,
            title: lineItem.title,
            img: lineItem.variant.image.src,
            qty: lineItem.quantity,
          },
        ]);
      });
    }
  }, []);

  const cartQuantityOnChange = async (event) => {
    event.preventDefault();

    const updatedCart = [...quantityState];
    updatedCart[event.target.dataset.idx][event.target.className] =
      event.target.value;
    setQuantityState(updatedCart);
  };

  const updateCartQuantities = async (event) => {
    event.preventDefault();
    const storage = window.localStorage;
    let checkoutId = storage.getItem("checkoutId");
    const updatedQuantities = quantityState.map((lineItem) => {
      return {
        id: lineItem.id,
        quantity: parseInt(lineItem.qty),
      };
    });
    const cart = await client.checkout.updateLineItems(
      checkoutId,
      updatedQuantities
    );
    storage.setItem("cart", JSON.stringify(cart));
  };

  const checkout = (event) => {
    event.preventDefault();
    const storage = window.localStorage;
    const cart = JSON.parse(storage.getItem("cart"));
    router.replace(cart.webUrl);
    storage.removeItem("cart");
    storage.removeItem("checkoutId");
  };

  const viewCart = () => {
    if (quantityState.length > 0) {
      console.log("quantityState", quantityState);
      return (
        <Grid
          container
          sx={{ width: 300 }}
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          {quantityState.map((lineItem, idx) => {
            return (
              <Grid
                container
                item
                key={lineItem.title}
                justifyContent="center"
                direction="column"
                alignItems="center"
                sx={{ mt: 3 }}
              >
                <Grid item>
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                  >{`${lineItem.title}`}</Typography>
                </Grid>
                <Grid item>
                  <img
                    src={`${lineItem.img}`}
                    height="100px"
                    width="100px"
                  ></img>
                </Grid>
                <Grid item>
                  <Typography>Quantity: {lineItem.qty}</Typography>
                </Grid>

                {/* <input
                      id={`${lineItem.id}`}
                      name={`${lineItem.id}`}
                      type="number"
                      value={lineItem.qty}
                      data-idx={idx}
                      onChange={cartQuantityOnChange}
                      className="qty"
                    /> */}
                <Grid item>
                  <Typography>
                    {`SubTotal Price: $${Number(
                      lineItem.price * lineItem.qty
                    ).toFixed(2)}`}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
          {/* <button onClick={updateCartQuantities}>Update Quantities</button> */}
          <Grid item sx={{ mt: 3 }}>
            <Button onClick={checkout} variant="contained">
              Checkout
            </Button>
          </Grid>
        </Grid>
      );
    }

    return <Typography>Your Cart is Empty</Typography>;
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Cart</Button>
      <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
        {viewCart()}
      </Drawer>
    </>
  );
};

export default Cart;
