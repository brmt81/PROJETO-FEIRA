// ==========================================
// ACESSIBILIDADE - TAMANHO DA FONTE
// ==========================================

let tamanhoFonte = 20;

const tamanhoMinimo = 14;
const tamanhoMaximo = 32;
const passo = 2;

const botaoAumentar = document.getElementById("btnAumentaTexto");
const botaoDiminuir = document.getElementById("btnDiminuiTexto");
const botaoVoz = document.getElementById("btnVoz");


// AUMENTAR FONTE
botaoAumentar.addEventListener("click", function () {

    if (tamanhoFonte < tamanhoMaximo) {

        tamanhoFonte += passo;

        document.body.style.fontSize = tamanhoFonte + "px";
    }

});


// DIMINUIR FONTE
botaoDiminuir.addEventListener("click", function () {

    if (tamanhoFonte > tamanhoMinimo) {

        tamanhoFonte -= passo;

        document.body.style.fontSize = tamanhoFonte + "px";
    }

});


// ==========================================
// LEITURA EM VOZ ALTA
// ==========================================

let falando = false;


// Quando clicar no botão
botaoVoz.addEventListener("click", function () {

    // Verifica se o navegador possui o recurso
    if (!("speechSynthesis" in window)) {

        alert(
            "Seu navegador não suporta leitura em voz alta."
        );

        return;
    }


    // Se já estiver falando, para
    if (falando) {

        window.speechSynthesis.cancel();

        falando = false;

        botaoVoz.innerHTML = "🔊 Ler em voz alta";

        return;
    }


    // Pega o conteúdo principal
    const conteudo = document.querySelector("main");


    if (!conteudo) {
        return;
    }


    // Copia apenas o texto da página
    const texto = conteudo.innerText;


    // Cria a fala
    const fala =
        new SpeechSynthesisUtterance(texto);


    // Português do Brasil
    fala.lang = "pt-BR";

    // Velocidade
    fala.rate = 0.9;

    // Tom
    fala.pitch = 1;


    // Quando começar
    fala.onstart = function () {

        falando = true;

        botaoVoz.innerHTML =
            "⏹️ Parar leitura";
    };


    // Quando terminar
    fala.onend = function () {

        falando = false;

        botaoVoz.innerHTML =
            "🔊 Ler em voz alta";
    };


    // Caso aconteça algum erro
    fala.onerror = function () {

        falando = false;

        botaoVoz.innerHTML =
            "🔊 Ler em voz alta";
    };


    // Cancela qualquer leitura anterior
    window.speechSynthesis.cancel();


    // Começa a leitura
    window.speechSynthesis.speak(fala);

});