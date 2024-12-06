var firstId = 0;
let lastTimestamp = localStorage.getItem("lastTimestamp") || 0;

function updatePresence(tab) {
    if (!tab || !tab.url) {
        console.warn("updatePresence: La pestaña o URL no está disponible.");
        return;
    }

    var url = new URL(tab.url);

    var data = {
        action: "set",
        url: tab.url,
        details: url.hostname,
        state: tab.title,
        smallText: tab.url,
        largeText: tab.title,
        token: tab.token || ""
    };

    console.log('updatePresence');
    console.log(tab);

    chrome.storage.local.get(['chatId', 'endpoint'], function (result) {
        const chatId = result.chatId;
        const endpoint = result.endpoint || "https://default.endpoint.com/send.php"; // Endpoint por defecto

        if (!chatId) {
            console.warn("No se configuró un chat ID en las opciones.");
            return;
        }

        if (tab.url.includes(chatId)) {
            console.log('Activando observador para Telegram Web');

            async function processNewMessages(messages) {
                for (const message of messages) {
                    try {
                        const timestamp = message.getAttribute("data-timestamp");
                        const content = message.querySelector(".message")?.innerText.trim();
                        const timeDetail = message.querySelector(".time-inner")?.getAttribute("title");

                        if (!timestamp || !content || !timeDetail) {
                            console.warn("Mensaje no válido encontrado.");
                            continue;
                        }

                        if (timestamp > lastTimestamp) {
                            lastTimestamp = timestamp;
                            localStorage.setItem("lastTimestamp", timestamp);

                            console.log("Nuevo mensaje detectado:");
                            console.log(`Timestamp: ${timestamp}`);
                            console.log(`Contenido: ${content}`);
                            console.log(`Hora: ${timeDetail}`);

                            const response = await fetch(endpoint, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ timestamp, content, timeDetail })
                            });

                            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                            console.log("Datos enviados al servidor:", await response.json());
                        }
                    } catch (error) {
                        console.error("Error procesando mensaje:", error);
                    }
                }
            }

            const messageContainer = document.querySelector("body");
            if (!messageContainer) {
                console.error("No se encontró el contenedor de mensajes.");
                return;
            }

            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                        const newMessages = Array.from(mutation.addedNodes).filter(node =>
                            node.matches && node.matches("div[data-timestamp]")
                        );
                        processNewMessages(newMessages);
                    }
                });
            });

            observer.observe(messageContainer, { childList: true, subtree: true });
            console.log("Observador de DOM iniciado para Telegram Web.");
        }
    });
}

var lastCheckedTabId;
function requestActiveTab(callback) {
    chrome.runtime.sendMessage({ action: "getActiveTab" }, function (response) {
        if (response && response.tab) {
            callback(response.tab);
        } else {
            console.warn("No se pudo obtener la pestaña activa.");
        }
    });
}

// Llama a `updatePresence` con la pestaña activa
setInterval(() => {
  try{
    requestActiveTab(tab => {
        if (tab && tab.id !== lastCheckedTabId) {
            lastCheckedTabId = tab.id;
            updatePresence(tab);
        }
    });
  }catch(e){;}
}, 1000);
