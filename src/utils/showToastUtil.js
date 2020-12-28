export const handleCreateErrorToast = (message,toast,duration,onCloseHandler) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      onClose:onCloseHandler
    });
  };