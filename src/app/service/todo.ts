import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TodosState, TodoType } from "../types/todo";

export const fetchTodos = createAsyncThunk<TodoType[]>("todos", async () => {
	const response = await axios.get<TodoType[]>(
		"https://jsonplaceholder.typicode.com/todos"
	);
	return response.data;
});

const initialState: TodosState = {
	todos: [],
	loading: false,
};

export const todoSlice = createSlice({
	name: "todoSlice",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<{ title: string }>) => {
			const newTask: TodoType = {
				id: Math.max(...state.todos.map((todo) => todo.id)) + 1,
                userId: 1,
				title: action.payload.title,
				completed: false,
			};

			state.todos.unshift(newTask);
		},
		editTodo: (state, action: PayloadAction<TodoType>) => {
			const index = state.todos.findIndex(
				(todo) => todo.id === action.payload.id
			);
			if (index !== -1) {
				state.todos[index] = action.payload;
			}
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter(
				(todo) => todo.id !== action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.todos = action.payload;
				state.loading = false;
			})
			.addCase(fetchTodos.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
