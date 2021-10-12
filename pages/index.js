import Layout from "../components/layout";
import TopProducts from "../components/top-products";
import { client } from "../utils/shopify";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Home = (props) => {
  return (
    <Layout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Img src="/images/logo_black.png" />
        </Grid>
        <Grid item container direction="column" alignItems="center">
          <Typography
            sx={{ typography: { xs: "h4", sm: "h2" }, textAlign: "center" }}
            component="div"
            gutterBottom
          >
            Welcome to Back in Time Comics &amp; Toys
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
            }}
            variant="body1"
            gutterBottom
          >
            With over 30 years of experience in the collecting field and 20
            years of buying, selling, &amp; trading experience. 
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sunday 11-5, M-F 11-6, Saturday 11-7
          </Typography>
          <Typography variant="body1" gutterBottom>
            1170 W Kansas St Suite S, Liberty, MO 64068
          </Typography>
          <Typography variant="body1" gutterBottom>
            (816) 429-7004
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={{ typography: { xs: "h5", sm: "h3" } }}
            component="div"
            gutterBottom
            mt={3}
          >
            Top Products
          </Typography>
        </Grid>
      </Grid>
      <TopProducts topProducts={props.topProducts} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MTU2Nzc0OTMyOA==";
  const topProductCollection = await client.collection.fetchWithProducts(
    collectionId
  );

  return {
    props: {
      topProducts: JSON.parse(JSON.stringify(topProductCollection.products)),
    },
  };
}

export default Home;
