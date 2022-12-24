import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => window.removeEventListener('keydown', closeModal);
  });

  const closeModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) onCloseModal();
  };

  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={image} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
