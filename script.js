// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Rotação de frases motivacionais
    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;
    
    function rotateQuotes() {
        quotes.forEach(quote => quote.classList.remove('active'));
        quotes[currentQuote].classList.add('active');
        
        currentQuote = (currentQuote + 1) % quotes.length;
    }
    
    // Inicia a rotação a cada 5 segundos
    setInterval(rotateQuotes, 5000);
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sistema de tópicos riscados
    const topicLinks = document.querySelectorAll('.topic-link');
    
    // Carrega tópicos completos do localStorage
    function loadCompletedTopics() {
        const completed = JSON.parse(localStorage.getItem('completedTopics') || '[]');
        topicLinks.forEach(link => {
            const topic = link.getAttribute('data-topic');
            if (completed.includes(topic)) {
                link.classList.add('completed');
            }
        });
    }
    
    // Salva tópicos completos no localStorage
    function saveCompletedTopic(topic) {
        const completed = JSON.parse(localStorage.getItem('completedTopics') || '[]');
        if (!completed.includes(topic)) {
            completed.push(topic);
            localStorage.setItem('completedTopics', JSON.stringify(completed));
        }
    }
    
    // Adiciona evento de clique aos tópicos
    topicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const topic = this.getAttribute('data-topic');
            const url = this.getAttribute('href');
            
            // Marca como completado
            this.classList.add('completed');
            saveCompletedTopic(topic);
            
            // Abre o link em nova aba após um breve delay
            setTimeout(() => {
                window.open(url, '_blank');
            }, 300);
        });
    });
    
    // Carrega tópicos completos ao iniciar
    loadCompletedTopics();
    
    // Simulação de compra
    document.getElementById('complete-plan').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Aqui você implementaria a integração com o Kirvano
        alert('Você será redirecionado para a página de pagamento do Kirvano. Em um site real, esta funcionalidade estaria ativa.');
        
        // Exemplo de redirecionamento (substitua pela URL real do Kirvano)
        // window.location.href = 'https://kirvano.com/br/checkout/SEU_PRODUTO_AQUI';
    });
    
    // Efeito de digitação no título principal (opcional)
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Inicia o efeito após um pequeno delay
        setTimeout(typeWriter, 1000);
    }
});