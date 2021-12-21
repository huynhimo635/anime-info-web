import Head from "next/head";
import Header from "./Header";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import styles from "../styles/Layout.module.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});
const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="layout">
        <Head>
          <title>AnimeDB</title>
        </Head>

        <Header />
        <Toolbar id="back-to-top-anchor" className={styles.break} />

        <Container maxWidth="xl">{children}</Container>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
