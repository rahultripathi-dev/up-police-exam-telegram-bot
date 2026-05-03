/**
 * Deterministic MCQ generator.
 * Generates questions from compact data tables.
 * correctIndex = idx % 4 ensures A/B/C/D vary across questions.
 * Wrong options come from neighbouring entries — contextually plausible distractors.
 */
import { MCQ } from './mcq';

export interface TaggedMCQ extends MCQ {
  topic: string;
}

// Insert correct answer at a fixed position inside 3 distractors
function buildOptions(distractors: string[], correct: string, pos: number): string[] {
  const d = [...distractors.slice(0, 3)];
  d.splice(pos, 0, correct);
  return d.slice(0, 4);
}

// Pick distractors from nearby entries, skipping the current one
function nearbyValues<T>(arr: T[], idx: number, getValue: (t: T) => string, count = 3): string[] {
  const out: string[] = [];
  for (let step = 1; out.length < count && step < arr.length; step++) {
    out.push(getValue(arr[(idx + step) % arr.length]));
  }
  return out;
}

// ─── Paryayvachi (synonyms) ─────────────────────────────────────────────────
export type SynonymEntry = { word: string; synonyms: string[]; };

export function generateParyayvachi(data: SynonymEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.synonyms[0];
    const dis = nearbyValues(data, idx, e => e.synonyms[0]);
    const pos = idx % 4;
    return {
      question: `"${entry.word}" का पर्यायवाची शब्द है:`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.word} के पर्यायवाची: ${entry.synonyms.join(', ')}।`,
      topic: 'paryayvachi',
    };
  });

  // Reverse: "X किसका पर्यायवाची है?"
  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const synonym = entry.synonyms[0];
    const correct = entry.word;
    const dis = nearbyValues(data, idx, e => e.word);
    const pos = (idx + 2) % 4;
    return {
      question: `"${synonym}" शब्द का अर्थ किससे मिलता-जुलता है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${synonym} = ${entry.word} का पर्यायवाची।`,
      topic: 'paryayvachi',
    };
  });

  return [...fwd, ...rev];
}

// ─── Vilom (antonyms) ────────────────────────────────────────────────────────
export type VilomEntry = { word: string; vilom: string; };

export function generateVilom(data: VilomEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.vilom;
    const dis = nearbyValues(data, idx, e => e.vilom);
    const pos = idx % 4;
    return {
      question: `"${entry.word}" का विलोम शब्द है:`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.word} का विलोम: ${entry.vilom}।`,
      topic: 'vilom',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.word;
    const dis = nearbyValues(data, idx, e => e.word);
    const pos = (idx + 1) % 4;
    return {
      question: `"${entry.vilom}" का विलोम शब्द है:`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.vilom} का विलोम: ${entry.word}।`,
      topic: 'vilom',
    };
  });

  return [...fwd, ...rev];
}

// ─── Tatsam–Tadbhav ──────────────────────────────────────────────────────────
export type TatsamEntry = { tatsam: string; tadbhav: string; };

export function generateTatsamTabdhav(data: TatsamEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.tadbhav;
    const dis = nearbyValues(data, idx, e => e.tadbhav);
    const pos = idx % 4;
    return {
      question: `"${entry.tatsam}" का तद्भव रूप क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `तत्सम: ${entry.tatsam} → तद्भव: ${entry.tadbhav}।`,
      topic: 'tatsam-tadbhav',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.tatsam;
    const dis = nearbyValues(data, idx, e => e.tatsam);
    const pos = (idx + 3) % 4;
    return {
      question: `"${entry.tadbhav}" का तत्सम रूप क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `तद्भव: ${entry.tadbhav} → तत्सम: ${entry.tatsam}।`,
      topic: 'tatsam-tadbhav',
    };
  });

  return [...fwd, ...rev];
}

// ─── Countries / Capitals / Currencies ──────────────────────────────────────
export type CountryEntry = { country: string; capital: string; currency: string; };

export function generateWorldGK(data: CountryEntry[]): TaggedMCQ[] {
  const capitals: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.capital;
    const dis = nearbyValues(data, idx, e => e.capital);
    const pos = idx % 4;
    return {
      question: `${entry.country} की राजधानी क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.country} की राजधानी ${entry.capital} है।`,
      topic: 'world-gk',
    };
  });

  const capToCountry: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.country;
    const dis = nearbyValues(data, idx, e => e.country);
    const pos = (idx + 2) % 4;
    return {
      question: `"${entry.capital}" किस देश की राजधानी है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.capital} — ${entry.country} की राजधानी।`,
      topic: 'world-gk',
    };
  });

  const currencies: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.currency;
    const dis = nearbyValues(data, idx, e => e.currency);
    const pos = (idx + 1) % 4;
    return {
      question: `${entry.country} की मुद्रा क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.country} की मुद्रा ${entry.currency} है।`,
      topic: 'world-gk',
    };
  });

  return [...capitals, ...capToCountry, ...currencies];
}

// ─── Important Days ──────────────────────────────────────────────────────────
export type DayEntry = { date: string; event: string; };

export function generateImportantDays(data: DayEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.event;
    const dis = nearbyValues(data, idx, e => e.event);
    const pos = idx % 4;
    return {
      question: `${entry.date} को कौन सा दिवस मनाया जाता है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.date} = ${entry.event}।`,
      topic: 'current-affairs',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.date;
    const dis = nearbyValues(data, idx, e => e.date);
    const pos = (idx + 2) % 4;
    return {
      question: `"${entry.event}" कब मनाया जाता है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.event} — ${entry.date} को मनाया जाता है।`,
      topic: 'current-affairs',
    };
  });

  return [...fwd, ...rev];
}

// ─── State Symbols ───────────────────────────────────────────────────────────
export type StateSymbolEntry = { state: string; animal?: string; bird?: string; flower?: string; tree?: string; };

export function generateStateSymbols(data: StateSymbolEntry[]): TaggedMCQ[] {
  const out: TaggedMCQ[] = [];

  data.forEach((entry, idx) => {
    if (entry.animal) {
      const correct = entry.animal;
      const dis = nearbyValues(data, idx, e => e.animal || 'बाघ');
      const pos = idx % 4;
      out.push({ question: `${entry.state} का राज्य पशु क्या है?`, options: buildOptions(dis, correct, pos), correctIndex: pos, explanation: `${entry.state} का राज्य पशु ${entry.animal} है।`, topic: 'up-special' });
    }
    if (entry.bird) {
      const correct = entry.bird;
      const dis = nearbyValues(data, idx, e => e.bird || 'मोर');
      const pos = (idx + 1) % 4;
      out.push({ question: `${entry.state} का राज्य पक्षी क्या है?`, options: buildOptions(dis, correct, pos), correctIndex: pos, explanation: `${entry.state} का राज्य पक्षी ${entry.bird} है।`, topic: 'up-special' });
    }
  });

  return out;
}

// ─── Anekarthi (Multiple Meanings) ──────────────────────────────────────────
export type AnekarthiEntry = { word: string; meanings: string[] };

export function generateAnekarthi(data: AnekarthiEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.meanings[0];
    const dis = nearbyValues(data, idx, e => e.meanings[0]);
    const pos = idx % 4;
    return {
      question: `"${entry.word}" शब्द का एक अर्थ है:`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.word} के अर्थ: ${entry.meanings.join(', ')}।`,
      topic: 'anekarthi',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const m = entry.meanings[1] ?? entry.meanings[0];
    const correct = entry.word;
    const dis = nearbyValues(data, idx, e => e.word);
    const pos = (idx + 2) % 4;
    return {
      question: `"${m}" किस अनेकार्थक शब्द का एक अर्थ है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.word} के अर्थों में से एक: ${m}।`,
      topic: 'anekarthi',
    };
  });

  return [...fwd, ...rev];
}

