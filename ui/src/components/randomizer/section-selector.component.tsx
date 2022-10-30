import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Sections } from "../../constants";

interface SectionSelectorComponentProps {
  section: number;
  onSectionChange: (newSection: number) => void;
}

export default function SectionSelectorComponent(props: SectionSelectorComponentProps): JSX.Element {
  const handleChange = (event: SelectChangeEvent): void => {
    props.onSectionChange(parseInt(event.target.value));
  };

  return (
    <FormControl fullWidth color="secondary">
      <InputLabel id="questions-section-selector">Scegli una sezione</InputLabel>
      <Select
        labelId="questions-section-selector"
        id="select-section"
        value={String(props.section)}
        label="Scegli una sezione"
        onChange={handleChange}
      >
        {Sections.map((section, index) => (
          <MenuItem key={section} value={index}>{section}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
