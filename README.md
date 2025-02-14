# Sistema de Login e Gestão de Tarefas

Este projeto é um sistema simples de login e gerenciamento de tarefas, implementado com JavaScript e armazenamento local (LocalStorage) para armazenar usuários e tarefas. O sistema permite registrar novos usuários, fazer login, adicionar tarefas, concluir tarefas e realizar logout. O login central tem a capacidade de visualizar e gerenciar as tarefas de todas as filiais.

## Funcionalidades

### 1. **Tela de Login e Registro**
   - **Tela de Login**: Permite que um usuário faça login com seu nome de usuário, senha e a filial a qual pertence.
   - **Tela de Registro**: Permite que novos usuários se registrem fornecendo nome de usuário, senha e a filial ou a opção de login central.
   - **Login Central**: O "login central" é um tipo especial de usuário que tem acesso a todas as filiais e pode visualizar e gerenciar tarefas de qualquer filial.

### 2. **Gestão de Tarefas**
   - **Adicionar Tarefa**: O usuário pode adicionar tarefas à sua lista.
   - **Visualizar Tarefas**: As tarefas são exibidas de acordo com a filial do usuário logado. Para o login central, todas as tarefas de todas as filiais são exibidas.
   - **Concluir Tarefa**: O usuário pode marcar uma tarefa como concluída. Para o login central, ele pode visualizar a conclusão de tarefas de todas as filiais.
   - **Deletar Tarefa**: O usuário pode excluir tarefas.
   - **Contagem de Tarefas**: O sistema conta quantas tarefas estão pendentes e concluídas para cada filial.

### 3. **Logout**
   - O usuário pode fazer logout a qualquer momento, o que limpa a sessão e retorna à tela de login.

### 4. **Função de Limpeza de Dados (Para Login Central)**
   - O login central tem a capacidade de limpar os dados de usuários e tarefas armazenados localmente.

## Estrutura do Projeto

### 1. **HTML**
   - O HTML contém as estruturas básicas de login, registro, e área de tarefas, incluindo formulários, botões, listas e contadores de tarefas.

### 2. **CSS (não fornecido, mas recomendável)**
   - O estilo pode ser facilmente adaptado para atender às necessidades visuais, com classes e IDs já definidos para elementos como `task-item`, `task-header`, `task-actions`, etc.

### 3. **JavaScript**
   - O JavaScript é responsável por toda a lógica de funcionamento:
     - Exibição e controle das telas de login e registro.
     - Armazenamento e recuperação de dados de usuários e tarefas no LocalStorage.
     - Contagem e exibição das tarefas de cada filial.
     - Manipulação de tarefas, incluindo adicionar, concluir, e excluir.
     - Função para limpar dados (disponível para o login central).

## Como Usar

### Passo 1: Inicie o sistema
   - Ao abrir o sistema, o usuário verá a tela de login. Caso não tenha uma conta, deve acessar a tela de registro.

### Passo 2: Registro de Usuário
   - Para se registrar, insira um nome de usuário, senha e a filial que deseja associar ao usuário (ou escolha o login central).
   - Após o registro bem-sucedido, o usuário será redirecionado à tela de login.

### Passo 3: Login
   - Ao fazer login, o sistema valida as credenciais e direciona o usuário para a área de gerenciamento de tarefas.

### Passo 4: Adicionar e Gerenciar Tarefas
   - O usuário pode adicionar novas tarefas, concluir ou excluir tarefas já existentes.
   - A contagem de tarefas pendentes e concluídas é atualizada automaticamente.

### Passo 5: Logout
   - O usuário pode fazer logout a qualquer momento clicando no botão de logout.

### Passo 6: Para Login Central
   - O login central tem acesso a todas as filiais e pode ver as tarefas de todas as filiais. Ele também pode limpar todos os dados de usuários e tarefas com o botão de "Limpar Dados".

## Armazenamento de Dados

- **Usuários**: Os usuários são armazenados no `localStorage` com as seguintes informações:
  - `username`: Nome de usuário.
  - `password`: Senha do usuário.
  - `branch`: Filial associada ao usuário (ou `central` para login central).

- **Tarefas**: As tarefas são armazenadas no `localStorage` com as seguintes informações:
  - `text`: Texto da tarefa.
  - `createdBy`: Nome do usuário que criou a tarefa.
  - `createdAt`: Data e hora em que a tarefa foi criada.
  - `branch`: Filial associada à tarefa.
  - `completedBy`: Usuário que concluiu a tarefa (se aplicável).
  - `completedAt`: Data e hora em que a tarefa foi concluída (se aplicável).

## Funcionalidades Extras

- **Limpeza de Dados**: O botão "Limpar Dados" (disponível para login central) apaga todos os dados de usuários e tarefas armazenados localmente.

## Considerações Finais

- Este projeto utiliza `localStorage` para persistir dados, o que significa que os dados são armazenados no navegador do usuário. Portanto, ao limpar o cache do navegador ou usar um navegador diferente, os dados serão perdidos.
- Para um sistema mais robusto, seria recomendável usar um banco de dados real e uma API para gerenciar usuários e tarefas de forma persistente entre sessões e dispositivos.

## Tecnologias Utilizadas

- **HTML**: Para estruturação do conteúdo.
- **CSS**: (Não fornecido, mas recomendado para um design personalizado).
- **JavaScript**: Para lógica de funcionamento, interação com o usuário e gerenciamento de dados.
- **LocalStorage**: Para persistência de dados no navegador.

## Contribuições

Se você deseja melhorar ou adicionar novas funcionalidades a este projeto, sinta-se à vontade para contribuir!
