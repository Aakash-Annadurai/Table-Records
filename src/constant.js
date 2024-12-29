import { Route } from "react-router-dom";

const path = {
  home: "/",
  table: "/table-demo",
};

export default path;


export const method={
delete:"DELETE",
get:"GET",
post:"POST",
put:"PUT"
}

export const route={
  delete:(id)=>`/delete/${id}`,
  add:"/add"
}