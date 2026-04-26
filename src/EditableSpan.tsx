import { ChangeEvent, useState, KeyboardEvent } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  title: string;
  onChangeEditableSpan: (spanTitle: string) => void;
};

export function EditableSpan({ title, onChangeEditableSpan }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const activateEditMode = () => {
    setIsEdit(true);
    setCurrentTitle(title);
  };

  const activateViewMode = () => {
    setIsEdit(false);
    if (currentTitle.trim()) {
      onChangeEditableSpan(currentTitle);
    } else {
      setCurrentTitle(title);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value);
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      activateViewMode();
    }
  };

  return isEdit ? (
    <TextField
      variant="standard"
      size="small"
      autoFocus
      onBlur={activateViewMode}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      value={currentTitle}
      sx={{
        "& .MuiInput-root": { fontSize: "inherit", fontWeight: "inherit" },
      }}
    />
  ) : (
    <span
      onDoubleClick={activateEditMode}
      style={{
        cursor: "pointer",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {title}
    </span>
  );
}
