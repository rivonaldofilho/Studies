package util;

public class NavegadorInternet extends Dispositivo {

    
    protected void ligar() {
        System.out.println("Ligando o navegador de internet...");
    }

    protected void desligar() {
        System.out.println("Desligando o navegador de internet...");
    }

    public void abrirPagina(String url) {
        ligar();
        System.out.println("Abrindo a página: " + url);
    }

    public void atualizarPagina() {

        System.out.println("Atualizando a página atual...");
    }

    public void fecharNavegador() {
        desligar();

        System.out.println("Fechando o navegador...");
    }
}
