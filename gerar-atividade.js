const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, PageNumber, LevelFormat } = require('docx');
const fs = require('fs');

// Border style for code blocks (light)
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// Light gray border for subtle code blocks
const lightBorder = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
const lightBorders = { top: lightBorder, bottom: lightBorder, left: lightBorder, right: lightBorder };

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 } // 12pt
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1F4E79" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 }
      },
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 40, bold: true, font: "Arial", color: "1F4E79" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "main-numbers",
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 0, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } // ~2cm margins
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: "Atividade Aberta – Unidade 3 | Programação Orientada a Objetos", italics: true, size: 18, color: "666666" })
            ]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Página ", size: 18, color: "666666" }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "666666" }),
              new TextRun({ text: " de ", size: 18, color: "666666" }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "666666" })
            ]
          })
        ]
      })
    },
    children: [
      // Title
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun({ text: "Atividade Aberta – Unidade 3", bold: true, size: 40, color: "1F4E79" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Arquitetura Lógica de um Sistema de Locadora de Veículos", size: 26, italics: true, color: "444444" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: "Disciplina: Programação Orientada a Objetos", size: 22, color: "555555" })]
      }),

      // Student info placeholder
      new Paragraph({
        spacing: { after: 300 },
        children: [
          new TextRun({ text: "Aluno: ", bold: true }),
          new TextRun({ text: "[Seu Nome Completo]", color: "888888", italics: true })
        ]
      }),
      new Paragraph({
        spacing: { after: 400 },
        children: [
          new TextRun({ text: "Data: ", bold: true }),
          new TextRun({ text: new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }) })
        ]
      }),

      // Intro
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({ 
          text: "Imagine que recebemos a tarefa de planejar a arquitetura lógica de um sistema para uma locadora de veículos compacta, chamada LocaSystem, desenvolvida pela empresa TechDrive. O sistema precisa gerenciar dois tipos de automóveis — Carros e Motos — que possuem atributos em comum (placa, marca e valorDiaria), mas seguem regras distintas para o cálculo do valor final da locação. A seguir, apresento minha proposta de estruturação do programa em Java, fundamentada nos conceitos estudados na Unidade 3.", 
          size: 24 
        })]
      }),

      // ========== 1 ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. Relação de Herança e Sobrescrita Clássica")]
      }),

      // 1a
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("a) Aplicação do pilar da Herança")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Para evitar a replicação desnecessária de código e garantir o reuso, eu estruturaria o sistema utilizando Herança. Criaria uma classe chamada Veiculo, que atuaria como superclasse (classe pai). As classes Carro e Moto seriam as subclasses (classes filhas).", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "A justificativa para essa relação é o teste clássico \"É UM\". Um Carro é um Veículo. Uma Moto é um Veículo. Essa relação de generalização-especialização faz todo sentido no domínio da locadora: todos os veículos possuem placa, marca e um valor de diária, além de compartilharem a necessidade de calcular o valor da locação. Colocar esses elementos comuns na superclasse Veiculo evita duplicação e centraliza a manutenção futura.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "No código Java, o vínculo de herança é estabelecido pela palavra-chave ", 
          size: 24 
        }),
        new TextRun({ text: "extends", bold: true, size: 24 }),
        new TextRun({ text: ". Veja um exemplo:", size: 24 })]
      }),

      // Code block for extends
      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: lightBorders,
                width: { size: 9638, type: WidthType.DXA },
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 150, right: 150 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "public class Veiculo {", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    protected String placa;", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    protected String marca;", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    protected double valorDiaria;", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    // ...", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "}", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "public class Carro extends Veiculo {", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    // atributos e métodos específicos de Carro", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "}", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "public class Moto extends Veiculo {", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    // atributos e métodos específicos de Moto", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "}", font: "Consolas", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { before: 200, after: 200 }, children: [] }),

      // 1b
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("b) Sobrescrita (especialização) do método calcularLocacao")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Imagine que o método calcularLocacao(int dias) da classe pai realiza apenas o cálculo bruto: dias multiplicado pelo valorDiaria. Essa implementação serve como base, mas não atende às regras específicas de cada tipo de veículo.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "É aqui que entra o conceito de Sobrescrita. Ao sobrescrever o método nas classes filhas, cada uma pode fornecer sua própria versão especializada, mantendo a mesma assinatura. Isso permite que o mesmo método se comporte de forma peculiar dependendo do tipo real do objeto.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "Na classe Moto, aplicaríamos o desconto fixo de 10%:", size: 24 })]
      }),

      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: lightBorders,
                width: { size: 9638, type: WidthType.DXA },
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 150, right: 150 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "@Override", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "public double calcularLocacao(int dias) {", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    double valorBruto = dias * this.valorDiaria;", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    return valorBruto * 0.90;  // 10% de desconto", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "}", font: "Consolas", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { before: 160, after: 120 }, children: [new TextRun({ text: "Na classe Carro, incluiríamos uma taxa adicional de seguro (exemplo: R$ 30,00 por dia):", size: 24 })] }),

      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: lightBorders,
                width: { size: 9638, type: WidthType.DXA },
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 150, right: 150 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "@Override", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "public double calcularLocacao(int dias) {", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    double valorBruto = dias * this.valorDiaria;", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    double taxaSeguro = dias * 30.0;  // taxa diária de seguro", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    return valorBruto + taxaSeguro;", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "}", font: "Consolas", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { before: 200, after: 200 }, children: [new TextRun({ 
        text: "A sobrescrita traz uma grande vantagem: o código que utiliza os veículos (por exemplo, um sistema de checkout) pode chamar calcularLocacao sem saber se está lidando com um carro ou uma moto. O polimorfismo cuida de invocar a versão correta em tempo de execução.", 
        size: 24 
      })] }),

      // ========== 2 ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. Ciclo de Vida com a Classe Object")]
      }),

      // 2a
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("a) Sobrescrita do método toString()")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "No Java, toda classe herda implicitamente da classe Object. Quando tentamos exibir um objeto diretamente com System.out.println(carro), o método toString() original (herdado de Object) é chamado. O comportamento padrão é retornar uma string no formato \"NomeDaClasse@hashcodeHexadecimal\" (exemplo: Carro@234e435a), que não é útil para nós.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Para modificar esse comportamento e exibir os dados reais do veículo de forma legível, basta sobrescrever o método toString() na classe Veiculo (e, se necessário, refinar nas subclasses). A recomendação é sempre utilizar a anotação @Override para que o compilador nos avise caso a assinatura esteja errada.", 
          size: 24 
        })]
      }),

      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: lightBorders,
                width: { size: 9638, type: WidthType.DXA },
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 150, right: 150 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "@Override", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "public String toString() {", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    return \"Veiculo [placa=\" + placa + ", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "                   \", marca=\" + marca + ", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "                   \", valorDiaria=R$ \" + valorDiaria + \"]\";", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "}", font: "Consolas", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { before: 200, after: 200 }, children: [new TextRun({ 
        text: "Com essa implementação, o comando System.out.println(carro) passaria a exibir algo como: Veiculo [placa=ABC1234, marca=Fiat, valorDiaria=R$ 120.0]. Isso facilita enormemente a depuração e a apresentação de informações para o usuário.", 
        size: 24 
      })] }),

      // 2b
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("b) Sobrescrita do método equals(Object obj) e a importância do instanceof + casting")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "A locadora não pode permitir o cadastro de dois veículos com a mesma placa. Essa é uma regra de negócio clara. O problema é que o operador de igualdade comum (==) não resolve essa questão quando estamos lidando com objetos.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "O operador == compara referências de memória. Ele retorna true apenas se as duas variáveis apontarem para o exato mesmo objeto na heap. Se tivermos dois objetos distintos na memória (criados em momentos diferentes, ocupando endereços diferentes), mesmo que possuam exatamente os mesmos dados (mesma placa, mesma marca, mesmo valor), o == retornará false. Isso acontece porque eles são objetos diferentes, apesar do conteúdo idêntico.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Para resolver isso, precisamos comparar o conteúdo dos objetos, não suas referências. Fazemos isso sobrescrevendo o método equals(Object obj), herdado de Object.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Uma implementação correta de equals deve seguir algumas boas práticas importantes:", 
          size: 24 
        })]
      }),

      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: lightBorders,
                width: { size: 9638, type: WidthType.DXA },
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 150, right: 150 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "@Override", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "public boolean equals(Object obj) {", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    if (this == obj) return true;                    // mesmo objeto", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    if (obj == null) return false;                   // null nunca é igual", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    if (!(obj instanceof Veiculo)) return false;   // tipo incompatível", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    Veiculo outro = (Veiculo) obj;                 // casting seguro", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    return this.placa.equalsIgnoreCase(outro.placa); // comparação por conteúdo", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "}", font: "Consolas", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { before: 200, after: 200 }, children: [new TextRun({ 
        text: "O uso combinado de instanceof e casting é crucial por dois motivos:", 
        size: 24 
      })] }),
      new Paragraph({
        spacing: { after: 120 },
        indent: { left: 360 },
        children: [new TextRun({ text: "1. O instanceof verifica se o objeto realmente é (ou é subtipo de) Veiculo antes de tentar converter. Sem essa verificação, poderíamos receber um ClassCastException em tempo de execução se alguém passasse, por exemplo, um Cliente como parâmetro.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        indent: { left: 360 },
        children: [new TextRun({ text: "2. O casting (Veiculo outro = (Veiculo) obj) é necessário porque o parâmetro do método equals é do tipo Object — a superclasse de todas as classes em Java. Só depois do cast conseguimos acessar os atributos específicos de Veiculo, como a placa.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Importante lembrar também do contrato entre equals e hashCode: se dois objetos são considerados iguais pelo equals, eles devem retornar o mesmo valor no hashCode(). Caso contrário, estruturas como HashSet e HashMap não funcionarão corretamente ao tentar evitar duplicatas pela placa.", 
          size: 24 
        })]
      }),

      // ========== 3 ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. Modificadores de Acesso e Organização de Pacotes")]
      }),

      // 3a
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("a) Nomenclatura padronizada de pacotes")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "A empresa desenvolvedora é a TechDrive e possui o domínio www.techdrive.com.br. O sistema de locação se chama locasystem. Seguindo as convenções oficiais do Java para nomenclatura de pacotes (recomendação da Oracle), devemos utilizar o nome de domínio invertido, em letras minúsculas, seguido do nome do sistema e, por fim, o módulo ou camada.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Para as classes de entidades (Veiculo, Carro, Moto etc.), a nomenclatura padronizada que eu utilizaria seria:", 
          size: 24 
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 120 },
        children: [new TextRun({ text: "br.com.techdrive.locasystem.entidades", bold: true, size: 26, color: "1F4E79" })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Alternativas também aceitáveis seriam br.com.techdrive.locasystem.model ou br.com.techdrive.locasystem.dominio, dependendo da arquitetura adotada pela empresa.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "A declaração do pacote deve ficar obrigatoriamente na ", 
          size: 24 
        }),
        new TextRun({ text: "primeira linha", bold: true, size: 24 }),
        new TextRun({ text: " do arquivo-fonte .java (desconsiderando eventuais comentários de cabeçalho ou anotações de licença que possam vir antes). Após a declaração do package, vêm os imports (se houver) e só então a declaração da classe.", size: 24 })]
      }),

      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: lightBorders,
                width: { size: 9638, type: WidthType.DXA },
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 150, right: 150 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "// Comentários de licença ou cabeçalho podem vir antes", font: "Consolas", size: 20, color: "666666" })] }),
                  new Paragraph({ children: [new TextRun({ text: "package br.com.techdrive.locasystem.entidades;", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "import java.util.Objects;", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "public class Veiculo {", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "    // ...", font: "Consolas", size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "}", font: "Consolas", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { before: 200, after: 200 }, children: [] }),

      // 3b
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("b) Justificativa para private e diferença entre protected e default")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Os atributos placa e valorDiaria devem ser declarados como private por uma questão fundamental de encapsulamento. Se esses campos fossem públicos, qualquer parte do sistema (ou até código externo) poderia alterar diretamente a placa de um veículo após o cadastro, ou definir um valorDiaria negativo, violando regras de negócio e a integridade dos dados.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Ao manter os atributos privados e expor apenas métodos getters e setters (ou construtores controlados), ganhamos a capacidade de inserir validações — por exemplo, verificar se a placa segue o padrão Mercosul, ou garantir que o valorDiaria seja sempre maior que zero. Isso protege o estado interno do objeto e facilita a evolução do sistema no futuro.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Quanto à diferença entre os modificadores de acesso, é importante entender o seguinte:", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "• Nível default (sem modificador): ", bold: true, size: 24 }), 
                   new TextRun({ text: "também chamado de package-private. O membro fica visível apenas para classes que residem no mesmo pacote. Se uma nova classe filha for criada em uma pasta completamente diferente (ou seja, em outro pacote), ela não terá acesso ao atributo ou método declarado com nível default.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "• Modificador protected: ", bold: true, size: 24 }), 
                   new TextRun({ text: "oferece visibilidade mais ampla. Além de permitir o acesso por classes do mesmo pacote (como o default), ele também concede acesso a subclasses, mesmo que essas subclasses estejam em pacotes diferentes. Isso é especialmente útil quando queremos permitir que outras equipes ou módulos estendam nossas classes mantendo um certo nível de acesso controlado aos membros internos.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Resumindo: se a TechDrive planeja que outras áreas da empresa (ou até parceiros) possam criar novas subclasses de Veiculo em pacotes distintos, o ideal é declarar os membros que as filhas precisam acessar como protected. Caso contrário, o nível default já seria suficiente dentro do mesmo pacote.", 
          size: 24 
        })]
      }),

      // Final considerations
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Considerações Finais")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "A modelagem proposta — com uma superclasse Veiculo, especializações em Carro e Moto, sobrescrita de métodos para cálculos específicos, tratamento adequado da classe Object (toString e equals) e organização em pacotes seguindo o padrão reverso de domínio — oferece uma base sólida, flexível e alinhada com os princípios da Orientação a Objetos estudados na Unidade 3. Essa estrutura facilita a manutenção, reduz duplicação de código e permite que novas regras de negócio sejam incorporadas de forma localizada nas classes filhas.", 
          size: 24 
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ 
          text: "Estou à disposição para esclarecer qualquer ponto ou discutir alternativas de implementação.", 
          size: 24 
        })]
      }),

      // Signature
      new Paragraph({
        spacing: { before: 400 },
        children: [new TextRun({ text: "Atenciosamente,", size: 24 })]
      }),
      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: "[Seu Nome]", italics: true, size: 24, color: "888888" })]
      })
    ]
  }]
});

// Generate the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Atividade_Aberta_Unidade3_Locadora_Veiculos.docx", buffer);
  console.log("Documento gerado com sucesso: Atividade_Aberta_Unidade3_Locadora_Veiculos.docx");
}).catch(err => {
  console.error("Erro ao gerar documento:", err);
});