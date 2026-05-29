import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal')!;

type TModalProps = {
  title?: string | React.JSX.Element;
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ title, children, onClose }: TModalProps): React.ReactPortal => {
  useEffect(() => {
    const handleClick = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleClick);

    return (): void => {
      document.removeEventListener('keydown', handleClick);
    };
  }, []);

  const getTitle = () => {
    if (title) {
      if (typeof title === 'string') {
        return (
          <h3 className="text text_type_main-large" data-testid="modal-title">
            {title}
          </h3>
        );
      } else {
        return title;
      }
    }

    return null;
  };

  return createPortal(
    <section data-testid="modal">
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        <header className={styles.header}>
          {getTitle()}
          <div className={styles.close} data-testid="modal-close">
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </header>
        {children}
      </div>
    </section>,
    modalRoot
  );
};
