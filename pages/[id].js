import * as React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { getData } from "../redux/anime/animeSlice";

import Episodes from "../comps/Episodes";
import Movie from "../comps/Movie";

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

const DetailAnime = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const animeData = useSelector((state) => state.anime.data);

  // code MUI
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //end code MUI

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(getData(id));
    };

    if (id !== undefined) fetchData();
  }, [id]);

  return Object.keys(animeData).length !== 0 ? (
    <div className="anime-detail">
      <Grid container spacing={{ md: 5, sx: 2 }} sx={{ mt: { md: 5, xs: 2 } }}>
        <Grid item xs={12} md={4}>
          <div className="anime-details__info">
            <Box sx={{ mb: { sx: 5, md: 10 } }}>
              {
                <Image
                  src={animeData.image_url}
                  alt="Picture of the anime"
                  width={500}
                  height={500}
                  layout="responsive"
                />
              }

              {/* Responsive for >= tablet   */}
              <Box
                sx={{
                  textAlign: "center",
                  display: { md: "unset", xs: "none" },
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                  color="textSecondary"
                  mt={2}
                >
                  Rating
                </Typography>

                <Typography
                  variant="h4"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                  color="textPrimary"
                  mt={2}
                >
                  {animeData.score || "--"} / 10
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                  color="textSecondary"
                  mt={2}
                >
                  {animeData.scored_by || "--"} ratings
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                  color="textSecondary"
                  mt={4}
                >
                  Official Website
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2 }}
                  color="textPrimary"
                  mt={2}
                >
                  {animeData.external_links
                    ? animeData.external_links
                        .filter(
                          (item) => item.name.toLowerCase() === "official site"
                        )
                        .map((item, key) => (
                          <a
                            key={key}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.url}
                          </a>
                        ))
                    : "N/A"}
                </Typography>
              </Box>

              {/* Responsive for mobile   */}
              <Box sx={{ display: { md: "none", xs: "unset" } }}>
                <Typography
                  variant="h5"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                  align="left"
                  color="textPrimary"
                  mt={2}
                >
                  {animeData.title || "N/A"} (Romaji)
                </Typography>

                {animeData.title_english ? (
                  <Typography
                    variant="h5"
                    component="div"
                    noWrap
                    sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                    align="left"
                    color="textPrimary"
                    mt={2}
                  >
                    {animeData.title_english || "N/A"} (English)
                  </Typography>
                ) : null}

                {animeData.title_japanese ? (
                  <Typography
                    variant="h5"
                    component="div"
                    noWrap
                    sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                    align="left"
                    color="textPrimary"
                    mt={2}
                  >
                    {animeData.title_japanese || "N/A"} (japanese)
                  </Typography>
                ) : null}
              </Box>

              {/*  */}
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="anime-details__content">
            {/* Responsive for >= tablet   */}
            <Box sx={{ display: { md: "unset", xs: "none" } }}>
              <Typography
                variant="h4"
                component="div"
                noWrap
                sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                align="left"
                color="textPrimary"
                mt={2}
              >
                {animeData.title || "N/A"} (Romaji)
              </Typography>

              {animeData.title_english ? (
                <Typography
                  variant="h4"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                  align="left"
                  color="textPrimary"
                  mt={2}
                >
                  {animeData.title_english || "N/A"} (English)
                </Typography>
              ) : null}

              {animeData.title_japanese ? (
                <Typography
                  variant="h4"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                  align="left"
                  color="textPrimary"
                  mt={2}
                >
                  {animeData.title_japanese || "N/A"} (japanese)
                </Typography>
              ) : null}
            </Box>

            {/* Responsive for >= tablet   */}
            <Box
              sx={{
                textAlign: "left",
                display: { md: "none", xs: "unset" },
              }}
            >
              <Typography
                variant="h5"
                component="div"
                noWrap
                sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                color="textPrimary"
                mt={2}
              >
                Rating {animeData.score || "--"} / 10
              </Typography>

              <Typography
                variant="h5"
                component="div"
                noWrap
                sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                color="textSecondary"
                mt={2}
              >
                {animeData.scored_by || "--"} ratings
              </Typography>

              <Typography
                variant="h5"
                component="div"
                noWrap
                sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                color="textSecondary"
                mt={4}
              >
                Official Website
              </Typography>

              <Typography
                variant="h5"
                component="div"
                noWrap
                sx={{ flexGrow: 1, mr: 2 }}
                color="textPrimary"
                mt={2}
              >
                {animeData.external_links
                  ? animeData.external_links
                      .filter(
                        (item) => item.name.toLowerCase() === "official site"
                      )
                      .map((item, key) => (
                        <a
                          key={key}
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.url}
                        </a>
                      ))
                  : "N/A"}
              </Typography>
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
                textColor="inherit"
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Info" {...a11yProps(0)} />
                <Tab label="Episode list" {...a11yProps(1)} />
                <Tab label="OP & ED" {...a11yProps(2)} />
              </Tabs>
              {/* Info */}
              <TabPanel value={value} index={0}>
                <Box
                  sx={{
                    border: "1px white solid",
                    p: { md: 4, xs: 1 },
                    background: "primary",
                    maxHeight: "100vh",
                    overflowY: "auto",
                  }}
                >
                  <Box
                    sx={{
                      borderBottom: "1px white solid",
                      p: { md: 3, xs: 2 },
                    }}
                  >
                    {/* Summary Info */}
                    <Grid container spacing={2}>
                      {/* Format */}
                      <Grid item md={3} xs={12}>
                        <Typography
                          variant="p"
                          component="div"
                          noWrap
                          sx={{
                            flexGrow: 1,
                            textTransform: "capitalize",
                          }}
                          align="left"
                          color="textSecondary"
                          mt={1}
                        >
                          <Typography variant="span" color="textPrimary">
                            Format:{" "}
                          </Typography>
                          {animeData.type || "N/A"}
                        </Typography>
                      </Grid>
                      {/* Source */}
                      <Grid item md={3} xs={12}>
                        <Typography
                          variant="p"
                          component="div"
                          noWrap
                          sx={{
                            flexGrow: 1,

                            textTransform: "capitalize",
                          }}
                          align="left"
                          color="textSecondary"
                          mt={1}
                        >
                          <Typography variant="span" color="textPrimary">
                            Source:{" "}
                          </Typography>
                          {animeData.source || "N/A"}
                        </Typography>
                      </Grid>
                      {/* Episodes */}
                      <Grid item md={3} xs={12}>
                        <Typography
                          variant="p"
                          component="div"
                          noWrap
                          sx={{
                            flexGrow: 1,

                            textTransform: "capitalize",
                          }}
                          align="left"
                          color="textSecondary"
                          mt={1}
                        >
                          <Typography variant="span" color="textPrimary">
                            Episodes:{" "}
                          </Typography>
                          {animeData.episodes || "--"}
                        </Typography>
                      </Grid>
                      {/* runtime */}
                      <Grid item md={3} xs={12}>
                        <Typography
                          variant="p"
                          component="div"
                          noWrap
                          sx={{
                            flexGrow: 1,
                          }}
                          align="left"
                          color="textSecondary"
                          mt={1}
                        >
                          <Typography variant="span" color="textPrimary">
                            Runtime:{" "}
                          </Typography>
                          {animeData.duration || "--"}
                        </Typography>
                      </Grid>
                      {/* Studio */}
                      <Grid item md={6} xs={12}>
                        <Typography
                          variant="p"
                          component="div"
                          noWrap
                          sx={{
                            flexGrow: 1,
                            textTransform: "capitalize",
                          }}
                          align="left"
                          color="textSecondary"
                          mt={1}
                        >
                          <Typography variant="span" color="textPrimary">
                            Studio:{" "}
                          </Typography>
                          {/* {animeData.studio.length > 0 ? animeData.studio } */}
                          {animeData.studios.length > 0
                            ? [...animeData.studios]
                                .map((item) => item.name)
                                .join(", ")
                            : "N/A"}
                        </Typography>
                      </Grid>
                      {/* tag */}
                      <Grid item md={6} xs={12}>
                        <Typography
                          variant="p"
                          component="div"
                          noWrap
                          sx={{
                            flexGrow: 1,
                            textTransform: "capitalize",
                          }}
                          align="left"
                          color="textSecondary"
                          mt={1}
                        >
                          <Typography variant="span" color="textPrimary">
                            Tag:{" "}
                          </Typography>
                          {animeData.genres.length > 0
                            ? [...animeData.genres]
                                .map((item) => item.name)
                                .join(", ")
                            : "N/A"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* Description Info */}
                  <Box sx={{ p: { md: 3, xs: 1 } }}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        flexGrow: 1,
                        textTransform: "capitalize",
                      }}
                      align="left"
                      color="textSecondary"
                      mt={1}
                    >
                      {animeData.synopsis || "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </TabPanel>
              {/* Episode list */}
              <TabPanel value={value} index={1}>
                <Episodes id={id} />
              </TabPanel>
              {/* OP & ED */}
              <TabPanel value={value} index={2}>
                <Movie title={animeData.title} />
              </TabPanel>
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  ) : (
    ""
  );
};

export default DetailAnime;
