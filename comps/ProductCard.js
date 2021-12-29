import * as React from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProductCard = (props) => {
  const data = props.data
    ? props.data
    : {
        title: "",
        image_url: "",
        producers: [{ name: "" }],
        synopsis: "",
        episodes: "?",
      };

  const nameProducers = data.producers
    ? data.producers.map((item) => item.name)
    : [];

  return (
    <Link href={`/${data.mal_id}`}>
      <a>
        <Card
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            height: { md: "250px", xs: "100%" },
            overflow: "hidden",
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.3s ease 0s",
            },
            transition: "transform 0.3s ease 0s",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { md: 151, xs: "auto" },
            }}
            src={data.image_url}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent
              sx={{
                flex: "1 0 auto",
                overflow: "hidden",
                height: "200px",
                textOverflow: "ellipsis",
                marginBottom: "16px",
                "&:hover": {
                  overflow: "auto",
                },
              }}
              component="div"
            >
              <Typography component="div" variant="h5">
                {data.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ textTransform: "capitalize" }}
              >
                {nameProducers.length > 0 ? nameProducers.join("  &  ") : "N/A"}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {data.episodes ? data.episodes : "--"} episodes
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{
                  display: "flex",
                }}
              >
                {data.synopsis}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </a>
    </Link>
  );
};

export default ProductCard;
