# Validador de Cartão de Crédito

Este é um projeto simples em Java que realiza a validação de números de cartões de crédito. Ele verifica se o número do cartão é válido com base no **algoritmo de Luhn** e identifica a bandeira do cartão (Visa, MasterCard, American Express, Discover, Diners Club e JCB) com base nos padrões de prefixo e comprimento de cada bandeira.

## Funcionalidades

- **Validação de número de cartão de crédito**: Verifica se o número do cartão é válido utilizando o algoritmo de Luhn.
- **Identificação da bandeira do cartão**: Identifica a bandeira do cartão com base nos prefixos e comprimentos específicos de cada tipo de cartão.

## Estrutura do Projeto

```
ProjetoValidadorDeCartao/
│
├── img/
│   └── base.png  # Imagem com os padrões de cartões de crédito
├── src/
│   └── cardValidator.java  # Código principal do validador de cartões
└── README.md  # Documentação do projeto
```

## Como usar

1. Clone este repositório para sua máquina local.
2. Compile o arquivo `cardValidator.java`.
3. Execute o método `main` para testar a validação de um número de cartão de crédito.
4. Insira o número do cartão no código para verificar sua validade e obter a bandeira correspondente.

## Exemplo de Uso

```java
public static void main(String[] args) {
    String testCard = "4111 1111 1111 1111"; // Exemplo de número de cartão Visa
    if (validateCard(testCard)) {
        System.out.println("Cartão válido! Bandeira: " + getCardBrand(testCard));
    } else {
        System.out.println("Cartão inválido!");
    }
}
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou novas funcionalidades para este projeto. Basta abrir um pull request ou relatar problemas na aba de issues.

## Contato

[Rivonaldo Alves](https://www.linkedin.com/in/rivonaldofilho/).