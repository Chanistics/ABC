const WATER_MASS = 18.01528;

const residueMass = {
  protein: {
    A: 71.0788,
    R: 156.1875,
    N: 114.1038,
    D: 115.0886,
    C: 103.1388,
    E: 129.1155,
    Q: 128.1307,
    G: 57.0519,
    H: 137.1411,
    I: 113.1594,
    L: 113.1594,
    K: 128.1741,
    M: 131.1926,
    F: 147.1766,
    P: 97.1167,
    S: 87.0782,
    T: 101.1051,
    W: 186.2132,
    Y: 163.176,
    V: 99.1326,
  },
  dna: {
    A: 313.21,
    T: 304.2,
    G: 329.21,
    C: 289.18,
  },
  rna: {
    A: 329.21,
    U: 306.17,
    G: 345.21,
    C: 305.18,
  },
};

const massFactors = {
  g: 1,
  mg: 1e-3,
  ug: 1e-6,
  ng: 1e-9,
  pg: 1e-12,
};

const volumeFactors = {
  L: 1,
  mL: 1e-3,
  uL: 1e-6,
  nL: 1e-9,
};

const concentrationFactors = {
  M: 1,
  mM: 1e-3,
  uM: 1e-6,
  nM: 1e-9,
  pM: 1e-12,
};

const bufferConcentrationFactors = {
  M: 1,
  mM: 1e-3,
  uM: 1e-6,
  nM: 1e-9,
  X: 1,
};

const unitLabels = {
  mass: {
    g: "g",
    mg: "mg",
    ug: "ug",
    ng: "ng",
    pg: "pg",
  },
  volume: {
    L: "L",
    mL: "mL",
    uL: "uL",
    nL: "nL",
  },
  concentration: {
    M: "M",
    mM: "mM",
    uM: "uM",
    nM: "nM",
    pM: "pM",
  },
};

const proteinConcentrationFactors = {
  mgmL: 1,
  ugmL: 1e-3,
  ngUl: 1e-3,
};

const proteinMolarityFactors = {
  uM: 1e-6,
  nM: 1e-9,
  pM: 1e-12,
};

const CUSTOM_BUFFER_STORAGE_KEY = "molarityLabBufferRecipePresetsV3";

const codonTable = {
  UUU: "F",
  UUC: "F",
  UUA: "L",
  UUG: "L",
  UCU: "S",
  UCC: "S",
  UCA: "S",
  UCG: "S",
  UAU: "Y",
  UAC: "Y",
  UAA: "*",
  UAG: "*",
  UGU: "C",
  UGC: "C",
  UGA: "*",
  UGG: "W",
  CUU: "L",
  CUC: "L",
  CUA: "L",
  CUG: "L",
  CCU: "P",
  CCC: "P",
  CCA: "P",
  CCG: "P",
  CAU: "H",
  CAC: "H",
  CAA: "Q",
  CAG: "Q",
  CGU: "R",
  CGC: "R",
  CGA: "R",
  CGG: "R",
  AUU: "I",
  AUC: "I",
  AUA: "I",
  AUG: "M",
  ACU: "T",
  ACC: "T",
  ACA: "T",
  ACG: "T",
  AAU: "N",
  AAC: "N",
  AAA: "K",
  AAG: "K",
  AGU: "S",
  AGC: "S",
  AGA: "R",
  AGG: "R",
  GUU: "V",
  GUC: "V",
  GUA: "V",
  GUG: "V",
  GCU: "A",
  GCC: "A",
  GCA: "A",
  GCG: "A",
  GAU: "D",
  GAC: "D",
  GAA: "E",
  GAG: "E",
  GGU: "G",
  GGC: "G",
  GGA: "G",
  GGG: "G",
};

