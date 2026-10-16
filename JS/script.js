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
      localStorage.setItem("usuarioLogado", cpfLogin);
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

const cpfLogado = localStorage.getItem("usuarioLogado") || "geral";
0;
const nomeDoBancoDestaPessoa = `bancoEstoque_${cpfLogado}`;
let listaMateriais =
  JSON.parse(localStorage.getItem(nomeDoBancoDestaPessoa)) || [];

function salvarNoEstoque() {
  localStorage.setItem(nomeDoBancoDestaPessoa, JSON.stringify(listaMateriais));
}

function carregarDoEstoque() {
  const corpoTabela = document.getElementById("lista-estoque");
  if (!corpoTabela) return;
  corpoTabela.innerHTML = "";
  listaMateriais.forEach(function (material, index) {
    const linha = `
      <tr>
        <td>${material.nome}</td>
        <td>${material.quantidade}</td>
        <td>
          <div class="menu-container">
            <button class="btn-sanduiche" onclick="alternarMenu(${index})">&#9776;</button>
            <div id="dropdown-${index}" class="dropdown-menu">
            <button class="btn-acao btn-adicionar" onclick="adicionarTotal(${index})">Adicionar</button>
            <button class="btn-acao btn-subtrair" onclick="subtrairTotal(${index})">Subtrair</button>
            <button class="btn-acao btn-baixa" onclick="darBaixaItem(${index})">Baixa</button>
            <button class="btn-acao btn-devolver" onclick="devolverItem(${index})">Devolver</button> 
            <button class="btn-acao btn-apagar" onclick="apagarItem(${index})">Apagar</button>
            </div>
          </div>
        </td>
      </tr>
    `;
    corpoTabela.innerHTML += linha;
  });
}

carregarDoEstoque();

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
    carregarDoEstoque();
    alert("Material salvo com sucesso no estoque!");
    formEstoque.reset();
  });
}

function apagarItem(index) {
  listaMateriais.splice(index, 1);
  salvarNoEstoque();
  carregarDoEstoque();
}

function diminuirItem(index) {
  if (listaMateriais[index].quantidade > 0) {
    listaMateriais[index].quantidade--;
    salvarNoEstoque();
    carregarDoEstoque();
  }
}

function alternarMenu(index) {
  const menu = document.getElementById(`dropdown-${index}`);
  if (menu) {
    const botaoClicado = event.currentTarget || document.activeElement;
    const posicaoBotao = botaoClicado.getBoundingClientRect();
    if (window.innerHeight - posicaoBotao.bottom < 200) {
      menu.style.top = "auto";
      menu.style.bottom = "110%";
    } else {
      menu.style.bottom = "auto";
      menu.style.top = "110%";
    }
    menu.classList.toggle("ativo");
  }
}
