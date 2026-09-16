# Схема БД: Mubarak

## 1. `users` — Пользователи

Главная таблица клиентов и сотрудников.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | Уникальный идентификатор пользователя |
| `phone` | VARCHAR(20) | Номер телефона |
| `email` | VARCHAR(255) | Электронная почта |
| `password_hash` | VARCHAR(255) | Хэш пароля |
| `first_name` | VARCHAR(100) | Имя |
| `last_name` | VARCHAR(100) | Фамилия |
| `avatar_url` | TEXT | Ссылка на фотографию |
| `preferred_language` | VARCHAR(5) | Язык пользователя: `ky`, `ru`, `en` |
| `status` | VARCHAR(20) | Статус: `active` / `blocked` |
| `phone_verified` | BOOLEAN | Подтверждён ли телефон |
| `email_verified` | BOOLEAN | Подтверждён ли email |
| `last_login_at` | TIMESTAMP | Последний вход |
| `created_at` | TIMESTAMP | Дата регистрации |
| `updated_at` | TIMESTAMP | Дата изменения |

---

## 2. `roles` — Роли

В первом этапе достаточно реализовать разграничение доступа.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID роли |
| `name` | VARCHAR(50) | Название роли |
| `code` | VARCHAR(50) | Системный код роли |
| `description` | TEXT | Описание роли |

---

## 3. `user_roles` — Роли пользователей

Связывает пользователя с его ролью.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID записи |
| `user_id` | UUID | Пользователь |
| `role_id` | UUID | Роль |
| `created_at` | TIMESTAMP | Дата назначения |

---

## 4. `branches` — Филиалы

ТЗ предусматривает сеть из 9+ филиалов и управление ими.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID филиала |
| `name` | VARCHAR(255) | Название филиала |
| `code` | VARCHAR(50) | Уникальный код |
| `address` | TEXT | Адрес |
| `city` | VARCHAR(100) | Город |
| `phone` | VARCHAR(20) | Телефон |
| `latitude` | DECIMAL(10,7) | Географическая широта |
| `longitude` | DECIMAL(10,7) | Географическая долгота |
| `opening_time` | TIME | Время открытия |
| `closing_time` | TIME | Время закрытия |
| `status` | VARCHAR(20) | `active` / `inactive` |
| `created_at` | TIMESTAMP | Дата создания |

Координаты сразу позволят в будущем подключить Google Maps/2GIS, которые предусмотрены ТЗ.

---

## 5. `restaurant_zones` — Зоны ресторана

Нужна для бронирования: зал, терраса, VIP.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID зоны |
| `branch_id` | UUID | Филиал |
| `name` | VARCHAR(100) | Название зоны |
| `description` | TEXT | Описание |
| `capacity` | INTEGER | Вместимость |
| `status` | VARCHAR(20) | `active` / `inactive` |

---

## 6. `restaurant_tables` — Столы

Нужна для бронирования и QR-заказа.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID стола |
| `branch_id` | UUID | Филиал |
| `zone_id` | UUID | Зона |
| `table_number` | VARCHAR(20) | Номер стола |
| `seats_count` | INTEGER | Количество мест |
| `status` | VARCHAR(20) | `available` / `occupied` / `inactive` |
| `qr_token` | VARCHAR(255) | Уникальный токен QR |
| `created_at` | TIMESTAMP | Дата создания |

Это покрывает часть требований QR-меню и QR-заказа.

---

## 7. `menu_categories` — Категории меню

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID категории |
| `parent_id` | UUID NULL | Родительская категория |
| `name` | VARCHAR(255) | Название |
| `slug` | VARCHAR(255) | URL-идентификатор |
| `description` | TEXT | Описание |
| `sort_order` | INTEGER | Порядок отображения |
| `is_active` | BOOLEAN | Активность |

`parent_id` позволит сделать, например:

> Кухня → Восточная → Плов

---

## 8. `dishes` — Блюда

