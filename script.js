const perguntas = [
  {
    pergunta: "Qual é a seção mais importante de um currículo?",
    respostas: [
      "Experiência profissional",
      "Objetivo profissional",
      "Formação acadêmica",
    ],
    correta: 0,
  },
  {
    pergunta: "Qual é a extensão recomendada para um currículo?",
    respostas: ["1 página", "2 páginas", "3 páginas"],
    correta: 1,
  },
  {
    pergunta: "Que tipo de fonte é mais recomendada para um currículo?",
    respostas: ["Arial", "Times New Roman", "Calibri"],
    correta: 2,
  },
  {
    pergunta:
      "Qual é o melhor formato de arquivo para enviar um currículo por e-mail?",
    respostas: ["PDF", "Word", "TXT"],
    correta: 0,
  },
  {
    pergunta: "Qual deve ser a ordem das seções em um currículo?",
    respostas: [
      "Objetivo, Formação, Experiência",
      "Experiência, Formação, Objetivo",
      "Formação, Objetivo, Experiência",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual é a importância de revisar o currículo antes de enviá-lo?",
    respostas: [
      "Pouca importância",
      "Muita importância",
      "Nenhuma importância",
    ],
    correta: 1,
  },
  {
    pergunta: "O que deve ser evitado em um currículo?",
    respostas: [
      "Informações relevantes",
      "Erros gramaticais e ortográficos",
      "Formatação adequada",
    ],
    correta: 1,
  },
  {
    pergunta: "É recomendado incluir uma foto no currículo?",
    respostas: ["Sim, sempre", "Depende do país", "Não, nunca"],
    correta: 2,
  },
  {
    pergunta: "O que é um currículo cronológico?",
    respostas: [
      "Um currículo organizado por ordem alfabética",
      "Um currículo organizado por ordem de importância",
      "Um currículo organizado por ordem de datas",
    ],
    correta: 2,
  },
  {
    pergunta:
      "Quais são as seções opcionais que podem ser incluídas em um currículo?",
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

const corretas = new Set();
const totalDePerguntas = perguntas.length;
const mostrarTotal = document.querySelector("#acertos span");
mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas;

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
    dt.querySelector("input").onchange = (event) => {
      const estaCorreta = event.target.value == item.correta;

      corretas.delete(item);
      if (estaCorreta) {
        corretas.add(item);
      }

      mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas;
    };

    quizItem.querySelector("dl").appendChild(dt);
  }

  quizItem.querySelector("dl dt").remove();

  quiz.appendChild(quizItem);
}
