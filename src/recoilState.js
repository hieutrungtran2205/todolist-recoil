import { atom } from "recoil";

export const todoListState = atom({
    key: "todoListState",
    default: JSON.parse(localStorage.getItem("todoRecoil")) ?? []
});

// JSON.parse(localStorage.getItem("todoRecoil"))