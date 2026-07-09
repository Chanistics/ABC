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

const volumeFactors = {
  L: 1,
  mL: 1e-3,
  uL: 1e-6,
  nL: 1e-9,
};

const massFactors = {
  g: 1,
  mg: 1e-3,
  ug: 1e-6,
  ng: 1e-9,
  pg: 1e-12,
};

const concentrationFactors = {
  M: 1,
  mM: 1e-3,
  uM: 1e-6,
  nM: 1e-9,
  pM: 1e-12,
};

const unitLabels = {
  mass: { g: "g", mg: "mg", ug: "ug", ng: "ng", pg: "pg" },
  volume: { L: "L", mL: "mL", uL: "uL", nL: "nL" },
  concentration: { M: "M", mM: "mM", uM: "uM", nM: "nM", pM: "pM" },
};

const bufferConcentrationFactors = {
  M: 1,
  mM: 1e-3,
  uM: 1e-6,
  X: 1,
};

const CUSTOM_BUFFER_STORAGE_KEY = "abcV2BufferRecipePresets";

const el = {
  toolTabs: [...document.querySelectorAll("[data-tool-tab]")],
  toolPanels: [...document.querySelectorAll("[data-tool-panel]")],
  moleculeButtons: [...document.querySelectorAll("[data-molecule]")],
  proteinSearchPanel: document.querySelector("#proteinSearchPanel"),
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
  useMwButton: document.querySelector("#useMwButton"),
  solveButtons: [...document.querySelectorAll("[data-solve-for]")],
  massInput: document.querySelector("#massInput"),
  massUnit: document.querySelector("#massUnit"),
  mwInput: document.querySelector("#mwInput"),
  volumeInput: document.querySelector("#volumeInput"),
  volumeUnit: document.querySelector("#volumeUnit"),
  concentrationInput: document.querySelector("#concentrationInput"),
  concentrationUnit: document.querySelector("#concentrationUnit"),
  molarityAnswer: document.querySelector("#molarityAnswer"),
  concentrationModeButtons: [...document.querySelectorAll("[data-concentration-mode]")],
  concentrationPanels: [...document.querySelectorAll("[data-concentration-panel]")],
  rnaConcInput: document.querySelector("#rnaConcInput"),
  rnaConcUnit: document.querySelector("#rnaConcUnit"),
  rnaMwInput: document.querySelector("#rnaMwInput"),
  rnaVolumeInput: document.querySelector("#rnaVolumeInput"),
  rnaVolumeUnit: document.querySelector("#rnaVolumeUnit"),
  rnaLengthInput: document.querySelector("#rnaLengthInput"),
  rnaPresetButtons: [...document.querySelectorAll("[data-rna-preset]")],
  rnaConversionAnswer: document.querySelector("#rnaConversionAnswer"),
  rnaNgUlOutput: document.querySelector("#rnaNgUlOutput strong"),
  rnaUMOutput: document.querySelector("#rnaUMOutput strong"),
  rnaPmolOutput: document.querySelector("#rnaPmolOutput strong"),
  proteinConcInput: document.querySelector("#proteinConcInput"),
  proteinConcUnit: document.querySelector("#proteinConcUnit"),
  proteinMwInput: document.querySelector("#proteinMwInput"),
  proteinConversionAnswer: document.querySelector("#proteinConversionAnswer"),
  proteinMgMlOutput: document.querySelector("#proteinMgMlOutput strong"),
  proteinUMOutput: document.querySelector("#proteinUMOutput strong"),
  dilutionModeButtons: [...document.querySelectorAll("[data-dilution-mode]")],
  dilutionPanels: [...document.querySelectorAll("[data-dilution-panel]")],
  foldStockInput: document.querySelector("#foldStockInput"),
  foldTargetInput: document.querySelector("#foldTargetInput"),
  foldFinalVolumeInput: document.querySelector("#foldFinalVolumeInput"),
  foldVolumeUnit: document.querySelector("#foldVolumeUnit"),
  foldDilutionAnswer: document.querySelector("#foldDilutionAnswer"),
  molarStockInput: document.querySelector("#molarStockInput"),
  molarStockUnit: document.querySelector("#molarStockUnit"),
  molarTargetInput: document.querySelector("#molarTargetInput"),
  molarTargetUnit: document.querySelector("#molarTargetUnit"),
  molarFinalVolumeInput: document.querySelector("#molarFinalVolumeInput"),
  molarVolumeUnit: document.querySelector("#molarVolumeUnit"),
  molarDilutionAnswer: document.querySelector("#molarDilutionAnswer"),
  rnaStockInput: document.querySelector("#rnaStockInput"),
  rnaStockUnit: document.querySelector("#rnaStockUnit"),
  rnaTargetInput: document.querySelector("#rnaTargetInput"),
  rnaTargetUnit: document.querySelector("#rnaTargetUnit"),
  rnaDilutionMwInput: document.querySelector("#rnaDilutionMwInput"),
  rnaDilutionVolumeInput: document.querySelector("#rnaDilutionVolumeInput"),
  rnaDilutionVolumeUnit: document.querySelector("#rnaDilutionVolumeUnit"),
  rnaDilutionAnswer: document.querySelector("#rnaDilutionAnswer"),
  proteinStockInput: document.querySelector("#proteinStockInput"),
  proteinStockUnit: document.querySelector("#proteinStockUnit"),
  proteinTargetInput: document.querySelector("#proteinTargetInput"),
  proteinTargetUnit: document.querySelector("#proteinTargetUnit"),
  proteinDilutionMwInput: document.querySelector("#proteinDilutionMwInput"),
  proteinDilutionVolumeInput: document.querySelector("#proteinDilutionVolumeInput"),
  proteinDilutionVolumeUnit: document.querySelector("#proteinDilutionVolumeUnit"),
  proteinDilutionAnswer: document.querySelector("#proteinDilutionAnswer"),
  bufferModeButtons: [...document.querySelectorAll("[data-buffer-mode]")],
  bufferPanels: [...document.querySelectorAll("[data-buffer-panel]")],
  bufferPresetSelect: document.querySelector("#bufferPresetSelect"),
  bufferPresetNameInput: document.querySelector("#bufferPresetNameInput"),
  bufferTotalVolumeInput: document.querySelector("#bufferTotalVolumeInput"),
  bufferTotalVolumeUnit: document.querySelector("#bufferTotalVolumeUnit"),
  bufferDiluentNameInput: document.querySelector("#bufferDiluentNameInput"),
  bufferPresetNoteInput: document.querySelector("#bufferPresetNoteInput"),
  bufferComponentNameInput: document.querySelector("#bufferComponentNameInput"),
  bufferComponentTypeSelect: document.querySelector("#bufferComponentTypeSelect"),
  bufferStockConcInput: document.querySelector("#bufferStockConcInput"),
  bufferStockConcUnit: document.querySelector("#bufferStockConcUnit"),
  bufferTargetConcInput: document.querySelector("#bufferTargetConcInput"),
  bufferTargetConcUnit: document.querySelector("#bufferTargetConcUnit"),
  bufferPowderAmountInput: document.querySelector("#bufferPowderAmountInput"),
  bufferPowderAmountUnit: document.querySelector("#bufferPowderAmountUnit"),
  bufferPowderFields: [...document.querySelectorAll("[data-buffer-powder-field]")],
  bufferSolutionFields: [...document.querySelectorAll("[data-buffer-solution-field]")],
  addBufferComponentButton: document.querySelector("#addBufferComponentButton"),
  saveBufferPresetButton: document.querySelector("#saveBufferPresetButton"),
  deleteBufferPresetButton: document.querySelector("#deleteBufferPresetButton"),
  bufferTableBody: document.querySelector("#bufferTableBody"),
  bufferComponentTableBody: document.querySelector("#bufferComponentTableBody"),
  bufferNote: document.querySelector("#bufferNote"),
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
};

