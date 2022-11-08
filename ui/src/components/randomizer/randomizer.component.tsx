import { useCallback, useContext, useMemo, useState } from "react";

import { Container, Box } from "@mui/material";

import { DataBankContext } from "../../context/data-bank.context";
import QuestionComponent from "../question/question.component";
import Fieldset from "../design/fieldset/fieldset.component";
import QuestionsNavigationComponent from "../questions-navigation/questions-navigation.component";

export default function RandomizerComponent(): JSX.Element {
  const { data } = useContext(DataBankContext);

  const [section, setSection] = useState(0);
  const [questionId, setQuestionId] = useState(0);

  const question = useMemo(() => data?.[section].qa[questionId] ?? null, [data, section, questionId]);

  const handleSelection = useCallback((newSection: number | null, newQuestionId: number | null) => {
    newSection != null && setSection(newSection);
    newQuestionId != null && setQuestionId(newQuestionId);
  }, []);

  return (
    <Box py="3rem">
      <form onSubmit={(e) => e.preventDefault()}>
        <Container maxWidth="lg">
          <Fieldset legend="Seleziona una domanda">
            <QuestionsNavigationComponent
              section={section}
              questionId={questionId}
              onSelection={handleSelection}
            />
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
