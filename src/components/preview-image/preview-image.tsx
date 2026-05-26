import styles from './preview-image.module.css';

export const PreviewImage = ({ url }: { url: string }) => (
  <div
    className={`${styles.image_container}`}
    style={{
      backgroundImage: `url(${url})`,
      backgroundColor: '#1c1c21',
    }}
  />
);
