class Login {
    constructor() {
    }
    lerUsuario() {
        let usuario = {};
        usuario.nome = document.getElementById("inputUsuario").value;
        usuario.senha = document.getElementById("inputSenha").value;
        return usuario;
    }
    ler() {
        let verusu = localStorage.getItem("Usuario");
        if (verusu == null) {
            alert("Ops! Voçê ainda não possui cadastro!");
        } else {
            this.validar();
        }
    }
    validar() {
        let usuario = this.lerUsuario();
        if (usuario.nome == "") {
            alert("Por favor digite seu nome de usuário");
        }
        if (usuario.senha == "") {
            alert("Por favor digite sua senha");
        }
        else{
           this.adicionar();
        }
    }
    adicionar() {
        let usuario = this.lerUsuario();//busca o objeto de cima e joga em uma varivel para poder usar no if

        let usuarioRetornado = JSON.parse(localStorage.getItem("Usuario"));

        if (usuario.nome == usuarioRetornado.nome & usuario.senha == usuarioRetornado.senha) {
            window.location.href = "filmes.html";
        }
        if(usuario.nome != usuarioRetornado.nome) {
            alert("Nome de usuário invalido!");
        }
        else if (usuario.senha != usuarioRetornado.senha) {
            alert("Senha incorreta!");
        }
    }



}
let login = new Login();