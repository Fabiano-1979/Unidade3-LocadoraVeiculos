# LocaSystem - Sistema de Locadora de Veículos

Projeto de demonstração dos conceitos de **Programação Orientada a Objetos** estudados na **Unidade 3**.

## Estrutura de Pacotes

```
br.com.techdrive.locasystem
├── entidades
│   ├── Veiculo.java      (superclasse abstrata)
│   ├── Carro.java        (subclasse)
│   └── Moto.java         (subclasse)
└── app
    └── Principal.java    (classe de demonstração)
```

## Conceitos Aplicados

| Conceito                    | Onde está aplicado                              |
|----------------------------|-------------------------------------------------|
| Herança (`extends`)        | `Carro extends Veiculo`, `Moto extends Veiculo` |
| Sobrescrita de métodos     | `calcularLocacao()`, `toString()`, `equals()`, `hashCode()` |
| Polimorfismo               | Lista `List<Veiculo>` contendo Carros e Motos   |
| Encapsulamento             | Atributos `private` + getters/setters           |
| Reutilização de código     | `super.calcularLocacao(dias)` nas subclasses    |
| Organização em pacotes     | `br.com.techdrive.locasystem.entidades`         |
| Contrato equals/hashCode   | Implementação correta em `Veiculo`              |

## Como Compilar e Executar (Windows)

Abra o **Prompt de Comando** ou **PowerShell** e execute:

```powershell
# 1. Entre na pasta do projeto
cd "C:\Users\fabia\atividades-universidade\Unidade3-LocadoraVeiculos\src\main\java"

# 2. Compile todos os arquivos
javac br\com\techdrive\locasystem\entidades\*.java br\com\techdrive\locasystem\app\Principal.java

# 3. Execute o programa
java br.com.techdrive.locasystem.app.Principal
```

## Regras de Cálculo Implementadas

- **Veículo base**: `dias × valorDiaria`
- **Carro**: `valor base + (dias × R$ 35,00)` de seguro
- **Moto**: `valor base × 0,90` (10% de desconto)

## Observações para Estudo

- Tente cadastrar um veículo com placa já existente → o sistema impede (demonstra `equals()`)
- Compare `==` com `equals()` no final da execução
- Observe que `System.out.println(veiculo)` mostra dados legíveis graças ao `toString()` sobrescrito

---

**Disciplina**: Programação Orientada a Objetos  
**Atividade**: Aberta - Unidade 3  
**Empresa fictícia**: TechDrive (www.techdrive.com.br)  
**Sistema**: LocaSystem