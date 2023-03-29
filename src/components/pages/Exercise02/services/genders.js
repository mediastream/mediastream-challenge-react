export const getGenders = async () => {
  console.log("Getting genders");
  try {
    const resp = await fetch("http://localhost:3001/genres");
    return await resp.json();
  } catch (error) {
    console.log("Run yarn movie-api for fake api", error);
  }
};
