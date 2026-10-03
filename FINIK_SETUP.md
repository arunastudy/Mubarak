# 🔐 Интеграция Finik Pay - Инструкция по использованию

## ✅ Что уже настроено

### 1. Переменные окружения (.env)
Все необходимые переменные уже присутствуют в вашем `.env` файле:
- `FINIK_ENV="prod"` - Продакшн окружение
- `FINIK_API_KEY` - Ваш API ключ
- `FINIK_ACCOUNT_ID` - ID вашего аккаунта
- `FINIK_PRIVATE_KEY` - Приватный ключ для подписи запросов

### 2. Установленные библиотеки
- `@mancho.devs/authorizer` - Для криптографических подписей

### 3. Созданные файлы

#### Библиотека Finik (`lib/finik.ts`)
- `createFinikPayment()` - Создание платежа
- `verifyFinikWebhook()` - Верификация webhook
- `isTimestampValid()` - Проверка timestamp

#### API Endpoints
- `/api/finik/create-payment` - Создание платежа с фиксированной ценой 5 сом
- `/api/finik/webhook` - Обработка webhook от Finik

#### React Компоненты
- `FinikPayButton` - Готовая кнопка оплаты
- `/payment-demo` - Демонстрационная страница

## 🚀 Как использовать

### Вариант 1: Использование готовой кнопки

```tsx
import FinikPayButton from '@/app/components/FinikPayButton';

export default function MyPage() {
  return (
    <FinikPayButton
      userId="user-123"
      description="Оплата заказа #456"
      metadata={{
        orderId: "order-456",
        customField: "value"
      }}
      buttonText="Оплатить 5 сом"
    />
  );
}
```

### Вариант 2: Кастомная реализация

```tsx
const handlePayment = async () => {
  const response = await fetch('/api/finik/create-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 'user-123',
      description: 'Описание платежа',
      metadata: { orderId: '456' }
    }),
  });

  const { paymentUrl } = await response.json();
  window.location.href = paymentUrl;
};
```

## 🧪 Тестирование

### 1. Запустите dev сервер
```bash
npm run dev
```

### 2. Откройте демо страницу
```
http://localhost:3000/payment-demo
```

### 3. Для тестирования webhook локально

Используйте ngrok для доступа к localhost из интернета:

```bash
# Установите ngrok
# Windows: https://ngrok.com/download

# Запустите ngrok
ngrok http 3000

# Обновите NEXT_PUBLIC_APP_URL в .env на ngrok URL
NEXT_PUBLIC_APP_URL="https://your-subdomain.ngrok.io"
```

## 📊 Обработка webhook

Webhook автоматически вызывается после успешной оплаты. Логика обработки находится в `/api/finik/webhook/route.ts`.

### Пример логирования в консоли:
```
[PAYMENT_SUCCESS] User ID: user-123 | Amount: 5 сом | Transaction: txn-xxx | Payment ID: payment-xxx
```

### Добавьте свою логику в webhook:

Откройте `app/api/finik/webhook/route.ts` и найдите секцию:

```typescript
// 8. ЗДЕСЬ ВАША ЛОГИКА ОБРАБОТКИ УСПЕШНОГО ПЛАТЕЖА
console.log(`[PAYMENT_SUCCESS] ...`);

// Пример: Обновление в БД
// await prisma.payment.create({
//   data: {
//     userId,
//     amount: body.amount,
//     status: 'PAID',
//     transactionId: body.transactionId,
//   },
// });
```

## 🔐 Безопасность

### Продакшн окружение (уже настроено)
- ✅ Используется приватный ключ для подписи запросов
- ✅ Webhook верифицируется публичным ключом Finik
- ✅ Проверка timestamp защищает от replay-атак
- ✅ Все credentials в .env файле

### Важно:
- Никогда не коммитьте `.env` в git
- `.env` уже добавлен в `.gitignore`

## 🌐 Продакшн деплой

### Перед деплоем убедитесь:

