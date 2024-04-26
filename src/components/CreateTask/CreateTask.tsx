import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addTodo } from "../../app/service/todo";
import { useState, KeyboardEvent } from "react";

export const CreateTask = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [title, setTitle] = useState("");

	const addTask = () => {
		if (title) {
			dispatch(addTodo({ title }));
			setTitle("");
		}
	};

	const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			addTask();
		}
	};

	return (
		<div className="flex justify-between mb-2">
			<input
				className="w-full px-4 py-2 mr-2 rounded-lg
                             border-gray-300 focus:outline-none
                              focus:border-blue-500"
				type="text"
				placeholder="Add new task"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				onKeyUp={handleKeyUp}
			/>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={addTask}
			>
				Add
			</button>
		</div>
	);
};
