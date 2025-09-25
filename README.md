# Agendador de Transferências Financeiras - Teste Mazatech

Este projeto é uma aplicação full-stack para agendamento de transferências financeiras, composta por um backend em Java com Spring Boot e um frontend em React com Vite.

## Tecnologias Utilizadas

### Backend
- **Java** (versão 17+)
- **Spring Boot**
- **Maven**
- **Spring Data JPA**
- **H2 Database** (banco de dados em memória)

### Frontend
- **React**
- **Vite**
- **Axios**: `v1.12.2`
- **TanStack Query (React Query)**
- **Swiper**: `v12.0.2`

## Ambiente de Desenvolvimento

-   **Backend**: O desenvolvimento foi realizado utilizando a IDE Spring Tool Suite 4.
-   **Frontend**: O desenvolvimento foi realizado utilizando o editor Visual Studio Code.
-   **Integração**: A integração entre o frontend e o backend, incluindo a configuração de build do Maven para empacotar a aplicação React, foi realizada no Visual Studio Code.

## Estrutura do Projeto

O repositório está organizado em duas pastas principais:

-   `Back-end/wayon/`: Contém a aplicação Spring Boot que serve a API.
-   `Front-End/interface-wayon/`: Contém a aplicação React que consome a API.

## Como Executar o Projeto

### Pré-requisitos

-   Java JDK 11 ou superior
-   Maven 3.x
-   Node.js 18 ou superior
-   npm (ou um gerenciador de pacotes de sua preferência)

---

### 1. Executando o Backend (API)

1.  Abra um terminal e navegue até a pasta do backend:
    ```bash
    cd c:\TesteMazatech\Back-end\wayon
    ```

2.  Compile e execute a aplicação Spring Boot com o Maven:
    ```bash
    mvn spring-boot:run
    ```

3.  A API estará disponível em `http://localhost:8080`.

### 2. Executando o Frontend (Interface)

1.  Abra **outro terminal** e navegue até a pasta do frontend:
    ```bash
    cd c:\TesteMazatech\Front-End\interface-wayon
    ```

2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```

3.  Inicie o servidor de desenvolvimento do Vite:
    ```bash
    npm run dev
    ```

4.  A aplicação estará acessível em seu navegador, geralmente no endereço `http://localhost:5173`.

## Endpoints da API

A API expõe os seguintes endpoints principais:

-   **`GET /transfers`**
    -   Retorna uma lista com todas as transferências agendadas.

-   **`POST /transfers`**
    -   Cria um novo agendamento de transferência.
    -   Corpo da requisição (exemplo):
        ```json
        {
          "sourceAccount": "123456",
          "destinationAccount": "654321",
          "transferValue": 150.50,
          "transferDate": "2025-12-25"
        }
        ```
