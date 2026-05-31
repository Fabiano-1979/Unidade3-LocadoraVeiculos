package br.com.techdrive.locasystem.app;

import br.com.techdrive.locasystem.entidades.Carro;
import br.com.techdrive.locasystem.entidades.Moto;
import br.com.techdrive.locasystem.entidades.Veiculo;

import java.util.ArrayList;
import java.util.List;

/**
 * Classe de demonstração do sistema LocaSystem.
 * 
 * Objetivo: mostrar na prática os conceitos da Unidade 3:
 * - Herança
 * - Sobrescrita de métodos (calcularLocacao)
 * - Sobrescrita de toString(), equals() e hashCode()
 * - Encapsulamento com private
 * - Organização em pacotes (br.com.techdrive.locasystem.entidades)
 */
public class Principal {

    public static void main(String[] args) {

        System.out.println("==============================================");
        System.out.println("   SISTEMA LOCASystem - TechDrive");
        System.out.println("   Demonstração dos conceitos da Unidade 3");
        System.out.println("==============================================\n");

        // ==================== CRIANDO VEÍCULOS ====================
        System.out.println(">>> Cadastrando veículos...\n");

        Carro carro1 = new Carro("ABC1D23", "Fiat", 120.00, 4);
        Carro carro2 = new Carro("XYZ9K88", "Toyota", 180.00, 4);
        Moto moto1 = new Moto("MOT4E56", "Honda", 85.00, 160);
        Moto moto2 = new Moto("MOT7F21", "Yamaha", 95.00, 250);

        // Lista polimórfica (o poder da herança + sobrescrita)
        List<Veiculo> frota = new ArrayList<>();
        frota.add(carro1);
        frota.add(carro2);
        frota.add(moto1);
        frota.add(moto2);

        // ==================== EXIBINDO DADOS (toString) ====================
        System.out.println(">>> Dados dos veículos cadastrados (toString sobrescrito):\n");
        for (Veiculo v : frota) {
            System.out.println(v);
        }

        // ==================== CÁLCULO DE LOCAÇÃO (POLIMORFISMO) ====================
        System.out.println("\n>>> Simulação de locação por 5 dias:\n");

        int dias = 5;
        for (Veiculo v : frota) {
            double valor = v.calcularLocacao(dias);
            System.out.printf("%s → %d dias = R$ %.2f%n", 
                    v.getClass().getSimpleName() + " " + v.getPlaca(), dias, valor);
        }

        // ==================== TESTE DE EQUALS (PLACA DUPLICADA) ====================
        System.out.println("\n>>> Testando regra de negócio: placas duplicadas (equals + hashCode)\n");

        // Tentativa de cadastrar veículo com placa já existente
        Carro carroDuplicado = new Carro("ABC1D23", "Chevrolet", 150.00, 4);

        boolean jaExiste = false;
        for (Veiculo v : frota) {
            if (v.equals(carroDuplicado)) {
                jaExiste = true;
                break;
            }
        }

        if (jaExiste) {
            System.out.println("❌ CADASTRO NEGADO: Já existe um veículo com a placa " + 
                    carroDuplicado.getPlaca() + " na frota!");
            System.out.println("   (Comparação feita via equals() sobrescrito)");
        } else {
            frota.add(carroDuplicado);
            System.out.println("✅ Veículo cadastrado com sucesso.");
        }

        // ==================== COMPARAÇÃO DE REFERÊNCIA vs CONTEÚDO ====================
        System.out.println("\n>>> Diferença entre == e equals():\n");

        Carro carroReferencia = carro1;                    // mesma referência
        Carro carroMesmoDados = new Carro("ABC1D23", "Fiat", 120.00, 4); // mesmo conteúdo, objeto diferente

        System.out.println("carro1 == carroReferencia     → " + (carro1 == carroReferencia));       // true
        System.out.println("carro1 == carroMesmoDados     → " + (carro1 == carroMesmoDados));       // false (objetos diferentes)
        System.out.println("carro1.equals(carroMesmoDados)→ " + (carro1.equals(carroMesmoDados))); // true (mesmo conteúdo)

        // ==================== RESUMO FINAL ====================
        System.out.println("\n==============================================");
        System.out.println("   Fim da demonstração");
        System.out.println("   Conceitos aplicados:");
        System.out.println("   • Herança (extends)");
        System.out.println("   • Sobrescrita (calcularLocacao, toString, equals, hashCode)");
        System.out.println("   • Encapsulamento (private + getters/setters)");
        System.out.println("   • Pacotes (br.com.techdrive.locasystem.entidades)");
        System.out.println("==============================================");
    }
}