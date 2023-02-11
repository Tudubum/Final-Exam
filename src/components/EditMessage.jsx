import { useState} from "react";

const EditMessage = ({ data, setIsEditing, onEditComment }) => {

  const [formInputs, setFormInputs] = useState({
    answer: data.answer,
  });

  const handleSubmit = event => {
    event.preventDefault();
    onEditComment(data.id, { answer: formInputs.answer });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea type="text" value={formInputs.answer} onChange={e => setFormInputs({ ...formInputs, answer: e.target.value })} />
      <button className="submit" type="submit">Save</button>
      <button className="submit" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
};

export default EditMessage;