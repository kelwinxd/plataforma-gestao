import React, { useEffect, useState } from 'react';

const ListaOportunidades = () => {
  const [oportunidades, setOportunidades] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');
  const [ordenar, setOrdenar] = useState(''); // 'data' ou 'status'

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('oportunidades')) || [];
    setOportunidades(data);
  }, []);

  const handleExcluir = (index) => {
    const updated = [...oportunidades];
    updated.splice(index, 1);
    setOportunidades(updated);
    localStorage.setItem('oportunidades', JSON.stringify(updated));
  };

  // Filtragem
  const oportunidadesFiltradas = oportunidades
    .filter(o => (filtroStatus ? o.status === filtroStatus : true))
    .filter(o => (filtroTipo ? o.tipoComercio === filtroTipo : true))
    .filter(o => {
      if (filtroDataInicio && o.dataAgendamento) {
        return new Date(o.dataAgendamento) >= new Date(filtroDataInicio);
      }
      return true;
    })
    .filter(o => {
      if (filtroDataFim && o.dataAgendamento) {
        return new Date(o.dataAgendamento) <= new Date(filtroDataFim);
      }
      return true;
    })
    .sort((a, b) => {
      if (ordenar === 'data') {
        return new Date(a.dataAgendamento) - new Date(b.dataAgendamento);
      }
      if (ordenar === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Oportunidades</h2>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="border p-2 rounded w-full sm:w-48"
        >
          <option value="">Filtrar por Status</option>
          <option value="Contrato Fechado">Contrato Fechado</option>
          <option value="Não houve Interesse">Não houve Interesse</option>
          <option value="Em andamento">Em andamento</option>
        </select>

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="border p-2 rounded w-full sm:w-48"
        >
          <option value="">Filtrar por Tipo de Comércio</option>
          <option value="Restaurante">Restaurante</option>
          <option value="Loja">Loja</option>
          <option value="Outros">Outros</option>
        </select>

        <input
          type="date"
          value={filtroDataInicio}
          onChange={(e) => setFiltroDataInicio(e.target.value)}
          className="border p-2 rounded w-full sm:w-40"
          placeholder="Data início"
        />

        <input
          type="date"
          value={filtroDataFim}
          onChange={(e) => setFiltroDataFim(e.target.value)}
          className="border p-2 rounded w-full sm:w-40"
          placeholder="Data fim"
        />

        <select
          value={ordenar}
          onChange={(e) => setOrdenar(e.target.value)}
          className="border p-2 rounded w-full sm:w-40"
        >
          <option value="">Ordenar</option>
          <option value="data">Por Data</option>
          <option value="status">Por Status</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Nome Fantasia</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Telefone</th>
              <th className="border p-2">Tipo de Comércio</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {oportunidadesFiltradas.map((o, i) => (
              <tr key={i} className="text-center">
                <td className="border p-2">{o.nomeFantasia}</td>
                <td className="border p-2">{o.status}</td>
                <td className="border p-2">{o.telefone}</td>
                <td className="border p-2">{o.tipoComercio}</td>
                <td className="border p-2 space-x-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                  <button onClick={() => handleExcluir(i)} className="bg-red-600 text-white px-2 py-1 rounded">Excluir</button>
                </td>
              </tr>
            ))}
            {oportunidadesFiltradas.length === 0 && (
              <tr>
                <td colSpan="5" className="border p-2">Nenhuma oportunidade encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaOportunidades;
