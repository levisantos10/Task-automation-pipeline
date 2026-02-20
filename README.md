# 🤖 Task Automation Pipeline

Sistema de automação de tarefas que integra Python, Node.js e MySQL para executar e monitorar tarefas programadas em background.

---

## 📋 Sobre o Projeto

Pipeline completo de automação que permite cadastrar tarefas via API REST, executá-las automaticamente através de um worker Python, e visualizar os resultados em um dashboard web em tempo real.

---

## ⚙️ Características

- **API REST** (Node.js + Express) para gerenciar tarefas
- **Worker Python** que executa tarefas a cada 60 segundos
- **Banco MySQL** com histórico completo de execuções e logs
- **Dashboard web** com estatísticas e visualização em tempo real
- **Dois tipos de automações**:
  - Monitor de sites (verifica se estão online)
  - Verificador de clima (consulta temperatura de cidades)

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js + Express
- MySQL2
- CORS, Dotenv

### Worker
- Python 3.8+
- mysql-connector-python
- requests
- schedule

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)

### Banco de Dados
- MySQL 8.0+

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- Python 3.8+
- MySQL 8.0+

---

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/task-automation-pipeline.git
cd task-automation-pipeline
```

---

### 2️⃣ Configurar o Banco de Dados

Abra o MySQL Workbench ou terminal MySQL e execute:
```sql
CREATE DATABASE task_automation;
USE task_automation;

-- Copie e execute o conteúdo do arquivo: database/schema.sql
```

Ou via terminal:
```bash
mysql -u root -p < database/schema.sql
```

---

### 3️⃣ Configurar e Iniciar a API (Node.js)
```bash
cd node-api
npm install
```

Crie o arquivo `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=task_automation
PORT=3000
```

Iniciar a API:
```bash
npm run dev
```

A API estará rodando em `http://localhost:3000`

---

### 4️⃣ Configurar e Iniciar o Worker (Python)

Em outro terminal:
```bash
cd python-worker
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

Crie o arquivo `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=task_automation
API_URL=http://localhost:3000
```

Iniciar o Worker:
```bash
cd src
python worker.py
```

O Worker ficará rodando e executando tarefas automaticamente.

---

### 5️⃣ Abrir o Dashboard

Abra o arquivo `dashboard/index.html` no seu navegador.

---

## 📡 Endpoints da API

### Tarefas
- `GET /api/tasks` - Lista todas as tarefas
- `GET /api/tasks/:id` - Busca tarefa específica
- `POST /api/tasks` - Cria nova tarefa
- `PUT /api/tasks/:id` - Atualiza tarefa
- `PATCH /api/tasks/:id/toggle` - Ativa/desativa tarefa
- `DELETE /api/tasks/:id` - Deleta tarefa

### Execuções
- `GET /api/executions` - Lista todas execuções
- `GET /api/executions/stats` - Estatísticas gerais
- `GET /api/executions/task/:taskId` - Execuções de uma tarefa
- `GET /api/executions/:id` - Detalhes com logs

---

## 💡 Como Criar Tarefas

### Via Postman/API:

**Monitorar um site:**
```json
POST http://localhost:3000/api/tasks

{
  "name": "Monitor Google",
  "description": "https://www.google.com",
  "task_type": "website_monitor",
  "schedule_time": "*/1 * * * *"
}
```

**Verificar clima:**
```json
POST http://localhost:3000/api/tasks

{
  "name": "Clima Manaus",
  "description": "Manaus",
  "task_type": "weather_check",
  "schedule_time": "*/1 * * * *"
}
```

### Via MySQL:
```sql
INSERT INTO tasks (name, description, task_type, schedule_time, is_active)
VALUES ('Monitor GitHub', 'https://github.com', 'website_monitor', '*/1 * * * *', TRUE);
```

---

## 📊 Estrutura do Banco

**tasks** - Armazena as tarefas cadastradas
- id, name, description, task_type, schedule_time, is_active, created_at, updated_at

**executions** - Registra cada execução de tarefa
- id, task_id, status, started_at, finished_at, result, error_message

**logs** - Armazena logs detalhados
- id, execution_id, level, message, created_at

---

## 🔮 Melhorias Futuras

### Funcionalidades
- [ ] Autenticação e autorização (JWT)
- [ ] Notificações por email quando tarefas falharem
- [ ] Integração com Slack para alertas
- [ ] Mais tipos de tarefas:
  - Web scraping
  - Backup automático de arquivos
  - Integração com APIs externas (GitHub, Trello, etc)
  - Envio de emails automatizados
  - Processamento de arquivos CSV/Excel

### Infraestrutura
- [ ] Dockerizar toda a aplicação (Docker Compose)
- [ ] Implementar fila de tarefas com Redis/RabbitMQ
- [ ] Deploy automatizado (CI/CD)
- [ ] Testes unitários e de integração
- [ ] Monitoramento com Prometheus/Grafana

### Interface
- [ ] Refatorar dashboard para React ou Vue.js
- [ ] Adicionar gráficos de performance
- [ ] Criar formulário para cadastrar tarefas pelo dashboard
- [ ] Sistema de filtros e busca avançada
- [ ] Modo escuro

### Performance
- [ ] Cache de consultas frequentes
- [ ] Otimização de queries do banco
- [ ] Paginação nas listagens
- [ ] Compressão de logs antigos

---