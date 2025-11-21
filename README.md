# 🎓 Workshop: Contribuindo com Open Source usando GitHub Copilot @ GambiConf

Bem-vindo(a)! Este repositório foi criado especialmente para o nosso workshop na **GambiConf**. Aqui, vamos aprender na prática como contribuir para um projeto Open Source, utilizando a inteligência artificial do **GitHub Copilot** para nos ajudar.

O projeto é um **Mural de Recados**. Ao final, o seu recado estará publicado junto com o de todos os outros participantes!

---

## 📋 Pré-requisitos

Para participar deste workshop, você só precisa de:

1.  Uma conta no **GitHub**.
2.  Acesso à internet (faremos tudo no navegador!).

*Nota: O GitHub Codespaces já vem com o VS Code, Git e Copilot configurados para você.*

---

## 🚀 Passo a Passo: Sua Primeira Contribuição

Siga este guia detalhado. Se tiver dúvidas, levante a mão! 🙋‍♂️🙋‍♀️

### 1. Fork (Garfo) 🍴

O primeiro passo em muitos projetos Open Source é fazer uma cópia do projeto para a sua conta. Isso se chama **Fork**.

*   Clique no botão **Fork** no canto superior direito desta página.
*   Isso criará uma cópia deste repositório no **seu** GitHub.

### 2. Abrir no Codespaces ☁️

Não vamos instalar nada! Vamos usar um computador na nuvem.

1.  No **seu** fork, clique no botão verde **Code**.
2.  Selecione a aba **Codespaces**.
3.  Clique no botão verde **Create codespace on main**.
4.  Aguarde o ambiente carregar no seu navegador.

### 3. Branch (Ramo) 🌿

Nunca trabalhe diretamente na `main`! Vamos criar uma branch separada para a sua contribuição.

No terminal do Codespaces (parte inferior da tela), digite:

```bash
git checkout -b recado-SEUNOME
```

*(Troque `SEUNOME` pelo seu nome ou apelido)*

### 4. Hora do Código com Copilot 🤖

Agora vem a parte divertida! Vamos adicionar seu recado.

1.  No explorador de arquivos à esquerda, navegue até a pasta `data` e abra o arquivo `messages.json`.
2.  Role até o final do arquivo (dentro dos colchetes `[]`).
3.  **Use o Copilot!**
    *   Posicione o cursor após o último recado (não esqueça da vírgula no item anterior!).
    *   Comece a digitar um comentário para invocar o Copilot ou use o Chat (`Ctrl+I` ou `Cmd+I`):

    > "Adicione um novo objeto JSON com meu nome [Seu Nome], uma mensagem de boas vindas e a data de hoje."

    *   Pressione `Tab` para aceitar a sugestão.

### 5. Testando no Navegador 🧪

Antes de enviar, veja se funcionou!

1.  No terminal, inicie um servidor simples:
    ```bash
    python3 -m http.server
    ```
2.  O Codespaces mostrará um aviso no canto inferior direito: "Your application is running on port 8000".
3.  Clique em **Open in Browser**.
4.  Veja seu recado no mural! 🎉
5.  Para parar o servidor, clique no terminal e pressione `Ctrl+C`.

### 6. Commit e Push upload 📤

Salvando e enviando para o GitHub.

```bash
git add data/messages.json
git commit -m "Adiciona recado de [Seu Nome]"
git push origin recado-SEUNOME
```

### 7. Pull Request (PR) 🔀

O momento da verdade!

1.  Vá até a página do **seu** fork no GitHub.
2.  Você verá um aviso amarelo "Compare & pull request". Clique nele!
3.  Verifique se as mudanças estão corretas.
4.  Escreva um título e descrição para o seu PR.
    *   *Dica:* Use o Copilot na descrição do PR para resumir o que você fez!
5.  Clique em **Create pull request**.

---

## 💡 Dicas de Prompts para o Copilot

Experimente perguntar essas coisas para o Copilot Chat durante o workshop:

*   `@workspace Como esse projeto carrega as mensagens na tela?`
*   `Explique o que o arquivo css/style.css está fazendo com as cores dos cards.`
*   `Como eu posso melhorar a acessibilidade do index.html?`

---

## 🆘 Precisa de ajuda?

Se algo der errado:

1.  Verifique se você colocou a **vírgula** `,` depois do objeto anterior no JSON.
2.  Confira se fechou as chaves `{}` e colchetes `[]` corretamente.
3.  Chame um dos instrutores!

**Bom workshop!** 🚀
