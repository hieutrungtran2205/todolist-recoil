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

// const url = `https://reqres.in/api/users?page=1`;
// export const getTodoAPI = selector({
//     key: "getTodoAPI",
//     get: async ({ get }) => {
//         try {
//             const response = await fetch(url);
//             const data1 = response.json;
//             console.log("data1 in recoilState:", data1);
//             const { data } = data1
//             console.log("data in recoilState:", data);

//             return data;
//         } catch (error) {
//             throw error;
//         }
//     }
// })

