import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({note, users}) => {

  const {isManager, isAdmin} = useAuth()

    const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [userId, setUserId] = useState(note.user);
  const [completed, setCompleted] = useState(note.completed);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUserId("");
      setTitle("");
      setText('');
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

    
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const onCompleteChanged = () => setCompleted((prev) => !prev);

  const canSave =
  [title, text, userId].every(Boolean) && !isLoading;

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({id:note.id, user:userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleDateString('en-UK', {day: 'numeric', month:'long', year:'numeric', hour:'numeric', minute:'numeric', second:'numeric'});

  const updated = new Date(note.updatedAt).toLocaleDateString('en-UK', {day: 'numeric', month:'long', year:'numeric', hour:'numeric', minute:'numeric', second:'numeric'});

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  let deleteButton = null;
  if(isManager || isAdmin){
    deleteButton =(
      <button title="Delete Note" className="icon-button" onClick={onDeleteNoteClicked}>
        <FontAwesomeIcon icon={faTrashCan}/>
      </button>
    )
  }

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note #{note.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>
        <label htmlFor="title" className="form__label">
          Title : 
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form__input ${validTitleClass}`}
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="text" className="form__label">
          Text :
        </label>
        <textarea
          id="text"
          name="text"
          className={`form__input form__input--text ${validTextClass}`}
          autoComplete="off"
          value={text}
          onChange={onTextChanged}
        />
        <div className="form__row">
            <div className="form__divider">
            <label
          htmlFor="note-completed"
          className="form__label form__checkbox-container"
        >
         WORK  COMPLETE:
         
        <input
          className="form__checkbox"
          id="note-completed"
          name="completed"
          type="checkbox"
          checked={completed}
          onChange={onCompleteChanged}
        />
        </label>
        <label className="form__label form__checkbox-container" htmlFor="note-username">
          ASSIGNED TO:
        </label>
        <select
          name="username"
          id=" note-username"
          className={`form__select`}
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
            </div>
            <div className="form__divider">
                <p className="form__created">Created: <br /> {created}</p>
                <p className="form__updated">Updated: <br /> {updated}</p>
            </div>
        </div>
      </form>
    </>
  );

  return content
}

export default EditNoteForm