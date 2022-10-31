import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useContext } from "react";
import { DataBankContext } from "../../context/data-bank.context";

interface SectionSelectorComponentProps {
  section: number;
  onSectionChange: (newSection: number) => void;
}

export default function SectionSelectorComponent(props: SectionSelectorComponentProps): JSX.Element {
  const { sections } = useContext(DataBankContext);

  const handleChange = (event: SelectChangeEvent): void => {
    props.onSectionChange(parseInt(event.target.value));
  };

  return (
    <FormControl fullWidth color="secondary">
      <InputLabel id="questions-section-selector">Scegli una sezione</InputLabel>
      <Select
        labelId="questions-section-selector"
        id="select-section"
        value={sections.length ? String(props.section) : ""}
        label="Scegli una sezione"
        onChange={handleChange}
      >
        {sections.map((section, index) => (
          <MenuItem key={section} value={index}>
            {section}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
