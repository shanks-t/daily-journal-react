export const getMoods = () => {
  return fetch("http://localhost:8088/moods")
    .then(res => res.json())
};

export const getTags = () => {
  return fetch("http://localhost:8088/tags")
    .then(res => res.json())
};
