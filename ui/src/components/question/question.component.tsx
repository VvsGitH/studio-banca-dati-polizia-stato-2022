import { useCallback, useLayoutEffect, useState } from "react";
import { Answer, Question } from "../../models";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";

import AnswersComponent from "../answer/answers.component";
import ConfirmMessage from "./confirm-message.component";

interface QuestionComponentProps {
  id: number;
  question: Question | null;
}

export default function QuestionComponent(props: QuestionComponentProps): JSX.Element {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  useLayoutEffect(() => {
    setConfirmed(false);
  }, [props.question?.question]);

  const handleAnswerSelection = useCallback((newAnswer: Answer | undefined) => {
    setAnswer(newAnswer?.label ?? "");
    setIsCorrect(newAnswer?.isCorrect ?? false);
  }, []);

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const labelId: string = `question-${props.id}`;
  const correctAnswer: number = props.question?.answers.findIndex(answ => answ.isCorrect) ?? -1;

  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
    >
      <FormControl fullWidth error={confirmed && !isCorrect}>
        <FormLabel id={labelId} sx={{ marginBottom: "1.25rem" }}>
          {props.question?.question || ""}
        </FormLabel>
        <AnswersComponent
          questionId={props.id}
          labelledBy={labelId}
          answers={props.question?.answers || []}
          currentAnswer={answer}
          onAnswer={handleAnswerSelection}
        />
      </FormControl>
      <Button variant="contained" onClick={handleConfirm}>
        Conferma Risposta
      </Button>
      {confirmed ? <ConfirmMessage isSuccess={isCorrect} correctAnswer={correctAnswer} /> : null}
    </Container>
  );
}
