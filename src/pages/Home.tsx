import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProdContext } from "../contexts/Products";

const Home = () => {
  const { state } = useContext(ProdContext);

  return (
    <div>
      {state.products.map((i) => (
        <div key={i._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card">
            <img src={i.thumbnail} className="card-img-top" alt={i.title} />
            <div className="card-body">
              <h5 className="card-title">{i.title}</h5>
              <p className="card-text">${i.price}</p>
              <Link to={`/detail/${i._id}`}>Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
