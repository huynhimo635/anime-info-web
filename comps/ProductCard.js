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

const data = {
  mal_id: 48926,
  url: "https://myanimelist.net/anime/48926/Komi-san_wa_Comyushou_desu",
  title: "Komi-san wa, Comyushou desu.",
  image_url: "https://cdn.myanimelist.net/images/anime/1899/117237.jpg",
  synopsis:
    "Hitohito Tadano is an ordinary boy who heads into his first day of high school with a clear plan: to avoid trouble and do his best to blend in with others. Unfortunately, he fails right away when he takes the seat beside the school's  madonna—Shouko Komi. His peers now recognize him as someone to eliminate for a chance to sit next to the most beautiful girl in class.\r\n\r\nGorgeous and graceful with long, dark hair, Komi is universally adored and immensely popular despite her mysterious persona. However, unbeknownst to everyone, she has crippling anxiety and a communication disorder which prevents her from wholeheartedly socializing with her classmates.\r\n\r\nWhen left alone in the classroom, a chain of events forces Komi to interact with Tadano through writing on the blackboard, as if in a one-way conversation. Being the first person to realize she cannot communicate properly, Tadano picks up the chalk and begins to write as well. He eventually discovers that Komi's goal is to make one hundred friends during her time in high school. To this end, he decides to lend her a helping hand, thus also becoming her first-ever friend.\r\n\r\n[Written by MAL Rewrite]",
  type: "TV",
  airing_start: "2021-10-06T15:00:00+00:00",
  episodes: 12,
  members: 426928,
  genres: [
    {
      mal_id: 4,
      type: "anime",
      name: "Comedy",
      url: "https://myanimelist.net/anime/genre/4/Comedy",
    },
    {
      mal_id: 36,
      type: "anime",
      name: "Slice of Life",
      url: "https://myanimelist.net/anime/genre/36/Slice_of_Life",
    },
  ],
  explicit_genres: [],
  themes: [
    {
      mal_id: 23,
      type: "anime",
      name: "School",
      url: "https://myanimelist.net/anime/genre/23/School",
    },
  ],
  demographics: [
    {
      mal_id: 27,
      type: "anime",
      name: "Shounen",
      url: "https://myanimelist.net/anime/genre/27/Shounen",
    },
  ],
  source: "Manga",
  producers: [
    {
      mal_id: 28,
      type: "anime",
      name: "OLM",
      url: "https://myanimelist.net/anime/producer/28/OLM",
    },
  ],
  score: 8.24,
  licensors: [],
  r18: false,
  kids: false,
  continuing: false,
};

const ProductCard = () => {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default ProductCard;