1. **NEXT_PUBLIC_APP_URL** установлен на ваш продакшн домен
2. **Используется HTTPS** (обязательно для webhook)
3. **Webhook доступен** из интернета: `https://yourdomain.com/api/finik/webhook`

### После деплоя:

1. Проверьте логи сервера
2. Создайте тестовый платеж
3. Убедитесь что webhook приходит корректно
4. Проверьте что подпись верифицируется

## 📱 Процесс оплаты пользователя

1. Пользователь нажимает кнопку "Оплатить 5 сом"
2. Создается платеж в Finik API
3. Пользователь перенаправляется на страницу Finik
4. Появляется QR-код для оплаты
5. Пользователь сканирует QR в приложении Finik
6. Подтверждает оплату 5 сом
7. Finik отправляет webhook на ваш сервер
8. Ваш сервер обрабатывает платеж
9. Пользователь редиректится обратно на ваш сайт с параметром `?payment=success`

## 🔍 Отладка

### Проблема: "Payment URL not found"
- Проверьте правильность `FINIK_API_KEY` и `FINIK_ACCOUNT_ID`
- Посмотрите логи в консоли сервера

### Проблема: "Invalid webhook signature"
- Убедитесь что используется правильное окружение (`prod`)
- Проверьте что webhook URL доступен из интернета

### Проблема: Webhook не приходит
- Убедитесь что сервер доступен из интернета (не localhost)
- Проверьте firewall/security groups
- Для локальной разработки используйте ngrok

### Логи
Все важные события логируются в консоли сервера:
- ✓ Using FINIK_PRIVATE_KEY from environment
- [PAYMENT_SUCCESS] User ID: ... | Amount: ...
- ❌ Payment creation failed
- ❌ Invalid webhook signature

## 💡 Примеры использования

### В корзине товаров
```tsx
<FinikPayButton
  userId={user.id}
  description={`Оплата заказа №${orderId}`}
  metadata={{
    orderId: orderId,
    items: cart.items.length
  }}
/>
```

### В подписках
```tsx
<FinikPayButton
  userId={user.id}
  description="Оплата подписки Premium"
  metadata={{
    subscriptionType: "premium",
    duration: "1 month"
  }}
/>
```

### В бронировании столиков
```tsx
<FinikPayButton
  userId={user.id}
  description={`Бронь стола на ${date}`}
  metadata={{
    reservationId: reservation.id,
    tableNumber: 5,
    date: date.toISOString()
  }}
/>
```

## 📋 Технические детали

### Фиксированная цена
Цена жестко установлена на **5 сом** в файле `/api/finik/create-payment/route.ts`:

```typescript
const paymentData: CreatePaymentData = {
  amount: 5, // Фиксированная цена 5 сомов
  description: description || 'Оплата в ресторане Mubarak',
  userId,
  metadata: metadata || {}
};
```

Если нужно изменить цену - измените это значение.

### Metadata
Вся дополнительная информация передается через `metadata`:
- Сохраняется в платеже
- Приходит обратно в webhook
- Можно использовать для связи платежа с заказом/бронью

### RedirectUrl
После оплаты пользователь возвращается на:
```
https://yourdomain.com/?payment=success
```

Измените в `lib/finik.ts` если нужен другой URL.

## 🎯 Чек-лист готовности

- [x] Библиотека `@mancho.devs/authorizer` установлена
- [x] Переменные окружения настроены
- [x] API endpoints созданы
- [x] React компонент кнопки создан
- [x] Демо страница доступна
- [ ] Протестирован платеж
- [ ] Webhook протестирован
- [ ] Добавлена логика обработки в webhook
- [ ] Готов к продакшн деплою

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи в консоли сервера
2. Убедитесь что все переменные окружения установлены
3. Протестируйте на демо странице `/payment-demo`
4. Проверьте документацию Finik

---

**Готово к использованию! 🚀**

Просто добавьте компонент `<FinikPayButton>` в любое место вашего приложения.
