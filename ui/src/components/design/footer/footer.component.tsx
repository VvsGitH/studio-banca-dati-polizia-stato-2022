import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export default function Footer(): JSX.Element {
  const theme = useTheme();

  return (
    <Box component="footer" role="contentinfo" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Container maxWidth="lg">
        <Box sx={{ paddingBlock: "1.5rem" }}>
          <Typography
            variant="body1"
            component="p"
            textAlign="right"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            Made by Vito with Love ❤
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
