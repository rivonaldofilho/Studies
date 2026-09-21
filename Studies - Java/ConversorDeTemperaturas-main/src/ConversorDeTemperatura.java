import java.util.NoSuchElementException;
import java.util.Scanner;

public class ConversorDeTemperatura {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        try {
            boolean keepRunning = true;
            System.out.println("Bem vindo a Calculadora de temperatura");
            while (keepRunning) {
                int option = readOption(scanner);
                switch (option) {
                    case 1: {
                        double c = readDouble(scanner, "Digite a temperatura em Celsius: ");
                        double f = cToF(c);
                        System.out.printf("%.2f ºC = %.2f ºF", c, f);
                        break;
                    }
                    case 2: {
                        double c = readDouble(scanner, "Digite a temperatura em Celsius: ");
                        double k = cToK(c);
                        System.out.printf("%.2f ºC = %.2f ºK", c, k);
                        break;
                    }
                    case 3: {
                        double f = readDouble(scanner, "Digite a temperatura em Fahrenheit: ");
                        double c = fToC(f);
                        System.out.printf("%.2f ºF = %.2f ºC", f, c);
                        break;
                    }
                    case 4: {
                        double f = readDouble(scanner, "Digite a temperatura em Fahrenheit: ");
                        double k = fToK(f);
                        System.out.printf("%.2f ºF = %.2f ºK", f, k);
                        break;
                    }
                    case 5: {
                        double k = readDouble(scanner, "Digite a temperatura em Kelvin: ");
                        double c = kToC(k);
                        System.out.printf("%.2f ºK = %.2f ºC", k, c);
                        break;
                    }
                    case 6: {
                        double k = readDouble(scanner, "Digite a temperatura em Kelvin: ");
                        double f = kToF(k);
                        System.out.printf("%.2f ºK = %.2f ºF", k, f);
                        break;
                    }
                    case 0:
                        keepRunning = false;
                        System.out.println("Obrigado por usar a calculadora!");
                        break;
                    default:
                        System.out.println("Digite uma opção válida!");
                }
                if (keepRunning && option != 0) {
                    keepRunning = askContinue(scanner);
                }
            }
        } catch (NoSuchElementException | IllegalStateException e) {
            System.out.println("Entrada encerrada. Finalizando...");
        } catch (Exception e) {
            System.out.println("Erro inesperado: " + e.getMessage());
        } finally {
            scanner.close();
        }
    }

    // Definindo método "readOption"
    private static int readOption(Scanner scanner) {
        while (true) {
            System.out.println("\nVamos começar! Escolha qual Conversão você deseja fazer:");
            System.out.println(" 1 - Celsius -> Fahrenheit");
            System.out.println(" 2 - Celsius -> Kelvin");
            System.out.println(" 3 - Fahrenheit -> Celsius");
            System.out.println(" 4 - Fahrenheit -> Kelvin");
            System.out.println(" 5 - Kelvin -> Celsius");
            System.out.println(" 6 - Kelvin -> Fahrenheit");
            System.out.println(" 0 - Sair");
            System.out.print("Escolha uma opção: ");
            String line = safeReadLine(scanner);
            if (line == null) throw new NoSuchElementException();
            line = line.trim();
            if (line.isEmpty()) {
                System.out.println("Entrada vazia. Tente novamente. ");
                continue;
            }
            // Permite apenas os primeiros dígitos
            char c = line.charAt(0);
            if (c >= '0' && c <= '9') {
                int v = c - '0';
                if (v >= 0 && v <= 6) return v;
            }
            try {
                int v = Integer.parseInt(line);
                if (v >= 0 && v <= 6) return v;
            } catch (NumberFormatException ex) {
                //Ignora exceções
            }
            System.out.println("Opção inválida!! Digite um número de 0 a 6.");
        }
    }

    // Definindo método "readDouble"
    private static double readDouble(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);
            String line = safeReadLine(scanner);
            if (line == null) throw new NoSuchElementException();
            line = line.trim();
            if (line.isEmpty()) {
                System.out.println("Entrada vazia. Tente novamente.");
                continue;
            }
            line = line.replace(',', '.');

            //Evita erro, em caso do o usuário digitar um caractere diferente de um número.
            try {
                double value = Double.parseDouble(line);
                if (Double.isInfinite(value) || Double.isNaN(value)) {
                    System.out.println("Entrada inválida! Tente novamente.");
                    continue;
                }
                return value;
            } catch (NumberFormatException ex) {
                System.out.println("Entrada inválida. Digite um número válido (ex: 12.5 ou 12,5).");
            }
        }
    }

    // Definindo método "safeReadLine"
    private static String safeReadLine(Scanner scanner) {
        try {
            return scanner.nextLine();
        } catch (NoSuchElementException | IllegalStateException e) {
            return null;
        }
    }

    private static boolean askContinue(Scanner scanner) {
        while (true) {
            System.out.print(". Deseja realizar outra conversão? (S/N): ");
            String line = safeReadLine(scanner);
            if (line == null) return false;
            line = line.trim().toLowerCase();
            if (line.isEmpty()) continue;
            char c = line.charAt(0);
            if (c == 's' || c == 'y') return true;
            if (c == 'n') return false;
            System.out.println("Resposta inválida. Digite S para sim ou N para não.");
        }
// Conversões de Temperaturas


    }
    // conversões
    private static double cToF(double c) { return (c * 9.0 / 5.0) + 32.0; }
    private static double cToK(double c) { return c + 273.15; }
    private static double fToC(double f) { return (f - 32.0) * 5.0 / 9.0; }
    private static double fToK(double f) { return fToC(f) + 273.15; }
    private static double kToC(double k) { return k - 273.15; }
    private static double kToF(double k) { return cToF(kToC(k)); }
}