let moleculeType = "protein";
let currentMw = null;
let solveFor = "concentration";
let dogmaMode = "transcribe";
let customBufferRecipes = [];
let currentBufferDraft = null;

function numberValue(input) {
  const value = Number(input.value);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function superscriptExponent(value) {
  const superscript = {
    "-": "-",
    "+": "+",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
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
    return `${formattedMantissa}e${superscriptExponent(Number(exponent))}`;
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxDigits,
  }).format(value);
}

function setMetric(output, value, digits = 5) {
  output.textContent = value === null ? "-" : formatNumber(value, digits);
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

function setActiveButtons(buttons, attr, value) {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset[attr] === value);
  });
}

function switchTool(tool) {
  setActiveButtons(el.toolTabs, "toolTab", tool);
  el.toolPanels.forEach((panel) => {
    const isActive = panel.dataset.toolPanel === tool;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function switchMode(buttons, panels, buttonAttr, panelAttr, mode) {
  setActiveButtons(buttons, buttonAttr, mode);
  panels.forEach((panel) => {
    const isActive = panel.dataset[panelAttr] === mode;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

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
    el.sequenceNote.innerHTML = `<span class="is-warning">Unsupported characters: ${result.invalid.join(", ")}</span>`;
  } else if (moleculeType === "protein") {
    el.sequenceNote.textContent = "Protein uses average residue mass plus H2O.";
  } else {
    el.sequenceNote.textContent = "RNA/DNA are calculated as single-stranded oligos. T/U is normalized to the selected type.";
  }
}

function setActiveMolecule(type) {
  moleculeType = type;
  setActiveButtons(el.moleculeButtons, "molecule", type);
  el.proteinSearchPanel.hidden = type !== "protein";
  updateSequence();
}

function useMwInCalculators() {
  if (!currentMw) return;
  const rounded = currentMw.toFixed(3);
  el.mwInput.value = rounded;
  el.rnaMwInput.value = rounded;
  el.rnaDilutionMwInput.value = rounded;
  el.proteinMwInput.value = rounded;
  el.proteinDilutionMwInput.value = rounded;
  updateMolarity();
  updateRnaConversion();
  updateProteinConversion();
  updateRnaDilution();
  updateProteinDilution();
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

function applyProteinEntry(entry) {
  const mw = entry.sequence?.molWeight;
  if (!Number.isFinite(mw)) return;

  el.sequenceInput.value = "";
  setActiveMolecule("protein");
  currentMw = mw;
  setMetric(el.mwOutput, mw, 3);
  setMetric(el.lengthOutput, entry.sequence?.length || null, 0);
  el.gcOutput.textContent = "-";
  useMwInCalculators();

  const gene = getGeneName(entry);
  const organism = entry.organism?.scientificName || "unknown organism";
  el.sequenceNote.textContent = `${getProteinDisplayName(entry)}${gene ? ` (${gene})` : ""}, ${organism}, UniProt ${entry.primaryAccession}`;
}

function renderProteinResults(entries) {
  clearChildren(el.proteinSearchResults);

  if (!entries.length) {
    el.proteinSearchStatus.textContent = "No result. Try a different protein name or organism.";
    return;
  }

  el.proteinSearchStatus.textContent = `${entries.length} results found. Select one to use its MW.`;

  entries.forEach((entry) => {
    const mw = entry.sequence?.molWeight;
    if (!Number.isFinite(mw)) return;

    const button = document.createElement("button");
    const text = document.createElement("span");
    const title = document.createElement("strong");
    const meta = document.createElement("small");
    const mwText = document.createElement("span");
    const gene = getGeneName(entry);

    button.type = "button";
    button.className = "search-result";
    title.textContent = getProteinDisplayName(entry);
    meta.textContent = [
      entry.primaryAccession,
      gene || null,
      entry.organism?.scientificName || null,
      entry.sequence?.length ? `${entry.sequence.length} aa` : null,
    ]
      .filter(Boolean)
      .join(" / ");
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
    el.proteinSearchStatus.textContent = "Enter a protein name.";
    return;
  }

  clearChildren(el.proteinSearchResults);
  el.proteinSearchStatus.textContent = "Searching UniProt...";
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
    el.proteinSearchStatus.textContent = "UniProt search failed. Check network access and try again.";
  } finally {
    el.proteinSearchButton.disabled = false;
  }
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
    field.classList.toggle("is-target", field.dataset.solveField === solveFor);
  });
}

function updateMolarity() {
  updateTargetState();

  const mass = toBaseMass();
  const mw = numberValue(el.mwInput);
  const volume = toBaseVolume();
  const concentration = toBaseConcentration();
  let result = null;
  let label = "";
  let detail = "";

  if (solveFor === "concentration" && mass && mw && volume) {
    result = mass / mw / volume;
    const display = result / concentrationFactors[el.concentrationUnit.value];
    label = `${formatNumber(display)} ${unitLabels.concentration[el.concentrationUnit.value]}`;
    detail = `${formatNumber(mass, 6)} g / ${formatNumber(mw, 3)} g/mol / ${formatNumber(volume, 6)} L`;
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
    el.molarityAnswer.textContent = "Fill the required values.";
    return;
  }

  el.molarityAnswer.innerHTML = `${label}<small>${detail}</small>`;
}

function rnaInputToMolar(value, unit, mw, volumeLiters) {
  if (unit === "ngUl") return (value * 1e-3) / mw;
  if (unit === "uM") return value * 1e-6;
  if (unit === "pmol") {
    if (!volumeLiters) return null;
    return (value * 1e-12) / volumeLiters;
  }
  return null;
}

function rnaFromMolar(molar, mw, volumeLiters) {
  return {
    ngUl: molar * mw * 1000,
    uM: molar * 1e6,
    pmol: volumeLiters ? molar * volumeLiters * 1e12 : null,
  };
}

function updateRnaConversion() {
  const inputValue = numberValue(el.rnaConcInput);
  const mw = numberValue(el.rnaMwInput);
  const volume = numberValue(el.rnaVolumeInput);
  const volumeLiters = volume ? volume * volumeFactors[el.rnaVolumeUnit.value] : null;

  if (!inputValue || !mw) {
    setMetric(el.rnaNgUlOutput, null);
    setMetric(el.rnaUMOutput, null);
    setMetric(el.rnaPmolOutput, null);
    el.rnaConversionAnswer.textContent = "Enter RNA concentration and MW.";
    return;
  }

  const molar = rnaInputToMolar(inputValue, el.rnaConcUnit.value, mw, volumeLiters);
  if (!molar) {
    setMetric(el.rnaNgUlOutput, null);
    setMetric(el.rnaUMOutput, null);
    setMetric(el.rnaPmolOutput, inputValue, 4);
    el.rnaConversionAnswer.textContent = "pmol conversion needs a volume.";
    return;
  }

  const result = rnaFromMolar(molar, mw, volumeLiters);
  setMetric(el.rnaNgUlOutput, result.ngUl, 5);
  setMetric(el.rnaUMOutput, result.uM, 5);
  setMetric(el.rnaPmolOutput, result.pmol, 5);
  el.rnaConversionAnswer.innerHTML = `${formatNumber(result.uM, 5)} uM<small>${formatNumber(result.ngUl, 5)} ng/uL${result.pmol === null ? "" : ` / ${formatNumber(result.pmol, 5)} pmol in ${formatNumber(volumeLiters / volumeFactors[el.rnaVolumeUnit.value], 5)} ${el.rnaVolumeUnit.value}`}</small>`;
}

function applyRnaPreset(preset) {
  const length = numberValue(el.rnaLengthInput);
  if (!length) return;
  const factors = { rna: 340, ssdna: 330, dsdna: 660 };
  el.rnaMwInput.value = String(length * factors[preset]);
  el.rnaDilutionMwInput.value = el.rnaMwInput.value;
  updateRnaConversion();
  updateRnaDilution();
}

function proteinInputToMolar(value, unit, mw) {
  if (unit === "mgmL") return value / mw;
  if (unit === "uM") return value * 1e-6;
  return null;
}

function proteinFromMolar(molar, mw) {
  return {
    mgMl: molar * mw,
    uM: molar * 1e6,
  };
}

function updateProteinConversion() {
  const inputValue = numberValue(el.proteinConcInput);
  const mw = numberValue(el.proteinMwInput);

  if (!inputValue || !mw) {
    setMetric(el.proteinMgMlOutput, null);
    setMetric(el.proteinUMOutput, null);
    el.proteinConversionAnswer.textContent = "Enter protein concentration and MW.";
    return;
  }

  const molar = proteinInputToMolar(inputValue, el.proteinConcUnit.value, mw);
  const result = proteinFromMolar(molar, mw);
  setMetric(el.proteinMgMlOutput, result.mgMl, 5);
  setMetric(el.proteinUMOutput, result.uM, 5);
  el.proteinConversionAnswer.innerHTML = `${formatNumber(result.uM, 5)} uM<small>${formatNumber(result.mgMl, 5)} mg/mL at MW ${formatNumber(mw, 3)} g/mol</small>`;
}

function updateFoldDilution() {
  const stock = numberValue(el.foldStockInput);
  const target = numberValue(el.foldTargetInput);
  const finalVolume = numberValue(el.foldFinalVolumeInput);
  const unit = el.foldVolumeUnit.value;

  if (!stock || !target || !finalVolume) {
    el.foldDilutionAnswer.textContent = "Enter final volume.";
    return;
  }

  if (target > stock) {
    el.foldDilutionAnswer.innerHTML = `<span class="is-warning">Target must be lower than stock.</span>`;
    return;
  }

  const stockVolume = (target / stock) * finalVolume;
  const diluent = finalVolume - stockVolume;
  el.foldDilutionAnswer.innerHTML = `${formatNumber(stockVolume, 5)} ${unit} stock<small>add ${formatNumber(diluent, 5)} ${unit} diluent to make ${formatNumber(finalVolume, 5)} ${unit}</small>`;
}

function updateMolarDilution() {
  const stock = numberValue(el.molarStockInput);
  const target = numberValue(el.molarTargetInput);
  const finalVolume = numberValue(el.molarFinalVolumeInput);
  const unit = el.molarVolumeUnit.value;

  if (!stock || !target || !finalVolume) {
    el.molarDilutionAnswer.textContent = "Enter stock, target, and final volume.";
    return;
  }

  const stockBase = stock * bufferConcentrationFactors[el.molarStockUnit.value];
  const targetBase = target * bufferConcentrationFactors[el.molarTargetUnit.value];
  if (targetBase > stockBase) {
    el.molarDilutionAnswer.innerHTML = `<span class="is-warning">Target concentration is higher than stock.</span>`;
    return;
  }

  const stockVolume = (targetBase / stockBase) * finalVolume;
  const diluent = finalVolume - stockVolume;
  el.molarDilutionAnswer.innerHTML = `${formatNumber(stockVolume, 5)} ${unit} stock<small>add ${formatNumber(diluent, 5)} ${unit} diluent. C1V1 = C2V2.</small>`;
}

function targetAmountToMolar(value, unit, mw, finalLiters, converter) {
  if (unit === "pmol") return (value * 1e-12) / finalLiters;
  return converter(value, unit, mw, finalLiters);
}

function updateRnaDilution() {
  const stockValue = numberValue(el.rnaStockInput);
  const targetValue = numberValue(el.rnaTargetInput);
  const mw = numberValue(el.rnaDilutionMwInput);
  const finalVolume = numberValue(el.rnaDilutionVolumeInput);
  const finalLiters = finalVolume ? finalVolume * volumeFactors[el.rnaDilutionVolumeUnit.value] : null;
  const unit = el.rnaDilutionVolumeUnit.value;

  if (!stockValue || !targetValue || !mw || !finalLiters) {
    el.rnaDilutionAnswer.textContent = "Enter RNA stock, target, MW, and final volume.";
    return;
  }

  const stockMolar = rnaInputToMolar(stockValue, el.rnaStockUnit.value, mw, finalLiters);
  const targetMolar = targetAmountToMolar(targetValue, el.rnaTargetUnit.value, mw, finalLiters, rnaInputToMolar);
  if (!stockMolar || !targetMolar) {
    el.rnaDilutionAnswer.textContent = "pmol stock/target calculations need the final volume.";
    return;
  }
  if (targetMolar > stockMolar) {
    el.rnaDilutionAnswer.innerHTML = `<span class="is-warning">Target RNA concentration is higher than stock.</span>`;
    return;
  }

  const stockLiters = (targetMolar / stockMolar) * finalLiters;
  const stockDisplay = stockLiters / volumeFactors[unit];
  const diluentDisplay = finalVolume - stockDisplay;
  const target = rnaFromMolar(targetMolar, mw, finalLiters);
  el.rnaDilutionAnswer.innerHTML = `${formatNumber(stockDisplay, 5)} ${unit} RNA stock<small>add ${formatNumber(diluentDisplay, 5)} ${unit} diluent. Final: ${formatNumber(target.uM, 5)} uM / ${formatNumber(target.ngUl, 5)} ng/uL / ${formatNumber(target.pmol, 5)} pmol.</small>`;
}

function updateProteinDilution() {
  const stockValue = numberValue(el.proteinStockInput);
  const targetValue = numberValue(el.proteinTargetInput);
  const mw = numberValue(el.proteinDilutionMwInput);
  const finalVolume = numberValue(el.proteinDilutionVolumeInput);
  const finalLiters = finalVolume ? finalVolume * volumeFactors[el.proteinDilutionVolumeUnit.value] : null;
  const unit = el.proteinDilutionVolumeUnit.value;

  if (!stockValue || !targetValue || !mw || !finalLiters) {
    el.proteinDilutionAnswer.textContent = "Enter protein stock, target, MW, and final volume.";
    return;
  }

  const stockMolar = proteinInputToMolar(stockValue, el.proteinStockUnit.value, mw);
  const targetMolar = proteinInputToMolar(targetValue, el.proteinTargetUnit.value, mw);
  if (targetMolar > stockMolar) {
    el.proteinDilutionAnswer.innerHTML = `<span class="is-warning">Target protein concentration is higher than stock.</span>`;
    return;
  }

  const stockLiters = (targetMolar / stockMolar) * finalLiters;
  const stockDisplay = stockLiters / volumeFactors[unit];
  const diluentDisplay = finalVolume - stockDisplay;
  const target = proteinFromMolar(targetMolar, mw);
  el.proteinDilutionAnswer.innerHTML = `${formatNumber(stockDisplay, 5)} ${unit} protein stock<small>add ${formatNumber(diluentDisplay, 5)} ${unit} diluent. Final: ${formatNumber(target.uM, 5)} uM / ${formatNumber(target.mgMl, 5)} mg/mL.</small>`;
}

function cloneRecipe(recipe) {
  return JSON.parse(JSON.stringify(recipe));
}

function newBufferDraft() {
  return {
    id: `custom-${Date.now()}`,
    name: "",
    note: "",
    totalVolume: { amount: null, unit: "mL" },
    diluentName: "ddH2O",
    components: [],
  };
}

function recipeIdFromName(name) {
  return `custom-${name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || Date.now()}`;
}

function loadCustomBufferRecipes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_BUFFER_STORAGE_KEY) || "[]");
    customBufferRecipes = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    customBufferRecipes = [];
  }
}

