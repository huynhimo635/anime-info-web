import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);

  const season = useSelector((state) => state.season.loading);
  const seasonArchive = useSelector((state) => state.seasonArchive.loading);
  const loading = useSelector((state) => state.loading.loadingCustom);
  const anime = useSelector((state) => state.anime.loading);
  const episodes = useSelector((state) => state.episodes.loading);

  React.useEffect(() => {
    if (loading || season || seasonArchive || anime || episodes) setOpen(true);
    else setOpen(false);
  }, [loading, season, seasonArchive, anime, episodes]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
