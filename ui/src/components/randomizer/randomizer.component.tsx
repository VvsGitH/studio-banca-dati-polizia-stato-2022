import { useCallback, useContext, useMemo, useState } from "react";
import { Question } from "../../models";

import { Grid, Button, Container, Box } from "@mui/material";

import QuestionComponent from "../question/question.component";
import SectionSelectorComponent from "./section-selector.component";
import QuestionSelectorComponent from "./question-selector.component";
import Fieldset from "../design/fieldset/fieldset.component";
import { DataBankContext } from "../../context/data-bank.context";

function randomSection(numOfSections: number): number {
  return Math.floor(Math.random() * numOfSections);
}

function randomQuestion(): number {
  return Math.floor(Math.random() * 999);
}

export default function RandomizerComponent(): JSX.Element {
  const { data, sections } = useContext(DataBankContext);

  const [section, setSection] = useState(0);
  const [questionId, setQuestionId] = useState(0);

  const question = useMemo(() => data?.[section].qa[questionId] ?? null, [data, section, questionId]);

  const handleSectionChange = useCallback((newSection: number) => {
    setSection(newSection);
    setQuestionId(0);
  }, []);

  const choseSpecificQuestion = useCallback((newQuestion: number) => {
    setQuestionId(newQuestion);
  }, []);

  const chooseRandomQuestion = () => {
    setSection(randomSection(sections.length - 1));
    setQuestionId(randomQuestion());
  };

  return (
    <Box py="3rem">
      <form onSubmit={(e) => e.preventDefault()}>
        <Container maxWidth="lg">
          <Fieldset legend="Seleziona una domanda">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={4}>
                <SectionSelectorComponent section={section} onSectionChange={handleSectionChange} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <QuestionSelectorComponent
                  section={section}
                  question={questionId}
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
            <QuestionComponent id={questionId} question={question} />
          </Fieldset>
        </Container>
      </form>
    </Box>
  );
}
