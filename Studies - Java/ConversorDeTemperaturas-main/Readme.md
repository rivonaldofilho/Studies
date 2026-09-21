
# Conversor de temperatura - Java — Projeto de aprendizado

Este repositório contém uma calculadora simples em Java criada como exercício de aprendizagem. O objetivo foi praticar leitura de dados com Scanner, controle de fluxo e validação de entradas, mantendo o programa robusto contra entradas inválidas.

## O que o programa demonstra
- Uso de Scanner para ler entradas do usuário.
- Estruturas de controle: switch/case para selecionar operações, if/else para validações e do/while para repetir a interação até o usuário encerrar.
- Validação de entradas (números, operador e opção de continuar) para evitar exceções e comportamentos indesejados.
- Tratamento de casos especiais, como tentativa de divisão por zero, com feedback claro para o usuário.
- Organização em pequenos métodos auxiliares (por exemplo: ler número, ler operação, executar cálculo, validar resposta) para deixar a lógica mais clara e testável.


## Como compilar e executar (Windows)
- Compile:
    javac -d bin src\ConversorDeTemperatura.java
- Execute:
    java -cp bin ConversorDeTemperatura
- Siga as instruções no console: Escolha qual temperatura deseja converter e para qual, escolha um número. Caso deseja continuar escolha(s) Caso não(n).

## Validações e comportamento
- Números inválidos solicitam nova entrada até o usuário digitar um valor válido.
- Operador inválido exibe mensagem e pede nova escolha.
- Divisão por zero é detectada e informada sem fechar o programa.
- A opção de continuar aceita 's' (sim) e 'n' (não) — entradas inválidas são rejeitadas e o usuário é solicitado novamente.

## Melhorias sugeridas
- Usar BigDecimal para operações com maior precisão.
- Isolar lógica em classes e adicionar testes unitários (JUnit).
- Adicionar mensagens multilíngue ou interface gráfica (Swing/JavaFX) para melhorar a experiência.
- Tratamento mais robusto de excepcionais e logs.

## Autor
- Rivonaldo
- LinkedIn: [Rivonaldo](https://www.linkedin.com/in/rivonaldofilho/)

