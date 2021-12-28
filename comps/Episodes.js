import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";

import * as episodesData from "../redux/episodes/episodesSlice";

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

const Episodes = (props) => {
  //Mui code
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChangeAccor = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const dispatch = useDispatch();
  const episodes = useSelector((state) => state.episodes);
  const boxRef = React.createRef();
  const dataRef = React.createRef();

  React.useEffect(() => {
    const fetchData = async (id) => {
      await dispatch(episodesData.getData({ id }));
    };

    if (props.id && props.id !== "") {
      const id = props.id;
      fetchData(id);
    }
  }, [props.id]);

  // React.useEffect(() => {
  //   if (boxRef && boxRef.current) {
  //     boxRef.current.addEventListener("scroll", () => {
  //       console.log("hek");
  //     });
  //   }
  // }, [boxRef, dataRef]);

  return (
    <Box sx={{ height: "70vh", overflowY: "auto" }} ref={boxRef}>
      {episodes.data.length > 0
        ? episodes.data.map((item) => (
            <Accordion
              expanded={expanded === `panel${item.episode_id}`}
              onChange={handleChangeAccor(`panel${item.episode_id}`)}
              key={item.episode_id}
              ref={dataRef}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{`Episode ${item.episode_id}: ${item.title} `}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {(
                  <Typography>
                    Title (Japanese): {item.title_japanese}
                  </Typography>
                ) || null}
                {(
                  <Typography>Title (Romanji): {item.title_romanji}</Typography>
                ) || null}
                {(
                  <Typography color="textSecondary">
                    Aired: {new Date(item.aired).toLocaleDateString("vi-VN")}
                  </Typography>
                ) || null}
              </AccordionDetails>
            </Accordion>
          ))
        : null}
    </Box>
  );
};

export default Episodes;
