import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { PreviewImage } from '@components/preview-image/preview-image';
import { orderStatus } from '@utils/constants';

import type { StatusKeys } from '@utils/types';

import styles from './order-item.module.css';

const ICON_OFFSET = -16;

export const OrderItem = ({
  name,
  number,
  status,
  price,
  previewImages,
  createdDate,
}: {
  name: string;
  number: number;
  status: StatusKeys;
  price: number;
  previewImages: string[];
  createdDate: string;
}) => {
  const date = new Date(createdDate).toLocaleDateString();

  return (
    <div className={styles.container}>
      <div className={`${styles.info} mb-6`}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-small text_color_inactive">{date}</p>
      </div>
      <p className="text text_type_main-medium mb-2">{name}</p>
      <p className="text text_type_main-small mb-6">{orderStatus[status]}</p>
      <div className={styles.info}>
        <div style={{ display: 'flex' }}>
          {previewImages.map((imageUrl, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                transform: `translateX(${ICON_OFFSET * index}px)`,
                zIndex: previewImages.length - 1 - index,
              }}
            >
              <PreviewImage url={imageUrl} />
            </div>
          ))}
        </div>
        <div className={styles.price_container}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
