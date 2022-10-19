import { useEffect, useState } from "react";
import { ReactComponent as BarsImg } from '../assets/svg/bars.svg';

export const TopBar = (props) => {

	const [inputValue, setInputValue] = useState('');
	const [inputType, setInputType] = useState('note');

	useEffect(() => {
		if (inputValue.trim()[0] === '$') {
			setInputType('category');
		} else {
			setInputType('note');
		};
	}, [inputValue]);

	return (
		<div className="top-bar">
			<div className="container top-bar__container">
				<button
					className="side-bar-toggle"
					onClick={() => { !props.sideBarHold && props.setSideBarToggle(!props.sideBarToggle) }}
				>
					<BarsImg />
				</button>
				<input
					className="top-bar__input"
					type="text"
					value={inputValue}
					onChange={event => { setInputValue(event.target.value) }}
					onKeyPress={inputType === 'note' ? (
						event => { event.key === 'Enter' && props.createNote(inputValue, setInputValue) }
					) : (
						event => { event.key === 'Enter' && props.createCategory(inputValue, setInputValue) }
					)}
					placeholder="Write note or $category"
				/>
				<button
					className="top-bar__add"
					onClick={inputType === 'note' ? (
						() => { props.createNote(inputValue, setInputValue) }
					) : (
						() => { props.createCategory(inputValue, setInputValue) }
					)}
				>
					{`add ${inputType}`}
				</button>
			</div>
		</div>
	);
};
