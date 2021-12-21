import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/seasonal/seasonSlice";
import * as React from "react";
import PropTypes from "prop-types";

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

export default function Home() {
  const dispatch = useDispatch();

  const allData = useSelector((state) => state.season.allData);

  const fetchData = async () => {
    await dispatch(getData({ year: 2021, seasonal: "fall" }));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const [value, setValue] = React.useState(0);
  const [sort, setSort] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="season">
      <div className="menu">
        <Box sx={{ flexGrow: 1, mt: 5 }}>
          <Toolbar
            disableGutters
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Box>
              <Toolbar disableGutters>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="left"
                  sx={{ mr: 2 }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <Typography
                  variant="h4"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2 }}
                >
                  Seasonal Year
                </Typography>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="right"
                >
                  <ChevronRightIcon />
                </IconButton>
              </Toolbar>
            </Box>

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

            <Box sx={{ alignSelf: "flex-end" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={sort}
                  onChange={handleChangeSort}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Sort by</em>
                  </MenuItem>
                  <MenuItem value={10}>Ascending</MenuItem>
                  <MenuItem value={20}>Descending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </Box>
      </div>
      <div className="content">
        <TabPanel value={value} index={0}>
          TV
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} md={4}>
              <ProductCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <ProductCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <ProductCard />
            </Grid> */}
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
