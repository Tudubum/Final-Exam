import { useState} from "react";

const EditMessage = ({ data, setIsEditing, onEditComment }) => {

  const [formInputs, setFormInputs] = useState({
    comment: data.comment,
  });

  const handleSubmit = e => {
    e.preventDefault();
    onEditComment(data.id, { comment: formInputs.comment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea type="text" value={formInputs.comment} onChange={e => setFormInputs({ ...formInputs, comment: e.target.value })} />
      <button className="submit" type="submit">Save</button>
      <button className="submit" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
};

export default EditMessage;