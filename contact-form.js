document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            projectType: form.projectType.value,
            message: form.message.value
        };

        const response = await fetch("http://localhost:3000/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("Mensaje enviado con éxito.");
            form.reset();
        } else {
            alert("Hubo un error al enviar el mensaje.");
        }
    });
});
