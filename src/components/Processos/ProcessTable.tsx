
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Process } from "@/types";
import { Search, FileText, Plus, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

interface ProcessTableProps {
  processes: Process[];
  showFilters?: boolean;
}

const statusColors = {
  draft: "bg-gray-200 text-gray-800",
  ongoing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800"
};

const ProcessTable: React.FC<ProcessTableProps> = ({ processes, showFilters = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  };

  const filteredProcesses = processes
    .filter(process => 
      (searchTerm === "" || 
        process.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        process.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || process.status === statusFilter) &&
      (typeFilter === "" || process.type === typeFilter)
    )
    .sort((a, b) => {
      if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortField === "priority") {
        const priorityValues = { low: 0, medium: 1, high: 2 };
        const priorityA = priorityValues[a.priority as keyof typeof priorityValues];
        const priorityB = priorityValues[b.priority as keyof typeof priorityValues];
        return sortDirection === "asc" ? priorityA - priorityB : priorityB - priorityA;
      } else {
        // For other string fields
        const valueA = (a[sortField as keyof Process] as string).toLowerCase();
        const valueB = (b[sortField as keyof Process] as string).toLowerCase();
        return sortDirection === "asc" ? 
          valueA.localeCompare(valueB) : 
          valueB.localeCompare(valueA);
      }
    });

  const processTypeLabels = {
    purchase: "Compra",
    hiring: "Contratação",
    other: "Outro"
  };

  const processStatusLabels = {
    draft: "Rascunho",
    ongoing: "Em Andamento",
    completed: "Concluído",
    cancelled: "Cancelado"
  };

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 pb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título ou ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">Todos os Status</SelectItem>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="ongoing">Em Andamento</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">Todos os Tipos</SelectItem>
                <SelectItem value="purchase">Compra</SelectItem>
                <SelectItem value="hiring">Contratação</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button asChild className="sm:ml-auto">
            <Link to="/processos/novo">
              <Plus className="mr-2 h-4 w-4" />
              Novo Processo
            </Link>
          </Button>
        </div>
      )}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("id")}>
                  ID
                  {sortField === "id" && (
                    sortDirection === "asc" ? 
                      <ArrowUp className="ml-1 h-3 w-3" /> : 
                      <ArrowDown className="ml-1 h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                  Título
                  {sortField === "title" && (
                    sortDirection === "asc" ? 
                      <ArrowUp className="ml-1 h-3 w-3" /> : 
                      <ArrowDown className="ml-1 h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("status")}>
                  Status
                  {sortField === "status" && (
                    sortDirection === "asc" ? 
                      <ArrowUp className="ml-1 h-3 w-3" /> : 
                      <ArrowDown className="ml-1 h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("priority")}>
                  Prioridade
                  {sortField === "priority" && (
                    sortDirection === "asc" ? 
                      <ArrowUp className="ml-1 h-3 w-3" /> : 
                      <ArrowDown className="ml-1 h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead>Responsável atual</TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("createdAt")}>
                  Data de criação
                  {sortField === "createdAt" && (
                    sortDirection === "asc" ? 
                      <ArrowUp className="ml-1 h-3 w-3" /> : 
                      <ArrowDown className="ml-1 h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProcesses.length > 0 ? (
              filteredProcesses.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">{process.id}</TableCell>
                  <TableCell>{process.title}</TableCell>
                  <TableCell>{processTypeLabels[process.type as keyof typeof processTypeLabels]}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[process.status as keyof typeof statusColors]}>
                      {processStatusLabels[process.status as keyof typeof processStatusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[process.priority as keyof typeof priorityColors]}>
                      {process.priority === "high" ? "Alta" : process.priority === "medium" ? "Média" : "Baixa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {process.steps[process.currentStep] && (
                        <>
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-xs font-medium">
                            {process.steps[process.currentStep].assignedTo.name.charAt(0)}
                          </div>
                          <span className="text-sm">{process.steps[process.currentStep].assignedTo.name}</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(process.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/processos/${process.id}`}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Ver detalhes</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Nenhum processo encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProcessTable;
