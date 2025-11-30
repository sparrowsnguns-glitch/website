// Smooth scroll to quiz
document.getElementById("startQuizBtn").addEventListener("click", () => {
    window.scrollTo({
        top: document.querySelector(".quiz-preview").offsetTop - 40,
        behavior: "smooth",
    });
});

document.getElementById("startQuizBtn2").addEventListener("click", () => {
    window.scrollTo({
        top: document.querySelector(".quiz-preview").offsetTop - 40,
        behavior: "smooth",
    });
});

// WhatsApp booking redirect
document.getElementById("whatsappBtn").addEventListener("click", () => {
    const name = document.getElementById("userName").value.trim();
    const phone = "YOUR_WHATSAPP_NUMBER_HERE"; // <-- Replace

    const message = encodeURIComponent(
        `Hola! Ich möchte gerne eine Maderotherapie-Session buchen. Mein Name: ${name}`
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
});