const el = {
  toolTabs: [...document.querySelectorAll("[data-tool-tab]")],
  toolPanels: [...document.querySelectorAll("[data-tool-panel]")],
  segments: [...document.querySelectorAll("[data-molecule]")],
  dogmaModeButtons: [...document.querySelectorAll("[data-dogma-mode]")],
  dogmaInput: document.querySelector("#dogmaInput"),
  dogmaOutput: document.querySelector("#dogmaOutput"),
  dogmaInputLengthOutput: document.querySelector("#dogmaInputLengthOutput strong"),
  dogmaGcOutput: document.querySelector("#dogmaGcOutput strong"),
  dogmaOutputLengthOutput: document.querySelector("#dogmaOutputLengthOutput strong"),
  dogmaOutputUnit: document.querySelector("#dogmaOutputUnit"),
  dogmaFrameOutput: document.querySelector("#dogmaFrameOutput strong"),
  dogmaNote: document.querySelector("#dogmaNote"),
  copyDogmaOutputButton: document.querySelector("#copyDogmaOutputButton"),
  clearDogmaButton: document.querySelector("#clearDogmaButton"),
  proteinSearchInput: document.querySelector("#proteinSearchInput"),
  organismSearchInput: document.querySelector("#organismSearchInput"),
  proteinSearchButton: document.querySelector("#proteinSearchButton"),
  clearProteinSearchButton: document.querySelector("#clearProteinSearchButton"),
  proteinSearchStatus: document.querySelector("#proteinSearchStatus"),
  proteinSearchResults: document.querySelector("#proteinSearchResults"),
  sequenceInput: document.querySelector("#sequenceInput"),
  mwOutput: document.querySelector("#mwOutput strong"),
  lengthOutput: document.querySelector("#lengthOutput strong"),
  gcOutput: document.querySelector("#gcOutput strong"),
  sequenceNote: document.querySelector("#sequenceNote"),
  clearSequenceButton: document.querySelector("#clearSequenceButton"),
  solveFor: document.querySelector("#solveFor"),
  massInput: document.querySelector("#massInput"),
  massUnit: document.querySelector("#massUnit"),
  mwInput: document.querySelector("#mwInput"),
  volumeInput: document.querySelector("#volumeInput"),
  volumeUnit: document.querySelector("#volumeUnit"),
  concentrationInput: document.querySelector("#concentrationInput"),
  concentrationUnit: document.querySelector("#concentrationUnit"),
  molarityAnswer: document.querySelector("#molarityAnswer"),
  ngUlInput: document.querySelector("#ngUlInput"),
  conversionMwInput: document.querySelector("#conversionMwInput"),
  presetLengthInput: document.querySelector("#presetLengthInput"),
  presetButtons: [...document.querySelectorAll("[data-preset]")],
  nucleicNgUlOutput: document.querySelector("#nucleicNgUlOutput strong"),
  nMOutput: document.querySelector("#nMOutput strong"),
  uMOutput: document.querySelector("#uMOutput strong"),
  nucleicPmolOutput: document.querySelector("#nucleicPmolOutput strong"),
  nucleicTargetVolumeInput: document.querySelector("#nucleicTargetVolumeInput"),
  nucleicTargetVolumeUnit: document.querySelector("#nucleicTargetVolumeUnit"),
  nucleicAnswer: document.querySelector("#nucleicAnswer"),
  proteinConcInput: document.querySelector("#proteinConcInput"),
  proteinConcUnit: document.querySelector("#proteinConcUnit"),
  proteinMwInput: document.querySelector("#proteinMwInput"),
  proteinMgMlOutput: document.querySelector("#proteinMgMlOutput strong"),
  proteinNgUlOutput: document.querySelector("#proteinNgUlOutput strong"),
  proteinUMOutput: document.querySelector("#proteinUMOutput strong"),
  proteinPMOutput: document.querySelector("#proteinPMOutput strong"),
  proteinPmolOutput: document.querySelector("#proteinPmolOutput strong"),
  proteinTargetVolumeInput: document.querySelector("#proteinTargetVolumeInput"),
  proteinTargetVolumeUnit: document.querySelector("#proteinTargetVolumeUnit"),
  proteinMassAnswer: document.querySelector("#proteinMassAnswer"),
  dilutionFinalVolumeInput: document.querySelector("#dilutionFinalVolumeInput"),
  dilutionVolumeUnit: document.querySelector("#dilutionVolumeUnit"),
  dilutionMaterialInput: document.querySelector("#dilutionMaterialInput"),
  dilutionRatioInput: document.querySelector("#dilutionRatioInput"),
  addDilutionMaterialButton: document.querySelector("#addDilutionMaterialButton"),
  clearDilutionMaterialsButton: document.querySelector("#clearDilutionMaterialsButton"),
  dilutionTotalMaterialOutput: document.querySelector("#dilutionTotalMaterialOutput strong"),
  dilutionDiluentOutput: document.querySelector("#dilutionDiluentOutput strong"),
  dilutionTableBody: document.querySelector("#dilutionTableBody"),
  dilutionSummary: document.querySelector("#dilutionSummary"),
  dilutionNote: document.querySelector("#dilutionNote"),
  bufferPresetSelect: document.querySelector("#bufferPresetSelect"),
  bufferPresetNameInput: document.querySelector("#bufferPresetNameInput"),
  bufferPresetNoteInput: document.querySelector("#bufferPresetNoteInput"),
  bufferTotalVolumeInput: document.querySelector("#bufferTotalVolumeInput"),
  bufferTotalVolumeUnit: document.querySelector("#bufferTotalVolumeUnit"),
  bufferDiluentNameInput: document.querySelector("#bufferDiluentNameInput"),
  bufferComponentNameInput: document.querySelector("#bufferComponentNameInput"),
  bufferComponentTypeSelect: document.querySelector("#bufferComponentTypeSelect"),
  bufferPowderAmountInput: document.querySelector("#bufferPowderAmountInput"),
  bufferPowderAmountUnit: document.querySelector("#bufferPowderAmountUnit"),
  bufferStockConcInput: document.querySelector("#bufferStockConcInput"),
  bufferStockConcUnit: document.querySelector("#bufferStockConcUnit"),
  bufferTargetConcInput: document.querySelector("#bufferTargetConcInput"),
  bufferTargetConcUnit: document.querySelector("#bufferTargetConcUnit"),
  bufferPowderFields: [...document.querySelectorAll("[data-buffer-powder-field]")],
  bufferSolutionFields: [...document.querySelectorAll("[data-buffer-solution-field]")],
  addBufferComponentButton: document.querySelector("#addBufferComponentButton"),
  saveBufferPresetButton: document.querySelector("#saveBufferPresetButton"),
  deleteBufferPresetButton: document.querySelector("#deleteBufferPresetButton"),
  bufferComponentTableBody: document.querySelector("#bufferComponentTableBody"),
  bufferTableBody: document.querySelector("#bufferTableBody"),
  bufferNote: document.querySelector("#bufferNote"),
  installButton: document.querySelector("#installButton"),
};

let moleculeType = "protein";
let currentMw = null;
let deferredInstallPrompt = null;
let customBufferRecipes = [];
let currentBufferDraft = null;
let dogmaMode = "transcribe";
let dilutionMaterials = [];

function cleanSequence(value, type) {
  const sequence = value.toUpperCase().replace(/[^A-Z]/g, "");
  if (type === "rna") return sequence.replaceAll("T", "U");
  if (type === "dna") return sequence.replaceAll("U", "T");
  return sequence;
}

function calculateMw(sequence, type) {
  const masses = residueMass[type];
  const invalid = [];
  let total = sequence.length > 0 ? WATER_MASS : 0;

  for (const char of sequence) {
    if (masses[char]) {
      total += masses[char];
    } else if (!invalid.includes(char)) {
      invalid.push(char);
    }
  }

  return {
    mw: invalid.length || sequence.length === 0 ? null : total,
    invalid,
    length: sequence.length,
  };
}

function gcPercent(sequence) {
  if (!sequence.length) return null;
  const gc = [...sequence].filter((base) => base === "G" || base === "C").length;
  return (gc / sequence.length) * 100;
}

function numberValue(input) {
  const value = Number(input.value);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function superscriptExponent(value) {
  const superscript = {
    "-": "⁻",
    "+": "⁺",
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
  };
  return String(value)
    .replace(/^\+/, "")
    .split("")
    .map((char) => superscript[char] || char)
    .join("");
}

function formatNumber(value, maxDigits = 5) {
  if (!Number.isFinite(value)) return "-";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 100000 || abs < 0.001) {
    const [mantissa, exponent] = value.toExponential(3).split("e");
    const formattedMantissa = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 3,
    }).format(Number(mantissa));
    return `${formattedMantissa} × 10${superscriptExponent(Number(exponent))}`;
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxDigits,
  }).format(value);
}

function setMetric(output, value, digits) {
  output.textContent = value === null ? "-" : formatNumber(value, digits);
}

