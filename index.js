const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const fileInp = document.querySelector("input");
const infoText = document.querySelector("p");
const closeBtn = document.querySelector(".close");
const copyBtn = document.querySelector(".copy");

// Fecth Data From Api

function fetchRequest(file, formData) {
    infoText.innerText = "A ler este código...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Seleciona o teu Código QR" : "Não foi possível ler o código!";
        if (!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Não foi possível ler o Código QR\nEstá em .png ou .jpg?";
    });
}

// Send QR Code File With Request To Api
fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

// Copy Text To Clipboard
copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

// When user click on form do fileInp Evenetlistener function
form.addEventListener("click", () => fileInp.click());

closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));