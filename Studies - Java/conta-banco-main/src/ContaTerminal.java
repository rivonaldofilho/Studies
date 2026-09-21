import java.util.Scanner;

public class ContaTerminal {
    public static void main(String[] args) throws Exception {

        System.out.println("Por favor, digite o seu nome:");
        Scanner scanner = new Scanner(System.in);
        String nomeCliente = scanner.next();
        System.out.println("Por favor, digite o número da sua conta:");
        int numeroConta = scanner.nextInt();
        System.out.println("Por favor, digite o número da sua agência:");
        int agencia = scanner.nextInt();
        System.out.println("Por favor, digite o seu saldo:");
        double saldo = scanner.nextDouble();
        System.out.println("Olá " + nomeCliente + ", obrigado por criar uma conta em nosso banco. Sua agência é " + agencia + ", conta " + numeroConta + " e seu saldo é de R$ " + saldo);
    }   

}