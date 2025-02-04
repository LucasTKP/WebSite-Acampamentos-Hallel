'use client'

import React, { useState } from 'react';

const PrivacyPolicyPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsScrolled(scrollTop + clientHeight >= scrollHeight - 20);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6 text-center">
          <h1 className="text-2xl font-bold">Política de Privacidade</h1>
          <p className="text-sm">Acamps Canaã - Última Atualização: 14 de janeiro de 2025</p>
        </div>
        
        <div 
          onScroll={handleScroll}
          className="h-[500px] overflow-y-auto p-6 space-y-6"
        >
          {/* Sections */}
          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">1. Identificação</h2>
            <p className="text-gray-700">Esta política de privacidade se aplica ao aplicativo Acamps Canaã, desenvolvido por Lucas Gean Santos.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">2. Dados Pessoais Coletados</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800">2.1 Dados Coletados Diretamente</h3>
                <ul className="list-disc list-inside pl-4 text-gray-700">
                  <li>Nome completo</li>
                  <li>Endereço de e-mail</li>
                  <li>Data de nascimento</li>
                  <li>Número de telefone</li>
                  <li>Foto de perfil</li>
                  <li>Informações de participação em grupos</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-800">2.2 Dados Coletados Automaticamente</h3>
                <ul className="list-disc list-inside pl-4 text-gray-700">
                  <li>Dados de uso do aplicativo</li>
                  <li>Informações do dispositivo</li>
                  <li>Logs de acesso</li>
                  <li>Configurações e preferências do usuário</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">3. Finalidade da Coleta</h2>
            <ul className="list-disc list-inside pl-4 text-gray-700">
              <li>Gerenciar conta de usuário</li>
              <li>Facilitar participação em atividades</li>
              <li>Enviar notificações de eventos</li>
              <li>Personalizar experiência do aplicativo</li>
              <li>Manter registros de participação</li>
              <li>Fornecer suporte técnico</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">4. Compartilhamento de Dados</h2>
            <p className="text-gray-700">Comprometemo-nos a:</p>
            <ul className="list-disc list-inside pl-4 text-gray-700">
              <li>Não vender dados pessoais</li>
              <li>Compartilhar dados apenas quando necessário:
                <ul className="list-disc list-inside pl-4">
                  <li>Entre administradores do grupo</li>
                  <li>Com prestadores de serviços essenciais</li>
                  <li>Quando exigido por lei</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">5. Segurança dos Dados</h2>
            <p className="text-gray-700">Implementamos medidas de segurança para proteger contra:</p>
            <ul className="list-disc list-inside pl-4 text-gray-700">
              <li>Acesso não autorizado</li>
              <li>Alteração indevida</li>
              <li>Divulgação inadequada</li>
              <li>Destruição de informações</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">6. Direitos do Usuário</h2>
            <p className="text-gray-700">Você pode:</p>
            <ul className="list-disc list-inside pl-4 text-gray-700">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir informações imprecisas</li>
              <li>Solicitar exclusão de dados</li>
              <li>Retirar consentimento</li>
              <li>Receber cópia dos seus dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">7. Menores de Idade</h2>
            <p className="text-gray-700">Para usuários menores de 16 anos, é necessário consentimento dos pais ou responsáveis legais.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">8. Política de Retenção de Dados</h2>
            <ul className="list-disc list-inside pl-4 text-gray-700">
              <li>Dados pessoais serão retidos apenas pelo tempo necessário</li>
              <li>Após o período necessário, os dados serão excluídos de forma segura</li>
              <li>Usuários podem solicitar exclusão a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">9. Alterações na Política</h2>
            <p className="text-gray-700">Eventuais atualizações serão publicadas nesta página, com atualização da data de modificação.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">10. Contato</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">
                📧 <strong>E-mail:</strong> lucasgeansantos@gmail.com
              </p>
              <p className="text-gray-700">
                <strong>Assunto:</strong> Política de Privacidade - Acamps Canaã
              </p>
            </div>
          </section>
        </div>

        <div className={`bg-gray-100 p-4 text-center transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-700 text-sm mb-2">Ao continuar usando o aplicativo, você concorda com estes termos.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;