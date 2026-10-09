function limparMensagemErro() {
  document.getElementById("mensagem-erro").innerText = "";
}
function mascararCPF(evento) {
  let input = evento.target;
  let valor = input.value.replace(/\D/g, "");
  valor = valor.substring(0, 11);

  if (valor.length > 9) {
    valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
  } else if (valor.length > 6) {
    valor = valor.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
  } else if (valor.length > 3) {
    valor = valor.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
  }

  input.value = valor;
}

const formLogin = document.getElementById("formulario-login");
const formCadastro = document.getElementById("formulario-cadastro");

if (formLogin) {
  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const cpfLogin = document.getElementById("campo-cpf").value;
    const senhaLogin = document.getElementById("campo-senha").value;
    const senhaSalva = localStorage.getItem(cpfLogin);

    if (senhaSalva === null) {
      document.getElementById("mensagem-erro").innerText =
        "Usuário não cadastrado!";
    } else if (senhaLogin === senhaSalva) {
      window.location.href = "estoque.html";
    } else {
      document.getElementById("mensagem-erro").innerText = "Senha incorreta!";
    }
  });

  const campoCpf = document.getElementById("campo-cpf");
  campoCpf.addEventListener("input", limparMensagemErro);
  campoCpf.addEventListener("input", mascararCPF);

  const campoSenha = document.getElementById("campo-senha");
  campoSenha.addEventListener("input", limparMensagemErro);
}

if (formCadastro) {
  formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const tokenMestre = "Minh4Gr@ndeObra";
    const cpfCadastro = document.getElementById("cadastro-cpf").value;
    const senhaCadastro = document.getElementById("cadastro-senha").value;
    const tokenDigitado = document.getElementById("token-mestre").value;

    if (tokenDigitado === tokenMestre) {
      localStorage.setItem(cpfCadastro, senhaCadastro);
      alert("Token Correto! Conta criada com sucesso.");
    } else {
      document.getElementById("mensagem-erro").innerText =
        "Acesso Negado! Token Mestre inválido.";
    }
  });

  const campoCpf = document.getElementById("cadastro-cpf");
  campoCpf.addEventListener("input", limparMensagemErro);
  campoCpf.addEventListener("input", mascararCPF);

  const campoSenha = document.getElementById("cadastro-senha");
  campoSenha.addEventListener("input", limparMensagemErro);

  const campoToken = document.getElementById("token-mestre");
  campoToken.addEventListener("input", limparMensagemErro);
}

const botaoSair = document.getElementById("botao-sair");
if (botaoSair) {
  botaoSair.addEventListener("click", function () {
    alert("Sessão encerrada com segurança. Voltando para a página de login.");
    window.location.href = "index.html";
  });
}

let listaMateriais = JSON.parse(localStorage.getItem("bancoEstoque")) || [];

function salvarNoEstoque() {
  localStorage.setItem("bancoEstoque", JSON.stringify(listaMateriais));
}

const formEstoque = document.getElementById("formulario-estoque");

if (formEstoque) {
  formEstoque.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nomeMaterial = document.getElementById("nome-material").value;
    const qtdMaterial = document.getElementById("qtd-material").value;

    const novaFicha = {
      nome: nomeMaterial,
      quantidade: qtdMaterial,
    };
    listaMateriais.push(novaFicha);
    salvarNoEstoque();
    alert("Material salvo com sucesso no estoque!");
    formEstoque.reset();
  });
}
