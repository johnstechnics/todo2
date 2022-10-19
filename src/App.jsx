import { useState } from "react";
import './assets/css/reset.css';
import './assets/css/main.css';
import { TopBar } from "./components/TopBar";
import { ItemList } from "./components/ItemList";
import { SideBar } from "./components/SideBar";

export const App = () => {

	const [toDoList, setToDoList] = useState(JSON.parse(localStorage.getItem('todoList')) || []);
	const [id, setId] = useState(Number(localStorage.getItem('idCounter')) + 1 || 1);
	const initialCategoryList = [{ id: 0, name: 'No category' }];
	const [categoryList, setCategoryList] = useState(JSON.parse(localStorage.getItem('categoryList')) || initialCategoryList);
	const [sideBarToggle, setSideBarToggle] = useState(false);
	const [sideBarHold, setSideBarHold] = useState(JSON.parse(localStorage.getItem('sideBarHold')) || false);
	const [sortedToDoList, setSortedToDoList] = useState([]);
	const [activeCategory, setActiveCategory] = useState('all');

	const createNote = (inputValue, setInputValue) => {
		if (inputValue.trim() !== '') {
			const note = {
				text: inputValue,
				date: new Date(),
				id: id,
				check: false,
				editMode: false,
				categoryId: 0
			};
			setToDoList([...toDoList, note]);
			localStorage.setItem(
				'todoList',
				JSON.stringify([...toDoList, note])
			);
			setId(id => id + 1);
			localStorage.setItem('idCounter', id);
			setInputValue('');
		};
	};

	const createCategory = (inputValue, setInputValue) => {
		if (inputValue.trim() !== '' && inputValue.trim() !== '$') {
			const newCategory = {
				id: id,
				name: Array.from(inputValue).slice(1).join('')
			};
			setCategoryList([...categoryList, newCategory]);
			localStorage.setItem(
				'categoryList',
				JSON.stringify([...categoryList, newCategory])
			);
			setId(id => id + 1);
			localStorage.setItem('idCounter', id);
			setInputValue('');
		};
	};

	const deleteNote = (noteId) => {
		const data = toDoList.filter(({ id }) => id !== noteId);
		setToDoList(data);
		localStorage.setItem('todoList', JSON.stringify(data));
	};

	const deleteCategory = (categoryId) => {
		if (window.confirm('Delete category?')) {
			const data = categoryList.filter(({ id }) => id === 0 || id !== categoryId);
			setCategoryList(data);
			localStorage.setItem('categoryList', JSON.stringify(data));
		};
	};

	const setCheck = (noteId) => {
		const data = toDoList;
		data.forEach(note => { note.id === noteId && (note.check = !note.check) });
		setToDoList([...data]);
		localStorage.setItem('todoList', JSON.stringify(data));
	};

	const editNoteOn = (noteId) => {
		const data = toDoList;
		data.forEach(note => { note.id === noteId && (note.editMode = true) });
		setToDoList([...data]);
	};

	const editNoteSave = (noteId, inputValueNew) => {
		const data = toDoList;
		data.forEach(note => {
			note.id === noteId && (note.text = inputValueNew);
			note.id === noteId && (note.editMode = false);
		});
		setToDoList([...data]);
		localStorage.setItem('todoList', JSON.stringify(data));
	};

	const editNoteExit = (noteId) => {
		const data = toDoList;
		data.forEach(note => { note.id === noteId && (note.editMode = false) });
		setToDoList([...data]);
	};

	const clearAll = () => {
		setToDoList([]);
		localStorage.removeItem('todoList');
		setId(1);
		localStorage.removeItem('idCounter');
		setCategoryList(initialCategoryList);
		localStorage.removeItem('categoryList');
	};

	const showCategory = (id) => {
		const data = toDoList;
		const sorted = data.filter(({ categoryId }) => categoryId === id);
		if (!sorted.length) {
			sorted.push(0);
		};
		setSortedToDoList(sorted);
		setActiveCategory(String(id));
	};

	const setNoteCategory = (noteId, newCategory) => {
		const data = toDoList;
		data.forEach(note => { note.id === noteId && (note.categoryId = newCategory) });
		setToDoList([...data]);
		localStorage.setItem('todoList', JSON.stringify(data));
	};

	return (
		<div className="todo">
			<TopBar
				createNote={createNote}
				createCategory={createCategory}
				sideBarToggle={sideBarToggle}
				setSideBarToggle={setSideBarToggle}
				sideBarHold={sideBarHold}
			/>
			<ItemList
				toDoList={toDoList}
				editNoteSave={editNoteSave}
				deleteNote={deleteNote}
				editNoteOn={editNoteOn}
				setCheck={setCheck}
				editNoteExit={editNoteExit}
				categoryList={categoryList}
				setNoteCategory={setNoteCategory}
				sortedToDoList={sortedToDoList}
			/>
			<SideBar
				categoryList={categoryList}
				setCategoryList={setCategoryList}
				clearAll={clearAll}
				deleteCategory={deleteCategory}
				sideBarToggle={sideBarToggle}
				sideBarHold={sideBarHold}
				setSideBarHold={setSideBarHold}
				showCategory={showCategory}
				setSortedToDoList={setSortedToDoList}
				activeCategory={activeCategory}
				setActiveCategory={setActiveCategory}
			/>
		</div>
	);
};
