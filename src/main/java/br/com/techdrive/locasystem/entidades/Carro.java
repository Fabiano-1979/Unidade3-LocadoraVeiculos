package br.com.techdrive.locasystem.entidades;

/**
 * Representa um Carro da locadora.
 * 
 * Herda de Veiculo (relação "É UM").
 * Aplica sobrescrita no método calcularLocacao para incluir taxa de seguro.
 */
public class Carro extends Veiculo {

    // Atributo específico de Carro (exemplo)
    private int quantidadePortas;
    private static final double TAXA_SEGURO_DIARIA = 35.00; // R$ 35,00 por dia de seguro

    public Carro() {
        super();
    }

    public Carro(String placa, String marca, double valorDiaria, int quantidadePortas) {
        super(placa, marca, valorDiaria);
        setQuantidadePortas(quantidadePortas);
    }

    public int getQuantidadePortas() {
        return quantidadePortas;
    }

    public void setQuantidadePortas(int quantidadePortas) {
        if (quantidadePortas < 2 || quantidadePortas > 5) {
            throw new IllegalArgumentException("Quantidade de portas deve estar entre 2 e 5.");
        }
        this.quantidadePortas = quantidadePortas;
    }

    /**
     * Sobrescrita do método calcularLocacao.
     * 
     * Regra para Carro: valor bruto + taxa de seguro diária.
     */
    @Override
    public double calcularLocacao(int dias) {
        double valorBruto = super.calcularLocacao(dias); // chama o método da superclasse
        double taxaSeguro = dias * TAXA_SEGURO_DIARIA;
        return valorBruto + taxaSeguro;
    }

    @Override
    public String toString() {
        return String.format("Carro [placa=%s, marca=%s, portas=%d, valorDiaria=R$ %.2f, taxaSeguro=R$ %.2f/dia]",
                getPlaca(), getMarca(), quantidadePortas, getValorDiaria(), TAXA_SEGURO_DIARIA);
    }
}