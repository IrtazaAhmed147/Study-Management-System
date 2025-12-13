import { toast } from "react-toastify";

export const notify = (theme, msg)=> {
    return toast[theme](msg, {
        position: "top-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         
     });
 }

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
