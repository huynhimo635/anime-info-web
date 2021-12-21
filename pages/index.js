import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/seasonal/seasonSlice";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className="season">
      <div className="menu">
        <Toolbar></Toolbar>
      </div>
      <div className="content"></div>
    </div>
  );
}
