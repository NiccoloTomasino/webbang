'use client';

import { useState } from 'react';

export default function FormContatti() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    messaggio: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Messaggio inviato con successo! Ti contatteremo presto.');
        setFormData({ nome: '', email: '', messaggio: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Errore durante l\'invio del messaggio');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Errore di connessione. Riprova più tardi.');
      console.error('Errore:', error);
    }
  };

  return (
    <section id="contatti" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">FORM CONTATTACI</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-2">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="messaggio" className="block text-sm font-medium mb-2">
              Messaggio
            </label>
            <textarea
              id="messaggio"
              rows={5}
              value={formData.messaggio}
              onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={status === 'loading'}
            />
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${
              status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Invio in corso...' : 'Invia Messaggio'}
          </button>
        </form>
      </div>
    </section>
  );
}