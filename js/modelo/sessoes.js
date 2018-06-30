class Sessoes {
    constructor() {
        this.lista = [];
        this.listaSessao = [];
        this.Eedicao = null;
        this.contadordeclicks = 0;
        this.poltronas = [];
    }
    lerSessao() {
        let sessao = {};
        sessao.filme = document.getElementById("inputFilmeSessao").value;
        sessao.sala = document.getElementById("inputSalaSessao").value;
        sessao.dubladoLegendado = document.getElementById("inputDubladoLegendado").value;
        sessao.tresDdoisD = document.getElementById("input3D2D").value;
        sessao.data = document.getElementById("inputData").value;
        sessao.horario = document.getElementById("inputHorario").value;
        sessao.poltronas = this.poltronas;  
        this.construirPoltronas();
        return sessao;
    }
    lerFilme() {
        //esconder btn login
        document.getElementById("btnSair").classList.add("esconderBtn");

        this.alertaParaEntradaSemLogin();
        this.lerDados();
        this.lista = JSON.parse(localStorage.getItem("Filmes"));  //lista vai recebe o array com a chave Filmes
        if (this.lista == null) {
            this.seNaoHouverFilmeCadastrado();
        }
        this.carregarFilme();

    }
    alertaParaEntradaSemLogin() {
        let usuario = JSON.parse(localStorage.getItem("Usuario"))
        if (usuario == null) {
            alert("OPS! PARECE QUE VOCÊ ESTÁ TENDO ACESSAR UMA PÁGINA SEM FAZER LOGIN." + "\n" + "POR FAVOR FAÇA SEU LOGIN PRIMEIRO!");
            window.location.href = "login.html";
        }

    }

    carregarFilme() {
        let select = document.getElementById("inputFilmeSessao");
        for (let i = 0; i < this.lista.length; i++) {
            let opcaoSelect = document.createElement("option"); 
            opcaoSelect.innerHTML += this.lista[i].nome;

            select.appendChild(opcaoSelect);
        }
    }
    salvarDados() {
        localStorage.setItem("Sessoes", JSON.stringify(this.listaSessao))
    }
    lerDados() {
        if (localStorage.getItem("Sessoes")) {
            this.listaSessao = JSON.parse(localStorage.getItem("Sessoes"));
            this.construirTabela();
        }
        this.nomeUsuarioLogado();
    }
    seNaoHouverFilmeCadastrado() {
        this.lista = JSON.parse(localStorage.getItem("Filmes"));
        document.getElementById("NaoAFilme").innerHTML = "Não a nenhum filme cadastrado!";
    }
    nomeUsuarioLogado() {
        let nomeUsuario = JSON.parse(localStorage.getItem("Usuario"));
        document.getElementById("nomeUsuarioLogado").innerHTML = "Olá " + nomeUsuario.nome + ", seja bem vindo!";
    }
    adicionar() {
        let sessao = this.lerSessao();
        if (this.Eedicao == true) {
            let mensagem = window.confirm("Deseja finalizar edição?");
            if (mensagem == true) {
                this.salvarEdicao();
            } else {
                return;
            }
        }
        if (this.Eedicao == null) {
            alert("Nova sessão cadastrada!")
        }
        this.listaSessao.push(sessao);
        this.construirTabela();
        this.salvarDados();
    }
    construirTabela() {
        let tabela = document.querySelector("tbody");
        tabela.innerHTML = "";

        for (let i = 0; i < this.listaSessao.length; i++) {
            let linha = tabela.insertRow();
            let colunaFilme = linha.insertCell(0);
            let colunaData = linha.insertCell(1);
            let colunaHorario = linha.insertCell(2);
            let colunaDubladoLegendado = linha.insertCell(3);
            let colunaSala = linha.insertCell(4);
            let colunaTresDdoisD = linha.insertCell(5);
            let colunaExcluir = linha.insertCell(6);
            let colunaEditar = linha.insertCell(7);

            colunaFilme.innerHTML = this.listaSessao[i].filme;
            colunaSala.innerHTML = this.listaSessao[i].sala;
            colunaDubladoLegendado.innerHTML = this.listaSessao[i].dubladoLegendado;
            colunaTresDdoisD.innerHTML = this.listaSessao[i].tresDdoisD;
            colunaData.innerHTML = this.listaSessao[i].data;
            colunaHorario.innerHTML = this.listaSessao[i].horario;


            let imgExcluir = new Image();
            imgExcluir.src = "/home/alessandro/Documentos/CINEMA-HT/img/iconeExcluir.svg";
            imgExcluir.setAttribute("onclick", "sessoes.excluir(" + i + ")");

            let imgEditar = new Image();
            imgEditar.src = "/home/alessandro/Documentos/CINEMA-HT/img/editar.svg";
            imgEditar.setAttribute("onclick", "sessoes.editar(" + i + ")");

            colunaExcluir.appendChild(imgExcluir);
            colunaEditar.appendChild(imgEditar);
        }

        this.Eedicao = null;
    }
    excluir(i) {
        let mensagem = window.confirm("Tem certeza que deseja excluir:" + " " + this.listaSessao[i].filme);
        if (mensagem == true) {
            localStorage.removeItem("Sessoes");
            this.listaSessao.splice(i, 1);
            this.construirTabela();
        } else {
            return;
        }
    }
    editar(i) {
        document.getElementById("inputFilmeSessao").value = this.listaSessao[i].filme;
        document.getElementById("inputSalaSessao").value = this.listaSessao[i].sala;
        document.getElementById("inputDubladoLegendado").value = this.listaSessao[i].dubladoLegendado;
        document.getElementById("input3D2D").value = this.listaSessao[i].tresDdoisD;
        document.getElementById("inputData").value = this.listaSessao[i].data;
        document.getElementById("inputHorario").value = this.listaSessao[i].horario;

        this.Eedicao = true;
    }
    salvarEdicao(i) {
        this.listaSessao.splice(i, 1);
    }
    esconderBtnSair() {
        document.getElementById("btnSair").classList.remove("esconderBtn");
        this.contadordeclicks++;

        if (this.contadordeclicks % 2 == 1) {
            document.getElementById("btnSair").classList.add("esconderBtn");
        }
        if (this.contadordeclicks % 2 == 0) {
            document.getElementById("btnSair").classList.remove("esconderBtn");
        }
    }
    sair() {
        location.href = "login.html";
    }

    //reservas as cadeiras e seta flag false
    construirPoltronas() {
        let poltrona = {};
        poltrona.ocupado = false;//livre

        for(let i = 0;i < 60;i++){//cria vetor com 60 posições com a flag false
            this.poltronas.push(poltrona);
        }
    }
}
let sessoes = new Sessoes();