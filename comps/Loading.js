import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);

  const search = useSelector((state) => state.search.loading);
  const season = useSelector((state) => state.season.loading);
  const seasonArchive = useSelector((state) => state.seasonArchive.loading);

  React.useEffect(() => {
    if (search || season || seasonArchive) setOpen(true);
    else setOpen(false);
  }, [search, season, seasonArchive]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
