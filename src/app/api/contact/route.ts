import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, messaggio } = body;

    // Validazione base
    if (!nome || !email || !messaggio) {
      return NextResponse.json(
        { error: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      );
    }

    // Invia email con Resend
    const data = await resend.emails.send({
      from: 'WebBang <onboarding@resend.dev>', // Email di test di Resend
      to: ['amministrazione.webbang@gmail.com'], // Per ora invia all'email del cliente
      subject: `Nuovo contatto da ${nome}`,
      html: `
        <h2>Nuovo messaggio di contatto</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${messaggio}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Email inviata con successo!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Errore invio email:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'invio dell\'email' },
      { status: 500 }
    );
  }
}