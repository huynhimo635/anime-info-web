import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as search from "../redux/search/searchSlice";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

import ProductCard from "../comps/ProductCard";

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
    marginLeft: theme.spacing(3),
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
    // vertical padding + font size from searchIcon

    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
}));

const Search = () => {
  const [value, setValue] = React.useState("");
  const data = useSelector((state) => state.search.data);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const fetchData = async () => {
      await dispatch(search.getData({ query: value, page: 1 }));
    };

    fetchData();
  };

  return (
    <div className="search-page">
      <SearchUI>
        <SearchIconWrapper onClick={() => handleSubmit()}>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search here…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </SearchUI>
      <Box sx={{ flexGrow: 1, mt: { md: 5, xs: 0 } }}>
        <Grid container spacing={2}>
          {data.length > 0
            ? data.map((dataItem, key) => (
                <Grid item xs={12} md={4} key={key}>
                  <ProductCard data={dataItem} />
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
    </div>
  );
};

export default Search;
