// CONFIGURAÇÕES DO STUDIO
const NUMERO_WHATSAPP = "5511981063994";
const HORARIOS_DISPONIVEIS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

// Horários já agendados (como se alguem já tivesse agendado)
const agendamentosOcupados = {
    "21/11/2026": ["10:00", "14:00"],
    "25/11/2026": ["09:00", "16:00"]
};

let dataAtual = new Date();
let diaSelecionadoTexto = "";

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// PASSO 1: Captura o clique no botão "Próximo" do formulário
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Impede a página de recarregar

    let nome = document.getElementById("nome").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let servico = document.getElementById("servico").value;

    if (nome === "" || telefone === "" || servico === "") {
        alert("Por favor, preencha seu nome, telefone e escolha um serviço!");
        return;
    }

    // Mostra o calendário abaixo do formulário e rola a tela até ele
    const divCalendario = document.getElementById("calendario");
    divCalendario.style.display = "block";
    divCalendario.scrollIntoView({ behavior: "smooth" });

    renderizarCalendario();
});

// PASSO 2: Desenha o calendário e bloqueia domingos/dias passados
function renderizarCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    document.getElementById("mes-ano").innerText = `${meses[mes]} ${ano}`;

    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();

    const containerDias = document.getElementById("dias-mes");
    containerDias.innerHTML = "";

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    for (let i = 0; i < primeiroDiaSemana; i++) {
        const divVazia = document.createElement("div");
        divVazia.classList.add("dia", "vazio");
        containerDias.appendChild(divVazia);
    }

    for (let dia = 1; dia <= ultimoDiaMes; dia++) {
        const divDia = document.createElement("div");
        divDia.classList.add("dia");
        divDia.innerText = dia;

        const dataDoQuadrado = new Date(ano, mes, dia);
        const diaDaSemana = dataDoQuadrado.getDay(); // 0 = Domingo

        // Bloqueia Domingos (0) e datas anteriores a hoje
        if (diaDaSemana === 0 || dataDoQuadrado < hoje) {
            divDia.classList.add("bloqueado");
        } else {
            divDia.onclick = () => selecionarDia(divDia, dia, mes + 1, ano);
        }

        containerDias.appendChild(divDia);
    }
}

function mudarMes(direcao) {
    dataAtual.setMonth(dataAtual.getMonth() + direcao);
    document.getElementById("horarios").style.display = "none";
    renderizarCalendario();
}

// PASSO 3: Mostra os horários do dia clicado e trava os ocupados
function selecionarDia(elemento, dia, mes, ano) {
    document.querySelectorAll(".dia").forEach(d => d.classList.remove("selecionado"));
    elemento.classList.add("selecionado");

    const diaFormatado = String(dia).padStart(2, '0');
    const mesFormatado = String(mes).padStart(2, '0');
    diaSelecionadoTexto = `${diaFormatado}/${mesFormatado}/${ano}`;

    const areaHorarios = document.getElementById("horarios");
    areaHorarios.style.display = "block";
    document.getElementById("titulo-dia-selecionado").innerText = `Horários para ${diaSelecionadoTexto}:`;

    const listaHorarios = document.getElementById("lista-horarios");
    listaHorarios.innerHTML = "";

    const ocupadosNesteDia = agendamentosOcupados[diaSelecionadoTexto] || [];

    HORARIOS_DISPONIVEIS.forEach(horario => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.classList.add("btn-horario");
        btn.innerText = horario;

        if (ocupadosNesteDia.includes(horario)) {
            btn.disabled = true;
            btn.title = "Horário indisponível";
        } else {
            btn.onclick = () => finalizarAgendamento(horario);
        }

        listaHorarios.appendChild(btn);
    });
}

// PASSO 4: Envia tudo para o WhatsApp da Luiza Arraes
function finalizarAgendamento(horario) {
    let nome = document.getElementById("nome").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let servico = document.getElementById("servico").value;

    const textoWhatsapp = `Olá! Gostaria de agendar um horário na Luiza Arraes Studio:
*Nome:* ${nome}
*Telefone:* ${telefone}
*Serviço:* ${servico}
*Data:* ${diaSelecionadoTexto} às ${horario}`;

    let mensagemCodificada = encodeURIComponent(textoWhatsapp);
    let link = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;

    window.location.href = link;
}
