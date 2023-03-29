export const fetchApi = async (url) => {
  let resp = [];
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      resp = [...json];
    })
    .catch(() => {
      console.log("Run yarn movie-api for fake api");
    });
  return resp;
};