function saveCustomBufferRecipes() {
  localStorage.setItem(CUSTOM_BUFFER_STORAGE_KEY, JSON.stringify(customBufferRecipes));
}

function findBufferRecipe(id) {
  return customBufferRecipes.find((item) => item.id === id) || null;
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

function bufferTotalVolumeLiters(recipe = currentBufferDraft) {
  const amount = recipe?.totalVolume?.amount;
  const unit = recipe?.totalVolume?.unit;
  if (!Number.isFinite(amount) || !volumeFactors[unit]) return null;
  return amount * volumeFactors[unit];
}

function bufferVolumeLabel(liters, preferredUnit = "mL") {
  if (!Number.isFinite(liters)) return "-";
  return `${formatNumber(liters / volumeFactors[preferredUnit], 5)} ${preferredUnit}`;
}

function bufferTotalVolumeLabel(recipe) {
  if (!recipe?.totalVolume || !Number.isFinite(recipe.totalVolume.amount)) return "-";
  return `${formatNumber(recipe.totalVolume.amount, 5)} ${recipe.totalVolume.unit}`;
}

function bufferSolutionVolumeLiters(component, recipe = currentBufferDraft) {
  const totalLiters = bufferTotalVolumeLiters(recipe);
  const stock = component.stockConc * bufferConcentrationFactors[component.stockUnit];
  const target = component.targetConc * bufferConcentrationFactors[component.targetUnit];
  if (!totalLiters || !stock || !target) return null;
  return (target / stock) * totalLiters;
}

function bufferComponentInputLabel(component) {
  if (component.type === "powder") return `${formatNumber(component.amount, 5)} ${component.unit}`;
  return `${formatNumber(component.stockConc, 5)} ${component.stockUnit} stock -> ${formatNumber(component.targetConc, 5)} ${component.targetUnit} final`;
}

function bufferComponentAddLabel(component, recipe = currentBufferDraft) {
  if (component.type === "powder") return `${formatNumber(component.amount, 5)} ${component.unit}`;
  const liters = bufferSolutionVolumeLiters(component, recipe);
  return bufferVolumeLabel(liters, recipe?.totalVolume?.unit || "mL");
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
  const diluentLiters = totalLiters - bufferSolutionVolumeSum(recipe);
  if (diluentLiters < 0) return "solution volume exceeds total";
  return `${bufferVolumeLabel(diluentLiters, recipe.totalVolume.unit)} or q.s. to ${bufferTotalVolumeLabel(recipe)}`;
}

function populateBufferPresets() {
  const selected = el.bufferPresetSelect.value;
  clearChildren(el.bufferPresetSelect);

  if (!customBufferRecipes.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No saved preset";
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

function renderBufferRecipe() {
  const recipe = findBufferRecipe(el.bufferPresetSelect.value);
  clearChildren(el.bufferTableBody);

  if (!recipe) {
    setTableMessage(el.bufferTableBody, 2, "No saved preset.");
    el.bufferNote.textContent = "Create a preset in Edit preset mode.";
    return;
  }

  recipe.components.forEach((component) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const addCell = document.createElement("td");
    nameCell.textContent = component.name;
    addCell.textContent = bufferComponentAddLabel(component, recipe);
    row.append(nameCell, addCell);
    el.bufferTableBody.append(row);
  });

  const row = document.createElement("tr");
  const nameCell = document.createElement("td");
  const addCell = document.createElement("td");
  nameCell.textContent = recipe.diluentName || "Diluent";
  addCell.textContent = bufferDiluentAddLabel(recipe);
  row.append(nameCell, addCell);
  el.bufferTableBody.append(row);

  el.bufferNote.textContent = [bufferTotalVolumeLabel(recipe), recipe.note].filter(Boolean).join(" / ");
}

function renderBufferDraft() {
  if (!currentBufferDraft) return;

  el.bufferPresetNameInput.value = currentBufferDraft.name || "";
  el.bufferTotalVolumeInput.value = currentBufferDraft.totalVolume?.amount || "";
  el.bufferTotalVolumeUnit.value = currentBufferDraft.totalVolume?.unit || "mL";
  el.bufferDiluentNameInput.value = currentBufferDraft.diluentName || "ddH2O";
  el.bufferPresetNoteInput.value = currentBufferDraft.note || "";
  clearChildren(el.bufferComponentTableBody);

  if (!currentBufferDraft.components.length) {
    setTableMessage(el.bufferComponentTableBody, 4, "Add components to save a preset.");
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
    typeCell.textContent = component.type === "powder" ? "Powder" : "Stock solution";
    amountCell.textContent =
      component.type === "solution"
        ? `${bufferComponentAddLabel(component, currentBufferDraft)} (${bufferComponentInputLabel(component)})`
        : bufferComponentInputLabel(component);
    removeButton.type = "button";
    removeButton.className = "secondary-button table-button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      currentBufferDraft.components.splice(index, 1);
      renderBufferDraft();
    });

    actionCell.append(removeButton);
    row.append(nameCell, typeCell, amountCell, actionCell);
    el.bufferComponentTableBody.append(row);
  });
}