// ─── Ling (Gender) ──────────────────────────────────────────────────────────
export type LingEntry = { masculine: string; feminine: string };

export function generateLing(data: LingEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.feminine;
    const dis = nearbyValues(data, idx, e => e.feminine);
    const pos = idx % 4;
    return {
      question: `"${entry.masculine}" का स्त्रीलिंग क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.masculine} → स्त्रीलिंग: ${entry.feminine}।`,
      topic: 'ling-vachan',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.masculine;
    const dis = nearbyValues(data, idx, e => e.masculine);
    const pos = (idx + 1) % 4;
    return {
      question: `"${entry.feminine}" का पुल्लिंग क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.feminine} → पुल्लिंग: ${entry.masculine}।`,
      topic: 'ling-vachan',
    };
  });

  return [...fwd, ...rev];
}

// ─── Vachan (Number) ─────────────────────────────────────────────────────────
export type VachanEntry = { singular: string; plural: string };

export function generateVachan(data: VachanEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.plural;
    const dis = nearbyValues(data, idx, e => e.plural);
    const pos = idx % 4;
    return {
      question: `"${entry.singular}" का बहुवचन क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.singular} → बहुवचन: ${entry.plural}।`,
      topic: 'ling-vachan',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.singular;
    const dis = nearbyValues(data, idx, e => e.singular);
    const pos = (idx + 3) % 4;
    return {
      question: `"${entry.plural}" का एकवचन क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.plural} → एकवचन: ${entry.singular}।`,
      topic: 'ling-vachan',
    };
  });

  return [...fwd, ...rev];
}

