export const fetchGender = async() =>{
  return fetch("http://localhost:3001/genres").then((res) => res.json()).catch(() => {
    console.log("Run yarn movie-api for fake api")
  })
}
