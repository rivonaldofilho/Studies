import java.util.Scanner;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import model.Conta;
import model.ContaCorrente;
import model.ContaPoupanca;

public class App {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Bem-vindo ao RivosBank!");
        System.out.println("Escolha o tipo de conta que deseja criar:");
        System.out.println("1 - Conta Corrente");
        System.out.println("2 - Conta Poupança");
        System.out.println("0 - Sair");
        int opcao = scanner.nextInt();
        scanner.nextLine(); // Consumir a quebra de linha
        Conta conta = null;
        switch (opcao) {
            case 1:
                conta = criarContaCorrente(scanner);
                break;
            case 2:
                conta = criarContaPoupanca(scanner);
                break;
            case 0:
                System.out.println("Obrigado por usar o RivosBank! Até logo!");
                break;
            default:
                System.out.println("Opção inválida.");
                break;
        }

        if (conta != null) {
            if (autenticarConta(scanner, conta)) {
                exibirMenuOperacoes(scanner, conta);
            } else {
                System.out.println("Falha na autenticação. Encerrando o sistema.");
            }
        }


    }

    private static Conta criarContaCorrente(Scanner scanner) {
        String nome = obterNomeValido(scanner);
        String cpf = obterCPFValido(scanner);
        String senha = obterSenhaValida(scanner);
        double depositoInicial = obterDepositoValido(scanner);
        ContaCorrente contaCorrente = new ContaCorrente(nome, cpf, senha, depositoInicial);
        System.out.println("Conta corrente de " + contaCorrente.getNome() + " com o CPF " + contaCorrente.getCpf() + " criada com sucesso! Número da conta: " + contaCorrente.getNumeroConta());
        return contaCorrente;
    }

    private static Conta criarContaPoupanca(Scanner scanner) {
        String nome = obterNomeValido(scanner);
        String cpf = obterCPFValido(scanner);
        String senha = obterSenhaValida(scanner);
        double depositoInicial = obterDepositoValido(scanner);
        ContaPoupanca contaPoupanca = new ContaPoupanca(nome, cpf, senha, depositoInicial);
        System.out.println("Conta poupança de " + contaPoupanca.getNome() + " com o CPF " + contaPoupanca.getCpf() + " criada com sucesso! Número da conta: " + contaPoupanca.getNumeroConta());
        return contaPoupanca;
    }

    private static final long TEMPO_INATIVO_MS = 60_000;
    private static ScheduledExecutorService timerExecutor;
    private static ScheduledFuture<?> timerTask;

    private static void exibirMenuOperacoes(Scanner scanner, Conta conta) {
        iniciarTimerInatividade();

        while (true) {
            System.out.println("\nEscolha a operação:");
            System.out.println("1 - Sacar");
            System.out.println("2 - Depositar");
            System.out.println("3 - Consultar saldo");
            System.out.println("0 - Sair");

            String entrada = scanner.nextLine().trim();
            if (entrada.isEmpty()) {
                System.out.println("Entrada vazia. Tente novamente.");
                continue;
            }

            int opcaoOperacao;
            try {
                opcaoOperacao = Integer.parseInt(entrada);
            } catch (NumberFormatException e) {
                System.out.println("Opção inválida. Digite um número de 0 a 9.");
                continue;
            }

            resetarTimerInatividade();

            switch (opcaoOperacao) {
                case 1:
                    System.out.println("Digite o valor para saque:");
                    String saqueEntrada = scanner.nextLine().trim();
                    try {
                        double valorSaque = Double.parseDouble(saqueEntrada);
                        conta.sacar(valorSaque);
                    } catch (NumberFormatException e) {
                        System.out.println("Valor inválido para saque.");
                    }
                    resetarTimerInatividade();
                    break;
                case 2:
                    System.out.println("Digite o valor para depósito:");
                    String depositoEntrada = scanner.nextLine().trim();
                    try {
                        double valorDeposito = Double.parseDouble(depositoEntrada);
                        conta.depositar(valorDeposito);
                    } catch (NumberFormatException e) {
                        System.out.println("Valor inválido para depósito.");
                    }
                    resetarTimerInatividade();
                    break;
                case 3:
                    conta.consultarSaldo();
                    resetarTimerInatividade();
                    break;
                case 0:
                    System.out.println("Saindo. Obrigado por usar o RivosBank!");
                    pararTimerInatividade();
                    return;
                default:
                    System.out.println("Opção de operação inválida.");
            }
        }
    }

    private static boolean autenticarConta(Scanner scanner, Conta conta) {
        int tentativas = 3;

        while (tentativas > 0) {
            System.out.println("Digite o número da conta:");
            String contaEntrada = scanner.nextLine().trim();
            System.out.println("Digite sua senha:");
            String senhaEntrada = scanner.nextLine().trim();

            try {
                int numeroConta = Integer.parseInt(contaEntrada);
                if (numeroConta == conta.getNumeroConta() && senhaEntrada.equals(conta.getSenha())) {
                    System.out.println("Autenticação realizada com sucesso.");
                    return true;
                }
            } catch (NumberFormatException e) {
                // continua para mensagem de erro
            }

            tentativas--;
            System.out.println("Número da conta ou senha inválidos. Tentativas restantes: " + tentativas);
        }

        return false;
    }

    private static void iniciarTimerInatividade() {
        timerExecutor = Executors.newSingleThreadScheduledExecutor();
        timerTask = timerExecutor.schedule(() -> {
            System.out.println("\nTempo de inatividade excedido (1 minuto). O sistema será encerrado.");
            System.exit(0);
        }, TEMPO_INATIVO_MS, TimeUnit.MILLISECONDS);
    }

    private static void resetarTimerInatividade() {
        if (timerTask != null && !timerTask.isDone()) {
            timerTask.cancel(false);
        }
        timerTask = timerExecutor.schedule(() -> {
            System.out.println("\nTempo de inatividade excedido (1 minuto). O sistema será encerrado.");
            System.exit(0);
        }, TEMPO_INATIVO_MS, TimeUnit.MILLISECONDS);
    }

    private static void pararTimerInatividade() {
        if (timerTask != null) {
            timerTask.cancel(false);
        }
        if (timerExecutor != null) {
            timerExecutor.shutdownNow();
        }
    }

    private static String obterNomeValido(Scanner scanner) {
        String nome;
        while (true) {
            System.out.println("Digite seu nome completo (pelo menos 2 nomes):");
            nome = scanner.nextLine().trim();
            if (validarNomeCompleto(nome)) {
                return nome;
            }
            System.out.println("Erro! Digite um nome completo com pelo menos 2 nomes separados por espaço. Não use números ou caracteres especiais.");
        }
    }

    private static String obterCPFValido(Scanner scanner) {
        String cpf;
        while (true) {
            System.out.println("Digite seu CPF (11 dígitos numéricos):");
            cpf = scanner.nextLine().trim();
            if (validarCPF(cpf)) {
                return cpf;
            }
            System.out.println("Erro! O CPF deve conter exatamente 11 dígitos numéricos, sem letras ou caracteres especiais.");
        }
    }

    private static double obterDepositoValido(Scanner scanner) {
        double deposito;
        while (true) {
            System.out.println("Digite o valor do depósito inicial (mínimo R$ 100,00 e máximo R$ 1.000,00):");
            try {
                deposito = scanner.nextDouble();
                if (validarDepositoInicial(deposito)) {
                    scanner.nextLine(); // Consumir a quebra de linha
                    return deposito;
                }
                System.out.println("Erro! O depósito deve ser no mínimo R$ 100,00 e no máximo R$ 1.000,00.");
            } catch (Exception e) {
                scanner.nextLine(); // Consumir entrada inválida
                System.out.println("Erro! Digite um valor numérico válido.");
            }
        }
    }

    private static String obterSenhaValida(Scanner scanner) {
        String senha;
        while (true) {
            System.out.println("Digite sua senha (exatamente 4 números):");
            senha = scanner.nextLine().trim();
            if (validarSenha(senha)) {
                return senha;
            }
            System.out.println("Erro! A senha deve conter exatamente 4 dígitos numéricos.");
        }
    }

    private static boolean validarNomeCompleto(String nome) {
        // Verifica se tem pelo menos 2 nomes (pelo menos um espaço)
        String[] partes = nome.split(" ");
        return partes.length >= 2 && nome.length() > 0 && partes[0].length() > 0 && partes[1].length() > 0 && nome.matches("[a-zA-Z ]+");
    }

    private static boolean validarCPF(String cpf) {
        // Verifica se tem exatamente 11 dígitos numéricos
        return cpf.matches("\\d{11}");
    }

    private static boolean validarDepositoInicial(double valor) {
        // Verifica se está entre 100 e 1000
        return valor >= 100 && valor <= 1000;
    }

    private static boolean validarSenha(String senha) {
        // Verifica se tem exatamente 4 dígitos numéricos
        return senha.matches("\\d{4}");
    }
}
