
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProcessFormProps {
  users: User[];
  onSubmit: (processData: any) => void;
}

const ProcessForm: React.FC<ProcessFormProps> = ({ users, onSubmit }) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [processData, setProcessData] = useState({
    title: '',
    description: '',
    type: 'purchase',
    priority: 'medium',
    step: {
      title: '',
      description: '',
      assignedToId: ''
    },
    documents: [] as File[]
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProcessData({
      ...processData,
      [name]: value
    });
  };
  
  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProcessData({
      ...processData,
      step: {
        ...processData.step,
        [name]: value
      }
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProcessData({
      ...processData,
      [name]: value
    });
  };
  
  const handleStepSelectChange = (name: string, value: string) => {
    setProcessData({
      ...processData,
      step: {
        ...processData.step,
        [name]: value
      }
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...files]);
    }
  };
  
  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!processData.title || !processData.step.title || !processData.step.assignedToId) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const formData = {
        ...processData,
        documents: uploadedFiles
      };
      
      try {
        onSubmit(formData);
        
        toast({
          title: "Processo criado com sucesso!",
          description: `O processo "${processData.title}" foi criado e enviado para ${users.find(user => user.id === processData.step.assignedToId)?.name}.`,
        });
        
        // Reset form
        setProcessData({
          title: '',
          description: '',
          type: 'purchase',
          priority: 'medium',
          step: {
            title: '',
            description: '',
            assignedToId: ''
          },
          documents: []
        });
        setUploadedFiles([]);
      } catch (error) {
        toast({
          title: "Erro ao criar processo",
          description: "Ocorreu um erro ao criar o processo. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  // Modo responsivo usando um componente Tabs para dispositivos móveis
  if (isMobile) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="step">Etapa</TabsTrigger>
            <TabsTrigger value="files">Anexos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Processo</CardTitle>
                <CardDescription>Preencha os dados básicos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ex: Compra de equipamentos"
                    value={processData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Processo *</Label>
                  <Select
                    value={processData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="purchase">Compra</SelectItem>
                        <SelectItem value="hiring">Contratação</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Descreva o processo..."
                    value={processData.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select
                    value={processData.priority}
                    onValueChange={(value) => handleSelectChange('priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="step" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Etapa Inicial</CardTitle>
                <CardDescription>Defina a primeira etapa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stepTitle">Título da etapa *</Label>
                  <Input
                    id="stepTitle"
                    name="title"
                    placeholder="Ex: Solicitação de orçamentos"
                    value={processData.step.title}
                    onChange={handleStepChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stepDescription">Instruções</Label>
                  <Textarea
                    id="stepDescription"
                    name="description"
                    placeholder="O que deve ser feito nesta etapa..."
                    value={processData.step.description}
                    onChange={handleStepChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Responsável *</Label>
                  <Select
                    value={processData.step.assignedToId}
                    onValueChange={(value) => handleStepSelectChange('assignedToId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Anexos</CardTitle>
                <CardDescription>Adicione documentos ao processo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
                  <div className="space-y-2 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="text-sm text-gray-500">
                      <label htmlFor="file-upload" className="relative cursor-pointer text-blue-600 hover:text-blue-500">
                        <span>Toque para upload</span>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX, JPG até 10MB
                    </p>
                  </div>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Arquivos anexados ({uploadedFiles.length})</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm truncate">{file.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remover arquivo</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex flex-col space-y-2">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Criando..." : "Criar Processo"}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Cancelar
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    );
  }
  
  // Versão desktop mantém o layout original
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Processo</CardTitle>
          <CardDescription>Preencha as informações básicas do novo processo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Compra de equipamentos de informática"
                  value={processData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Processo *</Label>
                <Select
                  value={processData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="purchase">Compra</SelectItem>
                      <SelectItem value="hiring">Contratação</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descreva o processo em detalhes..."
                value={processData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                value={processData.priority}
                onValueChange={(value) => handleSelectChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Etapa Inicial</CardTitle>
          <CardDescription>Defina a primeira etapa e o responsável</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stepTitle">Título da etapa *</Label>
              <Input
                id="stepTitle"
                name="title"
                placeholder="Ex: Solicitação de orçamentos"
                value={processData.step.title}
                onChange={handleStepChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stepDescription">Instruções</Label>
              <Textarea
                id="stepDescription"
                name="description"
                placeholder="Descreva o que deve ser feito nesta etapa..."
                value={processData.step.description}
                onChange={handleStepChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Responsável *</Label>
              <Select
                value={processData.step.assignedToId}
                onValueChange={(value) => handleStepSelectChange('assignedToId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsável" />
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
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Anexos</CardTitle>
          <CardDescription>Adicione documentos ou imagens ao processo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
              <div className="space-y-2 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="text-sm text-gray-500">
                  <label htmlFor="file-upload" className="relative cursor-pointer text-blue-600 hover:text-blue-500">
                    <span>Arraste arquivos ou clique para upload</span>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, XLS, XLSX, JPEG, PNG até 10MB
                </p>
              </div>
            </div>
            
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
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar Processo"}
        </Button>
      </div>
    </form>
  );
};

export default ProcessForm;
