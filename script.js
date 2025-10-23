// ==========================
// ELEMENTOS HTML
// ==========================
const telaInicial = document.getElementById('tela-inicial');
const telaGerenciamento = document.getElementById('tela-gerenciamento');
const subTelaEdital = document.getElementById('sub-tela-edital');
const subTelaPlanejamento = document.getElementById('sub-tela-planejamento');

const btnCriarPlano = document.getElementById('btn-criar-plano');
const btnHome = document.getElementById('btn-home');
// const btnHomePlanejamento = document.getElementById('btn-home-planejamento'); // REMOVIDO
const btnIniciarEdital = document.getElementById('btn-iniciar-edital');

const formModal = document.getElementById('form-modal');
const btnSalvarMunicipio = document.getElementById('btn-salvar-municipio');
const btnSairMunicipio = document.getElementById('btn-sair-municipio');
const matriculasModal = document.getElementById('matriculas-modal');
const btnCancelar = document.getElementById('btn-cancelar');
const btnSalvarTudo = document.getElementById('btn-salvar-tudo');
const btnInserirEscola = document.getElementById('btn-inserir-escola');
const btnExcluirEscola = document.getElementById('btn-excluir-escola');
const selectMunicipio = document.getElementById('municipio');
const selectEscola = document.getElementById('escola');
const inputPrefeito = document.getElementById('prefeito');
const escolasAdicionadasDiv = document.getElementById('escolas-inseridas');

const planoModal = document.getElementById('plano-modal');
const valorPlanejadoSpan = document.getElementById('valor-planejado');
const valorCusteioInput = document.getElementById('valor-custeio');
const valorCapitalInput = document.getElementById('valor-capital');
const btnSalvarPlano = document.getElementById('btn-salvar-plano');
const btnCancelarPlano = document.getElementById('btn-cancelar-plano');

const opcoesBotoesDiv = document.getElementById('opcoes-botoes');
const btnGerarPDF = document.getElementById('btn-gerar-pdf');

const telaPlanejamentoCusteio = document.getElementById('tela-planejamento-custeio');
const telaPlanejamentoCapital = document.getElementById('tela-planejamento-capital');
const valorCusteioTotalSpan = document.getElementById('valor-custeio-total');
const valorCusteioRestanteSpan = document.getElementById('valor-custeio-restante');
const valorCapitalTotalSpan = document.getElementById('valor-capital-total');
const valorCapitalRestanteSpan = document.getElementById('valor-capital-restante');
const formCusteio = document.getElementById('form-custeio');
const formCapital = document.getElementById('form-capital');
const btnSalvarCusteio = document.getElementById('btn-salvar-custeio');
const btnSalvarCapital = document.getElementById('btn-salvar-capital');
const btnVoltarCusteio = document.getElementById('btn-voltar-custeio');
const btnVoltarCapital = document.getElementById('btn-voltar-capital');

const btnRecomecar = document.getElementById('btn-recomecar');
// NOVO: Botão de resetar apenas os planos
const btnResetarPlano = document.getElementById('btn-resetar-plano');

// ==========================
// VARIÁVEIS GLOBAIS
// ==========================
let municipioAtual = '';
let prefeitoAtual = '';
let cnpjAtual = '';
let matriculasSalvas = [];
let valorTotalPlanejado = 0;
let valorCusteioSalvo = 0;
let valorCapitalSalvo = 0;
let planoCusteio = [];
let planoCapital = [];
// NOVO: URL do Apps Script que vai receber os dados - ATUALIZE ESTA URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2if0zgRxuuIb1kR79-fPf9ogLTqVphM7qsEhC0s9Xb-jgVP3whLrN3w0Qqro_0cyQ/exec';
const VALOR_POR_MATRICULA = 3000;

// Objeto com o limite de matrículas por município
const limiteMatriculas = {
    "AFONSO CLAUDIO": 132,
    "AGUIA BRANCA": 31,
    "ALEGRE": 48,
    "ALTO RIO NOVO": 235,
    "ANCHIETA": 80,
    "ARACRUZ": 600,
    "ATILIO VIVACQUA": 243,
    "BOA ESPERANCA": 170,
    "BOM JESUS DO NORTE": 100,
    "CACHOEIRO DE ITAPEMIRIM": 190,
    "CARIACICA": 1380,
    "CONCEICAO DO CASTELO": 100,
    "FUNDAO": 90,
    "GUACUI": 50,
    "GUARAPARI": 420,
    "IBATIBA": 275,
    "IBIRACU": 0,
    "IRUPI": 151,
    "ITAGUACU": 110,
    "ITAPEMIRIM": 479,
    "JERONIMO MONTEIRO": 90,
    "JOAO NEIVA": 30,
    "LARANJA DA TERRA": 61,
    "MARATAIZES": 450,
    "MARECHAL FLORIANO": 60,
    "MARILANDIA": 68,
    "MIMOSO DO SUL": 110,
    "MONTANHA": 161,
    "MUNIZ FREIRE": 381,
    "MUQUI": 9,
    "NOVA VENECIA": 210,
    "PANCAS": 108,
    "PEDRO CANARIO": 65,
    "PINHEIROS": 173,
    "SANTA MARIA DE JETIBA": 46,
    "SAO MATEUS": 159,
    "SAO ROQUE DO CANAA": 100,
    "SERRA": 0,
    "VARGEM ALTA": 100,
    "VIANA": 0,
    "VILA PAVAO": 548,
    "VILA VALERIO": 92,
    "VILA VELHA": 310,
    "VITORIA": 360

};


// Formata o número para o padrão de moeda R$
const formatoMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

