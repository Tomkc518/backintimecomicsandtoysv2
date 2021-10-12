import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TopProducts = ({ topProducts }) => {
  return (
    <Box display="flex" justifyContent="space-evenly">
      {topProducts.map((product) => {
        if (product.availableForSale) {
          return (
            <Card sx={{ maxWidth: 300 }} key={`${product.id}`}>
              <CardActionArea href={`/products/${product.id}`}>
                <CardMedia
                  component="img"
                  height="250"
                  image={`${product.images[0].src}`}
                  title={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        }
      })}
    </Box>
  );
};
export default TopProducts;
