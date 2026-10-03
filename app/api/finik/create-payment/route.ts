// app/api/finik/create-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createFinikPayment, CreatePaymentData } from '@/lib/finik';

/**
 * POST /api/finik/create-payment
 * Создает платеж в Finik с фиксированной ценой 5 сомов
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Получение данных из запроса
    const body = await request.json();
    const { description, userId, metadata } = body;

    // 2. Валидация данных
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required field: userId' },
        { status: 400 }
      );
    }

    // 3. Создание данных для платежа с фиксированной ценой 5 сомов
    const paymentData: CreatePaymentData = {
      amount: 5, // Фиксированная цена 5 сомов
      description: description || 'Оплата в ресторане Mubarak',
      userId,
      metadata: metadata || {}
    };

    // 4. Создание платежа в Finik
    const paymentUrl = await createFinikPayment(paymentData);

    // 5. Возврат URL платежной страницы
    return NextResponse.json({
      success: true,
      paymentUrl,
      amount: paymentData.amount,
    });

  } catch (error) {
    console.error('Error creating Finik payment:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create payment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
