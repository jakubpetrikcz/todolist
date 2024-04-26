import { useDispatch } from "react-redux";
import { TodoType } from "../../app/types/todo";
import { AppDispatch } from "../../app/store";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { editTodo, removeTodo } from "../../app/service/todo";
import { CheckIcon, PenIcon, TrashIcon } from "../ui/icons";

type TaskProps = TodoType;

export const Task = ({ title, completed, ...todo }: TaskProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isEditing, setIsEditing] = useState(false);
	const [taskTitle, setTaskTitle] = useState(title);
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) {
			ref.current?.focus();
		}
	}, [isEditing]);

	const handleEdit = () => {
		if (taskTitle) {
			if (isEditing) {
				dispatch(editTodo({ title: taskTitle, completed, ...todo }));
			}

			setIsEditing((prevState) => !prevState);
		}
	};

	const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && taskTitle) {
			setIsEditing(false);
			dispatch(editTodo({ title: taskTitle, completed, ...todo }));
		}
	};

	const handleToggleCompleted = () => {
		dispatch(editTodo({ title, completed: !completed, ...todo }));
	};

	const handleDelete = () => {
		dispatch(removeTodo(todo.id));
	};

	return (
		<li className="p-4 border-b-2 flex justify-between">
			<div className="flex gap-2">
				<input
					type="checkbox"
					className="mr-2"
					checked={completed}
					onChange={handleToggleCompleted}
				/>
				{isEditing ? (
					<input
						type="text"
						value={taskTitle}
						onChange={(event) => setTaskTitle(event.target.value)}
						ref={ref}
						onKeyUp={handleKeyUp}
					/>
				) : (
					<p>{title}</p>
				)}
			</div>
			<div className="flex gap-5 items-center">
				<button
					className="text-blue-500 hover:text-blue-700 edit-btn w-4 h-4"
					onClick={handleEdit}
				>
					{isEditing ? <CheckIcon /> : <PenIcon />}
				</button>
				<button
					className="text-red-500 hover:text-red-700 delete-btn w-4 h-4"
					onClick={handleDelete}
				>
					<TrashIcon />
				</button>
			</div>
		</li>
	);
};
