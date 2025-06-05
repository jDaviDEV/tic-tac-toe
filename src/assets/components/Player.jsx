import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setInitialName] = useState(initialName);

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    editablePlayerName = <input type="text" value={playerName} required onChange={handleChangePlayerName}/>;
    btnCaption = "Save";
  }

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleChangePlayerName(event){
    setInitialName(event.target.value);
  }

  return (
    <li>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
