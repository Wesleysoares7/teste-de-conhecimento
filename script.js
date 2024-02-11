const perguntas = [
  {
    pergunta: "1. Qual é a seção mais importante de um currículo?",
    respostas: [
      "Experiência profissional",
      "Objetivo profissional",
      "Formação acadêmica",
    ],
    correta: 0,
  },
  {
    pergunta: "2. Qual é a extensão recomendada para um currículo?",
    respostas: ["1 página", "2 páginas", "3 páginas"],
    correta: 1,
  },
  {
    pergunta: "3. Que tipo de fonte é mais recomendada para um currículo?",
    respostas: ["Arial", "Times New Roman", "Calibri"],
    correta: 2,
  },
  {
    pergunta:
      "4. Qual é o melhor formato de arquivo para enviar um currículo por e-mail?",
    respostas: ["PDF", "Word", "TXT"],
    correta: 0,
  },
  {
    pergunta: "5. Qual deve ser a ordem das seções em um currículo?",
    respostas: [
      "Objetivo, Formação, Experiência",
      "Experiência, Formação, Objetivo",
      "Formação, Objetivo, Experiência",
    ],
    correta: 1,
  },
  {
    pergunta:
      "6. Qual é a importância de revisar o currículo antes de enviá-lo?",
    respostas: [
      "Pouca importância",
      "Muita importância",
      "Nenhuma importância",
    ],
    correta: 1,
  },
  {
    pergunta: "7. O que deve ser evitado em um currículo?",
    respostas: [
      "Informações relevantes",
      "Erros gramaticais e ortográficos",
      "Formatação adequada",
    ],
    correta: 1,
  },
  {
    pergunta: "8. É recomendado incluir uma foto no currículo?",
    respostas: ["Sim, sempre", "Depende do país", "Não, nunca"],
    correta: 2,
  },
  {
    pergunta: "9. O que é um currículo cronológico?",
    respostas: [
      "Um currículo organizado por ordem alfabética",
      "Um currículo organizado por ordem de importância",
      "Um currículo organizado por ordem de datas",
    ],
    correta: 2,
  },
  {
    pergunta:
      "10. Quais são as seções opcionais que podem ser incluídas em um currículo?",
    respostas: [
      "Referências e hobbies",
      "Experiência profissional e formação acadêmica",
      "Objetivo profissional e habilidades",
    ],
    correta: 0,
  },
];

const quiz = document.querySelector("#quiz");
const template = document.querySelector("template");
const proximo = document.querySelector("#proximo");
const resultado = document.querySelector("#resultado");
const botoesDiv = document.querySelector("#botoes");
const corretas = new Set();
const totalDePerguntas = perguntas.length;
// const mostrarTotal = document.querySelector("#acertos span");
// mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas;
let indexPergunta = 0;

const contarAcertos = (event, item) => {
  const estaCorreta = event.target.value == item.correta;

  corretas.delete(item);
  if (estaCorreta) {
    corretas.add(item);
  }

  // mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas;
};

const imprimirPerguntas = () => {
  for (const item of perguntas) {
    const quizItem = template.content.cloneNode(true);
    quizItem.querySelector("h3").textContent = item.pergunta;

    for (let resposta of item.respostas) {
      const dt = quizItem.querySelector("dl dt").cloneNode(true);
      dt.querySelector("span").textContent = resposta;
      dt.querySelector("input").setAttribute(
        "name",
        "pergunta-" + perguntas.indexOf(item)
      );
      dt.querySelector("input").value = item.respostas.indexOf(resposta);
      dt.querySelector("input").addEventListener("change", (event) =>
        contarAcertos(event, item)
      );

      quizItem.querySelector("dl").appendChild(dt);
    }

    quizItem.querySelector("dl dt").remove();

    quiz.appendChild(quizItem);
  }
};

const imprimirPergunta = (index) => {
  const item = perguntas[index];
  const quizItem = template.content.cloneNode(true);
  quizItem.querySelector("h3").textContent = item.pergunta;

  for (let resposta of item.respostas) {
    const dt = quizItem.querySelector("dl dt").cloneNode(true);
    dt.querySelector("span").textContent = resposta;
    dt.querySelector("input").setAttribute(
      "name",
      "pergunta-" + perguntas.indexOf(item)
    );
    dt.querySelector("input").value = item.respostas.indexOf(resposta);
    dt.querySelector("input").addEventListener("change", (event) =>
      contarAcertos(event, item)
    );

    quizItem.querySelector("dl").appendChild(dt);
  }

  quizItem.querySelector("dl dt").remove();

  quiz.appendChild(quizItem);
};

const imprimirResultado = () => {
  const nota = document.createElement("p");
  if (corretas.size < 5) {
    nota.innerText = `Você só acertou ${corretas.size} perguntas! Tente novamente`;
  } else {
    nota.innerText = `Você acertou ${corretas.size} perguntas! Parabéns!!`;
  }
  resultado.appendChild(nota);
};

const avancarPergunta = () => {
  quiz.innerHTML = "";
  if (indexPergunta < perguntas.length - 1) {
    indexPergunta += 1;
    imprimirPergunta(indexPergunta);
  } else {
    proximo.remove();
    imprimirResultado();
    reiniciar();
  }
};

const handleReiniciar = () => {
  resultado.innerHTML = "";
  botoesDiv.innerHTML = "";
  const proximoBotao = document.createElement("button");
  proximoBotao.id = "proximo";
  proximoBotao.innerText = "Próximo";
  proximoBotao.addEventListener("click", avancarPergunta);
  botoesDiv.appendChild(proximoBotao);
  indexPergunta = 0;
  imprimirPergunta(indexPergunta);
};

const reiniciar = () => {
  const reiniciarBotao = document.createElement("button");
  reiniciarBotao.innerText = "Reiniciar";
  reiniciarBotao.addEventListener("click", handleReiniciar);
  botoesDiv.appendChild(reiniciarBotao);
};

proximo.addEventListener("click", avancarPergunta);

window.onload = () => {
  imprimirPergunta(0);
};
