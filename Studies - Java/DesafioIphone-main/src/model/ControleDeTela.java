package model;

import java.util.Random;

public class ControleDeTela {
    private Random random = new Random();

    private boolean telaLigada = random.nextBoolean();

    public void controleDeTela() {
        if (telaLigada) {
            System.out.println("Tela do Iphone ligada");
        }         else {
            System.out.println("Tela do Iphone desligada");
        }
    }


}