function addBufferComponent() {
  if (!currentBufferDraft) currentBufferDraft = newBufferDraft();
  syncBufferDraftMeta();

  const name = el.bufferComponentNameInput.value.trim();
  const type = el.bufferComponentTypeSelect.value;

  if (!name) {
    el.bufferNote.textContent = "Enter a component name.";
    return;
  }

  if (type === "powder") {
    const amount = numberValue(el.bufferPowderAmountInput);
    const unit = el.bufferPowderAmountUnit.value;
    if (!amount) {
      el.bufferNote.textContent = "Enter powder amount.";
      return;
    }
    currentBufferDraft.components.push({ name, type, amount, unit });
    el.bufferPowderAmountInput.value = "";
  } else {
    const stockConc = numberValue(el.bufferStockConcInput);
    const targetConc = numberValue(el.bufferTargetConcInput);
    const stockUnit = el.bufferStockConcUnit.value;
    const targetUnit = el.bufferTargetConcUnit.value;
    const stockBase = stockConc ? stockConc * bufferConcentrationFactors[stockUnit] : null;
    const targetBase = targetConc ? targetConc * bufferConcentrationFactors[targetUnit] : null;

    if (!stockConc || !targetConc) {
      el.bufferNote.textContent = "Enter stock and target concentration.";
      return;
    }
    if (targetBase > stockBase) {
      el.bufferNote.textContent = "Target must be lower than stock.";
      return;
    }
    if (!bufferTotalVolumeLiters()) {
      el.bufferNote.textContent = "Enter total volume first.";
      return;
    }
    currentBufferDraft.components.push({ name, type, stockConc, stockUnit, targetConc, targetUnit });
    el.bufferStockConcInput.value = "";
    el.bufferTargetConcInput.value = "";
  }

  el.bufferComponentNameInput.value = "";
  renderBufferDraft();
}

