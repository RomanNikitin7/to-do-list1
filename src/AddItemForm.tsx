import { ChangeEvent, KeyboardEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type PropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm({ addItem }: PropsType) {
  const [itemTitle, setItemTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value);
    setError(null);
  };
  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createItemHandler();
    }
  };
  const createItemHandler = () => {
    const trimmedTitle = itemTitle.trim();
    if (trimmedTitle !== "") {
      addItem(trimmedTitle);
      setItemTitle("");
    } else {
      setError("Title is required");
    }
  };

  const buttonStyle = {
    minWidth: "40px",
    minHeight: "40px",
    maxWidth: "40px",
    maxHeight: "40px",
  };
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
      <TextField
        error={!!error}
        size="small"
        fullWidth
        className={error ? "error" : ""}
        value={itemTitle}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
        id="outlined-basic"
        label={error ? error : "Type something"}
        variant="outlined"
      />
      <Button
        variant="contained"
        onClick={createItemHandler}
        style={buttonStyle}
      >
        +
      </Button>
    </Box>
  );
}
