class Cadastro {
    constructor() {
    }

    lerUsuario() {
        let usuario = {}
        usuario.nome = document.getElementById("inputUsuario").value;
        usuario.senha = document.getElementById("inputSenha").value;
        return usuario;
    }
    adicionar() {
        let usuario = this.lerUsuario();
        let senha = document.getElementById("inputSenha").value;
        let confirmeSenha = document.getElementById("inputConfirmeSenha").value;

        if (confirmeSenha === senha) {
            this.salvarDados();
            window.location.href = "login.html";
        } else {
            alert("Senhas não coincidem! Por favor preencha novamente.");
        }
    }
    salvarDados() {
        let usuario = this.lerUsuario();
        localStorage.setItem("Usuario",JSON.stringify(usuario));
        alert("Cadastrado com sucesso!");
    }
}
let cadastro = new Cadastro();