'use client';

import { useState } from 'react';

interface FinikPayButtonProps {
  userId: string;
  description?: string;
  metadata?: Record<string, unknown>;
  buttonText?: string;
  className?: string;
}

/**
 * Компонент кнопки оплаты через Finik Pay
 * Фиксированная цена: 5 сомов
 */
export default function FinikPayButton({ 
  userId,
  description = 'Оплата в ресторане Mubarak',
  metadata = {},
  buttonText = 'Оплатить 5 сом',
  className = ''
}: FinikPayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Вызов API для создания платежа
      const response = await fetch('/api/finik/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          description,
          metadata,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      // 2. Редирект на платежную страницу Finik
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Payment URL not received');
      }

    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при создании платежа');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`
          bg-green-600 hover:bg-green-700 
          text-white font-semibold 
          px-6 py-3 rounded-lg 
          transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Создание платежа...
          </span>
        ) : (
          buttonText
        )}
      </button>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
}
