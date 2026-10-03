// app/payment-demo/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import FinikPayButton from '@/app/components/FinikPayButton';
import { Suspense } from 'react';

function PaymentDemoContent() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('payment');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Демо оплаты Finik Pay
            </h1>
            <p className="text-gray-600">
              Тестовая страница интеграции платежной системы
            </p>
          </div>

          {/* Payment Success Message */}
          {paymentStatus === 'success' && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-green-900">Оплата успешна!</h3>
                  <p className="text-sm text-green-700">Спасибо за вашу оплату. Платеж обработан.</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Информация о платеже
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Сумма:</span>
                <span className="font-bold text-2xl text-green-600">5 сом</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Описание:</span>
                <span className="font-medium text-gray-900">Оплата в ресторане Mubarak</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Метод оплаты:</span>
                <span className="font-medium text-gray-900">Finik QR</span>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="mb-6">
            <FinikPayButton
              userId="demo-user-123"
              description="Тестовая оплата в ресторане Mubarak"
              metadata={{
                demo: true,
                source: 'payment-demo-page'
              }}
              buttonText="Оплатить 5 сом через Finik"
              className="w-full text-lg py-4"
            />
          </div>

          {/* Instructions */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Как это работает:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Нажмите кнопку "Оплатить"</li>
              <li>Вы будете перенаправлены на страницу Finik</li>
              <li>Отсканируйте QR-код приложением Finik</li>
              <li>Подтвердите платеж на 5 сомов</li>
              <li>После оплаты вы вернетесь на эту страницу</li>
            </ol>
          </div>

          {/* Environment Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Тестовое окружение</p>
                <p>Сейчас используется {process.env.NEXT_PUBLIC_FINIK_ENV || 'prod'} окружение Finik Pay</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">💡 Для разработчиков</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• API endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/finik/create-payment</code></p>
            <p>• Webhook endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/finik/webhook</code></p>
            <p>• Фиксированная цена: 5 сом</p>
            <p>• Проверьте консоль сервера для логов webhook</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentDemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    }>
      <PaymentDemoContent />
    </Suspense>
  );
}
