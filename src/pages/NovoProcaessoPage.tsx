
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProcessForm from '@/components/Processos/ProcessForm';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';

const NovoProcessoPage = () => {
  const navigate = useNavigate();
  
  // Dados de usuários simulados
  const users: User[] = [
    {
      id: 'user-1',
      name: 'João Silva',
      email: 'joao.silva@geomundi.com',
      role: 'Gerente de TI',
      department: 'TI',
      avatar: ''
    },
    {
      id: 'user-2',
      name: 'Ana Souza',
      email: 'ana.souza@geomundi.com',
      role: 'Diretora Financeira',
      department: 'Financeiro',
      avatar: ''
    },
    {
      id: 'user-3',
      name: 'Carlos Mendes',
      email: 'carlos.mendes@geomundi.com',
      role: 'Gerente de Projetos',
      department: 'Operacional',
      avatar: ''
    },
    {
      id: 'user-4',
      name: 'Amanda Lima',
      email: 'amanda.lima@geomundi.com',
      role: 'Assistente Administrativa',
      department: 'Administração',
      avatar: ''
    },
    {
      id: 'user-5',
      name: 'Roberto Santos',
      email: 'roberto.santos@geomundi.com',
      role: 'Supervisor Administrativo',
      department: 'Administração',
      avatar: ''
    },
    {
      id: 'user-6',
      name: 'Marcia Oliveira',
      email: 'marcia.oliveira@geomundi.com',
      role: 'Analista de Compras',
      department: 'Compras',
      avatar: ''
    }
  ];
  
  const handleSubmit = (processData: any) => {
    console.log('Novo processo:', processData);
    // Aqui faria a chamada da API para criar um novo processo
    
    // Após criar o processo, redirecionar para a página de processos
    navigate('/processos');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Novo Processo</h2>
        <ProcessForm users={users} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default NovoProcessoPage;
