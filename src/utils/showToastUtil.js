export const handleCreateErrorToast = (message,toast) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };