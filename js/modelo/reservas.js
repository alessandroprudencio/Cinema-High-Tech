class Reservas {
    constructor() {
        this.lista = [];
        this.cliente = [];
        this.contadordeclicks = 0;
        this.reservasCadastradas = [];
        this.sessaoeCliente = [];
    }
    buscarDados() {
        this.esconderBtnSair();
            this.nomeUsuarioLogado();
        this.lista = JSON.parse(localStorage.getItem("Sessoes"));

        let select = document.getElementById("selectSessao");
        for (let i = 0; i < this.lista.length; i++) {// JA ESTOU DENTRO DO ARRRAY FILMES , AI ELE ANDA 
            let opcaoSelect = document.createElement("option"); // TEM QUE CRIAR OPCAO SELECT AQUI DENTRO PRA ELE IR PERCORRENDO E SETANDO TODOS DO ARRAY E NAO APENAS UM
            opcaoSelect.innerHTML += this.lista[i].filme + ", " + this.lista[i].data + ", " + this.lista[i].horario + ", " + this.lista[i].dubladoLegendado + ", " + this.lista[i].tresDdoisD;//SELECT SEMPRE VAI RECEBER DO ARRAY FILMES O VALOR DE FILMES TODOS
            opcaoSelect.id = i;
            select.appendChild(opcaoSelect);
        }
        this.cliente = JSON.parse(localStorage.getItem("Clientes"));
        let selectCliente = document.getElementById("selectCliente");
        for (let i = 0; i < this.cliente.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = this.cliente[i].nome;
            option.id = i;
            selectCliente.appendChild(option);
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
    lerCadeiras() {

        let tbody = document.getElementById("tbody");
        tbody.innerHTML = "";

        let id = 0;//vai ser incrementada sempre que entrar no for
        for (let f = 0; f < 6; f++) //f == 0 é o A, f==1 é o b // for das linhas
        {
            let linha = tbody.insertRow();
            //cria variavel que vai representar o nome da fileira
            let nomeFileira = "";
            if (f == 0) {
                nomeFileira = "A";
            }
            else if (f == 1) {
                nomeFileira = "B";
            }
            else if (f == 2) {
                nomeFileira = "C";
            }
            else if (f == 3) {
                nomeFileira = "D";
            }
            else if (f == 4) {
                nomeFileira = "E";
            }
            else {
                nomeFileira = "F";
            }
            for (let c = 0; c <= 10; c++) {// for das cadeiras
                let colunaPoltrona = linha.insertCell(c);
                if (c == 0 && f == 0) {
                    colunaPoltrona.innerText = "A";
                }
                else if (c == 0 && f == 1) {
                    colunaPoltrona.innerText = "B";
                }
                else if (c == 0 && f == 2) {
                    colunaPoltrona.innerText = "C";
                }
                else if (c == 0 && f == 3) {
                    colunaPoltrona.innerText = "D";
                }
                else if (c == 0 && f == 4) {
                    colunaPoltrona.innerText = "E";
                }
                else if (c == 0 && f == 5) {
                    colunaPoltrona.innerText = "F";
                }
                else {
                    id++;//incrementa
                    let img = document.createElement("img");
                    img.src = "img/verde.svg";
                    img.id = id;
                    img.setAttribute("onclick", "reservas.reservar(" + id + ")");
                    colunaPoltrona.appendChild(img);

                }

            }

        }
    }
    reservar(id) {
        let sessaoSelecionada = document.getElementById("selectSessao").selectedIndex; //sessao que o cara seleciono vem com id
        let clienteSelecionado = document.getElementById("selectCliente").selectedIndex;
        for (let i = 0; i < this.lista.length; i++) {
            if (sessaoSelecionada == i) {
                //se o select selecionado for igual i 
                this.lista[i].poltronas[id].ocupado = true;
                localStorage.setItem("Sessoes", JSON.stringify(this.lista));//joga dados novamente local storage com a flag atualizada
            }
            if (clienteSelecionado == i) {
                this.lista[i].poltronas[id].ocupado = true;
                localStorage.setItem("Sessoes", JSON.stringify(this.lista));//joga dados novamente local storage com a flag atualizada
            }
        }
        this.mudarSrcImg();
    }
    mudarSrcImg() {
        this.lerCadeiras();
        let sessaoSelecionada = document.getElementById("selectSessao").selectedIndex;
        let clienteSelecionado = document.getElementById("selectCliente").selectedIndex;
        for (let i = 0; i < 60; i++) {
            if (this.lista[sessaoSelecionada].poltronas[i].ocupado && this.lista[clienteSelecionado].poltronas[i].ocupado) {//se a sessao n posicao i selecionada , .cadeiras nessa posicao ela esta ocupada
                let img = document.getElementById(i);//pega a imagem com a id de nome i pega a imagem com o i
                img.src = "img/vermelha.svg"
            }
        }
    }

    //-----------------------------CRUD TABELA ------------------------------------

    lerSessaoeCliente() {
        let sessaoeCliente = {};
        sessaoeCliente.sessao = document.getElementById("selectSessao").value;
        sessaoeCliente.cliente = document.getElementById("selectCliente").value;
        return sessaoeCliente;
    }
    salvarDados(){
        localStorage.setItem("SessoesEclientes", JSON.stringify(this.sessaoeCliente));
    }
    lerDados(){
        this.sessaoeCliente = JSON.parse(localStorage.getItem("SessoesEclientes"));
    }
    adicionar(){
        let sessaoeCliente = this.lerSessaoeCliente();
        this.sessaoeCliente.push(sessaoeCliente);
        this.salvarDados();
        alert("Nova reserva salva!\n Por motivos de segurança para visualizar a reserva, clique no botão:SessõesClientes");
    }
    construirTabela() {
    
        let tabela = document.getElementById("corpoTabela");
        tabela.innerHTML = "";

        for (let i = 0; i < this.sessaoeCliente.length; i++) {
            let linha = tabela.insertRow();
            let colunaSessao = linha.insertCell(0);
            let colunaCliente = linha.insertCell(1)
            let colunaExcluir = linha.insertCell(2);
            let colunaEditar = linha.insertCell(3);

            let imgExcluir = document.createElement("img");
            imgExcluir.src = "/home/alessandro/Documentos/CINEMA-HT/img/iconeExcluir.svg";
            imgExcluir.setAttribute("onclick", "reservas.excluir(" + i + ")");

            let imgEditar = document.createElement("img");
            imgEditar.src = "/home/alessandro/Documentos/CINEMA-HT/img/editar.svg";
            imgEditar.setAttribute("onclick", "reservas.editar(" + i + ")");

            colunaSessao.innerHTML = this.sessaoeCliente[i].sessao;
            colunaCliente.innerHTML = this.sessaoeCliente[i].cliente;

            colunaEditar.appendChild(imgEditar);
            colunaExcluir.appendChild(imgExcluir);

            this.Eedicao = null
        }

    }
    excluir(i) {
        let mensagem = window.confirm("Tem certeza que deseja excluir:" + " " + this.sessaoeCliente[i].cliente);

        if (mensagem == true) {
            localStorage.removeItem("SessoesEclientes");
            this.sessaoeCliente.splice(i, 1);
            this.construirTabela();
        } else {
            return;
        }
    }
    editar(i) {
        document.getElementById("selectSessao").value = this.sessaoeCliente[i].sessao;
        document.getElementById("selectCliente").value = this.sessaoeCliente[i].cliente;

        this.Eedicao = true;
    }
    salvarEdicao(i) {
        this.lista.splice(i, 1);
    }
    exibirSessoesClientes(){
        this.construirTabela();
        this.lerDados();

    }

}
let reservas = new Reservas();