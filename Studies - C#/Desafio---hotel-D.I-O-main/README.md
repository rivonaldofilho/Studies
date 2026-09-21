# 🏨 Sistema de Hospedagem - Desafio DIO

> Projeto desenvolvido como desafio da plataforma **Digital Innovation One (DIO)**

---

## 📋 Descrição do Projeto

Sistema simples e didático de gerenciamento de hospedagem em hotel, desenvolvido em **C#**. O projeto demonstra a implementação de conceitos fundamentais de programação orientada a objetos através de um sistema que gerencia hóspedes, suítes e reservas.

---

## 🎯 Habilidades Trabalhadas

Durante o desenvolvimento deste projeto, foram aplicadas e consolidadas as seguintes habilidades:

### ✅ Conceitos Fundamentais de OOP
- **Classes e Objetos**: Criação de modelos (Pessoa, Suite, Reserva)
- **Encapsulamento**: Uso de propriedades auto-implementadas (`{ get; set; }`)
- **Abstração**: Separação de responsabilidades entre as classes

### ✅ Estruturas de Dados
- **Listas (List<T>)**: Gerenciamento de coleções de hóspedes
- **Manipulação de coleções**: Add, Count, verificações

### ✅ Programação Orientada a Objetos
- **Construtores sobrecarregados**: Flexibilidade na inicialização de objetos
- **Métodos públicos**: CadastrarSuite(), CadastrarHospedes(), CalcularValorDiaria()
- **Propriedades calculadas**: NomeCompleto (string interpolation)

### ✅ Lógica de Programação
- **Validações**: Verificação de capacidade da suíte vs. número de hóspedes
- **Tratamento de exceções**: Lançamento de erros personalizados
- **Cálculos complexos**: Desconto progressivo para reservas acima de 10 dias (10% de desconto)
- **Operadores condicionais**: If/else para lógica de negócio

### ✅ Boas Práticas
- **Namespaces**: Organização de código por módulos
- **Nomenclatura clara**: Nomes descritivos em português
- **Estrutura de pastas**: Separação entre Models e lógica principal
- **Tratamento de valores nulos**: Verificações de null para evitar exceções

### ✅ C# Específico
- **String Interpolation**: `$"Texto {variavel}"`
- **LINQ/Métodos de coleção**: Operações com List<T>
- **Tipos de dados**: decimal para valores monetários
- **Encoding UTF-8**: Suporte a caracteres especiais

---

## 📁 Estrutura do Projeto

```
Desafio/
├── Program.cs              # Ponto de entrada da aplicação
├── DesafioProjetoHospedagem.csproj
├── Desafio.sln
└── Models/
    ├── Pessoa.cs           # Modelo de hóspede
    ├── Suite.cs            # Modelo de suíte/quarto
    └── Reserva.cs          # Modelo de reserva e lógica de negócio
```

---

## 🚀 Funcionalidades Principais

| Funcionalidade | Descrição |
|---|---|
| **Cadastrar Hóspedes** | Adiciona uma lista de hóspedes à reserva com validação de capacidade |
| **Cadastrar Suíte** | Define a suíte/quarto para a reserva |
| **Obter Quantidade de Hóspedes** | Retorna o total de hóspedes cadastrados |
| **Calcular Valor da Diária** | Calcula o custo total da hospedagem com desconto progressivo |

### 💰 Política de Desconto
- **Reservas com menos de 10 dias**: Valor integral
- **Reservas com 10 ou mais dias**: 10% de desconto no valor total

---

## 💻 Exemplo de Uso

```csharp
// Criar hóspedes
Pessoa p1 = new Pessoa(nome: "João", sobrenome: "Silva");
Pessoa p2 = new Pessoa(nome: "Maria");

// Adicionar à lista
List<Pessoa> hospedes = new List<Pessoa> { p1, p2 };

// Criar suíte
Suite suite = new Suite(tipoSuite: "Premium", capacidade: 2, valorDiaria: 30);

// Criar e configurar reserva
Reserva reserva = new Reserva(diasReservados: 5);
reserva.CadastrarSuite(suite);
reserva.CadastrarHospedes(hospedes);

// Exibir resultados
Console.WriteLine($"Hóspedes: {reserva.ObterQuantidadeHospedes()}");      // Output: 2
Console.WriteLine($"Valor diária: {reserva.CalcularValorDiaria()}");     // Output: 150
```

---

## 🔧 Tecnologias Utilizadas

- **Linguagem**: C# (.NET)
- **Framework**: .NET 10.0
- **IDE**: Visual Studio / Visual Studio Code
- **Paradigma**: Programação Orientada a Objetos

---

## 📚 Conceitos Aplicados

### POO - Pilares Fundamentais
- ✅ Encapsulamento
- ✅ Herança (estrutura de classes)
- ✅ Abstração
- ✅ Polimorfismo (construtores sobrecarregados)

### Práticas de Desenvolvimento
- Separação de responsabilidades
- DRY (Don't Repeat Yourself)
- Nomes descritivos e self-documenting code
- Validação de dados de entrada

---

## 🎓 Plataforma DIO

Este projeto foi desenvolvido como parte de um desafio da plataforma **Digital Innovation One**, uma das maiores comunidades de desenvolvimento da América Latina, dedicada a acelerar a carreira de desenvolvedores através de conteúdo educacional prático e desafios reais.

> **Digital Innovation One** - Transformando vidas através da educação em tecnologia

---

## 👤 Desenvolvedor

**Rivonaldo Filho**  
[Rivonaldo](https://www.linkedin.com/in/rivonaldofilho/)

---

## 📝 Licença

Este projeto é educacional e está disponível para fins de aprendizado.

---

**Desenvolvido com ❤️ para a comunidade DIO**
