# Conhecimentos de Banco de Dados - Projeto Filmes

## 📚 Visão Geral do Projeto

Este projeto aborda os fundamentos essenciais de **SQL e modelagem de banco de dados** utilizando um banco de dados de filmes com múltiplas tabelas relacionadas. O foco principal é demonstrar como extrair e manipular dados através de consultas SQL para obter diferentes tipos de informações.

---

## 🎯 Conceitos Principais Trabalhados

### 1. **Criação e Estrutura de Banco de Dados**

- **CREATE DATABASE**: Criação de um novo banco de dados chamado "Filmes"
- **USE**: Seleção do banco de dados para operações subsequentes
- **CREATE TABLE**: Estruturação de tabelas com definição de tipos de dados

#### Tabelas Criadas:

| Tabela | Função |
|--------|--------|
| **Filmes** | Armazena informações básicas dos filmes (Nome, Ano, Duração) |
| **Atores** | Armazena dados dos atores (PrimeiroNome, UltimoNome, Gênero) |
| **Generos** | Armazena tipos/gêneros de filmes |
| **ElencoFilme** | Tabela de relacionamento entre Filmes e Atores com papéis |
| **FilmesGenero** | Tabela de relacionamento entre Filmes e Gêneros |

---

### 2. **Modelagem de Dados e Relacionamentos**

#### **Chaves Primárias (PRIMARY KEY)**
Cada tabela possui uma coluna `Id` como chave primária com IDENTITY(1,1), garantindo:
- Unicidade de cada registro
- Identificação única de filmes, atores e gêneros
- Facilidade na indexação e busca

#### **Tabelas de Relacionamento (Junction Tables)**
Implementadas para relacionamentos Many-to-Many:
- **ElencoFilme**: Conecta Filmes a Atores com a informação adicional do Papel
- **FilmesGenero**: Conecta Filmes a Gêneros

**Benefício**: Permite que um filme tenha múltiplos atores e múltiplos gêneros, e vice-versa.

---

### 3. **Consultas SELECT - Extração de Dados**

#### **Seleção Simples**
```sql
SELECT Nome, Ano FROM Filmes
```
Extrai colunas específicas sem filtros, demonstrando:
- Projeção de dados (escolher quais colunas retornar)
- Redução do escopo de dados desnecessários

#### **Ordenação com ORDER BY**
```sql
SELECT Nome, Ano FROM Filmes ORDER BY Ano
```
Organiza resultados em ordem crescente ou decrescente, facilitando:
- Análise visual de dados temporais
- Identificação de padrões cronológicos

---

### 4. **Filtragem com WHERE**

#### **Comparações Simples**
```sql
SELECT * FROM Filmes WHERE Ano = 1997
SELECT * FROM Filmes WHERE Ano >= 2000
```
Extrai dados específicos com base em condições, possibilitando:
- Busca por ano específico
- Busca por intervalo de tempo

#### **Condições Múltiplas com AND/OR**
```sql
SELECT * FROM Filmes 
WHERE Duracao > 100 AND Duracao < 150
ORDER BY Duracao
```
Combina múltiplos critérios para filtros complexos:
- **AND**: Ambas as condições devem ser verdadeiras
- **OR**: Pelo menos uma condição deve ser verdadeira

#### **Filtragem em Tabelas Relacionadas**
```sql
SELECT PrimeiroNome, UltimoNome, Genero FROM Atores
WHERE Genero = 'F'
```
Extrai atores de um gênero específico, mostrando como filtrar dados em tabelas diferentes

---

### 5. **Agregação de Dados com GROUP BY e COUNT**

#### **Contagem e Agrupamento**
```sql
SELECT Ano, COUNT(Ano) Quantidade FROM Filmes
GROUP BY Ano
ORDER BY Quantidade DESC
```
Agrupa filmes por ano e conta quantos filmes existem em cada ano, demonstrando:
- **COUNT()**: Função de agregação para contar registros
- **GROUP BY**: Agrupa registros por uma coluna
- **ORDER BY DESC**: Ordena em ordem decrescente

**Aplicação Prática**: Identificar qual período teve mais lançamentos de filmes

---

### 6. **JOINS - Combinação de Tabelas**

#### **INNER JOIN**
```sql
SELECT 
    Filmes.Nome,
    Generos.Genero
FROM 
    Filmes
INNER JOIN FilmesGenero ON Filmes.Id = FilmesGenero.IdFilme
INNER JOIN Generos ON FilmesGenero.IdGenero = Generos.Id
```