// ─── Upasarg (Prefixes) ──────────────────────────────────────────────────────
export type UpasargEntry = { word: string; upasarg: string; mool: string };

export function generateUpasarg(data: UpasargEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.upasarg;
    const dis = nearbyValues(data, idx, e => e.upasarg);
    const pos = idx % 4;
    return {
      question: `"${entry.word}" में कौन सा उपसर्ग है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.word} = ${entry.upasarg} + ${entry.mool} (उपसर्ग: ${entry.upasarg})।`,
      topic: 'upasarg-pratyay',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.word;
    const dis = nearbyValues(data, idx, e => e.word);
    const pos = (idx + 2) % 4;
    return {
      question: `"${entry.upasarg}" उपसर्ग से बना शब्द कौन सा है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.upasarg} + ${entry.mool} = ${entry.word}।`,
      topic: 'upasarg-pratyay',
    };
  });

  return [...fwd, ...rev];
}

// ─── Pratyay (Suffixes) ──────────────────────────────────────────────────────
export type PratyayEntry = { word: string; pratyay: string; mool: string };

export function generatePratyay(data: PratyayEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.pratyay;
    const dis = nearbyValues(data, idx, e => e.pratyay);
    const pos = idx % 4;
    return {
      question: `"${entry.word}" में कौन सा प्रत्यय है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.mool} + ${entry.pratyay} = ${entry.word}।`,
      topic: 'upasarg-pratyay',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.word;
    const dis = nearbyValues(data, idx, e => e.word);
    const pos = (idx + 1) % 4;
    return {
      question: `"${entry.mool}" में "${entry.pratyay}" प्रत्यय लगाने पर क्या बनेगा?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.mool} + ${entry.pratyay} = ${entry.word}।`,
      topic: 'upasarg-pratyay',
    };
  });

  return [...fwd, ...rev];
}

// ─── Sandhi ──────────────────────────────────────────────────────────────────
export type SandhiEntry = { word: string; type: string; parts: string };

