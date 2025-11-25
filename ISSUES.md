# 🎯 Missões Extra - Para os Apressadinhas

Terminou rápido? Aqui estão algumas ideias de features para você implementar e contribuir! Use o GitHub Copilot para te ajudar. 🚀

---

## 🌙 Issue #1: Dark Mode / Light Mode Toggle

**Dificuldade:** ⭐⭐ Intermediário

**Descrição:**
Adicione um botão para alternar entre modo claro e escuro no mural.

**Dicas:**
- Crie um botão no header (pode ser um ícone de sol/lua ☀️🌙)
- Use `localStorage` para salvar a preferência do usuário
- Crie variáveis CSS para as cores do tema escuro
- Use JavaScript para alternar a classe `dark-mode` no body

**Pergunte ao Copilot:**
> "@workspace Como adicionar um toggle de dark mode que salva a preferência do usuário?"

---

## 🔍 Issue #2: Buscar Gambiarras

**Dificuldade:** ⭐⭐ Intermediário

**Descrição:**
Adicione uma barra de busca para filtrar as gambiarras por nome ou conteúdo.

**Dicas:**
- Coloque um input de busca abaixo do header
- Filtre os cards em tempo real enquanto o usuário digita
- Use `filter()` para buscar no array de mensagens
- Considere buscar tanto no nome quanto na mensagem

**Pergunte ao Copilot:**
> "@workspace Adicione uma funcionalidade de busca que filtra as gambiarras em tempo real"

---

## ❤️ Issue #3: Sistema de "Curtidas"

**Dificuldade:** ⭐⭐⭐ Avançado

**Descrição:**
Adicione um botão de "curtir" em cada card e mostre o contador de curtidas.

**Dicas:**
- Adicione um botão com ❤️ ou 👍 em cada card
- Use `localStorage` para salvar as curtidas (chave: ID da mensagem)
- Adicione um contador ao lado do botão
- Mude o estilo do botão quando já foi curtido

**Pergunte ao Copilot:**
> "@workspace Como adicionar um sistema de curtidas que persiste usando localStorage?"

---

## 🎨 Issue #4: Personalizar Cores dos Cards

**Dificuldade:** ⭐⭐ Intermediário

**Descrição:**
Crie um seletor de cor para cada card, permitindo que os usuários escolham sua cor favorita.

**Dicas:**
- Adicione um `<input type="color">` em cada card
- Salve a cor escolhida no `localStorage` usando o índice do card
- Aplique a cor personalizada quando a página carregar
- Adicione um botão "Resetar cor" para voltar à cor original da paleta

**Pergunte ao Copilot:**
> "@workspace Adicione a funcionalidade de personalizar a cor da borda de cada card"

---

## 📱 Issue #5: Compartilhar no Twitter/X

**Dificuldade:** ⭐ Fácil

**Descrição:**
Adicione um botão em cada card para compartilhar a gambiarra no Twitter/X.

**Dicas:**
- Use a Twitter Web Intent URL: `https://twitter.com/intent/tweet?text=...`
- Monte o texto com a gambiarra e um hashtag #GambiConf
- Adicione um ícone ou emoji 🐦
- Use `encodeURIComponent()` para codificar o texto

**Pergunte ao Copilot:**
> "@workspace Adicione um botão para compartilhar cada gambiarra no Twitter"

---

## 🎲 Issue #6: Gambiarra Aleatória

**Dificuldade:** ⭐ Fácil

**Descrição:**
Adicione um botão "Gambiarra Aleatória" que destaca um card aleatório.

**Dicas:**
- Adicione um botão no header
- Use `Math.random()` para escolher um índice aleatório
- Adicione uma classe especial (exemplo: `highlight`) ao card escolhido
- Use `scrollIntoView()` para rolar até o card
- Adicione uma animação CSS para chamar atenção

**Pergunte ao Copilot:**
> "@workspace Como fazer um botão que destaca e rola até uma gambiarra aleatória?"

---

## 📊 Issue #7: Ordenar Gambiarras

**Dificuldade:** ⭐⭐ Intermediário

**Descrição:**
Adicione opções para ordenar as gambiarras (mais recentes, mais antigas, alfabética por nome).

**Dicas:**
- Crie um `<select>` dropdown no topo da página
- Implemente funções de ordenação com `sort()`
- Re-renderize os cards quando a ordenação mudar
- Salve a preferência no `localStorage`

**Pergunte ao Copilot:**
> "@workspace Adicione um dropdown para ordenar as gambiarras por data ou nome"

---

## 🏷️ Issue #8: Tags/Categorias

**Dificuldade:** ⭐⭐⭐ Avançado

**Descrição:**
Adicione um sistema de tags para categorizar as gambiarras (CSS, JavaScript, Backend, etc).

**Dicas:**
- Modifique a estrutura do `messages.json` para incluir um array `tags`
- Crie badges coloridos para exibir as tags em cada card
- Adicione filtros clicáveis por tag
- Use cores diferentes para cada categoria

**Pergunte ao Copilot:**
> "@workspace Como adicionar um sistema de tags nas gambiarras com filtros?"

---

## 📈 Issue #9: Estatísticas do Mural

**Dificuldade:** ⭐⭐ Intermediário

**Descrição:**
Crie uma seção de estatísticas mostrando: total de gambiarras, contribuidor mais ativo, gambiarra mais longa, etc.

**Dicas:**
- Adicione uma seção antes ou depois do mural
- Use métodos de array como `reduce()`, `map()`, `sort()`
- Mostre dados interessantes de forma visual
- Adicione ícones ou emojis para deixar mais divertido

**Pergunte ao Copilot:**
> "@workspace Crie uma seção de estatísticas sobre as gambiarras do mural"

---

## 🎭 Issue #10: Animações de Entrada

**Dificuldade:** ⭐⭐ Intermediário

**Descrição:**
Adicione animações quando os cards aparecem na tela pela primeira vez.

**Dicas:**
- Use CSS animations ou transitions
- Considere usar Intersection Observer API para animar quando entram no viewport
- Adicione delays diferentes para cada card (efeito cascata)
- Experimente animações como fade-in, slide-up, ou scale

**Pergunte ao Copilot:**
> "@workspace Como adicionar animações de entrada nos cards do mural?"

---

## 🎯 Como Contribuir com Essas Issues

1. Escolha uma issue que te interessa
2. Crie uma branch: `git checkout -b feature/nome-da-feature`
3. Use o Copilot Chat para te ajudar: `@workspace [sua pergunta]`
4. Teste suas mudanças localmente
5. Faça commit e push
6. Abra um Pull Request mencionando a issue

**Dica de Ouro:** Não tenha medo de experimentar! O Copilot está aqui para te ajudar. 🚀

---

**Quer sugerir uma nova issue?** Abra uma issue no repositório com sua ideia! 💡
