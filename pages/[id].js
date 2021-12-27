import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import { getData } from "../redux/anime/animeSlice";

const DetailAnime = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const animeData = useSelector((state) => state.anime.data);

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
            <Box>
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
              >
                {animeData.score || "--"} / 10
              </Typography>
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="anime-details__content">
            <h1>Content</h1>
          </div>
        </Grid>
      </Grid>
    </div>
  ) : (
    ""
  );
};

export default DetailAnime;
