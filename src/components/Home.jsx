import path from "../path";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
      <>
        <div className="homepage">
          <h1>Aakash's Demo Table</h1>
          <button
            className="cell5 view"
            onClick={() => {
              navigate(path.table);
            }}
          >
            View Table
          </button>
        </div>
      </>
    );
  };

export default Home;