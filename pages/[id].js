import * as React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";

import { getData, getThemes } from "../redux/anime/animeSlice";

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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, .03)",
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(255, 255, 255, .125)",
}));

// end code MUI

const DetailAnime = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const animeData = useSelector((state) => state.anime.data);
  const themes = useSelector((state) => state.anime.themes);

  // code MUI
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded1, setExpanded1] = React.useState("panel1");
  const handleChangeAccor1 = (panel) => (event, newExpanded) => {
    setExpanded1(newExpanded ? panel : false);
  };

  const [expanded2, setExpanded2] = React.useState("panel1");
  const handleChangeAccor2 = (panel) => (event, newExpanded) => {
    setExpanded2(newExpanded ? panel : false);
  };
  //end code MUI

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(getData(id));
      await dispatch(getThemes(id));
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

              <Typography
                variant="h5"
                component="div"
                noWrap
                sx={{ flexGrow: 1, mr: 2, textTransform: "capitalize" }}
                align="center"
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
                align="center"
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
                align="center"
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
                align="center"
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
                align="center"
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
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="anime-details__content">
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
                    p: 4,
                    background: "primary",
                  }}
                >
                  <Box
                    sx={{
                      borderBottom: "1px white solid",
                      p: { md: 3, xs: 0 },
                    }}
                  >
                    {/* Summary Info */}
                    <Grid container spacing={2}>
                      {/* Format */}
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
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
                      <Grid item xs={6}>
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
                      <Grid item xs={6}>
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
                <Box>
                  <Accordion
                    expanded={expanded1 === "panel1"}
                    onChange={handleChangeAccor1("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Collapsible Group Item #1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded1 === "panel2"}
                    onChange={handleChangeAccor1("panel2")}
                  >
                    <AccordionSummary
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <Typography>Collapsible Group Item #2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded1 === "panel3"}
                    onChange={handleChangeAccor1("panel3")}
                  >
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                    >
                      <Typography>Collapsible Group Item #3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </TabPanel>
              {/* OP & ED */}
              <TabPanel value={value} index={2}>
                <Box sx={{ height: "70vh", overflowY: "auto" }}>
                  {themes.length > 0
                    ? themes.map((item, index) => {
                        // const URL = window.URL || window.webkitURL;
                        // const file = item.mirror.mirrorURL || "";
                        // let urlBlob;
                        // if (file !== "") urlBlob = URL.createObjectURL(file);

                        return (
                          <Accordion
                            expanded={expanded2 === `panel${index + 1}`}
                            onChange={handleChangeAccor2(`panel${index + 1}`)}
                            key={index}
                          >
                            <AccordionSummary
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                            >
                              <Typography>
                                #{item.themeType}: {item.themeName}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {/* <CardMedia
                                component="video"
                                height="500"
                                // src={item.mirror.mirrorURL}
                                src="https://res.cloudinary.com/dkpfs6ith/video/upload/v1640666652/ShingekiNoKyojin-OP1_hyxuix.webm"
                                alt="movie"
                                controls
                              /> */}

                              <ReactPlayer
                                url={item.mirror.mirrorURL}
                                controls
                              />

                              {/* <video src={require(item.mirror.mirrorURL)} /> */}
                            </AccordionDetails>
                          </Accordion>
                        );
                      })
                    : null}
                </Box>
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
