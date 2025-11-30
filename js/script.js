document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages-container');
    const searchInput = document.getElementById('search-input');
    const themeToggle = document.getElementById('theme-toggle');
    const randomBtn = document.getElementById('random-highlight-btn');
    let colorPalette = [];
    let allMessages = [];
    let statsChart = null;

    // ============ DARK MODE ============
    // Inicializa o tema baseado na preferência salva ou preferência do sistema
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

        if (isDark) {
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeIcon(false);
        }
    }

    // Atualiza o ícone do botão
    function updateThemeIcon(isDark) {
        if (themeToggle) {
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
            themeToggle.title = isDark ? 'Light Mode' : 'Dark Mode';
        }
    }

    // Toggle do tema
    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    }

    // Event listener do botão
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Inicializa o tema
    initTheme();

    // Função para extrair cores dominantes de uma imagem
    function extractColorsFromImage(imagePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                const colorMap = {};

                // Amostragem de pixels (a cada 10 pixels para melhor performance)
                for (let i = 0; i < pixels.length; i += 40) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const a = pixels[i + 3];

                    // Ignora pixels transparentes ou muito claros/escuros
                    if (a < 125 || (r > 240 && g > 240 && b > 240) || (r < 15 && g < 15 && b < 15)) {
                        continue;
                    }

                    // Agrupa cores similares (reduz precisão)
                    const rBucket = Math.round(r / 30) * 30;
                    const gBucket = Math.round(g / 30) * 30;
                    const bBucket = Math.round(b / 30) * 30;
                    const colorKey = `${rBucket},${gBucket},${bBucket}`;

                    colorMap[colorKey] = (colorMap[colorKey] || 0) + 1;
                }

                // Ordena por frequência e pega as cores mais comuns
                const sortedColors = Object.entries(colorMap)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([color]) => {
                        const [r, g, b] = color.split(',');
                        return `rgb(${r}, ${g}, ${b})`;
                    });

                resolve(sortedColors);
            };
            img.onerror = reject;
            img.src = imagePath;
        });
    }

    // Função para carregar paleta de cores das imagens
    async function loadColorPalette() {
        const images = ['imgs/logo.png', 'imgs/favicon.png'];
        const allColors = [];

        for (const imagePath of images) {
            try {
                const colors = await extractColorsFromImage(imagePath);
                allColors.push(...colors);
            } catch (error) {
                console.warn(`Não foi possível extrair cores de ${imagePath}:`, error);
            }
        }

        // Remove duplicatas e mantém apenas cores únicas
        colorPalette = [...new Set(allColors)];

        // Se não conseguiu extrair cores, usa cores padrão
        if (colorPalette.length === 0) {
            colorPalette = ['#ff7b72', '#d2a8ff', '#79c0ff', '#ffa657', '#2dba4e', '#6e5494'];
        }

        console.log('Paleta de cores extraída:', colorPalette);
    }

    // Função para carregar as mensagens
    async function loadMessages() {
        try {
            const response = await fetch('data/messages.json');
            if (!response.ok) {
                throw new Error('Não foi possível carregar as mensagens');
            }
            const messages = await response.json();
            allMessages = Array.isArray(messages) ? messages : [];
            renderMessages(allMessages);
            renderStats(allMessages); // Atualiza as estatísticas ao carregar
        } catch (error) {
            console.error('Erro:', error);
            messagesContainer.innerHTML = '<p class="error">Ops! Ocorreu um erro ao carregar os recados.</p>';
        }
    }

    // Função para renderizar as mensagens na tela
    function renderMessages(messages) {
        messagesContainer.innerHTML = ''; // Limpa o container (remove o loading)

        // Inverte a ordem para mostrar os mais recentes primeiro (opcional, dependendo de como o JSON é mantido)
        // Vamos assumir que novos são adicionados no final do array, então invertemos para mostrar no topo
        const reversedMessages = [...messages].reverse();

        reversedMessages.forEach((msg, index) => {
            const card = createMessageCard(msg, index);
            messagesContainer.appendChild(card);
        });
        // Atualiza o gráfico quando a lista exibida muda (por exemplo, pela busca)
        renderStats(messages);
    }

    // ---------- Estatísticas e gráfico ----------
    function aggregateByDate(messages) {
        const counts = {};
        messages.forEach(m => {
            if (!m || !m.date) return;
            // Normaliza para formato YYYY-MM-DD
            try {
                const d = new Date(m.date);
                if (isNaN(d.getTime())) return;
                const key = d.toISOString().slice(0,10);
                counts[key] = (counts[key] || 0) + 1;
            } catch (e) {
                // se falhar, ignora
            }
        });
        return counts;
    }

    function prepareChartData(counts) {
        const entries = Object.entries(counts)
            .sort((a,b) => new Date(a[0]) - new Date(b[0]));
        const labels = entries.map(e => e[0]);
        const data = entries.map(e => e[1]);
        return { labels, data };
    }

    function renderStats(messages) {
        const chartCanvas = document.getElementById('gambiarra-stats-chart');
        const chartTypeSelect = document.getElementById('chart-type-select');
        if (!chartCanvas) return; // nada a fazer

        const counts = aggregateByDate(messages);
        const { labels, data } = prepareChartData(counts);

        // Dataset e cor
        const color = colorPalette.length ? colorPalette[0] : '#ff7b72';

        const ctx = chartCanvas.getContext('2d');

        // Se Chart.js não estiver disponível (ex.: CDN bloqueado), mostra mensagem
        if (typeof Chart === 'undefined') {
            chartCanvas.parentElement.innerHTML = '<p class="error">Gráfico indisponível (Chart.js não carregado)</p>';
            return;
        }

        const requestedType = chartTypeSelect ? chartTypeSelect.value : 'bar';

        if (statsChart) {
            // atualiza dados existentes
            statsChart.config.type = requestedType;
            statsChart.data.labels = labels;
            statsChart.data.datasets[0].data = data;
            statsChart.update();
        } else {
            // se não há dados (labels vazios), desenha um pequeno placeholder no canvas
            if (!labels.length) {
                ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
                ctx.font = '14px Inter, sans-serif';
                ctx.fillStyle = '#666';
                ctx.textAlign = 'center';
                ctx.fillText('Nenhuma gambiarra com data encontrada', chartCanvas.width / 2, chartCanvas.height / 2);
                return;
            }
            statsChart = new Chart(ctx, {
                type: requestedType,
                data: {
                    labels,
                    datasets: [{
                        label: 'Gambiarras por data',
                        data,
                        backgroundColor: color,
                        borderColor: color,
                        borderWidth: 1,
                        fill: requestedType === 'line' ? false : true,
                        tension: 0.2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: { maxRotation: 0, autoSkip: true },
                            grid: { display: false }
                        },
                        y: {
                            beginAtZero: true,
                            precision: 0
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { mode: 'index', intersect: false }
                    }
                }
            });
        }

        // evento para mudar tipo do gráfico
        if (chartTypeSelect) {
            chartTypeSelect.onchange = () => {
                if (!statsChart) return;
                const newType = chartTypeSelect.value;
                statsChart.config.type = newType;
                // Corrige o fill para line/bar
                statsChart.data.datasets.forEach(ds => ds.fill = newType === 'line' ? false : true);
                statsChart.update();
            };
        }
    }

    // Função para copiar texto para a área de transferência
    async function copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            showCopyFeedback(button);
        } catch (error) {
            console.error('Erro ao copiar para a área de transferência:', error);
            handleCopyError(button, error);
        }
    }

    // Função para mostrar feedback visual de sucesso
    function showCopyFeedback(button) {
        const originalText = button.textContent;
        button.textContent = '✓ Copiado!';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }

    // Função para tratar erros de cópia
    function handleCopyError(button, error) {
        const originalText = button.textContent;
        button.textContent = '✗ Erro';
        button.classList.add('copy-error');

        // Fallback: tenta usar execCommand como alternativa
        if (error.name === 'NotAllowedError') {
            console.warn('Clipboard API não disponível, tentando fallback');
            tryFallbackCopy(button);
            return;
        }

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copy-error');
        }, 2000);
    }

    // Função fallback para copiar (para navegadores antigos)
    function tryFallbackCopy(button) {
        const textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);

        textarea.value = button.dataset.textToCopy;
        textarea.select();

        try {
            document.execCommand('copy');
            showCopyFeedback(button);
        } catch (e) {
            console.error('Fallback de cópia também falhou:', e);
        } finally {
            document.body.removeChild(textarea);
        }
    }

    // Função para criar o botão de copiar
    function createCopyButton(messageText) {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = '📋 Copiar';
        button.setAttribute('aria-label', 'Copiar gambiarra para a área de transferência');
        button.dataset.textToCopy = messageText;

        button.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard(messageText, button);
        });

        return button;
    }

    // Função para criar o elemento HTML de um card
    function createMessageCard(msg, index) {
        const card = document.createElement('div');
        card.className = 'message-card';

        // Usa uma cor da paleta extraída das imagens
        const colorIndex = index % colorPalette.length;
        const borderColor = colorPalette[colorIndex];
        card.style.borderTopColor = borderColor;

        const content = document.createElement('p');
        content.className = 'message-content';
        content.textContent = `"${msg.message}"`;

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.appendChild(content);
        cardHeader.appendChild(createCopyButton(msg.message));

        const footer = document.createElement('div');
        footer.className = 'message-author';

        const authorName = document.createElement('span');
        authorName.textContent = `- ${msg.name}`;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'message-date';
        // Formata a data se possível
        try {
            const dateObj = new Date(msg.date);
            dateSpan.textContent = dateObj.toLocaleDateString('pt-BR');
        } catch (e) {
            dateSpan.textContent = msg.date;
        }

        footer.appendChild(authorName);
        footer.appendChild(dateSpan);

        card.appendChild(cardHeader);
        card.appendChild(footer);

        return card;
    }

    // Inicia o carregamento - primeiro carrega a paleta, depois as mensagens
    async function init() {
        await loadColorPalette();
        await loadMessages();
        setupSearch();
        setupRandomHighlight();
    }

    init();

    // Configura busca em tempo real
    function setupSearch() {
        if (!searchInput) return;

        const debounce = (fn, delay = 200) => {
            let t;
            return (...args) => {
                clearTimeout(t);
                t = setTimeout(() => fn(...args), delay);
            };
        };

        const handleSearch = () => {
            const q = (searchInput.value || '').trim().toLowerCase();
            if (!q) {
                renderMessages(allMessages);
                return;
            }

            const filtered = allMessages.filter(m => {
                const msgText = (m.message || '').toLowerCase();
                const author = (m.name || '').toLowerCase();
                const date = (m.date || '').toLowerCase();
                return (
                    msgText.includes(q) ||
                    author.includes(q) ||
                    date.includes(q)
                );
            });

            renderMessages(filtered);
        };

        searchInput.addEventListener('input', debounce(handleSearch, 150));
    }

    // Configura destaque aleatório e scroll
    function setupRandomHighlight() {
        if (!randomBtn) return;

        randomBtn.addEventListener('click', () => {
            const cards = messagesContainer.querySelectorAll('.message-card');
            if (!cards.length) return;

            // Remove destaque anterior
            messagesContainer.querySelectorAll('.message-card.highlight')
                .forEach(el => el.classList.remove('highlight'));

            // Escolhe um card aleatório visível
            const idx = Math.floor(Math.random() * cards.length);
            const chosen = cards[idx];
            chosen.classList.add('highlight');

            // Role suavemente até o card
            chosen.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Breve foco visual (opcional) para acessibilidade
            chosen.setAttribute('tabindex', '-1');
            chosen.focus({ preventScroll: true });
        });
    }
});
