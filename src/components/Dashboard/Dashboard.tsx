
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Process } from '@/types';
import ProcessTable from '@/components/Processos/ProcessTable';
import { MessageSquare, FileText, Clock, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalProcesses: number;
    ongoingProcesses: number;
    completedProcesses: number;
    cancelledProcesses: number;
    highPriorityCount: number;
    processesByMonth: { month: string; count: number }[];
    processesByType: { name: string; value: number }[];
    processesByStatus: { name: string; value: number }[];
  };
  recentProcesses: Process[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard: React.FC<DashboardProps> = ({ stats, recentProcesses }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Processos</p>
                <h3 className="text-3xl font-bold">{stats.totalProcesses}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                <h3 className="text-3xl font-bold">{stats.ongoingProcesses}</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                <h3 className="text-3xl font-bold">{stats.completedProcesses}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alta Prioridade</p>
                <h3 className="text-3xl font-bold">{stats.highPriorityCount}</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Histórico de Processos</CardTitle>
            <CardDescription>Total de processos por mês</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.processesByMonth}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#000000" 
                  name="Processos" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Processos por Tipo</CardTitle>
            <CardDescription>Distribuição por categoria</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.processesByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.processesByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Processos Recentes</CardTitle>
          <CardDescription>Últimos processos adicionados ou atualizados</CardDescription>
        </CardHeader>
        <ProcessTable processes={recentProcesses} />
      </Card>
    </div>
  );
};

export default Dashboard;
