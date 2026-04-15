import { ChangeEvent, useState } from "react";

type Props = {
  title: string;
  onChangeEditableSpan: (spanTitle: string) => void;
};

export function EditableSpan({ title, onChangeEditableSpan }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  function handleOnBlur() {
    setIsEdit(false);
  }
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    let curTitle = e.currentTarget.value;
    setCurrentTitle(curTitle);
    onChangeEditableSpan(curTitle);
  }
  return isEdit ? (
    <input
      autoFocus
      type="text"
      onBlur={handleOnBlur}
      onChange={(e) => handleOnChange(e)}
      value={currentTitle}
    />
  ) : (
    <span onDoubleClick={() => setIsEdit(true)}>{title}</span>
  );
}
