const API_URL = "http://localhost:3000/api/messages";
let allMessages = [];

document.addEventListener("DOMContentLoaded", async () => {
    await loadMessages();

    // Buscador en tiempo real
    document.getElementById("searchInput").addEventListener("input", () => {
        const search = document.getElementById("searchInput").value.toLowerCase();
        const filtered = allMessages.filter(msg =>
            msg.name.toLowerCase().includes(search) ||
            msg.email.toLowerCase().includes(search)
        );
        renderMessages(filtered);
    });
});

// Cargar mensajes desde el servidor
async function loadMessages() {
    const response = await fetch(API_URL);
    allMessages = await response.json();
    renderMessages(allMessages);
}

// Dibujar la tabla con los mensajes
function renderMessages(messages) {
    const tbody = document.getElementById("messageTableBody");
    tbody.innerHTML = "";

    messages.forEach((msg, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><input value="${msg.name}" onchange="editField(${index}, 'name', this.value)" /></td>
            <td><input value="${msg.email}" onchange="editField(${index}, 'email', this.value)" /></td>
            <td><input value="${msg.phone}" onchange="editField(${index}, 'phone', this.value)" /></td>
            <td><input value="${msg.projectType}" onchange="editField(${index}, 'projectType', this.value)" /></td>
            <td><textarea onchange="editField(${index}, 'message', this.value)">${msg.message}</textarea></td>
            <td>
                <button class="delete-btn" onclick="deleteMessage(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Editar campo en vivo
async function editField(index, field, value) {
    const response = await fetch(API_URL);
    const messages = await response.json();

    messages[index][field] = value;

    await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messages, null, 2)
    });

    allMessages = messages;
}

// Eliminar mensaje
async function deleteMessage(index) {
    const response = await fetch(API_URL);
    let messages = await response.json();

    messages.splice(index, 1);

    await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messages, null, 2)
    });

    allMessages = messages;
    renderMessages(allMessages);
}
