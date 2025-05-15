
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProcessDetail from '@/components/Processos/ProcessDetail';
import { Process, User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const DetalheProcessoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [process, setProcess] = useState<Process | null>(null);
  
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
  
  const currentUser = users[0]; // Usuário logado simulado
  
  // Dados do processo simulados - normalmente seriam carregados da API
  useEffect(() => {
    // Simular carregamento da API
    setTimeout(() => {
      const mockProcess: Process = {
        id: id || 'PROC-2023-042',
        title: 'Compra de equipamentos de informática',
        description: 'Processo para aquisição de 10 notebooks, 5 desktops e 15 monitores para o departamento de TI. Os equipamentos serão utilizados para substituir máquinas obsoletas e equipar novos funcionários.',
        type: 'purchase',
        status: 'ongoing',
        priority: 'high',
        createdAt: new Date(2023, 4, 15),
        createdBy: users[0],
        currentStep: 1,
        steps: [
          {
            id: 'step-1',
            title: 'Solicitação de orçamentos',
            description: 'Solicitar orçamentos com pelo menos 3 fornecedores diferentes, garantindo que todos atendam às especificações técnicas definidas.',
            assignedTo: users[0],
            status: 'completed',
            documents: [
              {
                id: 'doc-1',
                name: 'especificacoes_tecnicas.pdf',
                type: 'pdf',
                url: '#',
                uploadedAt: new Date(2023, 4, 15),
                uploadedBy: 'João Silva'
              }
            ],
            comments: [
              {
                id: 'comment-1',
                text: 'Entrei em contato com os fornecedores Dell, Lenovo e HP para solicitar orçamentos.',
                createdAt: new Date(2023, 4, 15, 14, 30),
                createdBy: users[0]
              }
            ],
            startedAt: new Date(2023, 4, 15),
            completedAt: new Date(2023, 4, 17)
          },
          {
            id: 'step-2',
            title: 'Análise e aprovação',
            description: 'Analisar os orçamentos recebidos e aprovar a melhor opção considerando custo-benefício e prazo de entrega.',
            assignedTo: users[1],
            status: 'in-progress',
            documents: [
              {
                id: 'doc-2',
                name: 'orcamento_dell.xlsx',
                type: 'xlsx',
                url: '#',
                uploadedAt: new Date(2023, 4, 16),
                uploadedBy: 'João Silva'
              },
              {
                id: 'doc-3',
                name: 'orcamento_lenovo.xlsx',
                type: 'xlsx',
                url: '#',
                uploadedAt: new Date(2023, 4, 16),
                uploadedBy: 'João Silva'
              },
              {
                id: 'doc-4',
                name: 'orcamento_hp.xlsx',
                type: 'xlsx',
                url: '#',
                uploadedAt: new Date(2023, 4, 17),
                uploadedBy: 'João Silva'
              },
              {
                id: 'doc-5',
                name: 'quadro_comparativo.xlsx',
                type: 'xlsx',
                url: '#',
                uploadedAt: new Date(2023, 4, 17),
                uploadedBy: 'João Silva'
              }
            ],
            comments: [
              {
                id: 'comment-2',
                text: 'Recebi os três orçamentos solicitados. A Dell apresentou o melhor preço para os notebooks, mas a Lenovo tem os monitores mais baratos. Preparei um quadro comparativo para análise.',
                createdAt: new Date(2023, 4, 17, 10, 15),
                createdBy: users[0]
              },
              {
                id: 'comment-3',
                text: 'Estou analisando os orçamentos. Precisamos verificar também o prazo de garantia oferecido.',
                createdAt: new Date(2023, 4, 17, 16, 20),
                createdBy: users[1]
              }
            ],
            startedAt: new Date(2023, 4, 17),
          }
        ],
        documents: [
          {
            id: 'doc-1',
            name: 'especificacoes_tecnicas.pdf',
            type: 'pdf',
            url: '#',
            uploadedAt: new Date(2023, 4, 15),
            uploadedBy: 'João Silva'
          },
          {
            id: 'doc-2',
            name: 'orcamento_dell.xlsx',
            type: 'xlsx',
            url: '#',
            uploadedAt: new Date(2023, 4, 16),
            uploadedBy: 'João Silva'
          },
          {
            id: 'doc-3',
            name: 'orcamento_lenovo.xlsx',
            type: 'xlsx',
            url: '#',
            uploadedAt: new Date(2023, 4, 16),
            uploadedBy: 'João Silva'
          },
          {
            id: 'doc-4',
            name: 'orcamento_hp.xlsx',
            type: 'xlsx',
            url: '#',
            uploadedAt: new Date(2023, 4, 17),
            uploadedBy: 'João Silva'
          },
          {
            id: 'doc-5',
            name: 'quadro_comparativo.xlsx',
            type: 'xlsx',
            url: '#',
            uploadedAt: new Date(2023, 4, 17),
            uploadedBy: 'João Silva'
          }
        ]
      };
      
      setProcess(mockProcess);
      setLoading(false);
    }, 800);
  }, [id]);
  
  const handleMoveToNextStep = (nextUserId: string, comment: string, files: File[]) => {
    console.log('Movendo processo para próxima etapa', { nextUserId, comment, files });
    
    // Atualizar o estado local (em uma aplicação real, isso seria feito pela API)
    if (process) {
      const updatedProcess = { ...process };
      
      // Simular a criação de um novo passo
      const newStep = {
        id: `step-${updatedProcess.steps.length + 1}`,
        title: 'Nova etapa',
        description: comment,
        assignedTo: users.find(user => user.id === nextUserId) || users[0],
        status: 'pending' as const,
        documents: [],
        comments: [],
        startedAt: new Date()
      };
      
      // Marcar o passo atual como concluído
      if (updatedProcess.currentStep < updatedProcess.steps.length) {
        updatedProcess.steps[updatedProcess.currentStep] = {
          ...updatedProcess.steps[updatedProcess.currentStep],
          status: 'completed',
          completedAt: new Date()
        };
      }
      
      updatedProcess.steps.push(newStep);
      updatedProcess.currentStep += 1;
      
      setProcess(updatedProcess);
      
      toast({
        title: "Processo encaminhado",
        description: `O processo foi encaminhado para ${users.find(user => user.id === nextUserId)?.name}.`
      });
    }
  };
  
  const handleAddComment = (comment: string, files: File[]) => {
    console.log('Adicionando comentário', { comment, files });
    
    // Atualizar o estado local (em uma aplicação real, isso seria feito pela API)
    if (process) {
      const updatedProcess = { ...process };
      
      const newComment = {
        id: `comment-${Date.now()}`,
        text: comment,
        createdAt: new Date(),
        createdBy: currentUser
      };
      
      updatedProcess.steps[updatedProcess.currentStep].comments.push(newComment);
      
      setProcess(updatedProcess);
    }
  };
  
  const handleUpdateStatus = (status: 'completed' | 'cancelled') => {
    console.log('Atualizando status do processo', { status });
    
    // Atualizar o estado local (em uma aplicação real, isso seria feito pela API)
    if (process) {
      const updatedProcess = { ...process, status };
      
      setProcess(updatedProcess);
      
      if (status === 'completed') {
        toast({
          title: "Processo concluído",
          description: "O processo foi marcado como concluído com sucesso."
        });
      } else {
        toast({
          title: "Processo cancelado",
          description: "O processo foi cancelado com sucesso."
        });
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-40" />
              <Skeleton className="h-80" />
              <Skeleton className="h-60" />
            </div>
            <div>
              <Skeleton className="h-40" />
              <div className="h-4" />
              <Skeleton className="h-60" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!process) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Processo não encontrado</h2>
            <p className="mt-2 text-gray-600">O processo que você está procurando não existe ou foi removido.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => navigate('/processos')}
            >
              Voltar para listagem de processos
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProcessDetail
        process={process}
        users={users}
        currentUser={currentUser}
        onMoveToNextStep={handleMoveToNextStep}
        onAddComment={handleAddComment}
        onUpdateStatus={handleUpdateStatus}
      />
    </Layout>
  );
};

export default DetalheProcessoPage;
