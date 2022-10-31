import { useCallback, useState } from "react";
import { Question } from "../../models";
import { Data, Sections } from "../../constants";

import { Grid, Button, Container, Box } from "@mui/material";

import QuestionComponent from "../question/question.component";
import SectionSelectorComponent from "./section-selector.component";
import QuestionSelectorComponent from "./question-selector.component";
import Fieldset from "../design/fieldset/fieldset.component";

interface QuestionState {
  section: number;
  questionId: number;
  question: Question | null;
}

function randomSection(): number {
  return Math.floor(Math.random() * (Sections.length - 1));
}

function randomQuestion(): number {
  return Math.floor(Math.random() * 999);
}

export default function RandomizerComponent(): JSX.Element {
  const [question, setQuestion] = useState<QuestionState>({
    section: 0,
    questionId: 0,
    question: Data[0].qa[0],
  });

  const handleSectionChange = useCallback((newSection: number) => {
    setQuestion({
      section: newSection,
      questionId: 0,
      question: Data[newSection]?.qa[0] ?? null,
    });
  }, []);

  const choseSpecificQuestion = useCallback((newQuestion: number) => {
    setQuestion((curr) => ({
      section: curr.section,
      questionId: newQuestion,
      question: Data[curr.section]?.qa[newQuestion] ?? null,
    }));
  }, []);

  const chooseRandomQuestion = () => {
    const randomSectionIndex: number = randomSection();
    const randomQuestionIndex: number = randomQuestion();
    setQuestion({
      section: randomSectionIndex,
      questionId: randomQuestionIndex,
      question: Data[randomSectionIndex].qa[randomQuestionIndex],
    });
  };

  return (
    <Box component="main" py="3rem" >
      <form onSubmit={(e) => e.preventDefault()}>
        <Container maxWidth="lg">
          <Fieldset legend="Seleziona una domanda">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={4}>
                <SectionSelectorComponent
                  section={question.section ?? 0}
                  onSectionChange={handleSectionChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <QuestionSelectorComponent
                  section={question.section}
                  question={question.questionId}
                  onQuestionChange={choseSpecificQuestion}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="contained" color="secondary" onClick={chooseRandomQuestion}>
                  Domanda casuale
                </Button>
              </Grid>
            </Grid>
          </Fieldset>
          <br />
          <Fieldset legend="Domanda selezionata">
            <QuestionComponent id={question.questionId} question={question.question} />
          </Fieldset>
        </Container>
      </form>
    </Box>
  );
}
