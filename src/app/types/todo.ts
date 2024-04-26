export type TodosState = {
	todos: TodoType[];
	loading: boolean;
};

export type TodoType = {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
};
