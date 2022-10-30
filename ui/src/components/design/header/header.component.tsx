import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";

export default function HeaderComponent(): JSX.Element {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "2rem",
        paddingBlock: "1rem",
        paddingInline: "min(1rem, 5vw)"
      }}
      role="banner"
    >
      <SchoolIcon />
      <Typography variant="h5" component="h1" textAlign="center">
        RANDOMIZZATORE DOMANDE CONCORSO
      </Typography>
    </AppBar>
  );
}
