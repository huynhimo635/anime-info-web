import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/seasonal/seasonSlice";

import AppBar from "@mui/material/AppBar";
import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { textAlign } from "@mui/system";

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="season">
      <div className="menu">
        <Box sx={{ flexGrow: 1, mt: 5 }}>
          <Toolbar disableGutters>
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
                sx={{ mr: 2 }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Toolbar>

            <Box
              sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                textColor="white"
                indicatorColor="secondary"
              >
                <Tab label="TV" {...a11yProps(0)} />
                <Tab label="Movie" {...a11yProps(1)} />
                <Tab label="OVAs & Others" {...a11yProps(2)} />
                <Tab label="All" {...a11yProps(3)} />
              </Tabs>
            </Box>

            <Box sx={{ textJustify: "flex-end" }}>
              <Button color="inherit">Login</Button>
            </Box>
          </Toolbar>
        </Box>
      </div>
      <div className="content">
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </div>
    </div>
  );
}
