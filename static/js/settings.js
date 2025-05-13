function loadSettings() {
    const userSettings = localStorage.getItem('settings');
    const settings = userSettings ? JSON.parse(userSettings) : {};

    const inputs = document.querySelectorAll('input[setting]');

    for (const input of inputs) {
        const inputSetting = input.getAttribute('setting');

        if (settings.hasOwnProperty(inputSetting)) {
            if (input.type === 'checkbox') {
                input.checked = settings[inputSetting];
                console.log(`Checkbox '${inputSetting}' set to: ${input.checked}`);
            } else {
                input.value = settings[inputSetting];
                console.log(`Input '${inputSetting}' set to: ${input.value}`);
            }
        } else {
            if (input.type === 'checkbox') {
                input.checked = input.defaultChecked;
                console.log(`Checkbox '${inputSetting}' defaulted to: ${input.checked}`);
            } else {
                input.value = input.defaultValue;
                console.log(`Input '${inputSetting}' defaulted to: ${input.value}`);
            }
        }
    }

    addToggles();
}

function addToggles() {
    const inputs = document.querySelectorAll('input[setting]');
    const localStorageSettings = JSON.parse(localStorage.getItem('settings')) || {};

    for (const input of inputs) {
        input.addEventListener('input', () => {
            const inputSetting = input.getAttribute('setting');

            if (input.type === 'checkbox') {
                localStorageSettings[inputSetting] = input.checked;
                console.log(`Checkbox '${inputSetting}' updated to: ${input.checked}`);
            } else {
                localStorageSettings[inputSetting] = input.value;
                console.log(`Input '${inputSetting}' updated to: ${input.value}`);
            }

            localStorage.setItem('settings', JSON.stringify(localStorageSettings));
        });
    }
}

document.addEventListener('DOMContentLoaded', loadSettings);