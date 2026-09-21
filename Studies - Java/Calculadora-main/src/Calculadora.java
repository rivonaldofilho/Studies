import java.util.Scanner;

public class Calculadora {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        char again = 'n'; // para evitar o erro: "may not have been initialized"
        do {
            double num1;
            while (true) {
                System.out.println("Escolha um número");
                if (scanner.hasNextDouble()) {
                    num1 = scanner.nextDouble();
                    break;
                } else {
                    System.out.println("Entrada inválida. Por favor digite um número.");
                    scanner.next(); // evita erro caso usuário não digite um número
                }
            }

            double num2;
            while (true) {
                System.out.println("Escolha outro número");
                if (scanner.hasNextDouble()) {
                    num2 = scanner.nextDouble();
                    break;
                } else {
                    System.out.println("Entrada inválida. Por favor digite um número.");
                    scanner.next(); // evita erro caso usuário não digite um número
                }
            }

            System.out.println("Para somar escolha (+), Subtrair (-), multiplicar (*) e dividir (/):");
            char operator;
            while (true) {
            String opToken = scanner.next().trim();
            operator = opToken.isEmpty() ? ' ' : opToken.charAt(0);
            if (operator == '+' || operator == '-' || operator == '*' || operator == '/') {
                break;
            } else {
                System.out.println("Operação inválida. Digite uma das opções: +, -, * ou /");
            }
            }
            
            double result;

            switch (operator){
                case '+':
                    result = num1 + num2;
                    break;

                case '-':
                    result = num1 - num2;
                    break;

                case '*':
                    result = num1 * num2;
                    break;

                case '/':
                    if (num2 != 0) {
                        result = num1 / num2;
                    } else {
                        System.out.println("Erro! Não é possível dividir por zero");
                        continue; // volta ao início do loop principal
                    }
                    break;
                default:
                    System.out.println("Erro! Operação inválida");
                    continue; // volta ao início do loop principal
            }

            System.out.println(num1 + " " + operator + " " + num2 + ": " + result);

            System.out.println("Deseja fazer outra operação? (s/n)");
            String input = scanner.next().trim().toLowerCase();
            while (input.isEmpty() || (input.charAt(0) != 's' && input.charAt(0) != 'n')) {
                System.out.println("Entrada inválida. Digite 's' para sim ou 'n' para não.");
                input = scanner.next().trim().toLowerCase();
            }
            again = input.charAt(0);
        } while (again == 's');

        System.out.println("Obrigado por usar a calculadora!");
        scanner.close();
    }
}