function switchTool(tool) {
  el.toolTabs.forEach((tab) => {
    const isActive = tab.dataset.toolTab === tool;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  el.toolPanels.forEach((panel) => {
    const isActive = panel.dataset.toolPanel === tool;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

function setActiveMolecule(type) {
  moleculeType = type;
  el.segments.forEach((segment) => {
    segment.classList.toggle("active", segment.dataset.molecule === type);
  });
}

function getProteinDisplayName(entry) {
  return (
    entry.proteinDescription?.recommendedName?.fullName?.value ||
    entry.proteinDescription?.submissionNames?.[0]?.fullName?.value ||
    "Unnamed protein"
  );
}

function getGeneName(entry) {
  return entry.genes?.[0]?.geneName?.value || entry.genes?.[0]?.orderedLocusNames?.[0]?.value || "";
}

function clearChildren(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function setTableMessage(tbody, colspan, message) {
  clearChildren(tbody);
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = colspan;
  cell.textContent = message;
  row.append(cell);
  tbody.append(row);
}

function cleanDogmaSequence(value) {
  return value.toUpperCase().replace(/[^A-Z]/g, "");
}

function invalidBases(sequence, allowed) {
  return [...new Set([...sequence].filter((base) => !allowed.includes(base)))];
}

function setActiveDogmaMode(mode) {
  dogmaMode = mode;
  el.dogmaModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.dogmaMode === mode);
  });
  updateDogma();
}

function reverseComplement(sequence) {
  const isRna = sequence.includes("U") && !sequence.includes("T");
  const complement = isRna
    ? { A: "U", U: "A", G: "C", C: "G" }
    : { A: "T", T: "A", G: "C", C: "G", U: "A" };
  return [...sequence]
    .reverse()
    .map((base) => complement[base] || "N")
    .join("");
}

function translateRna(sequence) {
  const protein = [];
  for (let index = 0; index + 2 < sequence.length; index += 3) {
    protein.push(codonTable[sequence.slice(index, index + 3)] || "X");
  }
  return protein.join("");
}

function dogmaModeLabel(mode) {
  return {
    transcribe: "DNA to RNA transcription",
    reverseTranscribe: "RNA to DNA reverse transcription",
    translate: "RNA to protein translation",
    reverseComplement: "Reverse complementary conversion",
  }[mode];
}

function updateDogma() {
  const sequence = cleanDogmaSequence(el.dogmaInput.value);
  let output = "";
  let unit = "nt";
  let note = "";
  let invalid = [];

  if (dogmaMode === "transcribe") {
    invalid = invalidBases(sequence, "ACGT");
    output = sequence.replaceAll("T", "U");
    note = "DNA template/coding strand convention은 실험 설계에 맞춰 확인하세요. 여기서는 입력 DNA의 T를 U로 치환합니다.";
  }

  if (dogmaMode === "reverseTranscribe") {
    invalid = invalidBases(sequence, "ACGU");
    output = sequence.replaceAll("U", "T");
    note = "RNA 서열의 U를 T로 치환해 cDNA 형태로 표시합니다.";
  }

  if (dogmaMode === "translate") {
    const rna = sequence.replaceAll("T", "U");
    invalid = invalidBases(rna, "ACGU");
    output = translateRna(rna);
    unit = "aa";
    note = "Standard genetic code, 1번 reading frame 기준입니다. Stop codon은 *로 표시합니다.";
  }

  if (dogmaMode === "reverseComplement") {
    invalid = invalidBases(sequence, "ACGTU");
    output = reverseComplement(sequence);
    note = sequence.includes("U") && !sequence.includes("T")
      ? "RNA reverse complement로 계산했습니다."
      : "DNA reverse complement로 계산했습니다. U가 섞여 있으면 A로 보완합니다.";
  }

  el.dogmaOutput.value = invalid.length ? "" : output;
  setMetric(el.dogmaInputLengthOutput, sequence.length, 0);
  setMetric(el.dogmaGcOutput, sequence.length && !invalid.length ? gcPercent(sequence) : null, 1);
  setMetric(el.dogmaOutputLengthOutput, invalid.length ? null : output.length, 0);
  el.dogmaOutputUnit.textContent = unit;
  setMetric(el.dogmaFrameOutput, dogmaMode === "translate" ? Math.floor(sequence.length / 3) : null, 0);

  if (invalid.length) {
    el.dogmaNote.innerHTML = `<span class="is-warning">지원하지 않는 문자: ${invalid.join(", ")}</span>`;
  } else {
    el.dogmaNote.textContent = `${dogmaModeLabel(dogmaMode)}. ${note}`;
  }
}

async function copyDogmaOutput() {
  if (!el.dogmaOutput.value) return;
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(el.dogmaOutput.value);
      el.dogmaNote.textContent = "결과를 클립보드에 복사했습니다.";
      return;
    }
  } catch (error) {
    // Fall through to selecting the output for manual copy.
  }
  el.dogmaOutput.focus();
  el.dogmaOutput.select();
  el.dogmaNote.textContent = "결과를 선택했습니다. 브라우저 메뉴로 복사하세요.";
}

function updateSequence() {
  const sequence = cleanSequence(el.sequenceInput.value, moleculeType);
  const result = calculateMw(sequence, moleculeType);
  currentMw = result.mw;

  setMetric(el.lengthOutput, result.length, 0);
  setMetric(el.mwOutput, result.mw, 3);

  if (moleculeType === "protein") {
    el.gcOutput.textContent = "-";
  } else {
    setMetric(el.gcOutput, gcPercent(sequence), 1);
  }

  if (result.invalid.length) {
    el.sequenceNote.innerHTML = `<span class="is-warning">지원하지 않는 문자: ${result.invalid.join(", ")}</span>`;
  } else if (moleculeType === "protein") {
    el.sequenceNote.textContent = "Protein은 평균 residue mass에 H2O를 더합니다.";
  } else {
    el.sequenceNote.textContent = "RNA/DNA는 single-stranded oligo 기준이며, T/U는 선택한 타입에 맞춰 변환합니다.";
  }

  updateConversion();
}

function toBaseMass() {
  const mass = numberValue(el.massInput);
  return mass === null ? null : mass * massFactors[el.massUnit.value];
}

function toBaseVolume() {
  const volume = numberValue(el.volumeInput);
  return volume === null ? null : volume * volumeFactors[el.volumeUnit.value];
}

function toBaseConcentration() {
  const concentration = numberValue(el.concentrationInput);
  return concentration === null ? null : concentration * concentrationFactors[el.concentrationUnit.value];
}

function updateTargetState() {
  document.querySelectorAll("[data-solve-field]").forEach((field) => {
    field.classList.toggle("is-target", field.dataset.solveField === el.solveFor.value);
  });
}

function updateMolarity() {
  updateTargetState();

  const solveFor = el.solveFor.value;
  const mass = toBaseMass();
  const mw = numberValue(el.mwInput);
  const volume = toBaseVolume();
  const concentration = toBaseConcentration();

  const missingText = "필요한 입력값을 채우면 결과가 표시됩니다.";
  let result = null;
  let label = "";
  let detail = "";

  if (solveFor === "concentration" && mass && mw && volume) {
    result = mass / mw / volume;
    const display = result / concentrationFactors[el.concentrationUnit.value];
    label = `${formatNumber(display)} ${unitLabels.concentration[el.concentrationUnit.value]}`;
    detail = `Mass ${formatNumber(mass, 6)} g / MW ${formatNumber(mw, 3)} g/mol / Volume ${formatNumber(volume, 6)} L`;
  }

  if (solveFor === "mass" && mw && volume && concentration) {
    result = concentration * volume * mw;
    const display = result / massFactors[el.massUnit.value];
    label = `${formatNumber(display)} ${unitLabels.mass[el.massUnit.value]}`;
    detail = `${formatNumber(concentration, 6)} M x ${formatNumber(volume, 6)} L x ${formatNumber(mw, 3)} g/mol`;
  }

  if (solveFor === "volume" && mass && mw && concentration) {
    result = mass / mw / concentration;
    const display = result / volumeFactors[el.volumeUnit.value];
    label = `${formatNumber(display)} ${unitLabels.volume[el.volumeUnit.value]}`;
    detail = `${formatNumber(mass, 6)} g / ${formatNumber(mw, 3)} g/mol / ${formatNumber(concentration, 6)} M`;
  }

  if (solveFor === "mw" && mass && volume && concentration) {
    result = mass / (volume * concentration);
    label = `${formatNumber(result, 3)} g/mol`;
    detail = `${formatNumber(mass, 6)} g / (${formatNumber(volume, 6)} L x ${formatNumber(concentration, 6)} M)`;
  }

  if (result === null || !Number.isFinite(result)) {
    el.molarityAnswer.textContent = missingText;
    return;
  }

  el.molarityAnswer.innerHTML = `${label}<small>${detail}</small>`;
}

function updateConversion() {
  const concentrationNgUl = numberValue(el.ngUlInput);
  const mw = numberValue(el.conversionMwInput);
  const targetVolume = numberValue(el.nucleicTargetVolumeInput);
  const targetVolumeLiters = targetVolume ? targetVolume * volumeFactors[el.nucleicTargetVolumeUnit.value] : null;

  if (!concentrationNgUl || !mw) {
    el.nucleicNgUlOutput.textContent = "-";
    el.nMOutput.textContent = "-";
    el.uMOutput.textContent = "-";
    el.nucleicPmolOutput.textContent = "-";
    el.nucleicAnswer.textContent = "값을 입력하면 결과값이 표시됩니다.";
    return;
  }

  const molar = (concentrationNgUl * 1e-3) / mw;
  const nM = (concentrationNgUl * 1e6) / mw;
  const uM = (concentrationNgUl * 1e3) / mw;
  const pmol = targetVolumeLiters ? molar * targetVolumeLiters * 1e12 : null;
  setMetric(el.nucleicNgUlOutput, concentrationNgUl, 5);
  setMetric(el.nMOutput, nM, 4);
  setMetric(el.uMOutput, uM, 4);
  setMetric(el.nucleicPmolOutput, pmol, 4);

  const pmolDetail = targetVolumeLiters
    ? ` / ${formatNumber(pmol, 4)} pmol in ${formatNumber(targetVolumeLiters, 6)} L`
    : " / pmol 계산에는 volume 필요";
  el.nucleicAnswer.innerHTML = `${formatNumber(uM, 4)} uM (= ${formatNumber(uM, 4)} pmol/uL)<small>${formatNumber(concentrationNgUl, 5)} ng/uL / ${formatNumber(nM, 4)} nM / MW ${formatNumber(mw, 3)} g/mol${pmolDetail}</small>`;
}

function applyPreset(preset) {
  const length = numberValue(el.presetLengthInput);

  if (!length) return;

  const factors = {
    ssdna: 330,
    dsdna: 660,
    rna: 340,
  };

  if (factors[preset]) {
    el.conversionMwInput.value = String(length * factors[preset]);
    updateConversion();
  }
}

function useMwInCalculators() {
  if (!currentMw) return;
  const rounded = currentMw.toFixed(3);
  el.mwInput.value = rounded;
  el.conversionMwInput.value = rounded;
  el.proteinMwInput.value = rounded;
  updateMolarity();
  updateConversion();
  updateProteinMassMole();
}

function applyProteinEntry(entry) {
  const mw = entry.sequence?.molWeight;
  if (!Number.isFinite(mw)) return;

  currentMw = mw;
  setActiveMolecule("protein");
  el.sequenceInput.value = "";
  el.mwInput.value = mw.toFixed(3);
  el.conversionMwInput.value = mw.toFixed(3);
  el.proteinMwInput.value = mw.toFixed(3);
  setMetric(el.mwOutput, mw, 3);
  setMetric(el.lengthOutput, entry.sequence?.length || null, 0);
  el.gcOutput.textContent = "-";

  const gene = getGeneName(entry);
  const organism = entry.organism?.scientificName || "unknown organism";
  el.sequenceNote.textContent = `${getProteinDisplayName(entry)}${gene ? ` (${gene})` : ""}, ${organism}, UniProt ${entry.primaryAccession}`;
  updateMolarity();
  updateConversion();
  updateProteinMassMole();
}

function renderProteinResults(entries) {
  clearChildren(el.proteinSearchResults);

  if (!entries.length) {
    el.proteinSearchStatus.textContent = "검색 결과가 없습니다. 단백질명이나 organism을 조금 다르게 입력해보세요.";
    return;
  }

  el.proteinSearchStatus.textContent = `${entries.length}개 결과를 찾았습니다. 원하는 항목을 선택하세요.`;

  entries.forEach((entry) => {
    const mw = entry.sequence?.molWeight;
    if (!Number.isFinite(mw)) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-result";

    const text = document.createElement("span");
    const title = document.createElement("strong");
    const meta = document.createElement("small");
    const mwText = document.createElement("span");

    title.textContent = getProteinDisplayName(entry);
    const gene = getGeneName(entry);
    meta.textContent = [
      entry.primaryAccession,
      gene || null,
      entry.organism?.scientificName || null,
      entry.sequence?.length ? `${entry.sequence.length} aa` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    mwText.className = "result-mw";
    mwText.textContent = `${formatNumber(mw, 3)} g/mol`;

    text.append(title, meta);
    button.append(text, mwText);
    button.addEventListener("click", () => applyProteinEntry(entry));
    el.proteinSearchResults.append(button);
  });
}

async function searchProteinByName() {
  const proteinName = el.proteinSearchInput.value.trim();
  const organism = el.organismSearchInput.value.trim();

  if (!proteinName) {
    el.proteinSearchStatus.textContent = "검색할 단백질 이름을 입력하세요.";
    return;
  }

  clearChildren(el.proteinSearchResults);
  el.proteinSearchStatus.textContent = "UniProt에서 검색 중...";
  el.proteinSearchButton.disabled = true;

  try {
    const query = [proteinName, organism].filter(Boolean).join(" ");
    const params = new URLSearchParams({
      query,
      fields: "accession,protein_name,gene_names,organism_name,length,mass",
      format: "json",
      size: "8",
    });
    const response = await fetch(`https://rest.uniprot.org/uniprotkb/search?${params.toString()}`);
    if (!response.ok) throw new Error(`UniProt ${response.status}`);
    const data = await response.json();
    renderProteinResults(data.results || []);
  } catch (error) {
    el.proteinSearchStatus.textContent =
      "UniProt 검색에 실패했습니다. 인터넷 연결 또는 CORS/네트워크 상태를 확인하세요.";
  } finally {
    el.proteinSearchButton.disabled = false;
  }
}

function updateProteinMassMole() {
  const inputValue = numberValue(el.proteinConcInput);
  const inputUnit = el.proteinConcUnit.value;
  const mw = numberValue(el.proteinMwInput);
  const volume = numberValue(el.proteinTargetVolumeInput);
  const volumeLiters = volume ? volume * volumeFactors[el.proteinTargetVolumeUnit.value] : null;
  let molar = null;

  if (!inputValue || !mw) {
    el.proteinMgMlOutput.textContent = "-";
    el.proteinNgUlOutput.textContent = "-";
    el.proteinUMOutput.textContent = "-";
    el.proteinPMOutput.textContent = "-";
    el.proteinPmolOutput.textContent = "-";
    el.proteinMassAnswer.textContent = "값을 입력하면 결과값이 표시됩니다.";
    return;
  }

  if (proteinConcentrationFactors[inputUnit]) {
    const gramsPerLiter = inputValue * proteinConcentrationFactors[inputUnit];
    molar = gramsPerLiter / mw;
  }

  if (proteinMolarityFactors[inputUnit]) {
    molar = inputValue * proteinMolarityFactors[inputUnit];
  }

  if (inputUnit === "pmol") {
    if (!volumeLiters) {
      el.proteinMgMlOutput.textContent = "-";
      el.proteinNgUlOutput.textContent = "-";
      el.proteinUMOutput.textContent = "-";
      el.proteinPMOutput.textContent = "-";
      setMetric(el.proteinPmolOutput, inputValue, 4);
      el.proteinMassAnswer.textContent = "pmol을 농도로 바꾸려면 volume을 입력하세요.";
      return;
    }
    molar = (inputValue * 1e-12) / volumeLiters;
  }

  const mgMl = molar * mw;
  const ngUl = mgMl * 1000;
  const uM = molar * 1e6;
  const pM = molar * 1e12;
  const pmol = volumeLiters ? molar * volumeLiters * 1e12 : null;

  setMetric(el.proteinMgMlOutput, mgMl, 5);
  setMetric(el.proteinNgUlOutput, ngUl, 5);
  setMetric(el.proteinUMOutput, uM, 5);
  setMetric(el.proteinPMOutput, pM, 5);
  setMetric(el.proteinPmolOutput, pmol, 5);

  const pmolDetail = volumeLiters ? ` / ${formatNumber(pmol, 5)} pmol in ${formatNumber(volumeLiters, 6)} L` : "";
  el.proteinMassAnswer.innerHTML = `${formatNumber(uM, 5)} uM<small>${formatNumber(mgMl, 5)} mg/mL / ${formatNumber(ngUl, 5)} ng/uL${pmolDetail}</small>`;
}

function dilutionFinalVolume() {
  const volume = numberValue(el.dilutionFinalVolumeInput);
  return volume === null ? null : volume;
}

function updateDilutionTable() {
  const finalVolume = dilutionFinalVolume();
  clearChildren(el.dilutionTableBody);
  el.dilutionTotalMaterialOutput.textContent = "-";
  el.dilutionDiluentOutput.textContent = "-";

  if (!dilutionMaterials.length) {
    setTableMessage(el.dilutionTableBody, 4, "Material과 1:X를 추가하면 계산됩니다.");
    el.dilutionSummary.textContent = "여러 material을 추가하면 각 material 부피를 합산한 뒤 남은 부피를 diluent로 계산합니다.";
    return;
  }

  if (!finalVolume) {
    setTableMessage(el.dilutionTableBody, 4, "최종 부피를 입력하면 계산됩니다.");
    el.dilutionSummary.textContent = "최종 부피를 입력하면 material 합계와 diluent 부피가 표시됩니다.";
    return;
  }

  const unit = el.dilutionVolumeUnit.value;
  const calculatedMaterials = dilutionMaterials.map((item) => ({
    ...item,
    materialVolume: finalVolume / item.ratio,
  }));
  const totalMaterialVolume = calculatedMaterials.reduce((sum, item) => sum + item.materialVolume, 0);
  const diluentVolume = finalVolume - totalMaterialVolume;

  setMetric(el.dilutionTotalMaterialOutput, totalMaterialVolume, 5);
  setMetric(el.dilutionDiluentOutput, diluentVolume, 5);

  calculatedMaterials.forEach((item, index) => {
    const row = document.createElement("tr");
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "secondary-button table-button";
    removeButton.textContent = "삭제";
    removeButton.addEventListener("click", () => {
      dilutionMaterials.splice(index, 1);
      updateDilutionTable();
    });

    [
      item.name,
      `1:${formatNumber(item.ratio, 4)}`,
      `${formatNumber(item.materialVolume, 5)} ${unit}`,
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });

    const actionCell = document.createElement("td");
    actionCell.append(removeButton);
    row.append(actionCell);
    el.dilutionTableBody.append(row);
  });

  if (diluentVolume < 0) {
    el.dilutionSummary.innerHTML = `<span class="is-warning">Material 합계가 final volume보다 큽니다. 1:X 조건 또는 final volume을 확인하세요.</span>`;
    return;
  }

  const materialDetail = calculatedMaterials
    .map((item) => `${item.name} ${formatNumber(item.materialVolume, 5)} ${unit}`)
    .join(" + ");
  el.dilutionSummary.innerHTML = `${materialDetail} + diluent ${formatNumber(diluentVolume, 5)} ${unit}<small>total material ${formatNumber(totalMaterialVolume, 5)} ${unit} / final ${formatNumber(finalVolume, 5)} ${unit}</small>`;
}

function addDilutionMaterial() {
  const name = el.dilutionMaterialInput.value.trim();
  const ratio = numberValue(el.dilutionRatioInput);

  if (!name || !ratio || ratio < 1) {
    el.dilutionNote.textContent = "Material 이름과 1 이상인 X 값을 입력하세요.";
    return;
  }

  dilutionMaterials.push({ name, ratio });
  el.dilutionMaterialInput.value = "";
  el.dilutionRatioInput.value = "";
  el.dilutionNote.textContent = `${name} 1:${formatNumber(ratio, 4)} 조건을 추가했습니다.`;
  updateDilutionTable();
}

function cloneRecipe(recipe) {
  return JSON.parse(JSON.stringify(recipe));
}

function newBufferDraft() {
  return {
    id: `custom-${Date.now()}`,
    name: "",
    note: "",
    source: "custom",
    totalVolume: {
      amount: null,
      unit: "mL",
    },
    diluentName: "ddH2O",
    components: [],
  };
}

function recipeIdFromName(name) {
  return `custom-${name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || Date.now()}`;
}

function validBufferRecipe(recipe) {
  return (
    recipe &&
    typeof recipe.id === "string" &&
    typeof recipe.name === "string" &&
    recipe.totalVolume &&
    Number.isFinite(recipe.totalVolume.amount) &&
    recipe.totalVolume.amount > 0 &&
    typeof recipe.diluentName === "string" &&
    Array.isArray(recipe.components) &&
    recipe.components.every((component) => {
      if (component.type === "powder") {
        return Number.isFinite(component.amount) && component.amount > 0 && ["g", "mg"].includes(component.unit);
      }
      if (component.type === "solution") {
        return (
          Number.isFinite(component.stockConc) &&
          component.stockConc > 0 &&
          Number.isFinite(component.targetConc) &&
          component.targetConc > 0 &&
          bufferConcentrationFactors[component.stockUnit] &&
          bufferConcentrationFactors[component.targetUnit]
        );
      }
      return false;
    })
  );
}

function loadCustomBufferRecipes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_BUFFER_STORAGE_KEY) || "[]");
    customBufferRecipes = Array.isArray(parsed) ? parsed.filter(validBufferRecipe) : [];
  } catch (error) {
    customBufferRecipes = [];
  }
}

