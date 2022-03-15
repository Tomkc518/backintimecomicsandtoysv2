import { useState } from "react";
import Layout from "../../components/layout";
import Products from "../../components/products";
import TagFilter from "../../components/tagFilter";
import SearchFilter from "../../components/searchFilter";
import Client from "shopify-buy/index.unoptimized.umd";
import Grid from "@mui/material/Grid";

const clientExtended = Client.buildClient({
  domain: "back-in-time-comics-toys.myshopify.com",
  storefrontAccessToken: "2ef3445070a263a260c0f82cebbff07a",
});

const products = (props) => {
  const [productsState, setProductsState] = useState(props.products);

  const handleTagFilters = async (filters) => {
    if (filters.length > 0) {
      const filter = filters.join(" AND ");

      const filterQuery = clientExtended.graphQLClient.query((root) => {
        root.addConnection(
          "products",
          { args: { first: 20, query: `tag:${filter}` } },
          (product) => {
            product.add("title");
            product.add("availableForSale");
            product.add("description");
            product.add("totalInventory");
            product.addConnection(
              "variants",
              { args: { first: 10 } },
              (variant) => {
                variant.add("image", (image) => {
                  image.add("url");
                });
                variant.add("priceV2", (price) => {
                  price.add("amount");
                });
              }
            );
          }
        );
      });

      const filteredData = await clientExtended.graphQLClient
        .send(filterQuery)
        .then(({ model, data }) => {
          return JSON.parse(JSON.stringify(data.products));
        });

      setProductsState(filteredData);
    } else {
      setProductsState(props.products);
    }
  };

  const handleSearchFilter = async (search) => {
    const searchQuery = clientExtended.graphQLClient.query((root) => {
      root.addConnection(
        "products",
        { args: { first: 20, query: `title:${search}*` } },
        (product) => {
          product.add("title");
          product.add("availableForSale");
          product.add("description");
          product.add("totalInventory");
          product.addConnection(
            "variants",
            { args: { first: 10 } },
            (variant) => {
              variant.add("image", (image) => {
                image.add("url");
              });
              variant.add("priceV2", (price) => {
                price.add("amount");
              });
            }
          );
        }
      );
    });

    const searchedData = await clientExtended.graphQLClient
      .send(searchQuery)
      .then(({ model, data }) => {
        return JSON.parse(JSON.stringify(data.products));
      });
    setProductsState(searchedData);
  };

  const loadNextPage = async () => {
    const nextPageQuery = clientExtended.graphQLClient.query((root) => {
      root.addConnection(
        "products",
        {
          args: {
            first: 20,
            after: `${
              productsState.edges[productsState.edges.length - 1].cursor
            }`,
          },
        },
        (product) => {
          product.add("title");
          product.add("availableForSale");
          product.add("description");
          product.add("totalInventory");
          product.addConnection(
            "variants",
            { args: { first: 10 } },
            (variant) => {
              variant.add("image", (image) => {
                image.add("url");
              });
              variant.add("priceV2", (price) => {
                price.add("amount");
              });
            }
          );
        }
      );
    });

    const nextPageData = await clientExtended.graphQLClient
      .send(nextPageQuery)
      .then(({ model, data }) => {
        return JSON.parse(JSON.stringify(data.products));
      });

    setProductsState(nextPageData);
    window.scrollTo(0, 0);
  };

  const loadPreviousPage = async () => {
    const previousPageQuery = clientExtended.graphQLClient.query((root) => {
      root.addConnection(
        "products",
        { args: { last: 20, before: `${productsState.edges[0].cursor}` } },
        (product) => {
          product.add("title");
          product.add("availableForSale");
          product.add("description");
          product.add("totalInventory");
          product.addConnection(
            "variants",
            { args: { first: 10 } },
            (variant) => {
              variant.add("image", (image) => {
                image.add("url");
              });
              variant.add("priceV2", (price) => {
                price.add("amount");
              });
            }
          );
        }
      );
    });

    const previousPageData = await clientExtended.graphQLClient
      .send(previousPageQuery)
      .then(({ model, data }) => {
        return JSON.parse(JSON.stringify(data.products));
      });

    setProductsState(previousPageData);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} lg={2}>
          <SearchFilter
            handleSearchFilter={(search) => handleSearchFilter(search)}
          />
          <TagFilter
            tags={props.tags}
            handleTagFilters={(filters) => handleTagFilters(filters)}
          />
        </Grid>
        <Grid item xs={9}>
          <Products
            products={productsState.edges}
            productsState={productsState}
            loadNextPage={loadNextPage}
            loadPreviousPage={loadPreviousPage}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps() {
  const productsQuery = clientExtended.graphQLClient.query((root) => {
    root.addConnection("products", { args: { first: 20 } }, (product) => {
      product.add("title");
      product.add("availableForSale");
      product.add("description");
      product.add("totalInventory");
      product.addConnection("images", { args: { first: 10 } }, (image) => {
        image.add("url");
      });
      product.addConnection("variants", { args: { first: 10 } }, (variant) => {
        variant.add("image", (image) => {
          image.add("url");
        });
        variant.add("priceV2", (price) => {
          price.add("amount");
        });
      });
    });
  });

  const products = await clientExtended.graphQLClient
    .send(productsQuery)
    .then(({ model, data }) => {
      return JSON.parse(JSON.stringify(data.products));
    });

  const tagQuery = clientExtended.graphQLClient.query((root) => {
    root.addConnection("productTags", { args: { first: 100 } }, (tag) => {});
  });

  const tagData = await clientExtended.graphQLClient
    .send(tagQuery)
    .then(({ model, data }) => {
      return model.productTags;
    });

  return {
    props: { products: products, tags: JSON.parse(JSON.stringify(tagData)) },
  };
}

export default products;
