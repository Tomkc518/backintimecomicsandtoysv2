import Layout from "../components/layout";
import TopProducts from "../components/top-products";
import { client } from "../utils/shopify";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

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
      >
        <Grid item>
          <Img src="/images/logo_black.png" />
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <h2>Welcome to Back in Time Comics and Toys</h2>
          <p>
            With over 30 years of experience in the collecting field and 20
            years of buying, selling, &amp; trading experience. 
          </p>
          <p>Sunday 11-5, M-F 11-6, Saturday 11-7</p>
          <p>1170 W Kansas St Suite S, Liberty, MO 64068</p>
          <p>(816) 429-7004</p>
        </Grid>
        <h1>Top Products</h1>
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