// ==========================
// BASE DE MUNICÍPIOS, ESCOLAS E LIMITES DE MATRÍCULAS
// ==========================
const municipiosData = [
    { nome: "AFONSO CLAUDIO", cnpj: "27.165.562/0001-41", escolas: ["EM Fortaleza", "EM Fazenda Henrique Zambon"] },
    { nome: "AGUIA BRANCA", cnpj: "31.796.584/0001-87", escolas: ["EMCA João Quiuqui"] },
    { nome: "ALEGRE", cnpj: "31.442.430/0001-97", escolas: ["EMFA George Abreu Rangel"] },
    { nome: "ALTO RIO NOVO", cnpj: "30.580.763/0001-10", escolas: ["EMEF Professor Arteme Lopes", "EMEF Professora Maria Rodrigues de Freitas"] },
    { nome: "ANCHIETA", cnpj: "27.142.694/0001-58", escolas: ["EMEB JOSEFINA RAMOS NUNES", "EMEIEF PROFESSORA MARIA LUIZA FLORES"] },
    { nome: "ARACRUZ", cnpj: "27.142.702/0001-66", escolas: ["EMEF Euripides Nunes Loureiro", "EMEF Ermelinda Giacomin Farina", "EMEF Itaparica"] },
    { nome: "ATILIO VIVACQUA", cnpj: "31.105.255/0001-42", escolas: ["EMEB Zulmira Ventury Baptista"] },
    { nome: "BOA ESPERANCA", cnpj: "30.726.320/0001-94", escolas: ["EMEF Prof.ª \"Izaura de Almeida Silva\""] },
    { nome: "BOM JESUS DO NORTE", cnpj: "27.167.360/0001-39", escolas: ["EMEIEF MINERVINA DA SILVA ARAÚJO"] },
    { nome: "CACHOEIRO DE ITAPEMIRIM", cnpj: "27.165.588/0001-90", escolas: ["EMEB \"Prof. Valdy Freitas\"", "EMEB \"Profª Thereza Valiatti Sartório\""] },
    { nome: "CARIACICA", cnpj: "27.150.549/0006-23", escolas: ["EMEF ECIM Dr. Afonso Schwab", "EMEF ECIM Terfina Rocha Ferreira", "EMEF Talma Sarmento de Miranda"] },
    { nome: "CONCEICAO DO CASTELO", cnpj: "27.165.570/0001-98", escolas: ["EMEF Antônio Padovani"] },
    { nome: "FUNDAO", cnpj: "27.165.182/0001-07", escolas: ["EMC Paulo Freire"] },
    { nome: "GUACUI", cnpj: "30.746.224/0001-08", escolas: ["EM Honorio Pedro de Siqueira"] },
    { nome: "GUARAPARI", cnpj: "30.805.395/0001-60", escolas: ["EMEF CÂNDIDA SOARES MACHADO"] },
    { nome: "IBATIBA", cnpj: "27.744.150/0001-66", escolas: ["EMEIEF Santa Maria"] },
    { nome: "IBIRACU", cnpj: "30.303.948/0001-87", escolas: ["EMEIEF PROFESSORA ELZITA BARBARIOLI"] },
    { nome: "IRUPI", cnpj: "36.403.954/0001-92", escolas: ["EMEIEF Profª Nelci Gomes da Costa"] },
    { nome: "ITAGUACU", cnpj: "27.167.451/0001-74", escolas: ["EMEIEF \"PEDRO THOMAZINI\""] },
    { nome: "ITAPEMIRIM", cnpj: "31.726.717/0001-49", escolas: ["EMEF NARCISO ARAÚJO", "EMEIEF Georgeta Ferreira de Almeida", "EMEIEF Luiz João Gomes"] },
    { nome: "JERONIMO MONTEIRO", cnpj: "30.909.256/0001-87", escolas: ["EMEF Paulo Pereira Gomes"] },
    { nome: "JOAO NEIVA", cnpj: "31.776.479/0001-86", escolas: ["EMEIF Guilherme Baptista"] },
    { nome: "LARANJA DA TERRA", cnpj: "31.796.097/0001-14", escolas: ["EMEF Córrego Adame", "EMEF Rio Grande", "EMEIEF Feliz Destino"] },
    { nome: "MARATAIZES", cnpj: "01.609.408/0001-28", escolas: ["EMEF Pontal", "EMEFTI Bonifácio João Marvila", "EMEIEF José Antônio de Almeida", "EMEIEF Profª Zeni Mendes de Souza"] },
    { nome: "MARECHAL FLORIANO", cnpj: "39.385.927/0001-22", escolas: ["EMEIEF Bernardo Leonor Effgen"] },
    { nome: "MARILANDIA", cnpj: "27.744.176/0001-04", escolas: ["EMEIEF Padre Luiz da Grã", "EMUEF Agostinho Camatta", "EMUEF Marcelino Baptista"] },
    { nome: "MIMOSO DO SUL", cnpj: "27.174.119/0001-37", escolas: ["EMEB José Gonçalves Figueira", "EMEB Rancho Alegre"] },
    { nome: "MONTANHA", cnpj: "27.174.051/0001-96", escolas: ["CMA Bairro Brasília", "EMEB Córrego do Limoeiro"] },
    { nome: "MUNIZ FREIRE", cnpj: "27.165.687/0001-71", escolas: ["EMEF SEBASTIÃO COSTA", "EMEF Maria Áurea Barroso", "EMEF Santa Joana"] },
    { nome: "MUQUI", cnpj: "27.082.403/0001-83", escolas: ["EMEIEF SÃO VICENTE DE PAULO"] },
    { nome: "NOVA VENECIA", cnpj: "27.167.428/0001-80", escolas: ["EMEFTI BAIRRO ALTOÉ", "EMEFTI PROFª ARLENE GERALDO", "EMEIEF Cachoeira Grande", "EMEIEF São Luiz Rei"] },
    { nome: "PANCAS", cnpj: "30.631.478/0001-80", escolas: ["EMEIEF José Leandro Schwartz"] },
    { nome: "PEDRO CANARIO", cnpj: "12.345.678/0001-90", escolas: ["EMEF Nova Lima", "EMEF São Francisco"] },
    { nome: "PINHEIROS", cnpj: "27.174.085/0001-80", escolas: ["EMEF Vila Nova"] },
    { nome: "SANTA MARIA DE JETIBA", cnpj: "18.238.321/0001-94", escolas: ["EMPEIEF Rio Lamego", "EMUEF Rio Claro"] },
    { nome: "SAO MATEUS", cnpj: "32.085.984/0001-47", escolas: ["EMEF AYRTON SENNA", "EMEF VALÉRIO COSER"] },
    { nome: "SAO ROQUE DO CANAA", cnpj: "30.047.478/0001-38", escolas: ["EMEIEF \"JOSEPHIR BOSCHETTI\""] },
    { nome: "SERRA", cnpj: "12.345.678/0002-00", escolas: ["EMEF Feu Rosa", "EMEF Manguinhos"] },
    { nome: "VARGEM ALTA", cnpj: "31.888.750/0001-75", escolas: ["EMEB \"Santa Maria\""] },
    { nome: "VIANA", cnpj: "12.345.678/0003-11", escolas: ["EMEF Vila Bethânia", "EMEF Viana"] },
    { nome: "VILA PAVAO", cnpj: "30.063.386/0001-41", escolas: ["EMEF Professora Esther da Costa Santos"] },
    { nome: "VILA VALERIO", cnpj: "01.619.232/0001-95", escolas: ["EMEF Arariboia"] },
    { nome: "VILA VELHA", cnpj: "27.165.554/0001-03", escolas: ["UMEF PROFESSOR RUBENS JOSE VERVLOET GOMES", "UMEFTI EZEQUIEL LEAL", "UMEF JOSE ELIAS DE QUEIROZ", "UMEF MACIONÍLIA MAURÍCIO BUENO"] },
    { nome: "VITORIA", cnpj: "27.142.058/0009-83", escolas: ["EMEF JOSE LEMOS DE MIRANDA", "EMEFTI ANACLETA SCHNEIDER LUCAS", "EMEFTI MOACYR AVIDOS", "EMEFTI PROFESSORA EUNICE PEREIRA SILVEIRA", "EMEF TI PAULO REGLUS NEVES FREIRE", "EMEFTI EDNA DE MATTOS SIQUEIRA GAUDIO", "EMEFTI JOSÉ AUREO MONJARDIM","EMEF IZAURA MARQUES DA SILVA"] }
];

