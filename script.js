```javascript
// ==========================================
// CONTROLES DE TAMANHO DA FONTE
// ==========================================

let tamanhoFonteAtual = 20;

const passo = 2;

const FONTE_MINIMA = 14;
const FONTE_MAXIMA = 30;


const btnAumentaFonte =
    document.getElementById("btnAumentaTexto");

const btnDiminuiFonte =
    document.getElementById("btnDiminuiTexto");


if (btnAumentaFonte) {

    btnAumentaFonte.addEventListener("click", () => {

        if (tamanhoFonteAtual < FONTE_MAXIMA) {

            tamanhoFonteAtual += passo;

            document.documentElement.style.fontSize =
                `${tamanhoFonteAtual}px`;

        }

    });

}


if (btnDiminuiFonte) {

    btnDiminuiFonte.addEventListener("click", () => {

        if (tamanhoFonteAtual > FONTE_MINIMA) {

            tamanhoFonteAtual -= passo;

            document.documentElement.style.fontSize =
                `${tamanhoFonteAtual}px`;

        }

    });

}


// ==========================================
// LEITURA EM VOZ ALTA
// ==========================================

const btnLeitura =
    document.getElementById("btnVoz");


let lendo = false;


if (btnLeitura) {

    btnLeitura.addEventListener(
        "click",
        alternarLeitura
    );

}


function alternarLeitura() {

    // Verifica se o navegador suporta leitura
    if (!("speechSynthesis" in window)) {

        alert(
            "Seu navegador não possui suporte à leitura em voz alta."
        );

        return;
    }


    // Se estiver lendo, pausa
    if (speechSynthesis.speaking) {

        if (speechSynthesis.paused) {

            speechSynthesis.resume();

            btnLeitura.innerHTML =
                "⏸️ Pausar leitura";

        } else {

            speechSynthesis.pause();

            btnLeitura.innerHTML =
                "▶️ Continuar leitura";

        }

        return;
    }


    const conteudo =
        document.querySelector("main");


    if (!conteudo) {
        return;
    }


    // Obtém somente o texto da página
    const texto =
        conteudo.innerText;


    const fala =
        new SpeechSynthesisUtterance(texto);


    // Português do Brasil
    fala.lang = "pt-BR";


    // Velocidade da leitura
    fala.rate = 0.9;


    // Tom da voz
    fala.pitch = 1;


    fala.onstart = () => {

        lendo = true;

        btnLeitura.innerHTML =
            "⏸️ Pausar leitura";

    };


    fala.onend = finalizarLeitura;


    fala.onerror = finalizarLeitura;


    // Cancela qualquer leitura anterior
    speechSynthesis.cancel();


    // Começa a leitura
    speechSynthesis.speak(fala);

}


// ==========================================
// FINALIZAÇÃO DA LEITURA
// ==========================================

function finalizarLeitura() {

    lendo = false;

    btnLeitura.innerHTML =
        "🔊 Ler em voz alta";

}


// ==========================================
// PARAR LEITURA AO SAIR DA PÁGINA
// ==========================================

window.addEventListener("beforeunload", () => {

    if ("speechSynthesis" in window) {

        speechSynthesis.cancel();

    }

});
```
