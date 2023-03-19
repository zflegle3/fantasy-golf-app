export const addFocus = (e) => {
    e.target.parentElement.parentElement.classList.add("focus");
}

export const removeFocus = (e) => {
    e.target.parentElement.parentElement.classList.remove("focus");
}