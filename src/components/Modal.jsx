function Modal({ children, id }) {
  return (
    <div>
      <dialog id={id} className="modal">
        <div className="modal-box p-6 bg-white rounded shadow-lg relative">
          <button
            className="absolute top-0 right-0 mt-2 mr-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
            onClick={() => document.getElementById(id).close()}
          >
            <svg
              className="w-4 h-4 fill-current text-gray-700"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.707 6.293a1 1 0 011.414 0L10 8.586l2.879-2.88a1 1 0 111.414 1.415L11.414 10l2.88 2.879a1 1 0 01-1.415 1.414L10 11.414l-2.879 2.88a1 1 0 01-1.414-1.415L8.586 10 5.707 7.121a1 1 0 010-1.414z" />
            </svg>
          </button>
          {children}
        </div>
      </dialog>
    </div>
  );
}

export default Modal;
