import './modal.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageUrl }) {
  const closeModal = e => {
    if (e.code === 'Escape') onClose();
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  return createPortal(
    <div className="overlay" onClick={closeModal}>
      <div className="modal">
        <img src={largeImageUrl} alt="" />
      </div>
    </div>,
    modalRoot
  );
}
