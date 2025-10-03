import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NovaOportunidade = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nomeFantasia: '',
    contato: '',
    telefone: '',
    cnpj: '',
    tipoComercio: 'Outros',
    geolocalizacao: '',
    status: '',
    dataAgendamento: '',
    observacoes: '',
    produtosFechados: '',
    motivoNaoInteresse: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('oportunidades')) || [];
    localStorage.setItem('oportunidades', JSON.stringify([...stored, form]));
    alert('Oportunidade salva!');
    navigate('/');
  };

  return (
    <form className="bg-white shadow rounded p-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Nova Oportunidade</h2>

      <div className="grid grid-cols-2 gap-4">
        <input name="nomeFantasia" value={form.nomeFantasia} onChange={handleChange} placeholder="Nome Fantasia" className="border p-2 rounded w-full" required />
        <input name="contato" value={form.contato} onChange={handleChange} placeholder="Contato" className="border p-2 rounded w-full" required />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" className="border p-2 rounded w-full" required />
        <input name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ" className="border p-2 rounded w-full" required />
        <select name="tipoComercio" value={form.tipoComercio} onChange={handleChange} className="border p-2 rounded w-full">
          <option>Restaurante</option>
          <option>Loja</option>
          <option>Outros</option>
        </select>
        <input name="geolocalizacao" value={form.geolocalizacao} onChange={handleChange} placeholder="Geolocalização" className="border p-2 rounded w-full" />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded w-full" required>
          <option value="">Selecione o Status</option>
          <option value="Contrato Fechado">Contrato Fechado</option>
          <option value="Não houve Interesse">Não houve Interesse</option>
          <option value="Em Andamento">Em Andamento</option>
        </select>
        <input type="date" name="dataAgendamento" value={form.dataAgendamento} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>

      <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações" className="border p-2 rounded w-full mt-4" />

      {form.status === 'Contrato Fechado' && (
        <input name="produtosFechados" value={form.produtosFechados} onChange={handleChange} placeholder="Produtos Fechados" className="border p-2 rounded w-full mt-4" required />
      )}
      {form.status === 'Não houve Interesse' && (
        <input name="motivoNaoInteresse" value={form.motivoNaoInteresse} onChange={handleChange} placeholder="Motivo da Recusa" className="border p-2 rounded w-full mt-4" required />
      )}

      <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Salvar Oportunidade</button>
    </form>
  );
};

export default NovaOportunidade;
