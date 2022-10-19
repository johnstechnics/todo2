import { useEffect, useState } from "react";

export const CustomSelect = ({ data, onChange, note }) => {

    const [open, setOpen] = useState(false);
    const [optionValue, setOptionValue] = useState();
    const [optionInner, setOptionInner] = useState();

    useEffect(() => {
        onChange(note.id, optionValue ? (
            optionValue
        ) : data.filter(({ id }) => id === note.categoryId).length ? (
            data.filter(({ id }) => id === note.categoryId)[0].id
        ) : (
            data[0].id
        ));
    }, [optionValue, data]);

    return (
        <div className={`custom-select ${open ? 'open' : ''}`}>
            <button
                type="button"
                className="custom-select__select"
                onClick={() => { setOpen(value => !value) }}
                onBlur={() => { setOpen(false) }}
                onKeyDown={event => { event.key === 'Escape' && setOpen(false) }}
            >
                <span>
                    {optionInner ? (
                        optionInner
                    ) : data.filter(({ id }) => id === note.categoryId).length ? (
                        data.filter(({ id }) => id === note.categoryId)[0].name
                    ) : (
                        data[0].name
                    )}
                </span>
            </button>
            <div className="custom-select__options_wrap">
                <div className="custom-select__options">
                    {data.map(item => (
                        <div
                            key={item.id}
                            className="custom-select__option"
                            onClick={() => {
                                setOptionValue(item.id);
                                setOptionInner(item.name);
                                setOpen(false);
                            }}
                            onMouseDown={event => { event.preventDefault() }}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};