function saveCustomBufferRecipes() {
  localStorage.setItem(CUSTOM_BUFFER_STORAGE_KEY, JSON.stringify(customBufferRecipes));
}

function allBufferRecipes() {
  return [...customBufferRecipes];
}

function findBufferRecipe(id) {
  return allBufferRecipes().find((item) => item.id === id) || null;
}

function bufferTypeLabel(type) {
  return type === "powder" ? "Powder" : "Stock solution";
}

function bufferTotalVolumeLiters(recipe = currentBufferDraft) {
  const amount = recipe?.totalVolume?.amount;
  const unit = recipe?.totalVolume?.unit;
  if (!Number.isFinite(amount) || !volumeFactors[unit]) return null;
  return amount * volumeFactors[unit];
}

function bufferVolumeLabel(liters, preferredUnit = "mL") {
  if (!Number.isFinite(liters)) return "-";
  const factor = volumeFactors[preferredUnit] || 1e-3;
  return `${formatNumber(liters / factor, 5)} ${preferredUnit}`;
}

function bufferTotalVolumeLabel(recipe) {
  if (!recipe?.totalVolume || !Number.isFinite(recipe.totalVolume.amount)) return "-";
  return `${formatNumber(recipe.totalVolume.amount, 5)} ${recipe.totalVolume.unit}`;
}

