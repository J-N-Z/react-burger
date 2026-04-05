import styles from './not-found-page.module.css';

export const NotFoundPage = (): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large">404 Not Found</p>
    </div>
  );
};
