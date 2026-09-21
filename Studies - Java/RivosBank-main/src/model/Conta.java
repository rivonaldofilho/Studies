package model;

import java.util.Random;

public abstract class Conta {
    private int numeroConta;
    protected double saldo;
    private String nome;
    private String cpf;
    private String senha;
    private double depositoInicial;
    private double chequeEspecial; // Apenas para ContaCorrente, se aplicável

    // Construtor para criação de conta
    public Conta(String nome, String cpf, String senha, double depositoInicial) {
        this.numeroConta = gerarNumeroConta(); // Método para gerar 4 dígitos randômicos
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.depositoInicial = depositoInicial;
        this.saldo = depositoInicial; // Saldo inicial = depósito
        this.chequeEspecial = 0; // Definir conforme tipo de conta
    }

    private int gerarNumeroConta() {
        Random random = new Random();
        return 1000 + random.nextInt(9000); // Gera 4 dígitos (1000-9999)
    }

    // Getters e setters
    public int getNumeroConta() { return numeroConta; }
    public double getSaldo() { return saldo; }
    public void setSaldo(double saldo) { this.saldo = saldo; }
    public String getNome() { return nome; }
    public String getCpf() { return cpf; }
    public String getSenha() { return senha; }
    // ... outros getters/setters

    // Métodos abstratos (implementar nas subclasses)
    public abstract void consultarSaldo();
    public abstract void sacar(double valor);
    public abstract void depositar(double valor);
}