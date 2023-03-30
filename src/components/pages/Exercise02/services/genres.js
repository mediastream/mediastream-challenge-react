export const getGenres = async () => {
  try {
    const resp = await fetch(`http://localhost:3001/genres`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await resp.json();
  } catch (error) {
    console.log("Run yarn movie-api for fake api");
    return null;
  }
};
