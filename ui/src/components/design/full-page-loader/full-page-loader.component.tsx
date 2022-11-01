import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function FullPageLoader(props: { show: boolean }): JSX.Element {
  return (
    <Backdrop open={props.show} sx={{ color: "#fff" }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
