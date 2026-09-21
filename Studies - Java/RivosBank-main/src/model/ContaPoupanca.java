package model;

public class ContaPoupanca extends Conta {

   
    
    public ContaPoupanca(String nome, String cpf, String senha, double depositoInicial) {
        super(nome, cpf, senha, depositoInicial);
       
    }

    public void consultarSaldo() {
        System.out.println("Saldo poupança: R$ " + getSaldo());
    }

   
    public void sacar(double valor) {
        if (valor > 0 && valor <= getSaldo()) {
            setSaldo(getSaldo() - valor);
            System.out.println("Saque realizado com sucesso! Novo saldo: R$ " + getSaldo());
        } else {
            System.out.println("Valor de saque inválido ou saldo insuficiente!");
        }
    }

   
    public void depositar(double valor) {
        if (valor > 0) {
            setSaldo(getSaldo() + valor);
            System.out.println("Depósito realizado com sucesso! Novo saldo: R$ " + getSaldo());
        } else {
            System.out.println("Valor de depósito inválido!");
        }
    }

    public void criarConta() {
        System.out.println("Conta poupança criada com sucesso!");
    }

    public void excluirConta() {
        System.out.println("Conta poupança excluída com sucesso!");
    }

    public void acessarConta() {
        System.out.println("Bem-vindo à sua conta poupança!");
    }
    

}
