// CONFIGURAÇÕES DO QUIZ

// Tempo (em segundos) para cada pergunta
let tempoPorPergunta = 10;

// Armazena as respostas do usuário
let respostasUsuario = [];

// PERGUNTAS DO QUIZ
const quiz = [
  {
    pergunta: "Em que ano a empresa foi criada?",
    alternativas: ["2019", "2021", "2022", "2024", "2025"],
    correta: 0,
    pontos: 10
  },
  {
    pergunta: "Qual o porte da empresa?",
    alternativas: [
      "Microempreendedor Individual",
      "Microempresa",
      "Empresa de Pequeno Porte",
      "Médio Porte",
      "Grande Porte"
    ],
    correta: 1,
    pontos: 10
  },
  {
    pergunta: "Quem é a dona da RRMakes?",
    alternativas: [
      "Bruna Tavares",
      "Mari Maria",
      "Rebeca Silva",
      "Franciny Ehlk",
      "Itamar Serpa Fernandes"
    ],
    correta: 2,
    pontos: 10
  },
  {
    pergunta: "Onde foi fundada a RRMakes?",
    alternativas: [
      "Jaboatão dos Guararapes",
      "Olinda",
      "Pau Amarelo",
      "Recife",
      "Boa Viagem"
    ],
    correta: 0,
    pontos: 10
  },
  {
    pergunta: "Qual o preço fixo dos produtos?",
    alternativas: ["R$20,00", "R$15,99", "R$10,00", "R$31,99", "R$29,99"],
    correta: 2,
    pontos: 10
  },
  {
    pergunta: "Qual produto não é vendido na RRMakes?",
    alternativas: ["Bonés", "Garrafas", "Base", "Papelaria", "Sapatos"],
    correta: 4,
    pontos: 10
  },
  {
    pergunta: "Qual polo possui mais produtos vendidos da RRMakes?",
    alternativas: [
      "Caruaru",
      "Toritama",
      "Santa Cruz do Capibaribe",
      "Recife",
      "Boa Vista"
    ],
    correta: 2,
    pontos: 10
  },
  {
    pergunta: "Qual o tipo de comércio predominante na RRMakes?",
    alternativas: ["Exportação", "Franquia", "Indústria", "Revenda", "Serviço"],
    correta: 3,
    pontos: 10
  },
  {
    pergunta: "Qual a cor mais usada na identidade visual da marca RRMakes?",
    alternativas: [
      "Azul Claro",
      "Verde Limão",
      "Amarelo Ouro",
      "Rosa Choque",
      "Cinza Escuro"
    ],
    correta: 3,
    pontos: 10
  },
  {
    pergunta: "Quantas lojas a RRMakes possui?",
    alternativas: ["7", "6", "5", "4", "3"],
    correta: 0,
    pontos: 10
  }
];


// FUNDOS DAS QUESTÕES
const fundos = [
  "./imagens/quizfundo1.jpeg",
  "./imagens/quizfundo2.avif",
  "./imagens/quizfundo3.webp",
  "./imagens/quizfundo4.avif",
  "./imagens/quizfundo5.avif",
  "./imagens/quizfundo6.avif",
  "./imagens/quizfundo7.jpeg",
  "./imagens/quizfundo8.webp",
  "./imagens/quizfundo9.webp",
  "./imagens/quizfundo10.jpeg"
];

// IMAGEM FINAL
const imagemFinal = "./imagens/quizfundo-1.png"

// VARIÁVEIS DE CONTROLE
let indice = 0;
let pontuacao = 0;
let tempo;
let contador;


// INICIA A PERGUNTA 
function iniciarPergunta() {

  // Se acabou o quiz, mostra o resultado
  if (indice >= quiz.length) {
    mostrarResultado();
    return;
  }

  // Define o fundo da pergunta atual
  document.body.style.backgroundImage = `url('${fundos[indice]}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";

  const q = quiz[indice];

  // Mostra a pergunta
  document.getElementById("question-text").textContent =
    `(${indice + 1}) ${q.pergunta}`;

  // Cria as alternativas
  const opcoesDiv = document.getElementById("options");
  opcoesDiv.innerHTML = "";

  q.alternativas.forEach((alt, i) => {
    const btn = document.createElement("button");
    btn.textContent = alt;
    btn.onclick = () => responder(i);
    opcoesDiv.appendChild(btn);
  });

  // Reinicia o tempo
  tempo = tempoPorPergunta;
  document.getElementById("time-left").textContent = tempo;

  iniciarTimer();
}


// CONTROLE DO TIMER
function iniciarTimer() {
  clearInterval(contador);

  contador = setInterval(() => {
    tempo--;
    document.getElementById("time-left").textContent = tempo;

    // Se o tempo acabar
    if (tempo <= 0) {
      clearInterval(contador);

      const q = quiz[indice];

      // Registra como não respondida
      respostasUsuario.push({
        pergunta: q.pergunta,
        marcada: "Não respondida",
        correta: q.alternativas[q.correta]
      });

      indice++;
      iniciarPergunta();
    }
  }, 1000);
}


// QUANDO O USUÁRIO RESPONDE
function responder(i) {
  clearInterval(contador);

  const q = quiz[indice];

  // Registra a resposta
  respostasUsuario.push({
    pergunta: q.pergunta,
    marcada: q.alternativas[i],
    correta: q.alternativas[q.correta]
  });

  // Soma pontos se acertar
  if (i === q.correta) {
    pontuacao += q.pontos;
  }

  indice++;
  iniciarPergunta();
}


// RESULTADO FINAL
function mostrarResultado() {
  
  // Define a imagem de fundo da página com base no resultado final
  document.body.style.backgroundImage = `url('${imagemFinal}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  
  // Monta o HTML inicial do resultado
  let html = `
    <h2>Resultado Final</h2>
    <p>Pontuação total: <strong>${pontuacao}</strong></p>
    <h3>Respostas incorretas</h3>
  `;
  
  // Variável para verificar se houve pelo menos um erro
  let houveErro = false;
  
  // Percorre todas as respostas do usuário
  respostasUsuario.forEach((r) => {
    // Verifica se a resposta marcada é diferente da correta
    if (r.marcada !== r.correta) {
      // Marca que houve erro
      houveErro = true;

      // Adiciona ao HTML os detalhes da pergunta errada
      html += `
        <p>
          <strong>Pergunta:</strong> ${r.pergunta}<br>
          <strong>Sua resposta:</strong> ${r.marcada}<br>
          <strong>Resposta correta:</strong> ${r.correta}
        </p>
        <hr>
      `;
    }
  });
  
  // Se nenhuma resposta estiver errada, exibe mensagem de parabéns
  if (!houveErro) {
    html += `<p>Parabéns! Você acertou todas as questões.</p>`;
  }
  
  // Insere todo o conteúdo gerado dentro do container do quiz
  document.getElementById("quiz-container").innerHTML = html;
}


// INICIA O QUIZ
document.getElementById("btnIniciar").addEventListener("click", () => {

  const tempoEscolhido = document.getElementById("tempoInput").value;

  // Garante tempo mínimo
  tempoPorPergunta = tempoEscolhido >= 5 ? tempoEscolhido : 10;

  // Reinicia variáveis
  indice = 0;
  pontuacao = 0;
  respostasUsuario = [];

  // Esconde a tela inicial
  document.getElementById("inicio").style.display = "none";

  // Mostra o timer
  document.getElementById("timer").style.display = "block";

  // Inicia o quiz
  iniciarPergunta();
});

// Fundo inicial 
document.body.style.backgroundImage = "url('./imagens/quizfundo.png')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";