function saveBufferPreset() {
  if (!currentBufferDraft) return;
  syncBufferDraftMeta();

  if (!currentBufferDraft.name || !currentBufferDraft.totalVolume.amount || !currentBufferDraft.components.length) {
    el.bufferNote.textContent = "Preset name, total volume, and at least one component are required.";
    return;
  }

  if (bufferSolutionVolumeSum(currentBufferDraft) > bufferTotalVolumeLiters(currentBufferDraft)) {
    el.bufferNote.textContent = "Stock solution volume exceeds total volume.";
    return;
  }

  currentBufferDraft.id = recipeIdFromName(currentBufferDraft.name);
  const index = customBufferRecipes.findIndex((recipe) => recipe.id === currentBufferDraft.id);
  if (index >= 0) {
    customBufferRecipes[index] = cloneRecipe(currentBufferDraft);
  } else {
    customBufferRecipes.push(cloneRecipe(currentBufferDraft));
  }

  saveCustomBufferRecipes();
  populateBufferPresets();
  el.bufferPresetSelect.value = currentBufferDraft.id;
  renderBufferRecipe();
  el.bufferNote.textContent = `Saved ${currentBufferDraft.name}.`;
}

function deleteBufferPreset() {
  const selected = el.bufferPresetSelect.value;
  if (!selected) return;
  customBufferRecipes = customBufferRecipes.filter((recipe) => recipe.id !== selected);
  saveCustomBufferRecipes();
  populateBufferPresets();
  currentBufferDraft = newBufferDraft();
  renderBufferDraft();
  renderBufferRecipe();
}

