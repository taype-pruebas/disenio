import { toast } from "react-toastify";

export const handleNotification = (error, message) => {
  switch (error) {
    case 404:
      toast.error(`${message}`, {
        position: "top-right",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
      });
      break;
    case 200:
      toast.success(`${message}`, {
        position: "top-right",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
      });
      break;
    case 500:
      toast.info(`${message}`, {
        position: "top-right",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
      });
      break;
    default:
      toast.info("Mensaje no disponible", {
        position: "top-right",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
      });
      break;
  }
};
