export const genrealService= async(method ,url,headers,body)=>{
  const Route=import.meta.env.VITE_API_BASE_URL+url
  let options = {
    method: method,
    headers: {
      "x-rapidapi-key": "15ffea1c9fmsh31fafcf35aab04cp1f718ejsnd16f8057c7cf",
      "x-rapidapi-host": "studentinfoapi.p.rapidapi.com",
      "Content-Type": headers?.Content_Type,
    },
  };
  if(body){
    options["body"]=body
  }
  try {
    const response = await fetch(Route, options);
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error);
  }
}