function bufferPowderLabel(component) {
  if (!Number.isFinite(component.amount)) return "-";
  return `${formatNumber(component.amount, 5)} ${component.unit}`;
}

function bufferSolutionVolumeLiters(component, recipe = currentBufferDraft) {
  const totalLiters = bufferTotalVolumeLiters(recipe);
  const stock = component.stockConc * bufferConcentrationFactors[component.stockUnit];
  const target = component.targetConc * bufferConcentrationFactors[component.targetUnit];
  if (!totalLiters || !stock || !target) return null;
  return (target / stock) * totalLiters;
}

function bufferComponentInputLabel(component) {
  if (component.type === "powder") return bufferPowderLabel(component);
  return `${formatNumber(component.stockConc, 5)} ${component.stockUnit} stock -> ${formatNumber(component.targetConc, 5)} ${component.targetUnit} final`;
}

function bufferComponentAddLabel(component, recipe = currentBufferDraft) {
  if (component.type === "powder") return bufferPowderLabel(component);
  const liters = bufferSolutionVolumeLiters(component, recipe);
  return bufferVolumeLabel(liters, recipe?.totalVolume?.unit || "mL");
}

function syncBufferDraftMeta() {
  if (!currentBufferDraft) return;
  currentBufferDraft.name = el.bufferPresetNameInput.value.trim();
  currentBufferDraft.note = el.bufferPresetNoteInput.value.trim();
  currentBufferDraft.totalVolume = {
    amount: numberValue(el.bufferTotalVolumeInput),
    unit: el.bufferTotalVolumeUnit.value,
  };
  currentBufferDraft.diluentName = el.bufferDiluentNameInput.value.trim() || "ddH2O";
}

