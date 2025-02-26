import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { RiEditBoxLine } from "react-icons/ri";
import Swal from "sweetalert2";
import "./APP.CSS";

export default function App() {
  const nameInput = useRef();
  const priceInput = useRef();
  const qnyInput = useRef();

  const [phones, setPhones] = useState([
    { name: "iphone", price: 1000, qty: 3 },
    { name: "samsung", price: 2000, qty: 6 },
    { name: "nokia", price: 3000, qty: 10 },
  ]);

  const [modalIndex, setModalIndex] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPhone = {
      name: nameInput.current.value,
      price: +priceInput.current.value,
      qty: +qnyInput.current.value,
    };

    let copy = [...phones];

    if (editIndex !== null) {
      copy[editIndex] = newPhone;
      setEditIndex(null);
      Swal.fire({
        icon: "success",
        title: "Phone updated successfully",
        timer: 1200,
      });
    } else {
      copy.push(newPhone);
      Swal.fire({
        icon: "success",
        title: "Phone added successfully",
        timer: 1200,
      });
    }

    setPhones(copy);
    setModalIndex(false);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let copy = [...phones];
        copy.splice(index, 1);
        setPhones(copy);
        Swal.fire("Deleted!", "Your phone has been deleted.", "success");
      }
    });
  };

  const handleEdit = (index) => {
    let phone = phones[index];
    nameInput.current.value = phone.name;
    priceInput.current.value = phone.price;
    qnyInput.current.value = phone.qty;
    setEditIndex(index);
    setModalIndex(true);
  };

  return (
    <div className="col-12 APP text-center container d-flex flex-column align-items-center">
      <h1>Fatora System</h1>
      <button onClick={() => setModalIndex(true)} className="btn btn-primary">
        Add New Phone
      </button>

      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Phone Name</th>
            <th>Phone Price</th>
            <th>Phone Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((el, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{el.name}</td>
              <td>{el.price}</td>
              <td>{el.qty}</td>
              <td>
                <div className="d-flex gap-3">
                  <FaTrash
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(index)}
                  />
                  <RiEditBoxLine
                    className="text-warning"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(index)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalIndex && (
        <div
          onClick={() => {
            setModalIndex(false);
            setEditIndex(null);
          }}
          className="mymodal d-flex justify-content-center align-items-center"
        >
          <form
            onSubmit={handleSubmit}
            onClick={(event) => event.stopPropagation()}
            className="bg-white rounded shadow p-3 d-flex flex-column gap-3 col-12 col-md-5 animate__animated animate__fadeInDown"
          >
            <input
              ref={nameInput}
              type="text"
              className="form-control"
              placeholder="Enter phone name"
            />
            <input
              ref={priceInput}
              type="number"
              className="form-control"
              placeholder="Enter phone price"
            />
            <input
              ref={qnyInput}
              type="number"
              className="form-control"
              placeholder="Enter phone quantity"
            />
            <button className="btn btn-primary">
              {editIndex !== null ? "Update Phone" : "Add New Phone"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
