
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Process, User, Document as DocType, Comment } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, MessageSquare, CheckCircle, X, ArrowRight, Upload, Clock, AlertCircle, FileImage } from 'lucide-react';

interface ProcessDetailProps {
  process: Process;
  users: User[];
  currentUser: User;
  onMoveToNextStep: (nextUserId: string, comment: string, files: File[]) => void;
  onAddComment: (comment: string, files: File[]) => void;
  onUpdateStatus: (status: 'completed' | 'cancelled') => void;
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

const statusTranslations = {
  draft: "Rascunho",
  ongoing: "Em Andamento",
  completed: "Concluído",
  cancelled: "Cancelado",
  'in-progress': "Em progresso",
  pending: "Pendente",
  rejected: "Rejeitado"
};

const ProcessDetail: React.FC<ProcessDetailProps> = ({
  process,
  users,
  currentUser,
  onMoveToNextStep,
  onAddComment,
  onUpdateStatus
}) => {
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");
  const [nextStepText, setNextStepText] = useState("");
  const [nextUserId, setNextUserId] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [nextStepFiles, setNextStepFiles] = useState<File[]>([]);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  
  const isCurrentStepAssignedToMe = process.currentStep < process.steps.length && 
    process.steps[process.currentStep].assignedTo.id === currentUser.id;
  
  const isProcessActive = process.status === 'ongoing';
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isNextStep: boolean = false) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (isNextStep) {
        setNextStepFiles([...nextStepFiles, ...files]);
      } else {
        setUploadedFiles([...uploadedFiles, ...files]);
      }
    }
  };
  
  const removeFile = (index: number, isNextStep: boolean = false) => {
    if (isNextStep) {
      setNextStepFiles(nextStepFiles.filter((_, i) => i !== index));
    } else {
      setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    }
  };
  
  const handleAddComment = () => {
    if (!commentText.trim() && uploadedFiles.length === 0) {
      toast({
        title: "Comentário vazio",
        description: "Adicione um texto ou arquivos ao comentário.",
        variant: "destructive"
      });
      return;
    }
    
    onAddComment(commentText, uploadedFiles);
    setCommentText("");
    setUploadedFiles([]);
    
    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi adicionado ao processo."
    });
  };
  
  const handleMoveToNextStep = () => {
    if (!nextUserId) {
      toast({
        title: "Selecione o próximo responsável",
        description: "Você deve selecionar o próximo responsável para avançar o processo.",
        variant: "destructive"
      });
      return;
    }
    
    onMoveToNextStep(nextUserId, nextStepText, nextStepFiles);
    setNextStepText("");
    setNextUserId("");
    setNextStepFiles([]);
    
    const nextUser = users.find(user => user.id === nextUserId);
    
    toast({
      title: "Processo avançado",
      description: `O processo foi encaminhado para ${nextUser?.name}.`
    });
  };
  
  const handleCompleteProcess = () => {
    onUpdateStatus('completed');
    setShowCompleteDialog(false);
    
    toast({
      title: "Processo concluído",
      description: "O processo foi marcado como concluído."
    });
  };
  
  const handleCancelProcess = () => {
    onUpdateStatus('cancelled');
    
    toast({
      title: "Processo cancelado",
      description: "O processo foi cancelado."
    });
  };
  
  const formatDate = (date: Date) => {
    return format(new Date(date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  };
  
  const renderDocumentIcon = (fileType: string) => {
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    
    if (imageTypes.includes(fileType.toLowerCase())) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    }
    
    return <FileText className="h-5 w-5 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{process.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">ID: {process.id}</Badge>
            <Badge className={statusColors[process.status as keyof typeof statusColors]}>
              {statusTranslations[process.status as keyof typeof statusTranslations]}
            </Badge>
            <Badge className={priorityColors[process.priority as keyof typeof priorityColors]}>
              {process.priority === 'high' ? 'Alta Prioridade' : 
               process.priority === 'medium' ? 'Média Prioridade' : 
               'Baixa Prioridade'}
            </Badge>
          </div>
        </div>
        
        {isProcessActive && (
          <div className="flex flex-wrap gap-2">
            {isCurrentStepAssignedToMe && (
              <Button onClick={() => setShowCompleteDialog(true)} variant="default">
                <CheckCircle className="mr-2 h-4 w-4" />
                Concluir Processo
              </Button>
            )}
            <Button onClick={handleCancelProcess} variant="outline" className="text-red-500">
              <X className="mr-2 h-4 w-4" />
              Cancelar Processo
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Descrição</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{process.description || "Sem descrição detalhada."}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Fluxo do Processo</CardTitle>
              <CardDescription>Acompanhe o histórico e a situação atual do processo</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="relative">
                {process.steps.map((step, index) => {
                  const isCurrentStep = index === process.currentStep;
                  const isPastStep = index < process.currentStep;
                  const isFutureStep = index > process.currentStep;
                  
                  return (
                    <div key={index} className="mb-6 relative">
                      {index > 0 && (
                        <div className="absolute top-0 left-5 -mt-6 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      
                      <div className={`flex ${isCurrentStep ? 'text-blue-600' : isPastStep ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                          ${isCurrentStep ? 'bg-blue-100 border-2 border-blue-600' : 
                            isPastStep ? 'bg-green-100 border-2 border-green-600' : 
                            'bg-gray-100 border-2 border-gray-300'}`}>
                          {isPastStep ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : isCurrentStep ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`text-lg font-medium ${isCurrentStep ? 'text-blue-600' : isPastStep ? 'text-green-600' : 'text-gray-500'}`}>
                              {step.title}
                            </h3>
                            <Badge className={`
                              ${step.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                step.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                                'bg-gray-100 text-gray-800'}
                            `}>
                              {statusTranslations[step.status as keyof typeof statusTranslations]}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center mt-1 space-x-2 text-sm text-gray-500">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={step.assignedTo.avatar} />
                              <AvatarFallback>{step.assignedTo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{step.assignedTo.name}</span>
                          </div>
                          
                          {step.description && (
                            <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                          )}
                          
                          {step.startedAt && (
                            <div className="mt-2 flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>
                                {isPastStep ? 'Completado' : 'Iniciado'} em {formatDate(step.startedAt)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="comments">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="comments">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comentários
              </TabsTrigger>
              <TabsTrigger value="documents">
                <FileText className="h-4 w-4 mr-2" />
                Documentos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="comments" className="mt-4 space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Área de comentários existentes */}
                    <div className="space-y-4">
                      {process.steps.flatMap((step, stepIndex) => 
                        step.comments.map((comment, commentIndex) => (
                          <div key={`${stepIndex}-${commentIndex}`} className="flex space-x-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={comment.createdBy.avatar} />
                              <AvatarFallback>{comment.createdBy.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1.5">
                              <div className="flex items-center">
                                <span className="font-medium">{comment.createdBy.name}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm">{comment.text}</p>
                              
                              {/* Documentos anexados ao comentário (stub) */}
                              {stepIndex === 1 && commentIndex === 0 && (
                                <div className="mt-2 space-y-1">
                                  <div className="p-2 bg-gray-50 rounded-md flex items-center">
                                    <FileText className="h-4 w-4 text-blue-500" />
                                    <span className="ml-2 text-sm">orçamento_fornecedor.pdf</span>
                                    <span className="ml-auto text-xs text-gray-500">284 KB</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                      
                      {process.steps.flatMap(step => step.comments).length === 0 && (
                        <div className="text-center py-6">
                          <MessageSquare className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">Nenhum comentário ainda.</p>
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    {/* Área para adicionar novo comentário */}
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Adicione um comentário ao processo..."
                        className="resize-none"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Arquivos anexados ({uploadedFiles.length})</h4>
                          <div className="grid gap-2">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4 text-blue-500" />
                                  <span className="text-sm truncate">{file.name}</span>
                                  <span className="text-xs text-gray-500">({Math.round(file.size / 1024)} KB)</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remover arquivo</span>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <div>
                          <label htmlFor="comment-file" className="cursor-pointer">
                            <div className="flex items-center text-sm text-blue-600 hover:underline">
                              <Upload className="h-4 w-4 mr-1" />
                              <span>Anexar arquivos</span>
                            </div>
                            <input
                              id="comment-file"
                              type="file"
                              className="hidden"
                              multiple
                              onChange={(e) => handleFileChange(e)}
                            />
                          </label>
                        </div>
                        
                        <Button onClick={handleAddComment}>
                          Adicionar Comentário
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {process.documents.length > 0 ? (
                      <div className="grid gap-2">
                        {process.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md">
                            <div className="flex items-center space-x-3">
                              {renderDocumentIcon(doc.type)}
                              <div>
                                <p className="text-sm font-medium">{doc.name}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <span>Adicionado por {doc.uploadedBy}</span>
                                  <span className="mx-2">•</span>
                                  <span>{formatDate(doc.uploadedAt)}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={doc.url} target="_blank" rel="noopener noreferrer" download>
                                Baixar
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <FileText className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Nenhum documento anexado.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Criado por</p>
                  <div className="flex items-center mt-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={process.createdBy.avatar} />
                      <AvatarFallback>{process.createdBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{process.createdBy.name}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Data de criação</p>
                  <p className="text-sm font-medium">{formatDate(process.createdAt)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Responsável atual</p>
                  {process.currentStep < process.steps.length ? (
                    <div className="flex items-center mt-1">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={process.steps[process.currentStep].assignedTo.avatar} />
                        <AvatarFallback>{process.steps[process.currentStep].assignedTo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{process.steps[process.currentStep].assignedTo.name}</span>
                    </div>
                  ) : (
                    <p className="text-sm">Processo finalizado</p>
                  )}
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-500">Tipo de processo</p>
                  <p className="text-sm font-medium">
                    {process.type === 'purchase' ? 'Compra' : 
                     process.type === 'hiring' ? 'Contratação' : 'Outro'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Documentos anexados</p>
                  <p className="text-sm font-medium">{process.documents.length}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Total de etapas</p>
                  <p className="text-sm font-medium">{process.steps.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {isProcessActive && isCurrentStepAssignedToMe && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Encaminhar processo</CardTitle>
                <CardDescription>Envie este processo para o próximo responsável</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Select value={nextUserId} onValueChange={setNextUserId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o próximo responsável" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {users.map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} - {user.role}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Textarea
                    placeholder="Instruções para o próximo responsável..."
                    value={nextStepText}
                    onChange={(e) => setNextStepText(e.target.value)}
                  />
                  
                  {nextStepFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Arquivos anexados ({nextStepFiles.length})</h4>
                      <div className="grid gap-2">
                        {nextStepFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              <span className="text-sm truncate">{file.name}</span>
                              <span className="text-xs text-gray-500">({Math.round(file.size / 1024)} KB)</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index, true)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remover arquivo</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <div>
                      <label htmlFor="next-step-file" className="cursor-pointer">
                        <div className="flex items-center text-sm text-blue-600 hover:underline">
                          <Upload className="h-4 w-4 mr-1" />
                          <span>Anexar arquivos</span>
                        </div>
                        <input
                          id="next-step-file"
                          type="file"
                          className="hidden"
                          multiple
                          onChange={(e) => handleFileChange(e, true)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleMoveToNextStep} className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Encaminhar Processo
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Concluir processo</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja concluir este processo? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          <div className="pt-4">
            <div className="flex items-center p-3 bg-yellow-50 rounded-md text-yellow-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p className="text-sm">
                Após concluir, o processo será encerrado e não poderá receber novos encaminhamentos ou comentários.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCompleteProcess}>
              Concluir Processo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProcessDetail;
