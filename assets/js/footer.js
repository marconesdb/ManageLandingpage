// <!-- JavaScript de validação do input do Footer -->


    document.getElementById('submitButton').addEventListener('click', function(event) {
        event.preventDefault();  // Evita o envio padrão do formulário

        const emailInput = document.getElementById('newsletterEmail');
        const errorMessage = document.getElementById('error-message');
        const email = emailInput.value.trim(); // Remove espaços em branco no início e no fim

        console.log("E-mail digitado:", email); // Testa se o valor está sendo capturado

        // Expressão regular para validar o formato do e-mail
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Esconde a mensagem de erro inicialmente
        errorMessage.style.display = 'none';

        // Verifica se o campo está vazio
        if (!email) {
            console.log("Campo de e-mail vazio.");
            errorMessage.textContent = 'Por favor, insira seu e-mail.';
            errorMessage.style.display = 'block';
        }
        // Verifica se o e-mail está em um formato inválido
        else if (!emailPattern.test(email)) {
            console.log("Formato de e-mail inválido.");
            errorMessage.textContent = 'Por favor, insira um e-mail válido.';
            errorMessage.style.display = 'block';
        } 
        // Se o e-mail estiver válido, prossegue
        else {
            console.log('E-mail válido. Preparando para enviar...');
            errorMessage.style.display = 'none';
            // Aqui você pode adicionar a lógica de envio, como form.submit()
        }
    });