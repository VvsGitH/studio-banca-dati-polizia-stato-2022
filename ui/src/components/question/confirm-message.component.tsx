import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

function getAnswerLetter(index: number): string {
  return `${String.fromCharCode(index + 65)} `;
}

export default function ConfirmMessage(props: { isSuccess: boolean; correctAnswer: number }): JSX.Element {
  const theme = useTheme();

  const color = props.isSuccess ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Typography paragraph={true} color={color} aria-live="assertive">
      {props.isSuccess
        ? "Complimenti! Risposta esatta!"
        : `Risposta errata: la risposta corretta è ${getAnswerLetter(props.correctAnswer)}!`}
    </Typography>
  );
}
