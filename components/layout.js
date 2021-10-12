import React from "react";
import Head from "next/head";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title> Back in Time Comics and Toys </title>
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