**Conceito**: Combina dados de múltiplas tabelas retornando apenas linhas que possuem correspondência em ambas

**Neste Projeto**:
- Filmes com seus respectivos Gêneros
- Filmes com seus Atores e Papéis

**Sintaxe do INNER JOIN**:
```sql
TABELA1 INNER JOIN TABELA2 ON TABELA1.ChavePrimaria = TABELA2.ChaveEstrangeira
```

#### **Exemplo Prático - Elenco Completo**
```sql
SELECT 
    Filmes.Nome,
    Atores.PrimeiroNome,
    Atores.UltimoNome,
    ElencoFilme.Papel
FROM 
    Filmes
INNER JOIN ElencoFilme ON Filmes.Id = IdFilme
INNER JOIN Atores ON ElencoFilme.IdAtor = Atores.Id
```

Retorna:
- Nome do filme
- Nome do ator
- Papel desempenhado

---

### 7. **Dados Inseridos e Manipulação**

#### **INSERT INTO**
```sql
INSERT [dbo].[Atores] ([Id], [PrimeiroNome], [UltimoNome], [Genero]) 
VALUES (1, N'James', N'Stewart', N'M')
```

Demonstra:
- Inserção de registros na tabela
- Uso de IDENTITY para chaves primárias automáticas
- Prefixo `N` para strings Unicode

#### **Dados do Projeto**
- **23 Atores**: De clássicos a contemporâneos
- **23 Filmes**: Diversos gêneros e períodos (1958-1999)
- **Múltiplos Gêneros**: Drama, Ficção Científica, Mistério, etc.
- **Relacionamentos Complexos**: Cada ator pode participar de vários filmes com papéis diferentes

---

### 8. **Tipos de Dados Utilizados**

| Tipo | Uso | Exemplo |
|------|-----|---------|
| **INT** | Números inteiros (IDs, anos, duração) | `Id INT`, `Ano INT` |
| **VARCHAR(n)** | Texto de comprimento variável | `Nome VARCHAR(50)` |
| **IDENTITY(1,1)** | Geração automática de IDs | `Id INT IDENTITY(1,1)` |

---

### 9. **Padrões SQL Avançados**

#### **Aliases de Tabela**
Uso de apelidos para tornar queries mais legíveis:
```sql
SELECT F.Nome, G.Genero
FROM Filmes F
INNER JOIN FilmesGenero FG ON F.Id = FG.IdFilme
INNER JOIN Generos G ON FG.IdGenero = G.Id
```

#### **Aliasing de Colunas**
```sql
SELECT Ano, COUNT(Ano) Quantidade FROM Filmes
```
A coluna `COUNT(Ano)` é renomeada para `Quantidade` nos resultados

---

## 🔍 Tipos de Informações Extraídas

### Consultas Básicas
- Listagem de filmes e anos
- Pesquisa por filme específico
- Busca por intervalo de ano
- Filtragem por duração

### Consultas com Análise
- Contagem de filmes por ano
- Filtro de atores por gênero
- Identificação de atores femininos/masculinos

### Consultas Relacionais Complexas
- Filmes com seus gêneros
- Filmes de um gênero específico
- Elenco completo de filmes (filme + ator + papel)

---

## 📊 Benefícios da Estrutura Relacional

1. **Normalização**: Elimina redundância de dados
2. **Integridade**: Mantém consistência através de relacionamentos
3. **Flexibilidade**: Permite consultas complexas sem dados duplicados
4. **Escalabilidade**: Fácil adicionar novos filmes, atores ou gêneros
5. **Manutenção**: Atualizar informações em um único lugar

---

## 🎓 Competências Desenvolvidas

✅ Criação e design de banco de dados relacional  
✅ Escrita de queries SQL desde o básico até o avançado  
✅ Modelagem de relacionamentos Many-to-Many  
✅ Filtragem e ordenação de dados  
✅ Agregação e agrupamento de informações  
✅ Combinação de múltiplas tabelas com INNER JOIN  
✅ Extração de informações complexas  
✅ Otimização de consultas SQL  

---

## 📧 Conecte-se Comigo

Interessado em discutir banco de dados, SQL ou desenvolvimento em .NET?

**LinkedIn**: [Rivonaldo Filho](https://www.linkedin.com/in/rivonaldofilho/)

---

