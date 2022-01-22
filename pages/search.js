import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as search from "../redux/search/searchSlice";
import * as loading from "../redux/loadingCustom/loadingSlice";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@material-ui/core";

import ProductCard from "../comps/ProductCard";

const FakeCard = () => (
  <Box sx={{ width: "100%" }}>
    <Typography variant="h1">
      <Skeleton />
    </Typography>
    <Typography variant="h2">
      <Skeleton animation="wave" />
    </Typography>
    <Typography variant="h3">
      <Skeleton animation={false} />
    </Typography>
    <Typography variant="h4">
      <Skeleton />
    </Typography>
    <Typography variant="h5">
      <Skeleton animation="wave" />
    </Typography>
    <Typography variant="body1">
      <Skeleton animation={false} />
    </Typography>
  </Box>
);

const NotFound = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      <FakeCard />
    </Grid>
    <Grid item xs={12} md={4}>
      <FakeCard />
    </Grid>
    <Grid item xs={12} md={4}>
      <FakeCard />
    </Grid>
  </Grid>
);

// code MUI

const SearchUI = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  margin: theme.spacing(5, 0),
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: `calc(100% - (1em + ${theme.spacing(7)}))`,
  marginLeft: `calc(1em + ${theme.spacing(5)})`,

  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 2, 2, 0),

    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
}));

// end code MUI

const Search = () => {
  const listRef = React.useRef(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data);
  const [dataShow, setDataShow] = React.useState(data);
  const [value, setValue] = React.useState("");
  const [tempValue, setTempValue] = React.useState("");
  const [open, setOpen] = React.useState(false); // error input
  const [loadingInner, setLoadingInner] = React.useState(false);
  const [page, setPage] = React.useState(1);

  // Submit handling

  const handleSubmit = () => {
    if (value === "" || value.length < 3) return setOpen(true);

    const fetchData = async () => {
      dispatch(loading.set());
      setDataShow([]);
      setPage(1);
      setTempValue(value);
      await dispatch(search.getData({ query: value, page: 1 }));
      dispatch(loading.remove());
    };

    fetchData();
  };

  // code MUI

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Infinite load handling

  React.useEffect(() => {
    const handleLoadMore = () => {
      if (listRef && listRef.current) {
        if (
          data.length === 50 &&
          window.scrollY + window.innerHeight + 1 >=
            listRef.current.clientHeight + listRef.current.offsetTop
        ) {
          setLoadingInner(true);
          setPage(page + 1);
        }
      }
    };

    window.addEventListener("scroll", handleLoadMore);
    return () => {
      window.removeEventListener("scroll", handleLoadMore);
    };
  }, [listRef, data]);

  // load more data handling

  React.useEffect(() => {
    const loadMore = async () => {
      if (loadingInner) {
        await dispatch(search.getData({ query: tempValue, page: page }));
      }
    };

    setTimeout(() => {
      if (page !== 1) {
        loadMore();
        setLoadingInner(false);
      }
    }, 1000);
  }, [page]);

  //set dataShow

  React.useEffect(() => {
    setDataShow(dataShow.concat(data));
  }, [data]);

  React.useEffect(() => {
    setDataShow([]);
    setPage(1);
  }, []);

  return (
    <div className="search-page">
      {/* show error */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Requires at least 3 or more characters
        </Alert>
      </Snackbar>
      {/* search input */}
      <SearchUI>
        <SearchIconWrapper onClick={() => handleSubmit()}>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search here…"
          autoFocus
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </SearchUI>
      <Container maxWidth="xxl">
        {/* rendering data */}
        {dataShow.length > 0 ? (
          <Box sx={{ flexGrow: 1, mt: { md: 5, xs: 0 } }} ref={listRef}>
            <Grid container spacing={2}>
              {dataShow.map((dataItem, key) => (
                <Grid item xs={12} md={4} key={key}>
                  <ProductCard data={dataItem} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <NotFound />
        )}
        {/* infinite loading */}
        {loadingInner ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
              mb: 2,
            }}
          >
            <CircularProgress color="inherit" size={50} />
          </Box>
        ) : null}
      </Container>
    </div>
  );
};

export default Search;
