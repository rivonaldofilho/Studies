# Desafio iPhone - Modelagem com UML e POO

Este projeto é um desafio de programação orientada a objetos (POO) que visa modelar o comportamento de um iPhone utilizando conceitos de UML (Unified Modeling Language) para diagramar as classes e suas relações.

## Descrição do Projeto

O projeto simula as funcionalidades de um iPhone, incluindo reprodutor musical, aparelho telefônico e navegador de internet. Cada funcionalidade é implementada como uma classe separada, com herança e interfaces para promover a reutilização de código e a organização modular.

### Funcionalidades Implementadas

- **Reprodutor Musical**: Permite tocar, pausar e selecionar músicas.
- **Aparelho Telefônico**: Permite fazer ligações, atender chamadas e iniciar correio de voz.
- **Navegador de Internet**: Permite exibir páginas, adicionar novas abas e atualizar páginas.

## Aprendizados Desenvolvidos

Durante o desenvolvimento deste projeto, foram aplicados e reforçados os seguintes princípios da Programação Orientada a Objetos (POO):

- **Encapsulamento**: Os atributos e métodos das classes foram protegidos com modificadores de acesso apropriados (private, public), garantindo que o estado interno dos objetos seja manipulado apenas por meio de interfaces controladas. Isso evita acessos diretos e promove a integridade dos dados.

- **Herança**: Utilizou-se herança para criar uma hierarquia de classes, onde uma classe base (por exemplo, uma classe abstrata para dispositivos) pode ser estendida por subclasses específicas (como ReprodutorMusical, AparelhoTelefonico e NavegadorInternet). Isso permite compartilhar comportamentos comuns e reduzir duplicação de código.

- **Abstração**: Interfaces foram definidas para representar contratos de comportamento, permitindo que classes concretas implementem métodos específicos sem expor detalhes desnecessários. Por exemplo, uma interface `Reprodutor` define métodos como `tocar()` e `pausar()`, abstraindo a implementação real.

### Lógica por Trás do Desenvolvimento

A lógica do projeto segue os princípios de modelagem UML, onde:
- Diagramas de classe foram criados para visualizar as relações entre entidades.
- Interfaces foram usadas para definir comportamentos polimórficos.
- Uma classe principal (ex.: `Iphone`) pode compor as funcionalidades através de agregação, permitindo que o iPhone "tenha" um reprodutor, um telefone e um navegador.
- O foco foi na modularidade, facilitando testes unitários e manutenção futura. Cada módulo foi desenvolvido de forma independente, com testes para validar o comportamento esperado.

## Tecnologias Utilizadas

- Linguagem: Java
- Ferramentas: IDE (ex.: IntelliJ IDEA ou VS Code), Git para versionamento
- Diagramas: Draw.io ou similar para UML

## Como Executar

1. Clone o repositório.
2. Abra o projeto em sua IDE.
3. Execute a classe principal para testar as funcionalidades.

## LinkedIn

[Rivonaldo Silva](https://www.linkedin.com/in/rivonaldofilho/)