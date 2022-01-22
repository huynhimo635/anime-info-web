import * as React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

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

import styles from "../styles/Header.module.css";

//code MUI

const pages = [
  {
    name: "Seasonal Anime",
    slug: "/",
  },
  {
    name: "Search",
    slug: "/search",
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

//end code MUI

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <header className={styles.header}>
      <AppBar position="fixed">
        <Container
          maxWidth="xxl"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        >
          <Toolbar disableGutters>
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{ mr: 5, display: { xs: "none", md: "flex" } }}
            >
              Anime
              <Typography variant="h3" noWrap color="#ce93d8">
                DB
              </Typography>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              Anime
              <Typography variant="h5" component="div" color="#ce93d8">
                DB
              </Typography>
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

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  sx={{
                    color: "white",
                    flexWrap: "wrap",
                    // fontSize: "1rem",
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
      <Box sx={{ zIndex: "tooltip" }}>
        <ScrollTop {...props}>
          <Fab color="main" size="large">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
    </header>
  );
};
export default Header;
