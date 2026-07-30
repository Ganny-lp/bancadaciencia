# 🔬 Banca da Ciência

Aplicação web construída com **React + TypeScript + Vite + Tailwind CSS**.

> Repositório: [`Ganny-lp/bancadaciencia`](https://github.com/Ganny-lp/bancadaciencia)

---

## 🚀 Stack do Projeto

| Camada | Tecnologia |
|---|---|
| Framework | React 19 |
| Linguagem | TypeScript |
| Build Tool | Vite |
| Estilização | Tailwind CSS 4 |
| Lint | ESLint + typescript-eslint |
| Deploy | GitHub Pages (`gh-pages`) |

## 📁 Estrutura

```
bancadaciencia/
├── public/          # Arquivos estáticos
├── src/             # Código-fonte da aplicação
├── index.html        # Ponto de entrada HTML
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## 🛠️ Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org) instalado.

```bash
# Clonar o repositório
git clone https://github.com/Ganny-lp/bancadaciencia.git
cd bancadaciencia

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build` | Compila TypeScript e gera build de produção |
| `npm run preview` | Serve localmente o build de produção |
| `npm run deploy` | Publica o build na branch `gh-pages` |

---

## 🤝 Guia de Desenvolvimento e Integração

Bem-vindo(a) à equipe! Este projeto segue um fluxo de trabalho com regras de proteção configuradas na branch principal (`main`). Siga este guia para que suas contribuições sejam aprovadas de forma rápida e sem bloqueios.

### 1. Regras de Ouro do Repositório

Para manter o histórico limpo e o código seguro, as seguintes políticas são aplicadas automaticamente a todos os colaboradores:

- **Sem commits diretos**: é estritamente proibido fazer push direto na branch padrão. Todo código deve entrar via Pull Request (PR).
- **Histórico linear**: não é permitido o uso de commits de merge que criem ramificações confusas no histórico principal.
- **Sem reescrita de histórico**: comandos como `git push --force` estão bloqueados na branch principal para evitar perda de dados.

### 2. Fluxo de Trabalho (Passo a Passo)

**Passo 1 — Criar uma branch de trabalho**

Sempre crie uma nova branch a partir da versão mais recente da branch principal antes de começar a codificar.

```bash
git checkout -b feature/nome-da-sua-tarefa
```

**Passo 2 — Desenvolver e commitar**

Faça suas alterações e escreva mensagens de commit claras e descritivas.

```bash
git commit -m "feat: adiciona nova funcionalidade de rotas"
```

**Passo 3 — Enviar para o GitHub e abrir o PR**

Envie sua branch para o repositório remoto e abra um Pull Request apontando para a branch padrão.

```bash
git push origin feature/nome-da-sua-tarefa
```

> **Nota:** ao abrir o Pull Request, as validações e verificações de segurança começarão a rodar automaticamente pelo GitHub Actions.

### 3. Critérios para Aprovação do Pull Request

Seu código só poderá ser integrado (*merged*) se passar por todos os critérios abaixo:

| Critério | O que é necessário para passar? |
|---|---|
| **Revisão de código (Code Owners)** | É exigida pelo menos 1 aprovação de um dos donos do código. O PR não pode ser finalizado até receber o sinal verde. |
| **Segurança (CodeQL)** | O scanner roda automaticamente. Nenhuma vulnerabilidade de nível Alto (High) ou Crítico é permitida. Erros gerais de código também bloqueiam o PR — corrija os alertas e faça push novamente. |
| **Revisão de IA (Copilot)** | O GitHub Copilot faz revisões automatizadas do código a cada novo push, fornecendo sugestões e dicas de melhoria (inclusive enquanto o PR for apenas um Draft). |

> ⚠️ **Atenção:** não há exceções. Ninguém tem privilégios para ignorar (*bypass*) essas regras. Se uma verificação falhar, o código obrigatoriamente precisa ser ajustado.

### 4. Quem são os Code Owners?

Os Code Owners são os responsáveis por revisar a arquitetura e garantir a qualidade da entrega. Atualmente, os donos globais do repositório são:

- [@Ganny-lp](https://github.com/Ganny-lp)
- [@rjfontana](https://github.com/rjfontana)
- [@Gislanesena](https://github.com/Gislanesena)

O GitHub os adiciona automaticamente como revisores assim que você abre o seu Pull Request. É necessária a aprovação favorável (*Approve*) de pelo menos um deles para prosseguir.

### 5. Finalizando (Merge)

Após todas as validações automáticas passarem (CodeQL) e você receber a aprovação, o botão de merge ficará verde. Para respeitar a regra de histórico linear do repositório, utilize preferencialmente as opções **Squash and merge** ou **Rebase and merge**.

---

## 📄 Licença

Consulte o repositório para informações sobre licenciamento.
