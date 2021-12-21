import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const ProductCard = (props) => {
  const data = props.data
    ? props.data
    : {
        title: "",
        image_url: "",
        producers: [{ name: "" }],
        synopsis: "",
      };

  return (
    <Card sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}>
      <CardMedia
        component="img"
        sx={{
          width: { md: 151, xs: "auto" },
        }}
        src={data.image_url}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {data.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {data.producers[0].name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {data.episodes} episodes
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{
              display: "flex",
              overflow: "hidden",
              height: "50px",
              textOverflow: "ellipsis",
            }}
          >
            {data.synopsis}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCard;
