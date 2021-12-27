import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import * as season from "../redux/seasonal/seasonSlice";
import * as seasonArchive from "../redux/seasonal/seasonArchiveSlice";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

import ProductCard from "../comps/ProductCard";

// code MUI
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// end code MUI

export default function Home() {
  const dispatch = useDispatch();
  const curSeason = useSelector((state) => state.seasonArchive.curSeason);

  const allData = useSelector((state) => state.season.allData);
  const tvData = useSelector((state) => state.season.tvData);
  const movieData = useSelector((state) => state.season.movieData);
  const otherData = useSelector((state) => state.season.otherData);

  const [value, setValue] = React.useState(0);
  const [sort, setSort] = React.useState("");

  // code MUI
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSort = (event) => {
    setSort(event);

    switch (event) {
      case "ASC-TITLE":
        dispatch(season.ASC("title"));
        break;
      case "DESC-TITLE":
        dispatch(season.DESC("title"));
        break;
      case "ASC-SCORE":
        dispatch(season.ASC("score"));
        break;
      case "DESC-SCORE":
        dispatch(season.DESC("score"));
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(seasonArchive.getData());
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      if (curSeason.year !== undefined || curSeason.season !== undefined) {
        await dispatch(
          season.getData({ year: curSeason.year, seasonal: curSeason.season })
        );
        await handleChangeSort(sort);
      }
    };
    fetchData();
  }, [curSeason]);

  return (
    <div className="season">
      <div className="menu">
        <Box sx={{ flexGrow: 1, mt: { md: 5, xs: 0 } }}>
          <Toolbar
            disableGutters
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            {/* Seasonal */}
            <Box>
              <Toolbar disableGutters>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="left"
                  sx={{ mr: 2 }}
                  onClick={() => {
                    dispatch(seasonArchive.back());
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <Typography
                  variant="h4"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                >
                  {curSeason.season} {curSeason.year}
                </Typography>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="right"
                  onClick={() => {
                    dispatch(seasonArchive.next());
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Toolbar>
            </Box>
            {/* Menu TYPE */}
            <Box
              sx={{
                width: "100%",
                borderBottom: 1,
                borderColor: "black",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="white"
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="scrollable auto tabs example"
              >
                <Tab label="TV" {...a11yProps(0)} />
                <Tab label="Movie" {...a11yProps(1)} />
                <Tab label="OVAs & Others" {...a11yProps(2)} />
                <Tab label="All" {...a11yProps(3)} />
              </Tabs>
            </Box>
            {/* Sort */}
            <Box sx={{ alignSelf: "flex-end" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={sort}
                  onChange={(e) => handleChangeSort(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em>Sort by</em>
                  </MenuItem>
                  <MenuItem value="ASC-TITLE">Title - Ascending</MenuItem>
                  <MenuItem value="DESC-TITLE">Title - Descending</MenuItem>
                  <MenuItem value="ASC-SCORE">Score - Ascending</MenuItem>
                  <MenuItem value="DESC-SCORE">Score - Descending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </Box>
      </div>

      <div className="content">
        {/* TV */}
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            {tvData.length > 0
              ? tvData.map((data, key) => (
                  <Grid item xs={12} md={4} key={key}>
                    <ProductCard data={data} />
                  </Grid>
                ))
              : null}
          </Grid>
        </TabPanel>
        {/* Movie */}
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            {movieData.length > 0
              ? movieData.map((data, key) => (
                  <Grid item xs={12} md={4} key={key}>
                    <ProductCard data={data} />
                  </Grid>
                ))
              : null}
          </Grid>
        </TabPanel>
        {/* OVAs & Others */}
        <TabPanel value={value} index={2}>
          <Grid container spacing={2}>
            {otherData.length > 0
              ? otherData.map((data, key) => (
                  <Grid item xs={12} md={4} key={key}>
                    <ProductCard data={data} />
                  </Grid>
                ))
              : null}
          </Grid>
        </TabPanel>
        {/* All */}
        <TabPanel value={value} index={3}>
          <Grid container spacing={2}>
            {allData.length > 0
              ? allData.map((data, key) => (
                  <Grid item xs={12} md={4} key={key}>
                    <ProductCard data={data} />
                  </Grid>
                ))
              : null}
          </Grid>
        </TabPanel>
      </div>
    </div>
  );
}
