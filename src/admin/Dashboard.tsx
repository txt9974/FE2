import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProdContext } from "../contexts/Products";

const Dashboard = () => {
  const { state, onDel } = useContext(ProdContext);
  return (
    <div>
      <h1 className="font-bold text-3xl">LIST</h1>
      <Link to="/admin/add">
        <button className="btn btn-primary">Add</button>
      </Link>
      <table>
        <thead className="text-center">
          <tr>
            <th className="border-2 border-black">ID</th>
            <th className="border-2 border-black">Title</th>
            <th className="border-2 border-black">Price</th>
            <th className="border-2 border-black">Description</th>
            <th className="border-2 border-black">Thumbnail</th>
            <th className="border-2 border-black">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {state.products.map((i) => (
            <tr key={i._id}>
              <td className="border-2 border-black">{i._id}</td>
              <td className="border-2 border-black">{i.title}</td>
              <td className="border-2 border-black">{i.price}</td>
              <td className="border-2 border-black">{i.description}</td>
              <td className="border-2 border-black">
                <img className="h-10 w-10" src={i.thumbnail} alt="" />
              </td>
              <td className="border-2 border-black">
                <button
                  className="bg-red-500 text-white w-20 rounded-[5px]"
                  onClick={() => onDel(String(i._id))}
                >
                  Del
                </button>
                <Link to={`/admin/edit/${i._id}`}>
                  <button className="bg-blue-500 text-white w-20 rounded-[5px]">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
