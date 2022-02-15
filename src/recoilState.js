import { atom } from "recoil";

export const TODO_STORAGE = "todoRecoil";

export const todoListState = atom({
    key: "todoListState",
    default: JSON.parse(localStorage.getItem(TODO_STORAGE)) ?? []
}
);
