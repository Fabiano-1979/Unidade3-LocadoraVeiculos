package br.com.techdrive.locasystem.entidades;

/**
 * Representa uma Moto da locadora.
 * 
 * Herda de Veiculo (relação "É UM").
 * Aplica sobrescrita no método calcularLocacao para aplicar desconto de 10%.
 */
public class Moto extends Veiculo {

    // Atributo específico de Moto (exemplo)
    private int cilindrada; // em cc

    private static final double DESCONTO_MOTO = 0.10; // 10% de desconto

    public Moto() {
        super();
    }

    public Moto(String placa, String marca, double valorDiaria, int cilindrada) {
        super(placa, marca, valorDiaria);
        setCilindrada(cilindrada);
    }

    public int getCilindrada() {
        return cilindrada;
    }

    public void setCilindrada(int cilindrada) {
        if (cilindrada < 50) {
            throw new IllegalArgumentException("Cilindrada mínima é 50cc.");
        }
        this.cilindrada = cilindrada;
    }

    /**
     * Sobrescrita do método calcularLocacao.
     * 
     * Regra para Moto: valor bruto com 10% de desconto.
     */
    @Override
    public double calcularLocacao(int dias) {
        double valorBruto = super.calcularLocacao(dias);
        return valorBruto * (1 - DESCONTO_MOTO);
    }

    @Override
    public String toString() {
        return String.format("Moto [placa=%s, marca=%s, cilindrada=%dcc, valorDiaria=R$ %.2f, desconto=10%%]",
                getPlaca(), getMarca(), cilindrada, getValorDiaria());
    }
}