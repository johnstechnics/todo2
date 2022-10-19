import { Category } from './Category';

export const SideBar = (props) => {
    return (
        <div className={`side-bar ${props.sideBarToggle ? 'open' : ''} ${props.sideBarHold ? 'hold' : ''}`}>
            <div className="categories">
                <div className={props.activeCategory === 'all' ? 'categories__item active' : 'categories__item'}>
                    <p
                        className="categories__name"
                        onClick={() => {
                            props.setSortedToDoList([]);
                            props.setActiveCategory('all');
                        }}
                    >
                        All notes
                    </p>
                </div>
                {props.categoryList.map(category => (
                    <Category
                        key={category.id}
                        category={category}
                        deleteCategory={props.deleteCategory}
                        showCategory={props.showCategory}
                        activeCategory={props.activeCategory}
                    />
                ))}
            </div>
            {/* <button
                className="side-bar__clear"
                onClick={props.clearAll}
            >
                clear notes
            </button> */}
            {/* <button
                className={props.sideBarHold ? 'side-bar__hold hold' : 'side-bar__hold'}
                onClick={() => {
                    props.setSideBarHold(!props.sideBarHold);
                    localStorage.setItem('sideBarHold', JSON.stringify(!props.sideBarHold));
                }}
            >
            </button> */}
        </div>
    );
};
