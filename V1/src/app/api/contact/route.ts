import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, segment, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Chybí povinná pole' }, { status: 400 });
    }

    // 1. Save to Supabase
    // Note: this table needs to be created in your Supabase project:
    // create table contact_submissions ( id uuid default uuid_generate_v4() primary key, name text, email text, segment text, message text, created_at timestamp with time zone default timezone('utc'::text, now()) );
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        { name, email, segment, message }
      ]);
      
    if (dbError) {
      console.error('Supabase Error:', dbError);
      return NextResponse.json({ error: 'Chyba při ukládání do databáze.' }, { status: 500 });
    }

    // 2. Optional: Send Email via Resend if RESEND_API_KEY is configured
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.startsWith('re_your-resend')) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendKey}`
          },
          body: JSON.stringify({
            from: 'STRKAN Web <noreply@strkan.cz>',
            to: ['info@strkan.cz'], // Target email
            subject: `Nová poptávka z webu - ${segment}`,
            html: `
              <h2>Nová poptávka / Dotaz</h2>
              <p><strong>Jméno:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Zájem o:</strong> ${segment}</p>
              <br/>
              <h3>Zpráva:</h3>
              <p>${message.replace(/\n/g, '<br/>')}</p>
            `
          })
        });
      } catch (e) {
        console.error('Resend Error:', e);
        // Continue even if email fails, since it's saved in DB
      }
    }

    return NextResponse.json({ success: true });
    
  } catch (err: unknown) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ error: 'Interní chyba serveru.' }, { status: 500 });
  }
}
