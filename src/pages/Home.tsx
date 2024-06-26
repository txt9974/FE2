import { Products } from "../interfaces/Products";

type Props = {
  products: Products[];
  onDel: (id: number) => void;
};

const Home = ({ products, onDel }: Props) => {
  const Del = (id: number) => {
    onDel(id);
  };
  return (
    <div>
      <h1>Danh sach</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.title}</td>
              <td>{i.price}</td>
              <td>{i.description}</td>
              <td>
                <img className="h-10 w-10" src={i.thumbnail} alt="" />
              </td>
              <td>
                <button onClick={() => Del(i.id)}>Del</button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
