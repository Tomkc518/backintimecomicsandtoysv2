import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const Products = (props) => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
      {props.products.map((product) => {
        if (product.node.availableForSale) {
          return (
            <Card
              sx={{ maxWidth: 250, marginTop: 2 }}
              key={`${product.node.id}`}
            >
              <CardActionArea href={`/products/${product.node.id}`}>
                <CardMedia
                  component="img"
                  height="250"
                  image={`${product.node.variants.edges[0].node.image.url}`}
                  title={product.node.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.node.title}
                  </Typography>
                  <Typography>
                    $
                    {Number(
                      product.node.variants.edges[0].node.priceV2.amount
                    ).toFixed(2)}
                  </Typography>
                  <Typography>
                    Inventory: {product.node.totalInventory}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        }
      })}
      <Grid
        container
        item
        xs={6}
        sm={3}
        md={5}
        pt={3}
        pr={1}
        pb={2}
        justifyContent="flex-end"
        sx={{ pr: { xs: 1, md: 15, lg: 30 } }}
      >
        {props.productsState.pageInfo.hasPreviousPage === true && (
          <Button
            variant="contained"
            startIcon={<ArrowLeftIcon />}
            style={{ color: "rgba(255, 255, 255, 0.87)" }}
            onClick={() => props.loadPreviousPage()}
          >
            Previous
          </Button>
        )}
      </Grid>
      <Grid
        container
        item
        xs={4}
        sm={3}
        pt={3}
        ml={1}
        pb={2}
        justifyContent="flex-start"
      >
        {props.productsState.pageInfo.hasNextPage === true && (
          <Button
            variant="contained"
            endIcon={<ArrowRightIcon />}
            style={{ color: "rgba(255, 255, 255, 0.87)" }}
            onClick={() => props.loadNextPage()}
          >
            Next
          </Button>
        )}
      </Grid>
    </Box>
  );
};
export default Products;
