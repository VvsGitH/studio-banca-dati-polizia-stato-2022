import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useMemo } from "react";
import { Answer } from "../../models";

interface AnswersComponentProps {
  questionId: number;
  labelledBy: string;
  answers: Array<Answer>;
  currentAnswer: string;
  onAnswer: (newAnswer: Answer | undefined) => void;
}

function getHeaderBaseOnIndex(index: number): string {
  return `${String.fromCharCode(index + 65)}) `;
}

function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex: number = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default function AnswersComponent(props: AnswersComponentProps): JSX.Element {
  const shuffledAnswers = useMemo(() => shuffle(props.answers), [props.answers]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onAnswer(props.answers.find(answ => answ.label === event.target.value));
  };

  return (
    <RadioGroup
      aria-labelledby={props.labelledBy}
      name={`answer-group-for-question-${props.questionId}`}
      value={props.currentAnswer}
      onChange={handleChange}
      sx={{ gap: "0.5rem" }}
    >
      {shuffledAnswers.map((answer, index) => (
        <FormControlLabel
          key={`${index}-${answer.label}`}
          value={answer.label}
          control={<Radio />}
          label={getHeaderBaseOnIndex(index) + answer.label}
        />
      ))}
    </RadioGroup>
  );
}
