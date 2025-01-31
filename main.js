  "use strict"

  const textoSenha = document.getElementById('senhaPronta');
  const erroTamanho = document.getElementById('erroTamanho'); // Elemento de erro
  const tamanhoInput = document.getElementById('tamanhoSenha'); // Campo de input do tamanho da senha
  const botaoCopiar = document.getElementById('copiarSenha'); // Botão de copiar
  const botaoExcluir = document.getElementById('excluirSenha'); // Botão de excluir

  document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('mostrarStatus');

    // Função para obter o status dos checkboxes (sem exibir na tela)
    function obterStatus() {
      const checkboxes = document.querySelectorAll('.checkbox');
      let statusArray = [];

      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          statusArray.push(checkbox.id);  // Vamos armazenar os IDs das opções selecionadas
        }
      });

      return statusArray;  // Retorna as opções selecionadas, sem exibir na tela
    }

  // Função para validar o tamanho da senha (somente números inteiros positivos)
  function validarTamanho(tamanho) {
    // Verifica se o valor é um número inteiro positivo e se não contém caracteres não numéricos
    return /^\d+$/.test(tamanho) && Number(tamanho) > 0;
  }

   // Função para gerar a senha baseada nas opções selecionadas
function gerarSenha() {
  const statusSelecionado = obterStatus();
  const tamanho = tamanhoInput.value.trim();  // Pegando o valor diretamente como string

  // Validação do tamanho da senha
  if (!validarTamanho(tamanho)) {
    erroTamanho.style.display = 'block'; // Exibe a mensagem de erro
    textoSenha.textContent = '';  // Limpa a senha gerada
    botaoCopiar.style.display = 'none'; // Esconde o botão de copiar
    botaoExcluir.style.display = 'none'; // Esconde o botão de excluir
    return;  // Não prossegue com a geração da senha
  }

  erroTamanho.style.display = 'none'; // Oculta a mensagem de erro

  // Começamos com letras minúsculas por padrão
  let senha = 'abcdefghijklmnopqrstuvwxyz';  // Letras minúsculas

  // Se alguma das opções for selecionada, adicionamos os caracteres correspondentes
  if (statusSelecionado.includes('opcao1')) {
    senha += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';  // Letras maiúsculas
  }
  if (statusSelecionado.includes('opcao2')) {
    senha += '!@#$%^&*()_+{}[]|:;<>,.?/~`';  // Caracteres especiais
  }
  if (statusSelecionado.includes('opcao3')) {
    senha += '0123456789';  // Números
  }

  // Agora, você pode gerar a senha aleatoriamente com os caracteres das opções selecionadas
  let senhaGerada = '';
  for (let i = 0; i < tamanho; i++) {  // Usa o tamanho especificado
    const randomIndex = Math.floor(Math.random() * senha.length);
    senhaGerada += senha[randomIndex];
  }

  textoSenha.innerHTML = 'Senha Gerada: <br> ' + senhaGerada;  // Exibe a senha gerada com quebra de linha
  botaoCopiar.style.display = 'block'; // Mostra o botão de copiar
  botaoExcluir.style.display = 'block'; // Mostra o botão de excluir
}

    // Função para copiar a senha para a área de transferência
    function copiarParaAreaDeTransferencia() {
      const senha = textoSenha.textContent.replace('Senha Gerada: ', ''); // Remove o texto "Senha Gerada: "
      
      // Copia a senha para a área de transferência usando o método execCommand (descontinuado) ou Clipboard API moderna
      if (navigator.clipboard) {
        navigator.clipboard.writeText(senha)
          .then(() => {
            alert('Senha copiada para a área de transferência!');
          })
          .catch(err => {
            console.error('Falha ao copiar para a área de transferência', err);
          });
      } else {
        // Caso o navegador não suporte Clipboard API
        const textoArea = document.createElement('textarea');
        textoArea.value = senha;
        document.body.appendChild(textoArea);
        textoArea.select();
        document.execCommand('copy');
        document.body.removeChild(textoArea);
        alert('Senha copiada para a área de transferência!');
      }
    }

    // Função para excluir a senha e reiniciar o site
    function excluirSenha() {
      // Limpa o conteúdo da senha e oculta os botões
      textoSenha.textContent = '';
      erroTamanho.style.display = 'none'; // Esconde mensagem de erro, se houver
      botaoCopiar.style.display = 'none'; // Esconde o botão de copiar
      botaoExcluir.style.display = 'none'; // Esconde o botão de excluir
      tamanhoInput.value = ''; // Limpa o campo de input
      // Também desmarcar os checkboxes, se necessário
      const checkboxes = document.querySelectorAll('.checkbox');
      checkboxes.forEach(checkbox => checkbox.checked = false);
    }

    // Adiciona evento para o botão de gerar a senha
    botao.addEventListener('click', gerarSenha);
    
    // Adiciona evento para o botão de copiar a senha
    botaoCopiar.addEventListener('click', copiarParaAreaDeTransferencia);

    // Adiciona evento para o botão de excluir a senha
    botaoExcluir.addEventListener('click', excluirSenha);

    // Evento para gerar a senha ao pressionar a tecla Enter
    tamanhoInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') { // Verifica se a tecla pressionada foi "Enter"
        event.preventDefault(); // Evita o comportamento padrão de submit do form
        gerarSenha(); // Chama a função de gerar a senha
      }
    });
  });
