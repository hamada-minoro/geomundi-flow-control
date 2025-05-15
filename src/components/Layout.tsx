
import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";
import { Bell, Home, FileText, Users, Settings, LogOut, Menu, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

interface Notification {
  id: number;
  message: string;
  read: boolean;
  timestamp: Date;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Novo processo #2023-005 foi atribuído a você",
      read: false,
      timestamp: new Date(new Date().getTime() - 60 * 60000)
    },
    {
      id: 2,
      message: "Compra de materiais aprovada",
      read: false,
      timestamp: new Date(new Date().getTime() - 120 * 60000)
    }
  ]);
  
  const [user, setUser] = useState({
    name: "João Silva",
    role: "Gerente de Projetos",
    avatar: ""
  });

  const { toast } = useToast();
  
  const unreadNotifications = notifications.filter(notification => !notification.read).length;
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    toast({
      title: "Notificação marcada como lida",
      duration: 2000
    });
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    
    toast({
      title: "Todas notificações marcadas como lidas",
      duration: 2000
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-geomundi-lightgray">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="flex justify-center py-6">
            <img src="/lovable-uploads/ffa79065-b553-431f-84fa-c42f92c9a94b.png" alt="GEOMUNDI Logo" className="h-10" />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <Home size={20} />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/processos">
                        <FileText size={20} />
                        <span>Processos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/usuarios">
                        <Users size={20} />
                        <span>Usuários</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Sua conta</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/perfil">
                        <Settings size={20} />
                        <span>Configurações</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/login">
                        <LogOut size={20} />
                        <span>Sair</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="truncate">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col flex-1">
          <header className="bg-white p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu size={20} />
                </Button>
              </SidebarTrigger>
              <h1 className="text-xl font-semibold">GEOMUNDI</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center bg-red-500 text-white rounded-full text-[10px]">
                        {unreadNotifications}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Notificações</h3>
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        Marcar todas como lidas
                      </Button>
                    </div>
                    
                    <div className="max-h-60 overflow-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className={`p-3 mb-2 rounded text-sm ${notification.read ? 'bg-gray-100' : 'bg-blue-50'}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex justify-between items-start">
                              <span>{notification.message}</span>
                              {!notification.read && (
                                <span className="bg-blue-500 h-2 w-2 rounded-full mt-1"></span>
                              )}
                            </div>
                            <div className="text-gray-500 text-xs mt-1">
                              {new Intl.DateTimeFormat('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit'
                              }).format(notification.timestamp)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-gray-500">Sem notificações</div>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Link to="/perfil">
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
