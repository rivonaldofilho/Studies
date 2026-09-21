# RivosBank - Projeto de Banco Digital em Java

Olá! Sou Rivonaldo, e criei este projeto como uma forma prática de aplicar e consolidar meus conhecimentos em Programação Orientada a Objetos (POO). Minha intenção principal aqui é colocar em prática os conceitos fundamentais da POO, transformando ideias abstratas em código funcional. Este é um projeto simples de um banco digital, mas que serve como laboratório para explorar os pilares da orientação a objetos, com ênfase especial no encapsulamento e na herança.

## Sobre o Projeto

O RivosBank é uma simulação de um sistema bancário básico, onde implementei classes para representar contas bancárias. O foco não está em criar um sistema complexo ou comercial, mas sim em demonstrar como abstrair o mundo real para o código, prestando atenção aos detalhes que fazem a diferença na modelagem orientada a objetos.

## Pilares da Programação Orientada a Objetos Trabalhados

Como mencionei, este projeto foi desenvolvido com o objetivo de praticar os conceitos da POO. Aqui estão os pilares principais que explorei:

### 1. **Encapsulamento**
O encapsulamento é o coração deste projeto. Eu me concentrei em proteger os dados das classes, garantindo que o acesso aos atributos seja controlado. Por exemplo:
- Os atributos das contas, como saldo e número da conta, são privados.
- Usei métodos getters e setters para manipular esses dados de forma segura.
- Isso impede acessos diretos e indesejados, promovendo a integridade dos dados. No mundo real, isso é como proteger informações sensíveis em um banco, evitando que sejam alteradas indevidamente.

### 2. **Herança**
A herança permite criar uma hierarquia de classes, reutilizando código. No RivosBank:
- A classe `Conta` é a classe pai, com atributos e métodos comuns a todas as contas.
- `ContaCorrente` e `ContaPoupanca` herdam de `Conta`, adicionando comportamentos específicos.
- Isso evita repetição de código e facilita a manutenção. Pense nisso como especializar tipos de contas bancárias: uma conta corrente tem características únicas, mas compartilha muitas funcionalidades com uma conta poupança.

### 3. **Abstração**
Abstrair o mundo real para o código foi um desafio que me ensinou muito. Eu tentei capturar apenas os aspectos essenciais de um banco digital:
- Identifiquei o que é realmente importante: contas, saldos, depósitos, saques.
- Ignorei detalhes irrelevantes para o escopo, como interfaces gráficas ou integrações externas.
- A atenção aos detalhes foi crucial: por exemplo, garantir que um saque não deixe o saldo negativo, refletindo regras do mundo real.

### 4. **Polimorfismo**
Embora não seja o foco principal, o polimorfismo aparece naturalmente na herança. Métodos como `sacar()` podem ser sobrescritos nas subclasses para comportamentos específicos, demonstrando como objetos de tipos diferentes podem responder de maneiras distintas ao mesmo método.

## Tratamento de Exceções

Uma parte importante que implementei foi o tratamento de exceções. Em um sistema bancário, erros podem ocorrer, como tentar sacar mais do que o saldo disponível. Eu adicionei verificações e lançamentos de exceções personalizadas para lidar com essas situações:
- Por exemplo, se um saque exceder o saldo, uma exceção é lançada, informando o problema.
- Isso torna o código mais robusto e previne comportamentos inesperados. No mundo real, isso é essencial para a confiabilidade de um sistema financeiro.


## Como Executar

Para rodar o projeto, você precisa ter o Java instalado. Compile e execute da seguinte forma:

1. Navegue até a pasta do projeto.
2. Compile: `javac -d bin src/model/*.java src/App.java`
3. Execute: `java -cp bin App`

## Conclusão

Este projeto foi uma jornada de aprendizado para mim. Ao criar o RivosBank, não só pratiquei herança e encapsulamento, mas também aprendi a importância de abstrair cuidadosamente o mundo real e tratar exceções adequadamente. Se você está estudando POO, espero que este exemplo inspire você a aplicar esses conceitos em seus próprios projetos. Qualquer feedback é bem-vindo!

---
## Autor

[Rivonaldo Alves](https://www.linkedin.com/in/rivonaldofilho/) 
