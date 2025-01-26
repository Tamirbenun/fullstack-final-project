import { useContext } from "react";
import Swal from "sweetalert2";
import { DataContext } from "../../contexts/DataContext";
import { deleteEmail } from "../../services/newsletter-service";

const DeleteEmail = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { emailSelected } = useContext(DataContext);

  const handleDelete = async () => {
    try {
      await deleteEmail(emailSelected).then((response) => {
        if (!response.data.error) {
          Swal.fire({
            title: "success",
            text: "Email Delete successfully",
            icon: "success",
            confirmButtonText: "Ok",
            customClass: {
              popup: "custom-swal",
              confirmButton: "custom-confirm-button",
            },
          });
        } else {
          console.error("Error Delete email:", response.data.error);
          Swal.fire({
            title: "Error",
            text: response.data.error,
            icon: "error",
            confirmButtonText: "Ok",
            customClass: {
              popup: "custom-swal",
              confirmButton: "custom-confirm-button",
            },
          });
        }
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error Delete Destinations:", error);
    }
  };

  return (
    <div className="text-center">
      <p className="mt-5 text-xl dark:text-white/60">
        Are you sure you want to delete {emailSelected}?
      </p>
      <div className="flex justify-center gap-2 mt-8">
        <button
          className="rounded-2xl p-2 text-black bg-gray-300 hover:bg-gray-400 dark:text-black/60 dark:bg-white/40 dark:hover:bg-white/60"
          onClick={() => setIsOpen(false)}
        >
          Cancle
        </button>
        <button
          className="rounded-2xl py-2 px-5 bg-red-500 hover:bg-red-600 text-white"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteEmail;