export function generateSandhi(data: SandhiEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.type;
    const dis = nearbyValues(data, idx, e => e.type);
    const pos = idx % 4;
    return {
      question: `"${entry.word}" में कौन सी संधि है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.word} = ${entry.parts} → ${entry.type}।`,
      topic: 'sandhi-samas',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.word;
    const dis = nearbyValues(data, idx, e => e.word);
    const pos = (idx + 2) % 4;
    return {
      question: `"${entry.parts}" की संधि से कौन सा शब्द बनेगा?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.parts} → ${entry.word} (${entry.type})।`,
      topic: 'sandhi-samas',
    };
  });

  return [...fwd, ...rev];
}

// ─── Samas ───────────────────────────────────────────────────────────────────
export type SamasEntry = { word: string; type: string; vigraha: string };

export function generateSamas(data: SamasEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.type;
    const dis = nearbyValues(data, idx, e => e.type);
    const pos = idx % 4;
    return {
      question: `"${entry.word}" में कौन सा समास है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.word} का विग्रह: "${entry.vigraha}" → ${entry.type}।`,
      topic: 'sandhi-samas',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.word;
    const dis = nearbyValues(data, idx, e => e.word);
    const pos = (idx + 3) % 4;
    return {
      question: `"${entry.vigraha}" का समस्त पद क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.vigraha} = ${entry.word} (${entry.type})।`,
      topic: 'sandhi-samas',
    };
  });

  return [...fwd, ...rev];
}

// ─── Ras (Sentiment) ─────────────────────────────────────────────────────────
export type RasEntry = { name: string; sthayi: string; example?: string };

export function generateRas(data: RasEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.sthayi;
    const dis = nearbyValues(data, idx, e => e.sthayi);
    const pos = idx % 4;
    return {
      question: `"${entry.name}" का स्थायी भाव क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.name} का स्थायी भाव: ${entry.sthayi}।`,
      topic: 'ras-chhand-alankar',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.name;
    const dis = nearbyValues(data, idx, e => e.name);
    const pos = (idx + 1) % 4;
    return {
      question: `"${entry.sthayi}" किस रस का स्थायी भाव है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.sthayi} → ${entry.name} का स्थायी भाव।`,
      topic: 'ras-chhand-alankar',
    };
  });

  return [...fwd, ...rev];
}

// ─── Alankar (Figures of Speech) ─────────────────────────────────────────────
export type AlankarEntry = { name: string; example: string; definition: string };

export function generateAlankar(data: AlankarEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.name;
    const dis = nearbyValues(data, idx, e => e.name);
    const pos = idx % 4;
    return {
      question: `"${entry.example}" — इसमें कौन सा अलंकार है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.name}: ${entry.definition}।`,
      topic: 'ras-chhand-alankar',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.definition;
    const dis = nearbyValues(data, idx, e => e.definition);
    const pos = (idx + 2) % 4;
    return {
      question: `${entry.name} अलंकार की परिभाषा क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.name}: ${entry.definition}।`,
      topic: 'ras-chhand-alankar',
    };
  });

  return [...fwd, ...rev];
}

// ─── Lokokti (Proverbs) ──────────────────────────────────────────────────────
export type LokoktiEntry = { lokokti: string; meaning: string };

export function generateLokokti(data: LokoktiEntry[]): TaggedMCQ[] {
  const fwd: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.meaning;
    const dis = nearbyValues(data, idx, e => e.meaning);
    const pos = idx % 4;
    return {
      question: `"${entry.lokokti}" — इस लोकोक्ति का अर्थ क्या है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.lokokti} = ${entry.meaning}।`,
      topic: 'muhavare',
    };
  });

  const rev: TaggedMCQ[] = data.map((entry, idx) => {
    const correct = entry.lokokti;
    const dis = nearbyValues(data, idx, e => e.lokokti);
    const pos = (idx + 1) % 4;
    return {
      question: `"${entry.meaning}" — इस अर्थ की लोकोक्ति कौन सी है?`,
      options: buildOptions(dis, correct, pos),
      correctIndex: pos,
      explanation: `${entry.meaning} = ${entry.lokokti}।`,
      topic: 'muhavare',
    };
  });

  return [...fwd, ...rev];
}