function updateBufferComponentTypeFields() {
  const isPowder = el.bufferComponentTypeSelect.value === "powder";
  el.bufferPowderFields.forEach((field) => {
    field.hidden = !isPowder;
  });
  el.bufferSolutionFields.forEach((field) => {
    field.hidden = isPowder;
  });
}

function cleanDogmaSequence(value) {
  return value.toUpperCase().replace(/[^A-Z]/g, "");
}

function invalidBases(sequence, allowed) {
  return [...new Set([...sequence].filter((base) => !allowed.includes(base)))];
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
    reverseComplement: "Reverse complement",
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
    note = "Input DNA T is replaced with U.";
  }

  if (dogmaMode === "reverseTranscribe") {
    invalid = invalidBases(sequence, "ACGU");
    output = sequence.replaceAll("U", "T");
    note = "Input RNA U is replaced with T.";
  }

  if (dogmaMode === "translate") {
    const rna = sequence.replaceAll("T", "U");
    invalid = invalidBases(rna, "ACGU");
    output = translateRna(rna);
    unit = "aa";
    note = "Standard genetic code, first reading frame.";
  }

  if (dogmaMode === "reverseComplement") {
    invalid = invalidBases(sequence, "ACGTU");
    output = reverseComplement(sequence);
    note = sequence.includes("U") && !sequence.includes("T") ? "RNA reverse complement." : "DNA reverse complement.";
  }

  el.dogmaOutput.value = invalid.length ? "" : output;
  setMetric(el.dogmaInputLengthOutput, sequence.length, 0);
  setMetric(el.dogmaGcOutput, sequence.length && !invalid.length ? gcPercent(sequence) : null, 1);
  setMetric(el.dogmaOutputLengthOutput, invalid.length ? null : output.length, 0);
  el.dogmaOutputUnit.textContent = unit;
  setMetric(el.dogmaFrameOutput, dogmaMode === "translate" ? Math.floor(sequence.length / 3) : null, 0);

  if (invalid.length) {
    el.dogmaNote.innerHTML = `<span class="is-warning">Unsupported characters: ${invalid.join(", ")}</span>`;
  } else {
    el.dogmaNote.textContent = `${dogmaModeLabel(dogmaMode)}. ${note}`;
  }
}

