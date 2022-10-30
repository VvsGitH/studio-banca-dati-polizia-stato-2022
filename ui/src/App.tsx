import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/design/footer/footer.component";
import HeaderComponent from "./components/design/header/header.component";
import RandomizerComponent from "./components/randomizer/randomizer.component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#26a69a",
      light: "#51b7ae",
      dark: "#1a746b",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ab47bc",
      light: "#bb6bc9",
      dark: "#773183",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, Helvetica, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-layout">
        <HeaderComponent />
        <div className="content-layout">
          <RandomizerComponent />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
