
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard/Dashboard';

const Index = () => {
  // Dados simulados para o dashboard
  const dashboardData = {
    stats: {
      totalProcesses: 48,
      ongoingProcesses: 23,
      completedProcesses: 21,
      cancelledProcesses: 4,
      highPriorityCount: 7,
      processesByMonth: [
        { month: 'Jan', count: 4 },
        { month: 'Fev', count: 6 },
        { month: 'Mar', count: 8 },
        { month: 'Abr', count: 12 },
        { month: 'Mai', count: 7 },
        { month: 'Jun', count: 11 },
      ],
      processesByType: [
        { name: 'Compra', value: 28 },
        { name: 'Contratação', value: 15 },
        { name: 'Outro', value: 5 },
      ],
      processesByStatus: [
        { name: 'Em Andamento', value: 23 },
        { name: 'Concluído', value: 21 },
        { name: 'Cancelado', value: 4 },
      ],
    },
    recentProcesses: [
      {
        id: 'PROC-2023-042',
        title: 'Compra de equipamentos de informática',
        type: 'purchase' as const,
        status: 'ongoing' as const,
        priority: 'high' as const,
        createdAt: new Date(2023, 4, 15),
        createdBy: {
          id: 'user-1',
          name: 'João Silva',
          email: 'joao.silva@geomundi.com',
          role: 'Gerente de TI',
          department: 'TI',
          avatar: ''
        },
        currentStep: 1,
        steps: [
          {
            id: 'step-1',
            title: 'Solicitação de orçamentos',
            description: 'Solicitar orçamentos com pelo menos 3 fornecedores',
            assignedTo: {
              id: 'user-1',
              name: 'João Silva',
              email: 'joao.silva@geomundi.com',
              role: 'Gerente de TI',
              department: 'TI',
              avatar: ''
            },
            status: 'completed' as const,
            documents: [],
            comments: [],
            startedAt: new Date(2023, 4, 15),
            completedAt: new Date(2023, 4, 16)
          },
          {
            id: 'step-2',
            title: 'Análise e aprovação',
            description: 'Analisar os orçamentos e aprovar a melhor opção',
            assignedTo: {
              id: 'user-2',
              name: 'Ana Souza',
              email: 'ana.souza@geomundi.com',
              role: 'Diretora Financeira',
              department: 'Financeiro',
              avatar: ''
            },
            status: 'in-progress' as const,
            documents: [],
            comments: [],
            startedAt: new Date(2023, 4, 16)
          }
        ],
        documents: []
      },
      {
        id: 'PROC-2023-041',
        title: 'Contratação de serviço de consultoria',
        type: 'hiring' as const,
        status: 'ongoing' as const,
        priority: 'medium' as const,
        createdAt: new Date(2023, 4, 14),
        createdBy: {
          id: 'user-3',
          name: 'Carlos Mendes',
          email: 'carlos.mendes@geomundi.com',
          role: 'Gerente de Projetos',
          department: 'Operacional',
          avatar: ''
        },
        currentStep: 0,
        steps: [
          {
            id: 'step-1',
            title: 'Definição de escopo',
            description: 'Detalhar o escopo da consultoria',
            assignedTo: {
              id: 'user-3',
              name: 'Carlos Mendes',
              email: 'carlos.mendes@geomundi.com',
              role: 'Gerente de Projetos',
              department: 'Operacional',
              avatar: ''
            },
            status: 'in-progress' as const,
            documents: [],
            comments: [],
            startedAt: new Date(2023, 4, 14)
          }
        ],
        documents: []
      },
      {
        id: 'PROC-2023-040',
        title: 'Compra de material de escritório',
        type: 'purchase' as const,
        status: 'completed' as const,
        priority: 'low' as const,
        createdAt: new Date(2023, 4, 10),
        createdBy: {
          id: 'user-4',
          name: 'Amanda Lima',
          email: 'amanda.lima@geomundi.com',
          role: 'Assistente Administrativa',
          department: 'Administração',
          avatar: ''
        },
        currentStep: 2,
        steps: [
          {
            id: 'step-1',
            title: 'Solicitação de orçamentos',
            description: '',
            assignedTo: {
              id: 'user-4',
              name: 'Amanda Lima',
              email: 'amanda.lima@geomundi.com',
              role: 'Assistente Administrativa',
              department: 'Administração',
              avatar: ''
            },
            status: 'completed' as const,
            documents: [],
            comments: [],
            startedAt: new Date(2023, 4, 10),
            completedAt: new Date(2023, 4, 11)
          },
          {
            id: 'step-2',
            title: 'Análise e aprovação',
            description: '',
            assignedTo: {
              id: 'user-5',
              name: 'Roberto Santos',
              email: 'roberto.santos@geomundi.com',
              role: 'Supervisor Administrativo',
              department: 'Administração',
              avatar: ''
            },
            status: 'completed' as const,
            documents: [],
            comments: [],
            startedAt: new Date(2023, 4, 11),
            completedAt: new Date(2023, 4, 12)
          },
          {
            id: 'step-3',
            title: 'Finalizar compra',
            description: '',
            assignedTo: {
              id: 'user-4',
              name: 'Amanda Lima',
              email: 'amanda.lima@geomundi.com',
              role: 'Assistente Administrativa',
              department: 'Administração',
              avatar: ''
            },
            status: 'completed' as const,
            documents: [],
            comments: [],
            startedAt: new Date(2023, 4, 12),
            completedAt: new Date(2023, 4, 13)
          }
        ],
        documents: []
      }
    ]
  };

  return (
    <Layout>
      <Dashboard stats={dashboardData.stats} recentProcesses={dashboardData.recentProcesses} />
    </Layout>
  );
};

export default Index;