function populateBufferPresets() {
  const selected = el.bufferPresetSelect.value;
  clearChildren(el.bufferPresetSelect);

  if (!customBufferRecipes.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "저장된 preset 없음";
    el.bufferPresetSelect.append(option);
    return;
  }

  customBufferRecipes.forEach((recipe) => {
    const option = document.createElement("option");
    option.value = recipe.id;
    option.textContent = recipe.name;
    el.bufferPresetSelect.append(option);
  });

  if (selected && customBufferRecipes.some((recipe) => recipe.id === selected)) {
    el.bufferPresetSelect.value = selected;
  }
}

function renderBufferDraft() {
  if (!currentBufferDraft) return;

  el.bufferPresetNameInput.value = currentBufferDraft.name || "";
  el.bufferPresetNoteInput.value = currentBufferDraft.note || "";
  el.bufferTotalVolumeInput.value = currentBufferDraft.totalVolume?.amount || "";
  el.bufferTotalVolumeUnit.value = currentBufferDraft.totalVolume?.unit || "mL";
  el.bufferDiluentNameInput.value = currentBufferDraft.diluentName || "ddH2O";
  clearChildren(el.bufferComponentTableBody);

  if (!currentBufferDraft.components.length) {
    setTableMessage(el.bufferComponentTableBody, 4, "성분을 추가하면 preset으로 저장할 수 있습니다.");
    return;
  }

  currentBufferDraft.components.forEach((component, index) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const typeCell = document.createElement("td");
    const amountCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");

    nameCell.textContent = component.name;
    typeCell.textContent = bufferTypeLabel(component.type);
    amountCell.textContent =
      component.type === "solution"
        ? `${bufferComponentAddLabel(component, currentBufferDraft)} (${bufferComponentInputLabel(component)})`
        : bufferComponentInputLabel(component);
    removeButton.type = "button";
    removeButton.className = "secondary-button table-button";
    removeButton.textContent = "삭제";
    removeButton.addEventListener("click", () => {
      currentBufferDraft.components.splice(index, 1);
      renderBufferDraft();
      updateBufferRecipe();
    });

    actionCell.append(removeButton);
    row.append(nameCell, typeCell, amountCell, actionCell);
    el.bufferComponentTableBody.append(row);
  });
}