Основная таблица меню. ТЗ требует фото, цену, описание, состав, калории, БЖУ, аллергены, вес, время приготовления и остроту.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID блюда |
| `category_id` | UUID | Категория |
| `name` | VARCHAR(255) | Название |
| `description` | TEXT | Описание |
| `composition` | TEXT | Состав |
| `image_url` | TEXT | Основная фотография |
| `price` | DECIMAL(12,2) | Цена |
| `weight_grams` | INTEGER | Вес блюда |
| `calories` | DECIMAL(8,2) | Калорийность |
| `protein` | DECIMAL(8,2) | Белки |
| `fat` | DECIMAL(8,2) | Жиры |
| `carbohydrates` | DECIMAL(8,2) | Углеводы |
| `cooking_time_minutes` | INTEGER | Время приготовления |
| `spicy_level` | SMALLINT | Уровень остроты |
| `is_available` | BOOLEAN | Доступно ли блюдо |
| `is_active` | BOOLEAN | Показывать ли в меню |
| `created_at` | TIMESTAMP | Дата создания |
| `updated_at` | TIMESTAMP | Дата изменения |

---

## 9. `dish_translations` — Переводы блюд

ТЗ требует три языка: кыргызский, русский и английский.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID |
| `dish_id` | UUID | Блюдо |
| `language_code` | VARCHAR(5) | `ky` / `ru` / `en` |
| `name` | VARCHAR(255) | Переведённое название |
| `description` | TEXT | Переведённое описание |
| `composition` | TEXT | Переведённый состав |

---

## 10. `delivery_addresses` — Адреса доставки

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID адреса |
| `user_id` | UUID | Клиент |
| `label` | VARCHAR(100) | Название: Дом / Работа |
| `address` | TEXT | Адрес |
| `city` | VARCHAR(100) | Город |
| `latitude` | DECIMAL(10,7) | Широта |
| `longitude` | DECIMAL(10,7) | Долгота |
| `entrance` | VARCHAR(20) | Подъезд |
| `floor` | VARCHAR(20) | Этаж |
| `apartment` | VARCHAR(20) | Квартира |
| `comment` | TEXT | Комментарий курьеру |
| `is_default` | BOOLEAN | Адрес по умолчанию |
| `created_at` | TIMESTAMP | Дата добавления |

---

## 11. `shopping_carts` — Корзины

Для онлайн-заказа.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID корзины |
| `user_id` | UUID | Пользователь |
| `branch_id` | UUID | Филиал |
| `status` | VARCHAR(20) | `active` / `converted` / `abandoned` |
| `created_at` | TIMESTAMP | Создание |
| `updated_at` | TIMESTAMP | Изменение |

---

## 12. `cart_items` — Товары корзины

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID |
| `cart_id` | UUID | Корзина |
| `dish_id` | UUID | Блюдо |
| `quantity` | INTEGER | Количество |
| `unit_price` | DECIMAL(12,2) | Цена на момент добавления |
| `comment` | TEXT | Комментарий к блюду |
| `created_at` | TIMESTAMP | Добавление |

---

## 13. `orders` — Заказы

Это главная таблица первого этапа.

ТЗ предусматривает заказ в зале, доставку, самовывоз, предзаказ, выбор времени и комментарии.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID заказа |
| `order_number` | VARCHAR(50) | Номер заказа |
| `user_id` | UUID | Клиент |
| `branch_id` | UUID | Филиал |
| `table_id` | UUID NULL | Стол для заказа в ресторане |
| `address_id` | UUID NULL | Адрес доставки |
| `order_type` | VARCHAR(30) | `dine_in` / `delivery` / `pickup` |
| `status` | VARCHAR(30) | Статус заказа |
| `scheduled_at` | TIMESTAMP NULL | Время предзаказа |
| `subtotal` | DECIMAL(12,2) | Сумма блюд |
| `discount_amount` | DECIMAL(12,2) | Сумма скидки |
| `delivery_fee` | DECIMAL(12,2) | Стоимость доставки |
| `total_amount` | DECIMAL(12,2) | Итоговая сумма |
| `comment` | TEXT | Комментарий |
| `created_at` | TIMESTAMP | Создание |
| `updated_at` | TIMESTAMP | Изменение |
| `completed_at` | TIMESTAMP NULL | Завершение |

---

## 14. `order_items` — Позиции заказа

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID |
| `order_id` | UUID | Заказ |
| `dish_id` | UUID | Блюдо |
| `dish_name` | VARCHAR(255) | Название на момент заказа |
| `quantity` | INTEGER | Количество |
| `unit_price` | DECIMAL(12,2) | Цена на момент покупки |
| `discount_amount` | DECIMAL(12,2) | Скидка |
| `total_price` | DECIMAL(12,2) | Итоговая стоимость |
| `comment` | TEXT | Комментарий |
| `created_at` | TIMESTAMP | Создание |

