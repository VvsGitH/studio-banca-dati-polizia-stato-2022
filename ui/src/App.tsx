import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/design/footer/footer.component";
import Header from "./components/design/header/header.component";
import RandomizerComponent from "./components/randomizer/randomizer.component";
import { DataBankContextProvider } from "./context/data-bank.context";

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
