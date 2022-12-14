import { useCallback } from "react";

import { Button, Grid } from "@mui/material";
import PrevIcon from "@mui/icons-material/NavigateBefore";
import NextIcon from "@mui/icons-material/NavigateNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";

import QuestionSelectorComponent from "./question-selector.component";
import SectionSelectorComponent from "./section-selector.component";

interface QuestionsNavigationComponentProps {
  section: number;
  questionId: number;
  onSelection: (newSection: number | null, newQuestionId: number | null) => void;
}

function randomQuestion(): number {
  return Math.floor(Math.random() * 999);
}

export default function QuestionsNavigationComponent(props: QuestionsNavigationComponentProps): JSX.Element {
  const handleSectionChange = useCallback(
    (newSection: number) => {
      props.onSelection(newSection, 0);
    },
    [props.onSelection]
  );

  const choseSpecificQuestion = useCallback(
    (newQuestion: number) => {
      props.onSelection(null, newQuestion);
    },
    [props.onSelection]
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={4}>
        <SectionSelectorComponent section={props.section} onSectionChange={handleSectionChange} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <QuestionSelectorComponent
          section={props.section}
          question={props.questionId}
          onQuestionChange={choseSpecificQuestion}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PrevIcon />}
          disabled={props.questionId == 0}
          onClick={() => choseSpecificQuestion(props.questionId - 1)}
        >
          Domanda precedente
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ShuffleIcon />}
          onClick={() => choseSpecificQuestion(randomQuestion())}
        >
          Domanda casuale
        </Button>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<NextIcon />}
          disabled={props.questionId == 999}
          onClick={() => choseSpecificQuestion(props.questionId + 1)}
        >
          Domanda successiva
        </Button>
      </Grid>
    </Grid>
  );
}
