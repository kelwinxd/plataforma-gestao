import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [oportunidades, setOportunidades] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('oportunidades')) || [];
    setOportunidades(data);
  }, []);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold">Home</h2>
        <Link
          to="/nova-oportunidade"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nova Oportunidade
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          Contratos Fechados: {oportunidades.filter(o => o.status === 'Contrato Fechado').length}
        </div>
        <div className="bg-white shadow rounded p-4">
          Não houve Interesse: {oportunidades.filter(o => o.status === 'Não houve Interesse').length}
        </div>
        <div className="bg-white shadow rounded p-4">
          Total Oportunidades: {oportunidades.length}
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="font-bold mb-2">Últimas Oportunidades</h3>
        <ul className="list-disc pl-5">
          {oportunidades.slice(-5).map((o, i) => (
            <li key={i}>{o.nomeFantasia} - {o.status}</li>
          ))}
          {oportunidades.length === 0 && <li>Nenhuma oportunidade cadastrada.</li>}
        </ul>
      </div>
    </div>
  );
};

export default Home;
