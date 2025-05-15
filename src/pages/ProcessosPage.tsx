
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProcessTable from '@/components/Processos/ProcessTable';
import { Process } from '@/types';

const ProcessosPage = () => {
  // Dados de exemplo
  const processes: Process[] = [
    {
      id: 'PROC-2023-042',
      title: 'Compra de equipamentos de informática',
      description: 'Processo para aquisição de computadores e periféricos para o departamento de TI',
      type: 'purchase',
      status: 'ongoing',
      priority: 'high',
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
          status: 'completed',
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
          status: 'in-progress',
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
      description: 'Processo para contratação de consultoria especializada em gestão de projetos',
      type: 'hiring',
      status: 'ongoing',
      priority: 'medium',
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
          status: 'in-progress',
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
      description: 'Processo para aquisição de materiais de escritório para uso administrativo',
      type: 'purchase',
      status: 'completed',
      priority: 'low',
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
          status: 'completed',
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
          status: 'completed',
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
          status: 'completed',
          documents: [],
          comments: [],
          startedAt: new Date(2023, 4, 12),
          completedAt: new Date(2023, 4, 13)
        }
      ],
      documents: []
    },
    {
      id: 'PROC-2023-039',
      title: 'Contratação de empresa de limpeza',
      description: 'Processo para contratação de serviços terceirizados de limpeza',
      type: 'hiring',
      status: 'cancelled',
      priority: 'medium',
      createdAt: new Date(2023, 4, 5),
      createdBy: {
        id: 'user-5',
        name: 'Roberto Santos',
        email: 'roberto.santos@geomundi.com',
        role: 'Supervisor Administrativo',
        department: 'Administração',
        avatar: ''
      },
      currentStep: 1,
      steps: [
        {
          id: 'step-1',
          title: 'Buscar fornecedores',
          description: '',
          assignedTo: {
            id: 'user-5',
            name: 'Roberto Santos',
            email: 'roberto.santos@geomundi.com',
            role: 'Supervisor Administrativo',
            department: 'Administração',
            avatar: ''
          },
          status: 'completed',
          documents: [],
          comments: [],
          startedAt: new Date(2023, 4, 5),
          completedAt: new Date(2023, 4, 7)
        },
        {
          id: 'step-2',
          title: 'Avaliação de propostas',
          description: '',
          assignedTo: {
            id: 'user-2',
            name: 'Ana Souza',
            email: 'ana.souza@geomundi.com',
            role: 'Diretora Financeira',
            department: 'Financeiro',
            avatar: ''
          },
          status: 'rejected',
          documents: [],
          comments: [],
          startedAt: new Date(2023, 4, 7)
        }
      ],
      documents: []
    },
    {
      id: 'PROC-2023-038',
      title: 'Aquisição de licenças de software',
      description: 'Processo para aquisição de licenças de software para o departamento de TI',
      type: 'purchase',
      status: 'ongoing',
      priority: 'high',
      createdAt: new Date(2023, 4, 3),
      createdBy: {
        id: 'user-1',
        name: 'João Silva',
        email: 'joao.silva@geomundi.com',
        role: 'Gerente de TI',
        department: 'TI',
        avatar: ''
      },
      currentStep: 2,
      steps: [
        {
          id: 'step-1',
          title: 'Levantamento de necessidades',
          description: '',
          assignedTo: {
            id: 'user-1',
            name: 'João Silva',
            email: 'joao.silva@geomundi.com',
            role: 'Gerente de TI',
            department: 'TI',
            avatar: ''
          },
          status: 'completed',
          documents: [],
          comments: [],
          startedAt: new Date(2023, 4, 3),
          completedAt: new Date(2023, 4, 4)
        },
        {
          id: 'step-2',
          title: 'Orçamentos',
          description: '',
          assignedTo: {
            id: 'user-6',
            name: 'Marcia Oliveira',
            email: 'marcia.oliveira@geomundi.com',
            role: 'Analista de Compras',
            department: 'Compras',
            avatar: ''
          },
          status: 'completed',
          documents: [],
          comments: [],
          startedAt: new Date(2023, 4, 4),
          completedAt: new Date(2023, 4, 10)
        },
        {
          id: 'step-3',
          title: 'Aprovação final',
          description: '',
          assignedTo: {
            id: 'user-2',
            name: 'Ana Souza',
            email: 'ana.souza@geomundi.com',
            role: 'Diretora Financeira',
            department: 'Financeiro',
            avatar: ''
          },
          status: 'in-progress',
          documents: [],
          comments: [],
          startedAt: new Date(2023, 4, 10)
        }
      ],
      documents: []
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Processos</h2>
        </div>
        
        <ProcessTable processes={processes} showFilters={true} />
      </div>
    </Layout>
  );
};

export default ProcessosPage;