const despesasCusteio = [
    "Remuneração de profissionais",
    "Formação continuada de profissionais vinculados às escolas do proeti",
    "Seleção de profissionais para atuarem nas escolas",
    "Aquisição de produtos de manutenção e conservação",
    "Contratação de serviços para manutenção e conservação",
    "Aluguel de espaços físicos",
    "Aluguel de equipamentos",
    "Serviços públicos",
    "Aquisição de material de consumo - (expediente, materiais escolares, materiais didáticos)",
    "Aquisição de material de consumo - Produtos de limpeza e higiene pessoal para uso coletivo",
    "Aquisição de materiais de consumo e utensílios para a cozinha escolar",
    "Contratação de serviços (serviços diversos ou terceirizados)",
    "Aquisição de materiais de laboratório (consumo)",
    "Aquisição de materiais esportivos",
    "Transporte escolar"
];

const despesasCapital = [
    "Construção, reforma de instalações escolares",
    "Aquisição de equipamentos",
    "Aquisição de mobiliário em general",
    "Aquisição de acervo de biblioteca"
];

// ==========================
// FUNÇÕES DE NAVEGAÇÃO
// ==========================
function mostrarTela(telaParaMostrar) {
    const todasAsTelas = [telaInicial, telaGerenciamento, subTelaEdital, subTelaPlanejamento, telaPlanejamentoCusteio, telaPlanejamentoCapital];
    todasAsTelas.forEach(tela => {
        if (tela && !tela.classList.contains('tela-oculta')) {
            tela.classList.add('tela-oculta');
        }
    });
    if (telaParaMostrar) {
        telaParaMostrar.classList.remove('tela-oculta');
    }
}

function mostrarTelaInicial() {
    mostrarTela(telaInicial);
    recomecarDoInicio();
}

function abrirFormulario(modal) {
    modal.style.display = 'flex';
}

function fecharFormulario(modal) {
    modal.style.display = 'none';
}

// ==========================
// FUNÇÕES DE CARREGAMENTO DE DADOS
// ==========================
function carregarMunicipios() {
    selectMunicipio.innerHTML = '<option value="">Selecione o município</option>';
    municipiosData.forEach(municipio => {
        const option = document.createElement('option');
        option.value = municipio.nome;
        option.textContent = municipio.nome;
        selectMunicipio.appendChild(option);
    });
}

function carregarEscolas(nomeMunicipio = null) {
    const municipioNome = nomeMunicipio || selectMunicipio.value;
    const municipioSelecionado = municipiosData.find(m => m.nome === municipioNome);

    selectEscola.innerHTML = '<option value="">Selecione a escola</option>';
    if (municipioSelecionado) {
        // CORREÇÃO ANTERIOR (Problema 1): Filtrar escolas já inseridas (evitar duplicidade)
        const escolasSalvasNomes = matriculasSalvas.map(item => item.escola);
        
        const escolasDisponiveis = municipioSelecionado.escolas.filter(escola => 
            !escolasSalvasNomes.includes(escola)
        );

        escolasDisponiveis.forEach(escola => {
            const option = document.createElement('option');
            option.value = escola;
            option.textContent = escola;
            selectEscola.appendChild(option);
        });
    }
}

