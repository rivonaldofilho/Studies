package br.com.dio.model;

public enum GameStatusEnum {
    NON_STARTED("Não iniciado"),
    INCOMPLETE("Incompleto"),
    COMPLETE("Complete");

    private String Label;

    GameStatusEnum(final String label){
        this.Label = label;
    }

    public String getLabel() {
        return Label;
    }
}
