
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProfileForm from '@/components/Usuario/ProfileForm';
import { User } from '@/types';

const PerfilPage = () => {
  // Usuário simulado
  const [user, setUser] = useState<User>({
    id: 'user-1',
    name: 'João Silva',
    email: 'joao.silva@geomundi.com',
    role: 'Gerente de TI',
    department: 'TI',
    avatar: ''
  });
  
  const handleSave = (updatedUser: User, avatarFile?: File) => {
    // Em uma aplicação real, aqui você enviaria os dados para a API
    console.log('Dados atualizados:', updatedUser);
    console.log('Arquivo de avatar:', avatarFile);
    
    // Atualizar o estado do usuário
    setUser(updatedUser);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Perfil do Usuário</h2>
        <ProfileForm user={user} onSave={handleSave} />
      </div>
    </Layout>
  );
};

export default PerfilPage;