function loadSelectedBufferDraft() {
  const recipe = findBufferRecipe(el.bufferPresetSelect.value);
  currentBufferDraft = recipe ? cloneRecipe(recipe) : newBufferDraft();
  renderBufferDraft();
  updateBufferRecipe();
}

function updateBufferComponentTypeFields() {
  const isSolution = el.bufferComponentTypeSelect.value === "solution";
  el.bufferPowderFields.forEach((field) => {
    field.hidden = isSolution;
  });
  el.bufferSolutionFields.forEach((field) => {
    field.hidden = !isSolution;
  });
}

function addBufferComponent() {
  if (!currentBufferDraft) {
    currentBufferDraft = newBufferDraft();
  }
  syncBufferDraftMeta();

  const name = el.bufferComponentNameInput.value.trim();
  const type = el.bufferComponentTypeSelect.value;

  if (!name) {
    el.bufferNote.textContent = "성분 이름을 입력하세요.";
    return;
  }

  if (type === "powder") {
    const amount = numberValue(el.bufferPowderAmountInput);
    const unit = el.bufferPowderAmountUnit.value;
    if (!amount) {
      el.bufferNote.textContent = "Powder amount를 입력하세요.";
      return;
    }
    currentBufferDraft.components.push({ name, type, amount, unit });
    el.bufferPowderAmountInput.value = "";
    el.bufferNote.textContent = `${name} ${formatNumber(amount, 5)} ${unit}를 draft에 추가했습니다.`;
  } else {
    const stockConc = numberValue(el.bufferStockConcInput);
    const targetConc = numberValue(el.bufferTargetConcInput);
    const stockUnit = el.bufferStockConcUnit.value;
    const targetUnit = el.bufferTargetConcUnit.value;
    const stockBase = stockConc ? stockConc * bufferConcentrationFactors[stockUnit] : null;
    const targetBase = targetConc ? targetConc * bufferConcentrationFactors[targetUnit] : null;

    if (!stockConc || !targetConc) {
      el.bufferNote.textContent = "Stock concentration과 target concentration을 입력하세요.";
      return;
    }
    if (targetBase > stockBase) {
      el.bufferNote.textContent = "Target concentration은 stock concentration보다 낮아야 합니다.";
      return;
    }
    if (!bufferTotalVolumeLiters()) {
      el.bufferNote.textContent = "Stock solution 부피 계산을 위해 total volume을 입력하세요.";
      return;
    }

    const component = { name, type, stockConc, stockUnit, targetConc, targetUnit };
    currentBufferDraft.components.push(component);
    el.bufferStockConcInput.value = "";
    el.bufferTargetConcInput.value = "";
    el.bufferNote.textContent = `${name} ${bufferComponentAddLabel(component)}를 draft에 추가했습니다.`;
  }

  el.bufferComponentNameInput.value = "";
  renderBufferDraft();
}

function bufferSolutionVolumeSum(recipe) {
  return recipe.components.reduce((sum, component) => {
    if (component.type !== "solution") return sum;
    const liters = bufferSolutionVolumeLiters(component, recipe);
    return Number.isFinite(liters) ? sum + liters : sum;
  }, 0);
}

function bufferDiluentAddLabel(recipe) {
  const totalLiters = bufferTotalVolumeLiters(recipe);
  if (!totalLiters) return "q.s. to total volume";
  const solutionLiters = bufferSolutionVolumeSum(recipe);
  const diluentLiters = totalLiters - solutionLiters;
  if (diluentLiters < 0) return "solution volume exceeds total";
  return `${bufferVolumeLabel(diluentLiters, recipe.totalVolume.unit)} or q.s. to ${bufferTotalVolumeLabel(recipe)}`;
}

function bufferHasOverfilledSolution(recipe) {
  const totalLiters = bufferTotalVolumeLiters(recipe);
  return totalLiters ? bufferSolutionVolumeSum(recipe) > totalLiters : false;
}

function saveBufferPreset() {
  if (!currentBufferDraft) return;
  syncBufferDraftMeta();

  const name = currentBufferDraft.name;
  if (!name || !currentBufferDraft.components.length) {
    el.bufferNote.textContent = "Preset name과 하나 이상의 성분을 입력하세요.";
    return;
  }

  if (!currentBufferDraft.totalVolume.amount) {
    el.bufferNote.textContent = "Total volume을 입력하세요.";
    return;
  }

  if (bufferHasOverfilledSolution(currentBufferDraft)) {
    el.bufferNote.textContent = "Stock solution 부피 합계가 total volume보다 큽니다.";
    return;
  }

  const existingDraft = customBufferRecipes.some((recipe) => recipe.id === currentBufferDraft.id);
  const id = existingDraft ? currentBufferDraft.id : recipeIdFromName(name);
  const saved = {
    id,
    name,
    note: currentBufferDraft.note,
    source: "custom",
    totalVolume: cloneRecipe(currentBufferDraft.totalVolume),
    diluentName: currentBufferDraft.diluentName,
    components: cloneRecipe(currentBufferDraft.components),
  };

  const existingIndex = customBufferRecipes.findIndex((recipe) => recipe.id === id);
  if (existingIndex >= 0) {
    customBufferRecipes[existingIndex] = saved;
  } else {
    customBufferRecipes.push(saved);
  }

  currentBufferDraft = cloneRecipe(saved);
  saveCustomBufferRecipes();
  populateBufferPresets();
  el.bufferPresetSelect.value = saved.id;
  renderBufferDraft();
  updateBufferRecipe();
  el.bufferNote.textContent = `${saved.name} preset을 저장했습니다.`;
}

