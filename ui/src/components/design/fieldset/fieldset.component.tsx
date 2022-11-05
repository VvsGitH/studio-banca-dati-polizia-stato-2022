import { Box, Paper, Typography } from "@mui/material";
import { useId } from "react";

export default function Fieldset(props: { legend?: string; children: React.ReactNode }): JSX.Element {
  const id = useId();

  return (
    <Paper
      id={id}
      aria-labelledby={id + "-legend"}
      elevation={3}
      component="div"
      sx={{
        border: "none",
        padding: "2rem",
      }}
    >
      <Box component="fieldset" border="none" m="0" p="0">
        <Box component="legend" textAlign="center">
          {props.legend ? (
            <Typography component="h2" variant="h5" align="center" id={id + "-legend"}>
              {props.legend}
            </Typography>
          ) : null}
        </Box>

        <Box mt="2rem">{props.children}</Box>
      </Box>
    </Paper>
  );
}
