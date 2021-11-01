export const getGeneres = async () => {

  const response =  await fetch('http://localhost:3001/genres')
  const data = await response.json();

  return data;

}