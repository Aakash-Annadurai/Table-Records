export const generalService = async (method, url, headers, body) => {
  const Route = import.meta.env.VITE_API_BASE_URL + url;
  const STUDENTS_KEY = import.meta.env.VITE_STUDENTS_API_KEY;
  let options = {
    method: method,
    headers: {
      "x-rapidapi-key": STUDENTS_KEY,
      "x-rapidapi-host": "studentinfoapi.p.rapidapi.com",
      "Content-Type": headers?.Content_Type,
    },
  };
  if (body) {
    options["body"] = body;
  }
  try {
    const response = await fetch(Route, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
