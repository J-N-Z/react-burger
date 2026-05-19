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
        return <h3 className="text text_type_main-large">{title}</h3>;
      } else {
        return title;
      }
    }

    return null;
  };

  return createPortal(
    <section>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        <header className={styles.header}>
          {getTitle()}
          <CloseIcon className={styles.close} type="primary" onClick={onClose} />
        </header>
        {children}
      </div>
    </section>,
    modalRoot
  );
};
