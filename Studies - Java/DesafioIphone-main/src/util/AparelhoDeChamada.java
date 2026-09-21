package util;

public class AparelhoDeChamada extends Dispositivo {

    protected void ligar() {
        System.out.println("Ligando o aparelho de chamada...");
    }

   
    protected void desligar() {
        System.out.println("Desligando a ligação...");
    }

    public void fazerChamada(String numero) {
        verificarSinal();
        ligar();
        System.out.println("Fazendo chamada para: " + numero);
    }

    public void encerrarChamada() {
        desligar();
        System.out.println("Encerrando a chamada...");

    }

    private void verificarSinal() {
        System.out.println("Verificando o sinal...");
    }
}
