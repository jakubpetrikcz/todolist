import { TodoList } from "./components";

export const App = () => {
	return (
		<main className="container mx-auto my-10">
			<h1 className="text-center text-3xl font-bold mb-4">To Do List</h1>
			<TodoList />
		</main>
	);
};
