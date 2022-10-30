const fs = require("fs");
const pdf = require("pdf-parse");

const ASSETS = "./assets";
const UI_ASSETS = "../ui/src/assets";

async function parser() {
  let dataBuffer = fs.readFileSync(`${ASSETS}/banca_dati.pdf`);
  const { text } = await pdf(dataBuffer);
  return text;
}

function cleaner(content) {
  // Remove consecutive \n and \n with \s after or before
  let cleaned = content.replace(/(\s*\n+\s*)/g, "\n");
  // Transform tabs into spaces
  cleaned = cleaned.replace(/\t/g, "s");
  // Trim consecutive spaces
  cleaned = cleaned.replace(/\s{2,}/g, "s");
  // Remove page number
  cleaned = cleaned.replace(/\n\d{1,3} di \d{1,3}/g, "");
  // Remove BANCA DATI and SECTION NAMES
  cleaned = cleaned.replace(
    /\n((BANCA DATI)|(DIRITTO PROCESSUALE PENALE)|(DIRITTO CIVILE)|(DIRITTO COSTITUZIONALE)|(DIRITTO AMMINISTRATIVO))/g,
    ""
  );
  // The questions can contain . and ) so for semplicity i will change the answer header from "A) " to "[A] "
  cleaned = cleaned.replace(/([ABCD]{1})\)\s/g, "[$1] "); // ([A-Z]{1}) is the capturing group saved in $1
  return cleaned;
}

function splitByQuestions(content) {
  const FindQuestionRegex = new RegExp(/(\n\d+\.\s[^\[\]]+[:\?\.]{0,1}\n)/g); // "\n123. any-combination-of-chars-exept-[-and-]-that-terminates-with-.-?-:-or-nothing"
  const splitted = content.split(FindQuestionRegex);
  splitted.shift();
  return splitted;
}

function splitByAnswer(answersString) {
  // Splitting the answer on their headers.
  const answers = answersString.split(/\[[ABCD]\]/);
  answers.shift(); // The first element is always empty.
  // Creating an object for each answer that store if the answer is the correct one.
  return answers.map((answ, i) => ({
    label: answ.trim().replace(/\n/g, " "), // Removing unnecessary endlines and spaces
    isCorrect: i === 0, // The first one is always the correct one!
  }));
}

function createJson(questionsAndAnswers) {
  const questionsJson = [];
  for (let i = 0; i < questionsAndAnswers.length - 1; i = i + 2) {
    const question = questionsAndAnswers[i].trim().replace(/\n/g, " "); // Removing unnecessary endlines and spaces
    const answers = splitByAnswer(questionsAndAnswers[i + 1]);
    questionsJson.push({ question: question, answers: answers });
  }
  return questionsJson;
}

function splitJsonIntoSections(json) {
  return json.reduce((acc, question, indx) => {
    if (indx === 0) {
      acc.push({ section: "Diritto Penale", qa: [question] });
    } else if (indx === 1000) {
      acc.push({ section: "Diritto Processuale Penale", qa: [question] });
    } else if (indx === 2000) {
      acc.push({ section: "Diritto Civile", qa: [question] });
    } else if (indx === 3000) {
      acc.push({ section: "Diritto Costituzionale", qa: [question] });
    } else if (indx === 4000) {
      acc.push({ section: "Diritto Amministrativo", qa: [question] });
    } else {
      acc[acc.length-1].qa.push(question);
    }
    return acc;
  }, []);
}

async function main() {
  const content = await parser();

  fs.writeFileSync(`${ASSETS}/banca_dati_parsed.txt`, content);

  const cleanedContent = cleaner(content);

  fs.writeFileSync(`${ASSETS}/banca_dati_cleaned.txt`, cleanedContent);

  const questions = splitByQuestions(cleanedContent);

  // FOR DEBUG
  console.log(questions.length);

  const questionsJson = createJson(questions);

  // FOR DEBUG
  for (let i = 0; i < questionsJson.length; i++) {
    if (!questionsJson[i].question.includes(`${i + 1}. `)) {
      console.error(i + 1, questionsJson[i].question);
      break;
    }
    if (questionsJson[i].answers.length !== 4) {
      console.error(i + 1, questionsJson[i].answers);
      break;
    }
  }

  const groupedJson = splitJsonIntoSections(questionsJson);

  fs.writeFileSync(`${UI_ASSETS}/banca_dati.json`, JSON.stringify(groupedJson, null, 2));
}

main();
