import Head from "next/head";
import Header from "./Header";
import Container from "@mui/material/Container";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>AnimeDB</title>
      </Head>

      <Header />

      <Container maxWidth="xl">{children}</Container>
    </div>
  );
};

export default Layout;
