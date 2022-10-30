import { Box, Paper, Typography } from "@mui/material";
import { useId } from "react";

export default function Fieldset(props: { legend?: string; children: React.ReactNode }): JSX.Element {
  const id = useId();

  return (
    <Paper
      id={id}
      aria-labelledby={id + "-legend"}
      elevation={3}
      component="fieldset"
      sx={{
        border: "none",
        padding: "2rem",
      }}
    >
      {props.legend ? (
        <Typography component="h2" variant="h5" align="center" id={id + "-legend"}>
          {props.legend}
        </Typography>
      ) : null}

      <Box mt="2rem">
        {props.children}
      </Box>
    </Paper>
  );
}
