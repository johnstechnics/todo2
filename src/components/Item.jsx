import { useState } from "react";
import { ReactComponent as DeleteImg } from '../assets/svg/delete.svg';
import { ReactComponent as EditImg } from '../assets/svg/edit.svg';
import { ReactComponent as SaveImg } from '../assets/svg/save.svg';
import { ReactComponent as CheckImg } from '../assets/svg/check.svg';
import { ReactComponent as CancelImg } from '../assets/svg/cancel.svg';
import { CustomSelect } from "./CustomSelect";

export const Item = (props) => {

    const [inputValueNew, setInputValueNew] = useState('');

    return (
        <div className="item">
            <div className="item__text-wrap">
                <p className={props.note.editMode ? 'item__text hide' : 'item__text'}>
                    {props.note.editMode ? inputValueNew : props.note.text}
                </p>
                <textarea
                    className={props.note.editMode ? 'item__textarea edit' : 'item__textarea'}
                    value={inputValueNew}
                    onChange={event => { setInputValueNew(event.target.value) }}
                    onKeyPress={event => {
                        event.key === 'Enter' && props.editNoteSave(props.note.id, inputValueNew);
                    }}
                    onKeyDown={event => {
                        event.key === 'Escape' && props.editNoteExit(props.note.id);
                    }}
                >
                </textarea>
            </div>
            <div className="item__meta">
                <input
                    id={`item__check-${props.note.id}`}
                    className="item__check-input"
                    type="checkbox"
                    disabled={props.note.editMode ? true : false}
                    checked={props.note.check}
                    onChange={() => { props.setCheck(props.note.id) }}
                />
                <label
                    htmlFor={`item__check-${props.note.id}`}
                    className="item__check-label"
                    title="Done"
                >
                    {props.note.check && <CheckImg />}
                </label>
                {props.note.editMode ? (
                    <>
                        <div
                            className="item__save"
                            onClick={() => { props.editNoteSave(props.note.id, inputValueNew) }}
                            title="Save"
                        >
                            <SaveImg />
                        </div>
                        <div
                            className="item__cancel"
                            onClick={() => { props.editNoteExit(props.note.id) }}
                            title="Cancel"
                        >
                            <CancelImg />
                        </div>
                    </>
                ) : (
                    <div
                        className="item__edit"
                        onClick={() => {
                            props.editNoteOn(props.note.id);
                            setInputValueNew(props.note.text);
                        }}
                        title="Edit"
                    >
                        <EditImg />
                    </div>
                )}
                <div className="item__category">
                    <CustomSelect
                        data={props.categoryList}
                        onChange={props.setNoteCategory}
                        note={props.note}
                    />
                </div>
                <div
                    className="item__delete"
                    onClick={() => { props.deleteNote(props.note.id) }}
                    title="Delete"
                >
                    <DeleteImg />
                </div>
            </div>
        </div>
    );
};