// ==========================
// LÓGICA DE MATRÍCULAS E CÁLCULO
// ==========================
function exibirMatriculasSalvas() {
    escolasAdicionadasDiv.innerHTML = '';
    if (matriculasSalvas.length === 0) {
        escolasAdicionadasDiv.innerHTML = '<p class="placeholder-text">Nenhuma escola adicionada ainda.</p>';
    } else {
        const lista = document.createElement('ul');
        matriculasSalvas.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.escola}: ${item.matriculas} matrículas`;
            li.dataset.index = index;
            lista.appendChild(li);
        });
        escolasAdicionadasDiv.appendChild(lista);
    }
}

// ==========================
// LISTENERS DE BOTÕES E EVENTOS
// ==========================
btnCriarPlano.addEventListener('click', () => {
    mostrarTela(telaGerenciamento);
});

btnHome.addEventListener('click', () => {
    mostrarTelaInicial();
});

btnIniciarEdital.addEventListener('click', () => {
    if (!municipioAtual || !prefeitoAtual) {
        abrirFormulario(formModal);
        carregarMunicipios();
    } else {
        abrirFormulario(matriculasModal);
        document.querySelector('#matriculas-modal h2').textContent = `Edital 001/2023 - Matrículas 2025 (${municipioAtual})`;
        carregarEscolas(municipioAtual);
    }
});

btnSalvarMunicipio.addEventListener('click', () => {
    const municipioSelecionado = selectMunicipio.value;
    const nomePrefeito = inputPrefeito.value;
    const municipioEncontrado = municipiosData.find(m => m.nome === municipioSelecionado);

    if (municipioSelecionado && nomePrefeito && municipioEncontrado) {
        municipioAtual = municipioSelecionado;
        prefeitoAtual = nomePrefeito;
        cnpjAtual = municipioEncontrado.cnpj;
        fecharFormulario(formModal);
    } else {
        alert('Por favor, selecione o município e digite o nome do prefeito.');
    }
});

btnSairMunicipio.addEventListener('click', () => {
    fecharFormulario(formModal);
    inputPrefeito.value = '';
    selectMunicipio.value = '';
});

selectMunicipio.addEventListener('change', () => {
    // Ao mudar o município, limpa as matrículas salvas para evitar erro de estado
    matriculasSalvas = [];
    exibirMatriculasSalvas();
    carregarEscolas();
    municipioAtual = selectMunicipio.value;
});

btnInserirEscola.addEventListener('click', () => {
    const escolaSelecionada = selectEscola.value;
    // Pega o valor como string para validar se não é vazio
    const quantidadeMatriculasStr = document.getElementById('quantidade-matriculas').value; 
    const quantidadeMatriculas = parseInt(quantidadeMatriculasStr);

    // CORREÇÃO ANTERIOR (Problema 3): Permite 0, mas verifica se não é string vazia e se é >= 0
    if (escolaSelecionada && quantidadeMatriculasStr !== '' && quantidadeMatriculas >= 0) {
        
        const dadosEscola = {
            escola: escolaSelecionada,
            matriculas: quantidadeMatriculas
        };
        matriculasSalvas.push(dadosEscola);
        selectEscola.value = '';
        document.getElementById('quantidade-matriculas').value = '';
        exibirMatriculasSalvas();
        
        // CORREÇÃO ANTERIOR (Problema 1): Recarrega a lista para remover a escola inserida
        carregarEscolas(municipioAtual); 
    } else {
        alert('Por favor, selecione uma escola e digite uma quantidade de matrículas válida (0 ou mais).');
    }
});

escolasAdicionadasDiv.addEventListener('click', (event) => {
    const listaItens = escolasAdicionadasDiv.querySelectorAll('li');
    listaItens.forEach(item => item.classList.remove('selected'));
    if (event.target.tagName === 'LI') {
        event.target.classList.add('selected');
    }
});

btnExcluirEscola.addEventListener('click', () => {
    const itemSelecionado = escolasAdicionadasDiv.querySelector('li.selected');
    if (itemSelecionado) {
        const index = itemSelecionado.dataset.index;
        matriculasSalvas.splice(index, 1);
        exibirMatriculasSalvas();
        
        // CORREÇÃO ANTERIOR (Problema 1): Recarrega a lista para adicionar a escola de volta ao select
        carregarEscolas(municipioAtual); 
    } else {
        alert('Por favor, selecione um item da lista para excluir.');
    }
});

btnCancelar.addEventListener('click', () => {
    fecharFormulario(matriculasModal);
});

btnSalvarTudo.addEventListener('click', () => {
    // 1. Encontrar o total de escolas que o município deveria ter preenchido
    const municipioInfo = municipiosData.find(m => m.nome === municipioAtual);
    const totalEscolasMunicipio = municipioInfo ? municipioInfo.escolas.length : 0;

    // CORREÇÃO ANTERIOR (Problema 2): Checagem se todas as escolas foram preenchidas
    if (matriculasSalvas.length !== totalEscolasMunicipio) {
        alert(`Você deve preencher as matrículas para TODAS as ${totalEscolasMunicipio} escolas do município. Você preencheu apenas ${matriculasSalvas.length}.`);
        return; // Sai da função se a checagem falhar
    }

    // Se a validação do Problema 2 passou, o resto do código original pode ser executado.
    if (matriculasSalvas.length > 0) {
        const totalMatriculas = matriculasSalvas.reduce((soma, item) => soma + item.matriculas, 0);
        let matriculasParaCalculo = 0;

        const limite = limiteMatriculas[municipioAtual];

        if (limite === 0) {
            matriculasParaCalculo = 0;
        } else {
            matriculasParaCalculo = Math.min(totalMatriculas, limite);
        }

        const valorTotal = matriculasParaCalculo * VALOR_POR_MATRICULA;

        fecharFormulario(matriculasModal);
        abrirFormulario(planoModal);
        valorTotalPlanejado = valorTotal;
        valorPlanejadoSpan.textContent = formatoMoeda.format(valorTotalPlanejado);
        valorCusteioInput.value = '';
        valorCapitalInput.value = '';
        
        if (valorTotal === 0) {
            valorCusteioInput.value = 0;
            valorCapitalInput.value = 0;
            valorCusteioSalvo = 0;
            valorCapitalSalvo = 0;
            planoCusteio = [];
            planoCapital = [];
            fecharFormulario(planoModal);
            mostrarOpcoesDePlanejamento();
        }

    } else {
        // Este else só será atingido se totalEscolasMunicipio for 0, mas é uma segurança.
        alert('Por favor, adicione pelo menos uma escola.');
    }
});

document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const modal = event.target.closest('.modal-overlay');
        if (modal) {
            fecharFormulario(modal);
        }
    });
});

// *******************************************************************
// CORREÇÃO DO PROBLEMA DO BOTÃO SALVAR PLANO (Precisão Decimal)
// *******************************************************************
btnSalvarPlano.addEventListener('click', () => {
    // Pega os valores como números (ou 0 se for vazio/inválido)
    const valorCusteio = parseFloat(valorCusteioInput.value || 0);
    const valorCapital = parseFloat(valorCapitalInput.value || 0);

    // 1. Calcula a soma e formata para string com 2 decimais
    const somaFormatada = (valorCusteio + valorCapital).toFixed(2);
    const totalPlanejadoFormatado = valorTotalPlanejado.toFixed(2);
    
    // 2. CORREÇÃO: Converte as strings formatadas de volta para Float para comparação.
    // Isso mitiga a falha de precisão de ponto flutuante do JavaScript (0.1 + 0.2 != 0.3)
    const somaParaComparacao = parseFloat(somaFormatada);
    const totalParaComparacao = parseFloat(totalPlanejadoFormatado);

    // O teste passa a ser feito com os valores de ponto flutuante corrigidos.
    if (somaParaComparacao === totalParaComparacao) {
        valorCusteioSalvo = valorCusteio;
        valorCapitalSalvo = valorCapital;
        fecharFormulario(planoModal);
        mostrarOpcoesDePlanejamento();
    } else {
        alert('A soma dos valores de Custeio e Capital deve ser igual ao Valor a ser Planejado. Por favor, verifique os centavos.');
    }
});
// *******************************************************************

btnCancelarPlano.addEventListener('click', () => {
    fecharFormulario(planoModal);
    abrirFormulario(matriculasModal);
});


// ==========================
// FUNÇÕES DE PLANEJAMENTO E GERAÇÃO DE PDF
// ==========================
function mostrarOpcoesDePlanejamento() {
    opcoesBotoesDiv.innerHTML = '';
    if (valorCusteioSalvo > 0) {
        const btnCusteio = document.createElement('button');
        btnCusteio.className = 'btn btn-primary';
        btnCusteio.textContent = 'Planejar Custeio';
        btnCusteio.addEventListener('click', abrirTelaPlanejamentoCusteio);
        opcoesBotoesDiv.appendChild(btnCusteio);
    }
    if (valorCapitalSalvo > 0) {
        const btnCapital = document.createElement('button');
        btnCapital.className = 'btn btn-primary';
        btnCapital.textContent = 'Planejar Capital';
        btnCapital.addEventListener('click', abrirTelaPlanejamentoCapital);
        opcoesBotoesDiv.appendChild(btnCapital);
    }
    mostrarTela(subTelaPlanejamento);
}

function abrirTelaPlanejamentoCusteio() {
    mostrarTela(telaPlanejamentoCusteio);
    valorCusteioTotalSpan.textContent = formatoMoeda.format(valorCusteioSalvo);
    calcularRestanteCusteio();
    criarFormularioCusteio();
}

function abrirTelaPlanejamentoCapital() {
    mostrarTela(telaPlanejamentoCapital);
    valorCapitalTotalSpan.textContent = formatoMoeda.format(valorCapitalSalvo);
    calcularRestanteCapital();
    criarFormularioCapital();
}

function criarFormularioCusteio() {
    formCusteio.innerHTML = '';
    formCusteio.classList.add('form-columns');
    despesasCusteio.forEach((despesa, index) => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        const label = document.createElement('label');
        label.textContent = despesa + ':';
        const inputValor = document.createElement('input');
        inputValor.type = 'number';
        inputValor.step = '0.01';
        inputValor.placeholder = 'Valor (R$)';
        inputValor.min = '0';
        inputValor.classList.add('input-valor-custeio');
        const inputDescricao = document.createElement('input');
        inputDescricao.type = 'text';
        inputDescricao.placeholder = 'Descrição (opcional)';
        inputDescricao.maxLength = 75;
        inputDescricao.classList.add('input-descricao-custeio');

        const itemSalvo = planoCusteio.find(item => item.item === despesa);
        if (itemSalvo) {
            inputValor.value = itemSalvo.valor;
            inputDescricao.value = itemSalvo.descricao;
        }

        inputValor.addEventListener('input', calcularRestanteCusteio);
        formGroup.appendChild(label);
        formGroup.appendChild(inputValor);
        formGroup.appendChild(inputDescricao);
        formCusteio.appendChild(formGroup);
    });
}

function calcularRestanteCusteio() {
    let soma = 0;
    const inputs = formCusteio.querySelectorAll('.input-valor-custeio');
    inputs.forEach(input => {
        soma += parseFloat(input.value) || 0;
    });
    let restante = valorCusteioSalvo - soma;
    valorCusteioRestanteSpan.textContent = formatoMoeda.format(restante);
    if (restante < 0) {
        valorCusteioRestanteSpan.classList.add('error');
    } else {
        valorCusteioRestanteSpan.classList.remove('error');
    }
}

function criarFormularioCapital() {
    formCapital.innerHTML = '';
    formCapital.classList.add('form-columns');
    despesasCapital.forEach((despesa, index) => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        const label = document.createElement('label');
        label.textContent = despesa + ':';
        const inputValor = document.createElement('input');
        inputValor.type = 'number';
        inputValor.step = '0.01';
        inputValor.placeholder = 'Valor (R$)';
        inputValor.min = '0';
        inputValor.classList.add('input-valor-capital');
        const inputDescricao = document.createElement('input');
        inputDescricao.type = 'text';
        inputDescricao.placeholder = 'Descrição (opcional)';
        inputDescricao.maxLength = 75;
        inputDescricao.classList.add('input-descricao-capital');

        const itemSalvo = planoCapital.find(item => item.item === despesa);
        if (itemSalvo) {
            inputValor.value = itemSalvo.valor;
            inputDescricao.value = itemSalvo.descricao;
        }

        inputValor.addEventListener('input', calcularRestanteCapital);
        formGroup.appendChild(label);
        formGroup.appendChild(inputValor);
        formGroup.appendChild(inputDescricao);
        formCapital.appendChild(formGroup);
    });
}

function calcularRestanteCapital() {
    let soma = 0;
    const inputs = formCapital.querySelectorAll('.input-valor-capital');
    inputs.forEach(input => {
        soma += parseFloat(input.value) || 0;
    });
    let restante = valorCapitalSalvo - soma;
    valorCapitalRestanteSpan.textContent = formatoMoeda.format(restante);
    if (restante < 0) {
        valorCapitalRestanteSpan.classList.add('error');
    } else {
        valorCapitalRestanteSpan.classList.remove('error');
    }
}

btnVoltarCusteio.addEventListener('click', () => {
    mostrarTela(subTelaPlanejamento);
});

btnVoltarCapital.addEventListener('click', () => {
    mostrarTela(subTelaPlanejamento);
});

btnSalvarCusteio.addEventListener('click', () => {
    let soma = 0;
    planoCusteio = [];
    const formGroups = formCusteio.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        const valorInput = group.querySelector('.input-valor-custeio');
        const descInput = group.querySelector('.input-descricao-custeio');
        const valor = parseFloat(valorInput.value) || 0;
        const descricao = descInput.value.trim();

        if (valor > 0) {
            planoCusteio.push({
                item: despesasCusteio[index],
                valor: valor,
                descricao: descricao
            });
            soma += valor;
        }
    });

    if (soma.toFixed(2) === valorCusteioSalvo.toFixed(2)) {
        alert('Planejamento de Custeio salvo com sucesso!');
        mostrarTela(subTelaPlanejamento);
        verificarPlanoCompleto();
    } else {
        alert('O valor total planejado para custeio não corresponde ao valor a ser planejado. Verifique os valores digitados.');
    }
});

btnSalvarCapital.addEventListener('click', () => {
    let soma = 0;
    planoCapital = [];
    const formGroups = formCapital.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        const valorInput = group.querySelector('.input-valor-capital');
        const descInput = group.querySelector('.input-descricao-capital');
        const valor = parseFloat(valorInput.value) || 0;
        const descricao = descInput.value.trim();

        if (valor > 0) {
            planoCapital.push({
                item: despesasCapital[index],
                valor: valor,
                descricao: descricao
            });
            soma += valor;
        }
    });

    if (soma.toFixed(2) === valorCapitalSalvo.toFixed(2)) {
        alert('Planejamento de Capital salvo com sucesso!');
        mostrarTela(subTelaPlanejamento);
        verificarPlanoCompleto();
    } else {
        alert('O valor total planejado para capital não corresponde ao valor a ser planejado. Verifique os valores digitados.');
    }
});

function verificarPlanoCompleto() {
    const somaCusteio = planoCusteio.reduce((soma, item) => soma + item.valor, 0);
    const somaCapital = planoCapital.reduce((soma, item) => soma + item.valor, 0);

    const custeioCompleto = (somaCusteio.toFixed(2) === valorCusteioSalvo.toFixed(2) || valorCusteioSalvo === 0);
    const capitalCompleto = (somaCapital.toFixed(2) === valorCapitalSalvo.toFixed(2) || valorCapitalSalvo === 0);

    if (custeioCompleto && capitalCompleto) {
        btnGerarPDF.disabled = false;
    } else {
        btnGerarPDF.disabled = true;
    }
}


// ==========================================================
// FUNÇÃO DE ENVIO DE DADOS PARA O GOOGLE SHEETS
// ==========================================================

// NOVA FUNÇÃO: Envia dados para o Google Sheets (Para evitar duplicação, ela atualiza o registro existente)
async function enviarDadosParaSheet() {
    // Reúne todos os dados relevantes do estado do sistema em um objeto
    const dataToSend = {
        municipioAtual,
        prefeitoAtual,
        cnpjAtual,
        valorTotalPlanejado,
        valorCusteioSalvo,
        valorCapitalSalvo,
        matriculasSalvas, // Inclui a lista de escolas e matrículas
        planoCusteio,     // Inclui os detalhes do plano de custeio
        planoCapital      // Inclui os detalhes do plano de capital
    };

    // Altera o cursor para 'espera' para indicar que algo está acontecendo
    document.body.style.cursor = 'wait'; 
    
    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors', // Necessário para requisições cross-origin (de GitHub para Google)
            cache: 'no-cache',
            // Apps Script usa Content-Type: 'text/plain'
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', 
            },
            // Converte o objeto de dados para uma string JSON
            body: JSON.stringify(dataToSend) 
        });

        const result = await response.json(); 

        if (result.result === 'success') {
            console.log('Dados salvos no Google Sheets:', result.message);
            alert('PDFs gerados e dados salvos/atualizados na Planilha de Controle!'); 
        } else {
            console.error('Erro ao salvar dados:', result.message);
            alert('PDFs gerados, mas houve um erro ao salvar os dados no Sheets. Verifique o Console (F12).');
        }

    } catch (error) {
        console.error('Erro de conexão ou rede:', error);
        alert('PDFs gerados, mas houve um erro de conexão ao tentar salvar os dados. Verifique o Console (F12).');
    } finally {
        // Volta o cursor ao normal
        document.body.style.cursor = 'default'; 
    }
}

// ==========================================================
// FIM DO CÓDIGO DE ENVIO DE DADOS
// ==========================================================


// NOVO: Função para resetar apenas os planos
function resetarApenasPlanos() {
    valorCusteioSalvo = 0;
    valorCapitalSalvo = 0;
    planoCusteio = [];
    planoCapital = [];
    btnGerarPDF.disabled = true;
    mostrarTela(subTelaPlanejamento);
    abrirFormulario(planoModal);
    valorPlanejadoSpan.textContent = formatoMoeda.format(valorTotalPlanejado);
}

// Função para resetar todos os dados e voltar para o início
function recomecarDoInicio() {
    municipioAtual = '';
    prefeitoAtual = '';
    cnpjAtual = '';
    matriculasSalvas = [];
    valorTotalPlanejado = 0;
    resetarApenasPlanos(); // Chama a função para limpar os planos e valores
    exibirMatriculasSalvas();
    mostrarTela(telaInicial);
}

// NOVO: Listener para o botão de recomeçar
btnRecomecar.addEventListener('click', () => {
    if (confirm("Você tem certeza que deseja começar novamente? Todos os dados (município, escolas e planos) serão perdidos.")) {
        recomecarDoInicio();
    }
});

// NOVO: Listener para o botão de resetar apenas os planos
btnResetarPlano.addEventListener('click', () => {
    if (confirm("Você tem certeza que deseja resetar apenas os planos de Custeio e Capital?")) {
        resetarApenasPlanos();
    }
});

// ==========================================
// FUNÇÕES DE GERAÇÃO DE PDF E ENVIO DE DADOS
// ==========================================

btnGerarPDF.addEventListener('click', () => {
    // 1. Gera o PDF do Plano
    gerarPlanoAplicacaoPDF();
    // 2. Gera o PDF de Matrículas
    gerarMatriculasPDF();
    // 3. NOVO: Envia os dados para a planilha
    enviarDadosParaSheet(); 
});

// FUNÇÃO PARA GERAR O PDF DO PLANO DE APLICAÇÃO
function gerarPlanoAplicacaoPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    let y = 10;
    const pageMargin = 15;
    const contentWidth = 297 - 2 * pageMargin;
    const pageHeight = 210;
    const pageBreakHeight = pageHeight - 30;

    // Função para adicionar cabeçalho em cada página
    function addHeader(doc, y) {
        const title = "Plano de Aplicação Financeira - Edital 001/2023 - Terceira Parcela";
        doc.setFillColor(255, 0, 0); // Cor vermelha
        doc.rect(0, y, 297, 10, 'F');
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255); // Cor branca para o texto

        // Centraliza e coloca o título em negrito
        doc.setFont('helvetica', 'bold');
        doc.text(title, doc.internal.pageSize.getWidth() / 2, y + 7, { align: 'center' });
        doc.setFont('helvetica', 'normal'); // Retorna ao normal para o resto do documento

        return y + 15;
    }

    y = addHeader(doc, y);

    // Subtítulo
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Edital 001/2023 - Parcela 3", pageMargin, y);
    y += 10;

    // Título da seção IDENTIFICAÇÃO (Barra cinza)
    function addDespesasHeader(doc, y) {
        doc.setFillColor(200, 200, 200);
        doc.rect(pageMargin, y, contentWidth, 7, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text("IDENTIFICAÇÃO", pageMargin + 2, y + 5);
        return y + 12;
    }

    // Apenas gera a seção se houver dados a serem exibidos (ou se o valor for zero, mas o plano existe)
    if (planoCusteio.length > 0 || planoCapital.length > 0 || valorTotalPlanejado === 0) {
        y = addDespesasHeader(doc, y);
    }

    // Dados de identificação
    const dataFormatacao = new Date().toLocaleDateString('pt-BR');
    doc.setFontSize(12);
    doc.text(`Prefeitura Municipal de ${municipioAtual}`, pageMargin, y);
    y += 7;
    doc.text(`CNPJ: ${cnpjAtual}`, pageMargin, y);
    y += 7;
    doc.text("Plano vigente até: 31/12/2026", pageMargin, y);
    y += 7;
    doc.text(`Data da formulação do plano: ${dataFormatacao}`, pageMargin, y);
    y += 15;

    // Título da seção DESPESAS PREVISTAS (Barra cinza)
    function addDespesasPrevistasHeader(doc, y) {
        doc.setFillColor(200, 200, 200);
        doc.rect(pageMargin, y, contentWidth, 7, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text("DESPESAS PREVISTAS", pageMargin + 2, y + 5);
        return y + 12;
    }

    // Apenas gera a seção se houver dados a serem exibidos (ou se o valor for zero, mas o plano existe)
    if (planoCusteio.length > 0 || planoCapital.length > 0 || valorTotalPlanejado === 0) {
        y = addDespesasPrevistasHeader(doc, y);
    }

    // Despesas de Custeio
    if (planoCusteio.length > 0) {
        doc.setFontSize(14);
        doc.text("Custeio", pageMargin, y);
        y += 7;

        planoCusteio.forEach((item, index) => {
            const formattedValue = formatoMoeda.format(item.valor);

            // Checa se precisa de nova página antes de adicionar o item
            if (y + 10 > pageBreakHeight) {
                doc.addPage();
                y = 15;
                y = addHeader(doc, 10);
                y = addDespesasPrevistasHeader(doc, y);
            }

            doc.setFontSize(10); // Fonte menor para o item e valor
            doc.text(item.item, pageMargin, y);
            doc.text(formattedValue, contentWidth + pageMargin, y, null, null, 'right');
            y += 4; // Espaçamento reduzido

            if (item.descricao) {
                doc.setFontSize(8); // Fonte menor para a descrição
                const lines = doc.splitTextToSize("Descrição: " + item.descricao, contentWidth - 20);
                doc.text(lines, pageMargin + 5, y);
                y += (lines.length * 3) + 2; // Espaçamento reduzido
            }
            y += 2; // Espaço antes da linha

            // Adiciona a linha divisória, mas não no último item
            if (index < planoCusteio.length - 1) {
                doc.setDrawColor(150, 150, 150);
                doc.setLineWidth(0.2);
                doc.line(pageMargin, y, contentWidth + pageMargin, y);
                y += 3; // Espaçamento reduzido
            }
        });
        y += 5;
    }

    // Despesas de Capital
    if (planoCapital.length > 0) {
        // Checa se precisa de nova página antes da seção de Capital
        if (y + 20 > pageBreakHeight) {
            doc.addPage();
            y = 15;
            y = addHeader(doc, 10);
            y = addDespesasPrevistasHeader(doc, y);
        }

        doc.setFontSize(14);
        doc.text("Capital", pageMargin, y);
        y += 7;

        planoCapital.forEach((item, index) => {
            const formattedValue = formatoMoeda.format(item.valor);

            if (y + 10 > pageBreakHeight) {
                doc.addPage();
                y = 15;
                y = addHeader(doc, 10);
                y = addDespesasPrevistasHeader(doc, y);
            }

            doc.setFontSize(10); // Fonte menor para o item e valor
            doc.text(item.item, pageMargin, y);
            doc.text(formattedValue, contentWidth + pageMargin, y, null, null, 'right');
            y += 4; // Espaçamento reduzido

            if (item.descricao) {
                doc.setFontSize(8); // Fonte menor para a descrição
                const lines = doc.splitTextToSize("Descrição: " + item.descricao, contentWidth - 20);
                doc.text(lines, pageMargin + 5, y);
                y += (lines.length * 3) + 2; // Espaçamento reduzido
            }
            y += 2; // Espaço antes da linha

            // Adiciona a linha divisória, mas não no último item
            if (index < planoCapital.length - 1) {
                doc.setDrawColor(150, 150, 150);
                doc.setLineWidth(0.2);
                doc.line(pageMargin, y, contentWidth + pageMargin, y);
                y += 3; // Espaçamento reduzido
            }
        });
        y += 5;
    }

    // Valores totais planejados no final
    if (y + 30 > pageBreakHeight) {
        doc.addPage();
        y = 15;
        y = addHeader(doc, 10);
    }

    y += 10;
    doc.setFontSize(14);
    doc.text("Valores Totais Planejados", pageMargin, y);
    y += 7;
    doc.setFontSize(12);
    doc.text(`Total Custeio: ${formatoMoeda.format(valorCusteioSalvo)}`, pageMargin, y);
    y += 7;
    doc.text(`Total Capital: ${formatoMoeda.format(valorCapitalSalvo)}`, pageMargin, y);
    y += 7;
    doc.setFontSize(14);
    doc.text(`Valor Total do Plano: ${formatoMoeda.format(valorTotalPlanejado)}`, pageMargin, y);
    y += 15;

    // Assinaturas
    doc.setFontSize(12);
    doc.text("_____________________________________", pageMargin + 10, y);
    doc.text(prefeitoAtual, pageMargin + 10, y + 5);
    doc.text(`Prefeito(a) Municipal de ${municipioAtual}`, pageMargin + 10, y + 10);

    doc.save(`Plano de Aplicacao Financeira - ${municipioAtual}.pdf`);
}

// FUNÇÃO PARA GERAR O NOVO PDF DE MATRÍCULAS
function gerarMatriculasPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    const pageMargin = 15;
    const contentWidth = 210 - 2 * pageMargin;
    let y = 10;

    // Cabeçalho da faixa azul
    doc.setFillColor(0, 51, 102); // Azul escuro
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // Branco
    doc.text("INFORMAÇÃO SOBRE MATRÍCULAS ESCOLAS DE TEMPO INTEGRAL - PROETI 2025", 105, 8, { align: 'center' });
    doc.text("ESCOLAS VINCULADAS AO EDITAL 001/2023", 105, 15, { align: 'center' });
    
    y = 30; // Posição abaixo do cabeçalho

    // Informações do município e prefeito
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Preto
    doc.text(`MUNICÍPIO: ${municipioAtual}`, pageMargin, y);
    y += 5;
    doc.text(`GESTOR MUNICIPAL: ${prefeitoAtual}`, pageMargin, y);
    y += 10;
    
    // Texto informativo antes da tabela
    const textoInformativo = "Em atendimento ao Art. 7º, parágrafos 1º ao 4º e Art. 8º do Decreto 4973-R, de 29 de setembro de 2021, e do item 6 do edital PROETI número 001/2023 e os seus subitens, vimos INFORMAR o quantitativo de alunos matriculados em Tempo Integral e frequentando a(s) Unidade(s) Escolar(es) contemplada(s) pelo PROETI de acordo com a adesão do município ao Edital PROETI nº 001/2023, listadas abaixo:";
    const lines = doc.splitTextToSize(textoInformativo, contentWidth);
    doc.setFontSize(10);
    doc.text(lines, pageMargin, y);
    y += (lines.length * 5) + 5; // Ajusta o Y para a próxima seção
    
    // Dados da tabela
    const tableData = matriculasSalvas.map(item => [item.escola, item.matriculas]);
    const columns = ["ESCOLA", "QUANTIDADE DE ALUNOS MATRICULADOS EM 28/05/2025 (CADASTRADOS NO CENSO ESCOLAR)"];

    // Geração da tabela
    doc.autoTable({
        head: [columns],
        body: tableData,
        startY: y, 
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2, overflow: 'linebreak' },
        headStyles: {
            fillColor: [173, 198, 209], // Azul acinzentado
            textColor: [0, 0, 0], // Preto
            halign: 'center'
        },
    });

    // Rodapé do PDF (assinaaturas)
    const finalY = doc.autoTable.previous.finalY + 20; // Adiciona espaço após a tabela
    doc.setFontSize(10);
    doc.text(`_____________________________________`, pageMargin, finalY);
    doc.text(prefeitoAtual, pageMargin, finalY + 5);
    doc.text(`Prefeito(a) Municipal de ${municipioAtual}`, pageMargin, finalY + 10);
    
    doc.save(`Informacao Matriculas - ${municipioAtual}.pdf`);
}



