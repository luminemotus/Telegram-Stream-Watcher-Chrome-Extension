document.addEventListener('DOMContentLoaded', () => {
    const chatIdInput = document.getElementById('chatId');
    const endpointInput = document.getElementById('endpoint');
    const saveButton = document.getElementById('saveButton');

    // Cargar valores existentes desde storage
    chrome.storage.local.get(['chatId', 'endpoint'], (data) => {
        if (data.chatId) chatIdInput.value = data.chatId;
        if (data.endpoint) endpointInput.value = data.endpoint;
    });

    // Guardar nuevos valores
    saveButton.addEventListener('click', () => {
        const chatId = chatIdInput.value;
        const endpoint = endpointInput.value;

        chrome.storage.local.set({ chatId, endpoint }, () => {
            alert('Configuración guardada correctamente.');
        });
    });
});
