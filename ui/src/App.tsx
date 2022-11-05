import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/design/footer/footer.component";
import Header from "./components/design/header/header.component";
import RandomizerComponent from "./components/randomizer/randomizer.component";
import { DataBankContextProvider } from "./context/data-bank.context";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00857E",
      light: "#339D97",
      dark: "#005D58",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#AD2FDA",
      light: "#BD58E1",
      dark: "#792098",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "'Atkinson Hyperlegible', Helvetica, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-layout">
        <Header />
        <main className="content-layout">
          <DataBankContextProvider>
            <RandomizerComponent />
          </DataBankContextProvider>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
