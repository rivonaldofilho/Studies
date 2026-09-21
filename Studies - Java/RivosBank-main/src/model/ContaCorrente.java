package model;

public class ContaCorrente extends Conta{

    public ContaCorrente(String nome, String cpf, String senha, double depositoInicial) {
        super(nome, cpf, senha, depositoInicial);
        
    }

    public void depositar(double valor) {
        if (valor > 0) {
            setSaldo(getSaldo() + valor);
            System.out.println("Depósito realizado com sucesso! Novo saldo: R$ " + getSaldo());
        } else {
            System.out.println("Valor de depósito inválido!");
        }
    }

    public void sacar(double valor) {
        if (valor > 0 && valor <= getSaldo() + getChequeEspecial()) {
            setSaldo(getSaldo() - valor);
            System.out.println("Saque realizado com sucesso! Novo saldo: R$ " + getSaldo());
        } else {
            System.out.println("Valor de saque inválido ou saldo insuficiente!");
        }
    }

    private double getChequeEspecial() {
        return 500.0;
    }

   
    public void consultarSaldo() {
        System.out.println("Saldo corrente: R$ " + getSaldo());
    }
   


   

}
