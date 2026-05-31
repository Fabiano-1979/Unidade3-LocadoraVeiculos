package br.com.techdrive.locasystem.entidades;

import java.util.Objects;

/**
 * Classe abstrata que representa um Veículo genérico da locadora.
 * Serve como superclasse para Carro e Moto.
 * 
 * Aplica o pilar da Herança para evitar duplicação de código
 * dos atributos comuns (placa, marca, valorDiaria).
 */
public abstract class Veiculo {

    // Atributos privados para garantir encapsulamento (Item 3b da atividade)
    private String placa;
    private String marca;
    private double valorDiaria;

    /**
     * Construtor padrão.
     */
    public Veiculo() {
    }

    /**
     * Construtor com todos os atributos comuns.
     */
    public Veiculo(String placa, String marca, double valorDiaria) {
        setPlaca(placa);
        setMarca(marca);
        setValorDiaria(valorDiaria);
    }

    // ==================== GETTERS E SETTERS ====================

    public String getPlaca() {
        return placa;
    }

    /**
     * Define a placa com validação básica.
     */
    public void setPlaca(String placa) {
        if (placa == null || placa.trim().isEmpty()) {
            throw new IllegalArgumentException("Placa não pode ser vazia.");
        }
        this.placa = placa.trim().toUpperCase();
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        if (marca == null || marca.trim().isEmpty()) {
            throw new IllegalArgumentException("Marca não pode ser vazia.");
        }
        this.marca = marca.trim();
    }

    public double getValorDiaria() {
        return valorDiaria;
    }

    /**
     * Define o valor da diária com validação (não pode ser negativo).
     */
    public void setValorDiaria(double valorDiaria) {
        if (valorDiaria < 0) {
            throw new IllegalArgumentException("Valor da diária não pode ser negativo.");
        }
        this.valorDiaria = valorDiaria;
    }

    // ==================== MÉTODOS DE NEGÓCIO ====================

    /**
     * Calcula o valor bruto da locação (sem especializações).
     * Este método é sobrescrito nas subclasses (Carro e Moto).
     *
     * @param dias quantidade de dias da locação
     * @return valor total da locação
     */
    public double calcularLocacao(int dias) {
        if (dias <= 0) {
            throw new IllegalArgumentException("Quantidade de dias deve ser maior que zero.");
        }
        return dias * this.valorDiaria;
    }

    // ==================== SOBRESCRITA DE MÉTODOS DA CLASSE OBJECT ====================

    /**
     * Sobrescreve toString() para exibir os dados do veículo de forma legível.
     * Sem essa sobrescrita, System.out.println(veiculo) mostraria algo como "Veiculo@1b6d3586".
     */
    @Override
    public String toString() {
        return String.format("Veiculo [placa=%s, marca=%s, valorDiaria=R$ %.2f]",
                placa, marca, valorDiaria);
    }

    /**
     * Sobrescreve equals() para comparar veículos pela placa (regra de negócio da locadora).
     * 
     * Importante:
     * - Usa instanceof para evitar ClassCastException
     * - Faz casting seguro após a verificação
     * - Segue o contrato: se a.equals(b) então a.hashCode() == b.hashCode()
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || !(obj instanceof Veiculo)) {
            return false;
        }
        Veiculo outro = (Veiculo) obj;
        // Comparação por placa (case insensitive)
        return this.placa != null && this.placa.equalsIgnoreCase(outro.placa);
    }

    /**
     * Deve ser sobrescrito sempre que equals() for sobrescrito.
     * Garante que objetos iguais tenham o mesmo hashCode.
     */
    @Override
    public int hashCode() {
        return Objects.hash(placa != null ? placa.toUpperCase() : null);
    }
}