function deleteBufferPreset() {
  const selectedId = el.bufferPresetSelect.value;
  const selected = customBufferRecipes.find((recipe) => recipe.id === selectedId);
  if (!selected) {
    el.bufferNote.textContent = "삭제할 저장 preset을 선택하세요.";
    return;
  }

  customBufferRecipes = customBufferRecipes.filter((recipe) => recipe.id !== selectedId);
  saveCustomBufferRecipes();
  populateBufferPresets();
  currentBufferDraft = newBufferDraft();
  renderBufferDraft();
  updateBufferRecipe();
  el.bufferNote.textContent = `${selected.name} preset을 삭제했습니다.`;
}

function updateBufferRecipe() {
  const recipe = findBufferRecipe(el.bufferPresetSelect.value);

  if (!recipe) {
    setTableMessage(el.bufferTableBody, 3, "저장된 preset이 없습니다. 아래에서 새 preset을 추가하세요.");
    el.bufferNote.textContent = "";
    return;
  }

  clearChildren(el.bufferTableBody);
  recipe.components.forEach((component) => {
    const row = document.createElement("tr");
    [component.name, bufferTypeLabel(component.type), bufferComponentAddLabel(component, recipe)].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    el.bufferTableBody.append(row);
  });

  const diluentRow = document.createElement("tr");
  [
    recipe.diluentName || "ddH2O",
    "Diluent",
    bufferDiluentAddLabel(recipe),
  ].forEach((value) => {
    const cell = document.createElement("td");
    cell.textContent = value;
    diluentRow.append(cell);
  });
  el.bufferTableBody.append(diluentRow);
  const solutionWarning = bufferHasOverfilledSolution(recipe) ? " Stock solution 부피 합계가 total volume보다 큽니다." : "";
  el.bufferNote.textContent = `${recipe.note || ""}${solutionWarning}`;
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && ["http:", "https:"].includes(location.protocol)) {
    navigator.serviceWorker.register("service-worker.js");
  }
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  el.installButton.hidden = false;
});

el.installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  el.installButton.hidden = true;
});

el.toolTabs.forEach((tab) => {
  tab.addEventListener("click", () => switchTool(tab.dataset.toolTab));
});

el.dogmaModeButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveDogmaMode(button.dataset.dogmaMode));
});
el.dogmaInput.addEventListener("input", updateDogma);
el.copyDogmaOutputButton.addEventListener("click", copyDogmaOutput);
el.clearDogmaButton.addEventListener("click", () => {
  el.dogmaInput.value = "";
  updateDogma();
});

el.segments.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveMolecule(button.dataset.molecule);
    updateSequence();
  });
});

el.proteinSearchButton.addEventListener("click", searchProteinByName);
el.clearProteinSearchButton.addEventListener("click", () => {
  el.proteinSearchInput.value = "";
  el.organismSearchInput.value = "human";
  el.proteinSearchStatus.textContent = "검색 결과를 선택하면 MW가 계산기에 들어갑니다.";
  clearChildren(el.proteinSearchResults);
});
el.proteinSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchProteinByName();
});
el.organismSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchProteinByName();
});

el.sequenceInput.addEventListener("input", updateSequence);
el.clearSequenceButton.addEventListener("click", () => {
  el.sequenceInput.value = "";
  updateSequence();
});

[
  el.solveFor,
  el.massInput,
  el.massUnit,
  el.mwInput,
  el.volumeInput,
  el.volumeUnit,
  el.concentrationInput,
  el.concentrationUnit,
].forEach((input) => input.addEventListener("input", updateMolarity));

[el.ngUlInput, el.conversionMwInput, el.nucleicTargetVolumeInput, el.nucleicTargetVolumeUnit].forEach((input) => {
  input.addEventListener("input", updateConversion);
});

[
  el.proteinConcInput,
  el.proteinConcUnit,
  el.proteinMwInput,
  el.proteinTargetVolumeInput,
  el.proteinTargetVolumeUnit,
].forEach((input) => input.addEventListener("input", updateProteinMassMole));

el.dilutionFinalVolumeInput.addEventListener("input", updateDilutionTable);
el.dilutionVolumeUnit.addEventListener("input", updateDilutionTable);
el.addDilutionMaterialButton.addEventListener("click", addDilutionMaterial);
el.clearDilutionMaterialsButton.addEventListener("click", () => {
  dilutionMaterials = [];
  el.dilutionNote.textContent = "Material 목록을 지웠습니다.";
  updateDilutionTable();
});
[el.dilutionMaterialInput, el.dilutionRatioInput].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addDilutionMaterial();
  });
});

el.bufferPresetSelect.addEventListener("change", loadSelectedBufferDraft);
el.bufferComponentTypeSelect.addEventListener("input", updateBufferComponentTypeFields);
el.bufferComponentTypeSelect.addEventListener("change", updateBufferComponentTypeFields);
el.addBufferComponentButton.addEventListener("click", addBufferComponent);
el.saveBufferPresetButton.addEventListener("click", saveBufferPreset);
el.deleteBufferPresetButton.addEventListener("click", deleteBufferPreset);
el.bufferPresetNameInput.addEventListener("input", () => {
  if (currentBufferDraft) currentBufferDraft.name = el.bufferPresetNameInput.value.trim();
});
el.bufferPresetNoteInput.addEventListener("input", () => {
  if (currentBufferDraft) {
    currentBufferDraft.note = el.bufferPresetNoteInput.value.trim();
  }
});
[el.bufferPresetNameInput, el.bufferPresetNoteInput, el.bufferTotalVolumeInput, el.bufferTotalVolumeUnit, el.bufferDiluentNameInput].forEach((input) => {
  input.addEventListener("input", syncBufferDraftMeta);
});

el.presetButtons.forEach((button) => {
  button.addEventListener("click", () => applyPreset(button.dataset.preset));
});

loadCustomBufferRecipes();
populateBufferPresets();
loadSelectedBufferDraft();
updateBufferComponentTypeFields();
switchTool("molecular");
updateSequence();
updateMolarity();
updateConversion();
updateProteinMassMole();
updateDilutionTable();
updateDogma();
registerServiceWorker();
