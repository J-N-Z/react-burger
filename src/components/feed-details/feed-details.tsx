import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { PreviewImage } from '@components/preview-image/preview-image';
import { orderStatus } from '@utils/constants';

import type { TIngredient, StatusKeys } from '@utils/types';

import styles from './feed-details.module.css';

const Price = ({ value }: { value: number | string }) => (
  <div className={styles.price}>
    <p className="text text_type_digits-default">{value}</p>
    <CurrencyIcon type="primary" />
  </div>
);

const FeedDetailsItem = ({
  imageUrl,
  name,
  price,
}: {
  imageUrl: string;
  name: string;
  price: number | string;
}) => (
  <div className={styles.item}>
    <PreviewImage url={imageUrl} />
    <h3 className="text text_type_main-default">{name}</h3>
    <div style={{ marginLeft: 'auto' }}>
      <Price value={price} />
    </div>
  </div>
);

export const FeedDetails = ({
  name,
  number,
  status,
  ingredients,
  createdDate,
}: {
  name: string;
  number?: number;
  status: StatusKeys;
  ingredients: TIngredient[];
  createdDate: string;
}): React.JSX.Element => {
  const date = new Date(createdDate).toLocaleDateString();
  const totalPrice = ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  const statusColor = status === 'done' ? '#00CCCC' : 'inherit';

  // ingredients без дублей, для вывода
  const ingredientsUnique: TIngredient[] = [];

  ingredients.forEach((ingredient) => {
    if (!ingredientsUnique.find((item) => item._id === ingredient._id)) {
      ingredientsUnique.push(ingredient);
    }
  });

  // ingredients с полем count для хранения количества
  const ingredientsCount: { _id: string; count: number }[] = [];

  ingredients.forEach((ingredient) => {
    const targetItem = ingredientsCount.find((item) => item._id === ingredient._id);
    if (!targetItem) {
      ingredientsCount.push({ _id: ingredient._id, count: 1 });
    } else {
      targetItem.count += 1;
    }
  });

  return (
    <div>
      {number && (
        <p
          className="text text_type_digits-default mb-6"
          style={{ textAlign: 'center' }}
        >
          #{number}
        </p>
      )}

      <h1 className="text text_type_main-medium mb-3">{name}</h1>
      <p className="text text_type_main-default mb-15" style={{ color: statusColor }}>
        {orderStatus[status]}
      </p>
      <section className="mb-10">
        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
        <div className={styles.items_container}>
          {ingredientsUnique.map((ingredient) => {
            const count =
              ingredientsCount.find((item) => item._id === ingredient._id)?.count ?? 1;
            const price =
              count > 1 ? `${count} x ${ingredient.price}` : ingredient.price;
            return (
              <div key={ingredient._id} className="mb-4">
                <FeedDetailsItem
                  imageUrl={ingredient.image}
                  name={ingredient.name}
                  price={price}
                />
              </div>
            );
          })}
        </div>
      </section>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">{date}</p>
        <Price value={totalPrice} />
      </div>
    </div>
  );
};
