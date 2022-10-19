import { ReactComponent as DeleteImg } from '../assets/svg/delete.svg';

export const Category = (props) => {
    return (
        <div className={props.activeCategory === String(props.category.id) ? 'categories__item active' : 'categories__item'}>
            <p
                className="categories__name"
                onClick={() => { props.showCategory(props.category.id) }}
            >
                {props.category.name}
            </p>
            {props.category.id !== 0 && (
                <button
                    className="categories__delete"
                    onClick={() => { props.deleteCategory(props.category.id) }}
                >
                    <DeleteImg />
                </button>
            )}
        </div>
    );
};
