class Filmes {
    constructor() {
        this.lista = [];
        this.Eedicao = null;
        this.contadordeclicks = 0;

    }
    lerFilme() {
        let filme = {};
        filme.nome = document.getElementById("inputNomeFilme").value;
        filme.duracao = document.getElementById("inputDuracao").value;
        filme.classificao = document.getElementById("inputClassificacao").value;
        filme.genero = document.getElementById("inputGenero").value;
        filme.sinopse = document.getElementById("inputSinopse").value;
        return filme;
    }
    salvarDados() {
        let filmeJson = localStorage.setItem("Filmes", JSON.stringify(this.lista));
    }
    nomeUsuarioLogado() {
        let nomeUsuario = JSON.parse(localStorage.getItem("Usuario"));
        document.getElementById("nomeUsuarioLogado").innerHTML = "Olá " + nomeUsuario.nome + ", seja bem vindo!";
    }
    lerDados() {

        this.alertaParaEntradaSemLogin();

        //esconder btn login
        document.getElementById("btnSair").classList.add("esconderBtn");

        //Verifica-se tem dados no LocalStorage antes de ler a tabela        
        if (localStorage.getItem('Filmes')) {
            this.lista = JSON.parse(localStorage.getItem("Filmes"));
            this.construirTabela();
        }
        this.nomeUsuarioLogado();
    }
    alertaParaEntradaSemLogin() {
        let usuario = JSON.parse(localStorage.getItem("Usuario"))
        if (usuario == null) {
            alert("OPS! PARECE QUE VOCÊ ESTÁ TENDO ACESSAR UMA PÁGINA SEM FAZER LOGIN." + "\n" + "POR FAVOR FAÇA SEU LOGIN PRIMEIRO!");
            window.location.href = "login.html";
        }

    }

    adicionar() {
        let filme = this.lerFilme();
        this.lista.push(filme);

        if (this.Eedicao == true) {
            let mensagem = window.confirm("Deseja finalizar edição?");
            if (mensagem == true) {
                this.salvarEdicao();
                this.construirTabela();
                this.salvarDados();
                return;
            } else {
                return;
            }
        }
        if (this.Eedicao == null) {

            let erros = "";
            if (filme.nome == "") {
                erros += "Insira o nome do filme!";
            alert(erros);
                
            }else{
            alert("Novo filme cadastrado!");
            this.salvarDados();
            this.construirTabela();
        }
    }

        this.cancelar();
    }
    construirTabela() {
        let tabela = document.querySelector("tbody");
        tabela.innerHTML = "";

        for (let i = 0; i < this.lista.length; i++) {
            let linha = tabela.insertRow();
            let colunaNome = linha.insertCell(0);
            let colunaDuracao = linha.insertCell(1);
            let colunaExcluir = linha.insertCell(2);
            let colunaEditar = linha.insertCell(3)

            colunaNome.innerHTML = this.lista[i].nome;
            colunaDuracao.innerHTML = this.lista[i].duracao + " HR";

            let imgExcluir = document.createElement("img");
            imgExcluir.src = "/home/alessandro/Documentos/CINEMA-HT/img/iconeExcluir.svg";
            imgExcluir.setAttribute("onclick", "filmes.excluir(" + i + ")");

            let imgEditar = document.createElement("img");
            imgEditar.src = "/home/alessandro/Documentos/CINEMA-HT/img/editar.svg";
            imgEditar.setAttribute("onclick", "filmes.editar(" + i + ")");

            colunaExcluir.appendChild(imgExcluir);
            colunaEditar.appendChild(imgEditar);

            this.Eedicao = null;

        }
    }
    excluir(i) {
        let mensagem = window.confirm("Tem certeza que deseja excluir:" + " " + this.lista[i].nome);

        if (mensagem == true) {
            localStorage.removeItem("Filmes");
            this.lista.splice(i, 1);
            this.construirTabela();
        } else {
            return;
        }
    }
    editar(i) {
        this.Eedicao = true;
        document.getElementById("inputNomeFilme").value = this.lista[i].nome;
        document.getElementById("inputDuracao").value = this.lista[i].duracao;
        document.getElementById("inputClassificacao").value = this.lista[i].classificao;
        document.getElementById("inputGenero").value = this.lista[i].genero;
        document.getElementById("inputSinopse").value = this.lista[i].sinopse;
    }
    salvarEdicao(i) {
        this.lista.splice(i, 1);

    }
    cancelar() {
        document.getElementById("inputNomeFilme").value = "";
        document.getElementById("inputDuracao").value = "";
        document.getElementById("inputClassificacao").value = "";
        document.getElementById("inputGenero").value = "";
        document.getElementById("inputSinopse").value = "";
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
        
}
let filmes = new Filmes();

