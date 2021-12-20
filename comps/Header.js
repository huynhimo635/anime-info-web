import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import Link from "next/link";

// import styles from "../styles/Header.module.css";

const pages = [
  {
    name: "Seasonal Anime",
    slug: "/",
  },
  {
    name: "Search",
    slug: "search",
  },
];

const ScrollTop = (props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const logoName = "AnimeDB";

  return (
    <ThemeProvider theme={darkTheme}>
      <header>
        <AppBar position="fixed" sx={{ background: "#000" }}>
          <Container maxWidth="xxl">
            <Toolbar disableGutters id="back-to-top-anchor">
              <Typography
                variant="h3"
                noWrap
                component="div"
                sx={{ mr: 5, display: { xs: "none", md: "flex" } }}
              >
                {logoName}
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link href={page.slug}>
                          <a>{page.name}</a>
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                {logoName}
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <Button
                    key={index}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      mr: 5,
                      fontSize: "1.5rem",
                    }}
                  >
                    <Link href={page.slug}>
                      <a>{page.name}</a>
                    </Link>
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <ScrollTop {...props}>
          <Fab color="main" size="large">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        <Toolbar />
      </header>
    </ThemeProvider>
  );
};
export default Header;