async function copyDogmaOutput() {
  if (!el.dogmaOutput.value) return;
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(el.dogmaOutput.value);
      el.dogmaNote.textContent = "Output copied.";
      return;
    }
  } catch (error) {
    // Fall through to selecting the text.
  }
  el.dogmaOutput.focus();
  el.dogmaOutput.select();
  el.dogmaNote.textContent = "Output selected.";
}

function bindEvents() {
  el.toolTabs.forEach((tab) => tab.addEventListener("click", () => switchTool(tab.dataset.toolTab)));
  el.moleculeButtons.forEach((button) => button.addEventListener("click", () => setActiveMolecule(button.dataset.molecule)));
  el.sequenceInput.addEventListener("input", updateSequence);
  el.clearSequenceButton.addEventListener("click", () => {
    el.sequenceInput.value = "";
    updateSequence();
  });
  el.useMwButton.addEventListener("click", useMwInCalculators);
  el.proteinSearchButton.addEventListener("click", searchProteinByName);
  el.clearProteinSearchButton.addEventListener("click", () => {
    el.proteinSearchInput.value = "";
    clearChildren(el.proteinSearchResults);
    el.proteinSearchStatus.textContent = "Select a result to fill MW fields across v2.";
  });

  el.solveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      solveFor = button.dataset.solveFor;
      setActiveButtons(el.solveButtons, "solveFor", solveFor);
      updateMolarity();
    });
  });
  [el.massInput, el.massUnit, el.mwInput, el.volumeInput, el.volumeUnit, el.concentrationInput, el.concentrationUnit].forEach((node) => {
    node.addEventListener("input", updateMolarity);
    node.addEventListener("change", updateMolarity);
  });

  el.concentrationModeButtons.forEach((button) => {
    button.addEventListener("click", () => switchMode(el.concentrationModeButtons, el.concentrationPanels, "concentrationMode", "concentrationPanel", button.dataset.concentrationMode));
  });
  [el.rnaConcInput, el.rnaConcUnit, el.rnaMwInput, el.rnaVolumeInput, el.rnaVolumeUnit].forEach((node) => {
    node.addEventListener("input", updateRnaConversion);
    node.addEventListener("change", updateRnaConversion);
  });
  el.rnaPresetButtons.forEach((button) => button.addEventListener("click", () => applyRnaPreset(button.dataset.rnaPreset)));
  el.rnaLengthInput.addEventListener("input", updateRnaConversion);
  [el.proteinConcInput, el.proteinConcUnit, el.proteinMwInput].forEach((node) => {
    node.addEventListener("input", updateProteinConversion);
    node.addEventListener("change", updateProteinConversion);
  });

  el.dilutionModeButtons.forEach((button) => {
    button.addEventListener("click", () => switchMode(el.dilutionModeButtons, el.dilutionPanels, "dilutionMode", "dilutionPanel", button.dataset.dilutionMode));
  });
  [el.foldStockInput, el.foldTargetInput, el.foldFinalVolumeInput, el.foldVolumeUnit].forEach((node) => {
    node.addEventListener("input", updateFoldDilution);
    node.addEventListener("change", updateFoldDilution);
  });
  [el.molarStockInput, el.molarStockUnit, el.molarTargetInput, el.molarTargetUnit, el.molarFinalVolumeInput, el.molarVolumeUnit].forEach((node) => {
    node.addEventListener("input", updateMolarDilution);
    node.addEventListener("change", updateMolarDilution);
  });
  [el.rnaStockInput, el.rnaStockUnit, el.rnaTargetInput, el.rnaTargetUnit, el.rnaDilutionMwInput, el.rnaDilutionVolumeInput, el.rnaDilutionVolumeUnit].forEach((node) => {
    node.addEventListener("input", updateRnaDilution);
    node.addEventListener("change", updateRnaDilution);
  });
  [el.proteinStockInput, el.proteinStockUnit, el.proteinTargetInput, el.proteinTargetUnit, el.proteinDilutionMwInput, el.proteinDilutionVolumeInput, el.proteinDilutionVolumeUnit].forEach((node) => {
    node.addEventListener("input", updateProteinDilution);
    node.addEventListener("change", updateProteinDilution);
  });

  el.bufferModeButtons.forEach((button) => {
    button.addEventListener("click", () => switchMode(el.bufferModeButtons, el.bufferPanels, "bufferMode", "bufferPanel", button.dataset.bufferMode));
  });
  el.bufferPresetSelect.addEventListener("change", renderBufferRecipe);
  el.bufferComponentTypeSelect.addEventListener("change", updateBufferComponentTypeFields);
  el.addBufferComponentButton.addEventListener("click", addBufferComponent);
  el.saveBufferPresetButton.addEventListener("click", saveBufferPreset);
  el.deleteBufferPresetButton.addEventListener("click", deleteBufferPreset);

  el.dogmaModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dogmaMode = button.dataset.dogmaMode;
      setActiveButtons(el.dogmaModeButtons, "dogmaMode", dogmaMode);
      updateDogma();
    });
  });
  el.dogmaInput.addEventListener("input", updateDogma);
  el.copyDogmaOutputButton.addEventListener("click", copyDogmaOutput);
  el.clearDogmaButton.addEventListener("click", () => {
    el.dogmaInput.value = "";
    el.dogmaOutput.value = "";
    updateDogma();
  });
}

function init() {
  bindEvents();
  loadCustomBufferRecipes();
  currentBufferDraft = newBufferDraft();
  populateBufferPresets();
  renderBufferRecipe();
  renderBufferDraft();
  updateBufferComponentTypeFields();
  updateSequence();
  updateMolarity();
  updateRnaConversion();
  updateProteinConversion();
  updateFoldDilution();
  updateMolarDilution();
  updateRnaDilution();
  updateProteinDilution();
  updateDogma();
}

init();
