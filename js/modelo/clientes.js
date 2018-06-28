class Clientes {
    constructor() {
        this.lista = [];
        this.Eedicao = null;
        this.contadordeclicks = 0;
        this.poltronas= [];
    }
    lerCliente() {
        let cliente = {};
        cliente.nome = document.getElementById("inputCliente").value;
        cliente.idade = document.getElementById("inputIdade").value;
        cliente.email = document.getElementById("inputEmail").value;
        cliente.poltronas = this.poltronas;
        this.construirPoltrona();
        return cliente;
    }
    salvarDados() {
        let cliente = localStorage.setItem("Clientes", JSON.stringify(this.lista));
    }
    lerDados() {
        //esconder btn login
        document.getElementById("btnSair").classList.add("esconderBtn");

        this.nomeUsuarioLogado();

        this.alertaParaEntradaSemLogin();
        //Verifica-se tem dados no LocalStorage antes de ler a tabela
        if (localStorage.getItem('Clientes')) {
            this.lista = JSON.parse(localStorage.getItem("Clientes"));
            this.construirTabela();
        }
    }

    nomeUsuarioLogado() {
        let nomeUsuario = JSON.parse(localStorage.getItem("Usuario"));
        document.getElementById("nomeUsuarioLogado").innerHTML = "Olá " + nomeUsuario.nome + ", seja bem vindo!";
    }
    alertaParaEntradaSemLogin() {
        let usuario = JSON.parse(localStorage.getItem("Usuario"))
        if (usuario == null) {
            alert("OPS! PARECE QUE VOCÊ ESTÁ TENDO ACESSAR UMA PÁGINA SEM FAZER LOGIN." + "\n" + "POR FAVOR FAÇA SEU LOGIN PRIMEIRO!");
            window.location.href = "login.html";
        }

    }

    adicionar() {
        let cliente = this.lerCliente();

        if (this.Eedicao == true) {
            let mensagem = window.confirm("Deseja finalizar edição?");
            if (mensagem == true) {
                this.salvarEdicao();
            } else {
                return;
            }
        }

        if (this.Eedicao == null) {
            alert("Novo cliente cadastrado!")
        }

        this.lista.push(cliente);

        this.construirTabela();

        this.cancelar();
    }
    construirTabela() {
        let tabela = document.querySelector("tbody");
        tabela.innerHTML = "";

        this.salvarDados();

        for (let i = 0; i < this.lista.length; i++) {
            let linha = tabela.insertRow();
            let colunaNome = linha.insertCell(0);
            let colunaIdade = linha.insertCell(1)
            let colunaEmail = linha.insertCell(2);
            let colunaExcluir = linha.insertCell(3);
            let colunaEditar = linha.insertCell(4);

            let imgExcluir = document.createElement("img");
            imgExcluir.src = "/home/alessandro/Documentos/CINEMA-HT/img/iconeExcluir.svg";
            imgExcluir.setAttribute("onclick", "clientes.excluir(" + i + ")");

            let imgEditar = document.createElement("img");
            imgEditar.src = "/home/alessandro/Documentos/CINEMA-HT/img/editar.svg";
            imgEditar.setAttribute("onclick", "clientes.editar(" + i + ")");

            colunaNome.innerHTML = this.lista[i].nome;
            colunaIdade.innerHTML = this.lista[i].idade;
            colunaEmail.innerHTML = this.lista[i].email;

            colunaEditar.appendChild(imgEditar);
            colunaExcluir.appendChild(imgExcluir);

            this.Eedicao = null
        }
    }
    excluir(i) {
        let mensagem = window.confirm("Tem certeza que deseja excluir:" + " " + this.lista[i].nome);

        if (mensagem == true) {
            localStorage.removeItem("Clientes");
            this.lista.splice(i, 1);
            this.construirTabela();
        } else {
            return;
        }
    }
    editar(i) {
        document.getElementById("inputCliente").value = this.lista[i].nome;
        document.getElementById("inputIdade").value = this.lista[i].idade;
        document.getElementById("inputEmail").value = this.lista[i].email;

        this.Eedicao = true;
    }
    cancelar() {
        document.getElementById("inputCliente").value = "";
        document.getElementById("inputIdade").value = "";
        document.getElementById("inputEmail").value = "";
    }
    salvarEdicao(i) {
        this.lista.splice(i, 1);
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
    construirPoltrona(){
        let poltrona = {};
        poltrona.ocupado = false;//livre

        for(let i=0;i<60;i++){
            this.poltronas.push(poltrona);
        }
    }
}//fecha classe 

var clientes = new Clientes();