const defaultList     = document.getElementById('default_bands_selector');
const defaultFilePath = '/assets/'
const input   = document.querySelector('input');
const preview = document.querySelector('.preview');
let bands = [];

input.addEventListener('change', onFileSelected);
defaultList.addEventListener('change', onDefaultSelected);

onDefaultSelected();

function Band (name, f_upper, f_lower) {
    this.name  = name;
    this.upper = f_upper;
    this.lower = f_lower;
}

function loadDefaultFile (url) {
    fetch(url).then(response => {
        if (!response.ok) {
            const err = new Error('Could not get file ' + url);
            err.response = response;
            throw err;
        }
        return response.blob();
    }).then(blobFile => {
        loadBandsFromFile(new File([blobFile], "beans"))
    }).catch(err => {
        console.log(err);
        console.log(err.response);
    });
}

function onFileSelected () {

    const curFiles = input.files;

    if (curFiles.length === 0) {
        return;
    }

    const file = curFiles[0];
    console.log(file);
    loadBandsFromFile(file);
}

function onDefaultSelected () {
    const file = getDefaultFilePath(defaultList.value);
    loadDefaultFile(file);
}

function getDefaultFilePath (name) {
    return defaultFilePath + name + '.csv';
}

function loadBandsFromFile (file) {

    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
        // done loading file
        let content = document.querySelector('.content');

        // returns band objects
        let csvBands = parseCsv(reader.result);

        if (!csvBands || csvBands.length == 0) {
            _debugMsg('Something was wrong with the supplied .csv file!');
            console.log("csv err");
            return;
        }

        _clearDebug();
        displayBandCheckboxes(csvBands);

    }, false);

    reader.readAsText(file);
}

function displayBandCheckboxes (bands) {
    const checkboxContainer = document.getElementById("checkbox_container");
    _clearDiv(checkboxContainer);

    bands.forEach(band => {
        let checkbox = document.createElement("INPUT");
        let label    = document.createElement("LABEL");

        let cb_name = "checkbox_band_" + band.name;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", cb_name);
        checkbox.setAttribute("id",   cb_name);

        label.setAttribute("for", cb_name);
        label.innerHTML = band.name;

        checkboxContainer.append(checkbox);
        checkboxContainer.append(label);
    });
}

// yes, this is very sophisticated
function parseCsv (csvString) {
    const lines = csvString.split('\n');
    let bands = [];

    lines.forEach(line => {
        const data = line.split(',');
        let band = new Band('', -1, -1);

        band.name  = data[0];
        band.lower = parseInt(data[1]);
        band.upper = parseInt(data[2]);

        if (isNaN(band.lower) || isNaN(band.upper)) {
            return;
        }

        bands.push(band);

    });

    return bands;
};

function _displayBands(bands) {
    let str = '';

    console.log(bands);
    bands.forEach(band => {
        str += band.name + ': ' + band.lower + ', ' + band.upper;
    });

    _debugMsg(str);
}

function _clearDiv(div) {
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