---

## 15. `payments` — Платежи

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID платежа |
| `order_id` | UUID | Заказ |
| `amount` | DECIMAL(12,2) | Сумма |
| `method` | VARCHAR(30) | Способ оплаты |
| `status` | VARCHAR(30) | `pending` / `paid` / `failed` / `refunded` |
| `transaction_id` | VARCHAR(255) | ID транзакции платёжной системы |
| `provider` | VARCHAR(100) | Платёжный провайдер |
| `paid_at` | TIMESTAMP NULL | Время оплаты |
| `created_at` | TIMESTAMP | Создание |

---

## 16. `reservations` — Бронирования

ТЗ требует выбора филиала, зоны, даты, времени, количества гостей, депозита и предзаказа.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID бронирования |
| `reservation_number` | VARCHAR(50) | Номер бронирования |
| `user_id` | UUID | Клиент |
| `branch_id` | UUID | Филиал |
| `zone_id` | UUID NULL | Зона |
| `table_id` | UUID NULL | Стол |
| `reservation_date` | DATE | Дата |
| `start_time` | TIME | Время начала |
| `end_time` | TIME | Время окончания |
| `guests_count` | INTEGER | Количество гостей |
| `status` | VARCHAR(30) | `pending` / `confirmed` / `cancelled` / `completed` / `no_show` |
| `deposit_amount` | DECIMAL(12,2) | Размер депозита |
| `deposit_payment_id` | UUID NULL | Платёж депозита |
| `comment` | TEXT | Комментарий |
| `created_at` | TIMESTAMP | Дата создания |
| `updated_at` | TIMESTAMP | Дата изменения |

---

## 17. `reservation_items` — Предзаказ блюд

Поскольку в ТЗ прямо указан предзаказ блюд при бронировании.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID |
| `reservation_id` | UUID | Бронирование |
| `dish_id` | UUID | Блюдо |
| `quantity` | INTEGER | Количество |
| `unit_price` | DECIMAL(12,2) | Цена |
| `comment` | TEXT | Комментарий |

---

## 18. `customer_profiles` — Профиль клиента / CRM

CRM в ТЗ должна хранить историю клиентов, средний чек, частоту посещений и другую информацию.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID профиля |
| `user_id` | UUID | Клиент |
| `birthday` | DATE NULL | День рождения |
| `total_orders` | INTEGER | Количество заказов |
| `total_spent` | DECIMAL(14,2) | Общая сумма покупок |
| `average_check` | DECIMAL(12,2) | Средний чек |
| `first_order_at` | TIMESTAMP NULL | Первый заказ |
| `last_order_at` | TIMESTAMP NULL | Последний заказ |
| `marketing_consent` | BOOLEAN | Согласие на маркетинговые сообщения |
| `created_at` | TIMESTAMP | Создание |
| `updated_at` | TIMESTAMP | Обновление |

---

## 19. `notifications` — Уведомления

ТЗ предусматривает SMS, Telegram и push-уведомления, а PWA должна поддерживать push.

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID |
| `user_id` | UUID | Получатель |
| `type` | VARCHAR(50) | Тип уведомления |
| `channel` | VARCHAR(20) | `push` / `sms` / `email` / `telegram` |
| `title` | VARCHAR(255) | Заголовок |
| `message` | TEXT | Текст |
| `status` | VARCHAR(20) | `pending` / `sent` / `failed` / `read` |
| `related_entity_type` | VARCHAR(50) NULL | Связанная сущность |
| `related_entity_id` | UUID NULL | ID связанной сущности |
| `sent_at` | TIMESTAMP NULL | Время отправки |
| `read_at` | TIMESTAMP NULL | Время прочтения |
| `created_at` | TIMESTAMP | Создание |

---

## 20. `audit_logs` — Журнал действий

| Поле | Тип | Описание |
|---|---|---|
| `id` | BIGSERIAL | ID записи |
| `user_id` | UUID NULL | Кто совершил действие |
| `action` | VARCHAR(100) | Выполненное действие |
| `entity_type` | VARCHAR(100) | Тип объекта |
| `entity_id` | UUID NULL | ID объекта |
| `old_data` | JSONB NULL | Старое состояние |
| `new_data` | JSONB NULL | Новое состояние |
| `user_agent` | TEXT NULL | Браузер/устройство |
| `created_at` | TIMESTAMP | Время действия |
