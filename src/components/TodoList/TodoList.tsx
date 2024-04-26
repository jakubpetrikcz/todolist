import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchTodos } from "../../app/service/todo";
import { Task } from "../Task";
import { CreateTask } from "../CreateTask";

export const TodoList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const todos = useSelector((state: RootState) => state.todoSlice.todos);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<CreateTask />
			<ul>
				{todos.map((todo) => (
					<Task key={todo.id} {...todo} />
				))}
			</ul>
		</div>
	);
};
