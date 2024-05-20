export const saveAuthToLocalStorage = (store) => (next) => (action) => {
  let result = next(action);
  if (action.type.startsWith("auth/")) {
    const authState = store.getState().auth;
    localStorage.setItem("auth", JSON.stringify(authState));
  }
  return result;
};

export const loadAuthFromLocalStorage = () => {
  const serializedState = localStorage.getItem("auth");
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};
