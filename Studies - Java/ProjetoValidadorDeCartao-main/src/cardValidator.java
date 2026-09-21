// Método principal para validar o número do cartão de crédito
    public static boolean validateCard(String cardNumber) {
        // Remove espaços em branco
        cardNumber = cardNumber.replaceAll("\\s+", "");

        // Verifica se o número do cartão é válido com base no algoritmo de Luhn
        if (!isValidLuhn(cardNumber)) {
            return false;
        }

        // Verifica a bandeira do cartão
        if (!validateCardBrand(cardNumber)) {
            return false;
        }

        // Exibe a bandeira do cartão
        System.out.println("Bandeira do cartão: " + getCardBrand(cardNumber));

        return true;
    }

    // Método para validar o número do cartão com base no algoritmo de Luhn
    private static boolean isValidLuhn(String cardNumber) {
        int sum = 0;
        boolean alternate = false;
        for (int i = cardNumber.length() - 1; i >= 0; i--) {
            int n = Integer.parseInt(cardNumber.substring(i, i + 1));
            if (alternate) {
                n *= 2;
                if (n > 9) {
                    n = (n % 10) + 1;
                }
            }
            sum += n;
            alternate = !alternate;
        }
        return (sum % 10 == 0);
    }

    // Método para validar a bandeira do cartão com base nos prefixos e comprimentos
    private static boolean validateCardBrand(String cardNumber) {
        if (cardNumber.matches("^4[0-9]{12}(?:[0-9]{3})?$")) {
            // Visa: Começa com 4, 13 ou 16 dígitos
            return true;
        } else if (cardNumber.matches("^5[1-5][0-9]{14}$")) {
            // MasterCard: Começa com 51-55, 16 dígitos
            return true;
        } else if (cardNumber.matches("^3[47][0-9]{13}$")) {
            // American Express: Começa com 34 ou 37, 15 dígitos
            return true;
        } else if (cardNumber.matches("^6(?:011|5[0-9]{2})[0-9]{12}$")) {
            // Discover: Começa com 6011 ou 65, 16 dígitos
            return true;
        } else if (cardNumber.matches("^3(?:0[0-5]|[68][0-9])[0-9]{11}$")) {
            // Diners Club: Começa com 300-305, 36 ou 38, 14 dígitos
            return true;
        } else if (cardNumber.matches("^35(?:2[89]|[3-8][0-9])[0-9]{12}$")) {
            // JCB: Começa com 3528-3589, 16 dígitos
            return true;
        }
        return false;
    }

    // Método para obter a bandeira do cartão com base no número
    public static String getCardBrand(String cardNumber) {
        cardNumber = cardNumber.replaceAll("\\s+", ""); // Remove espaços em branco

        if (cardNumber.matches("^4[0-9]{12}(?:[0-9]{3})?$")) {
            return "Visa";
        } else if (cardNumber.matches("^5[1-5][0-9]{14}$")) {
            return "MasterCard";
        } else if (cardNumber.matches("^3[47][0-9]{13}$")) {
            return "American Express";
        } else if (cardNumber.matches("^6(?:011|5[0-9]{2})[0-9]{12}$")) {
            return "Discover";
        } else if (cardNumber.matches("^3(?:0[0-5]|[68][0-9])[0-9]{11}$")) {
            return "Diners Club";
        } else if (cardNumber.matches("^35(?:2[89]|[3-8][0-9])[0-9]{12}$")) {
            return "JCB";
        }
        return "Desconhecida";
    }

   
    // Método principal para teste
    public static void main(String[] args) {
        String testCard = "4395 8330 4492 8819"; 
        if (validateCard(testCard)) {
            System.out.println("Cartão válido! Bandeira: " + getCardBrand(testCard));
        } else {
            System.out.println("Cartão inválido!");
        }
    }
