import { atom, atomFamily, selector } from "recoil";

export const TODO_STORAGE = "todoRecoil";

export const todoListState = atom({
    key: "todoListState",
    default: JSON.parse(localStorage.getItem(TODO_STORAGE)) ?? []
}
);

export const todoIdState = atom({
    key: "todoDetailState",
    default: undefined
}
);

export const countTodoState = selector({
    key: "countTodoState",
    get: ({ get }) => {
        const todoList = get(todoListState);
        return todoList.length;
    }
});

export const colorDoneState = atomFamily({
    key: "colorDoneState",
    default: "white"
});

export const getTodoAPI = selector({
    key: "getTodoAPI",
    get: async ({ get }) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await response.json();

            return data;
        } catch (error) {
            throw error;
        }
    }
})

