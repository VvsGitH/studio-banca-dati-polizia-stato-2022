import React, { useMemo } from "react";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Data } from "../../constants";

interface QuestionSelectorComponentProps {
  section: number;
  question: number;
  onQuestionChange: (newQuestion: number) => void;
}

interface AutocompleteOption {
  value: number;
  label: string;
}

export default function QuestionSelectorComponent(props: QuestionSelectorComponentProps): JSX.Element {
  const questions: Array<AutocompleteOption> = useMemo(
    () => Data?.[props.section]?.qa.map((q, i) => ({ value: i, label: q.question })) ?? [],
    [props.section]
  );

  const currentQuestion: AutocompleteOption = useMemo(
    () => questions.find((q) => q.value === props.question) ?? { value: -1, label: "" },
    [props.question, questions]
  );

  const handleChange = (_: React.SyntheticEvent, newValue: AutocompleteOption | null): void => {
    props.onQuestionChange(newValue?.value ?? -1);
  };

  return (
    <Autocomplete
      id="questions-selector"
      options={questions}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, current) => option.value === current.value}
      value={currentQuestion}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Seleziona domanda" color="secondary" />}
      fullWidth
      disableListWrap
      disablePortal
      autoSelect
      disableClearable
    />
  );
}
