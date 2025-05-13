function loadSettings() {

    const userSettings = localStorage.getItem('settings') | false

    if (!userSettings) {
        addToggles();
    }
    
    const inputs = document.querySelectorAll('input[setting]')

    for (const input of inputs) {
        
        const settings = JSON.parse(userSettings);

        const inputSetting = input.getAttribute('setting')

        if (settings[inputSetting]) {
            if (inputSetting.type === 'checkbox') {
                inputSetting.checked = settings[inputSetting]
            }
        } else {
            inputSetting.value = settings[inputSetting]
        }
    }
}

function addToggles() {
    const inputs = document.querySelectorAll('input[setting]')

    const localStorageSettings = JSON.parse(localStorage.getItem('settings')) || {}

    

    for (const input of inputs) {
        
        input.addEventListener('input', () => { 
            console.log(input.value)
            if (input.type === 'checkbox') {
                localStorageSettings[input.getAttribute('setting')] = input.checked
                localStorage.setItem('settings', JSON.stringify(localStorageSettings))
                console.log(localStorageSettings)
            } else {
                localStorageSettings[input.getAttribute('setting')] = input.value
                localStorage.setItem('settings', JSON.stringify(localStorageSettings))
            }
        });

    }
}

document.addEventListener('DOMContentLoaded', loadSettings)