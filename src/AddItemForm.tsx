import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";

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
  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={itemTitle}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <Button title={"+"} onClick={createItemHandler} />
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
}
