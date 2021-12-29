import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";
import ReactPlayer from "react-player";

import { getData } from "../redux/themes/themeSlice";

// MUI code

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

//end MUI code

const Movie = (props) => {
  //Mui code
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChangeAccor = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state.themes.data);
  console.log(data);

  const fetchData = async (title) => {
    await dispatch(getData(title));
  };

  React.useEffect(() => {
    const convertTitleToSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/([^0-9a-z-\s])/g, "")
        .replace(/(\s+)/g, "_")
        .replace(/\_\_\_\_\_/gi, "_")
        .replace(/\_\_\_\_/gi, "_")
        .replace(/\_\_\_/gi, "_")
        .replace(/\_\_/gi, "_");
    };

    if (props.title && props.title !== "") {
      const title = convertTitleToSlug(props.title);
      fetchData(title);
    }
  }, [props.title]);

  return (
    <Box sx={{ height: "70vh", overflowY: "auto" }}>
      {data.length > 0
        ? data.map((itemL) =>
            itemL.animethemeentries.map((itemM) =>
              itemM.videos.map((item, index) => (
                <Accordion
                  expanded={expanded === `panel${index + 1}`}
                  onChange={handleChangeAccor(`panel${index + 1}`)}
                  key={index}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>#{item.filename}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ReactPlayer
                      url={`https://animethemes.moe/video/${item.basename}`}
                      controls
                      width="100%"
                      height="100%"
                    />
                  </AccordionDetails>
                </Accordion>
              ))
            )
          )
        : null}
    </Box>
  );
};

export default Movie;
