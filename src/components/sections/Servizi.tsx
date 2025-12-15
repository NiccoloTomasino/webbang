export default function Servizi() {
  const servizi = [
    {
      id: 1,
      titolo: "Servizio 1 - Creazione siti Web",
      descrizione: "(descrizione)",
      foto: "Foto 1 (Con animazione carina)"
    },
    {
      id: 2,
      titolo: "Servizio 2 - Gestione Campagne Pubblicitarie",
      descrizione: "(descrizione)",
      foto: "Foto 2 (Con animazione carina)"
    },
    {
      id: 3,
      titolo: "Servizio 3 - Lead Generation",
      descrizione: "(descrizione)",
      foto: "Foto 3 (Con animazione carina)"
    },
    {
      id: 4,
      titolo: "Servizio 4 - Creazione Siti E-Commerce",
      descrizione: "(descrizione)",
      foto: "Foto 4 (Con animazione carina)"
    }
  ];

  return (
    <section id="servizi" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">I Nostri Servizi</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servizi.map((servizio, index) => (
            <div 
              key={servizio.id}
              className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 items-center bg-white p-8 rounded-lg shadow-md`}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">{servizio.titolo}</h3>
                <p className="text-gray-600">{servizio.descrizione}</p>
              </div>
              <div className="flex-1 bg-gray-200 h-64 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">{servizio.foto}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}