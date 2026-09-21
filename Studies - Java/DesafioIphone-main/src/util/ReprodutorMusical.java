package util;

public class ReprodutorMusical extends Dispositivo {

    
    protected void ligar() {
        System.out.println("Ligando o reprodutor musical...");
    }

    
    protected void desligar() {
        System.out.println("Desligando o reprodutor musical...");
    }

    public void reproduzirMusica(String musica) {
        ligar();
        System.out.println("Reproduzindo música: " + musica);
    }

    public void pausarMusica() {
        System.out.println("Pausando a música...");
    }

    public void pararMusica() {

        System.out.println("Parando a reprodução...");
        desligar();
    }
}
