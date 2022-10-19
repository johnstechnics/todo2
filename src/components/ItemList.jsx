import { Item } from "./Item";

export const ItemList = (props) => {
    return (
        <div className="list">
            <div className="container list__container">
                {props.sortedToDoList.length ? (
                    props.sortedToDoList[0] === 0 ? (
                        <p className="">no notes</p>
                    ) : (
                        props.sortedToDoList.sort((a, b) => b.id - a.id).map(note => (
                            <Item
                                key={note.id}
                                note={note}
                                {...props}
                            />
                        ))
                    )
                ) : props.toDoList.length ? (
                    props.toDoList.sort((a, b) => b.id - a.id).map(note => (
                        <Item
                            key={note.id}
                            note={note}
                            {...props}
                        />
                    ))
                ) : (
                    <p className="">no notes</p>
                )}
            </div>
        </div>
    );
};
