import { useContext } from "react";
import { deleteUserById } from "../../services/user-service";
import { DataContext } from "../../contexts/DataContext";

const DeleteUser = ({ setIsOpen }) => {
  const { userSelected } = useContext(DataContext);

  const handleDelete = async () => {
    try {
      await deleteUserById(userSelected[0]).then((response) => {
        console.log("User deleted successfully", response);
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="text-center">
      <p className="mt-5 text-xl">Are you sure you want to delete</p>
      <p className="text-2xl font-medium">{userSelected && userSelected[1]}?</p>

      <div className="flex justify-center gap-2 mt-5">
        <button
          className="rounded-xl p-2 text-black bg-gray-300 hover:bg-gray-400"
          onClick={() => setIsOpen(false)}
        >
          Cancle
        </button>
        <button
          className="rounded-xl py-2 px-5 bg-red-500 hover:bg-red-600 text-white"
          onClick={() => handleDelete()}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
