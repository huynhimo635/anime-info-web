import Head from "next/head";
import Header from "./Header";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Loading from "./Loading";

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
        <Loading />
        <Toolbar id="back-to-top-anchor" />

        <Container maxWidth="xl">{children}</Container>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
