document.addEventListener("DOMContentLoaded", () => {
    const icon = document.createElement('div');
    icon.id = 'chatbot-icon';
    icon.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background-color: #007bff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        font-size: 24px;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    icon.textContent = "Chat";

    const chatWindow = document.createElement('div');
    chatWindow.id = 'chat-window';
    chatWindow.style = `
        display: none;
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 300px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1001;
    `;

    const chatLog = document.createElement('div');
    chatLog.id = 'chat-log';
    chatLog.style = "height: 200px; overflow-y: auto; margin-bottom: 12px; border: 1px solid #ccc; padding: 8px; border-radius: 4px; background-color: #f9f9f9;";

    const userInputField = document.createElement('input');
    userInputField.type = 'text';
    userInputField.id = 'chat-input';
    userInputField.placeholder = 'Type your requirements here...';
    userInputField.style = "width: 100%; padding: 8px; margin-bottom: 8px; border: 1px solid #ccc; border-radius: 4px;";

    const sendButton = document.createElement('button');
    sendButton.textContent = "Send";
    sendButton.style = `
        background-color: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
    `;

    sendButton.addEventListener('click', async () => {
        const userInput = userInputField.value.trim();
        if (userInput === '') {
            alert('Please enter your requirements.');
            return;
        }

        const userMessage = document.createElement('div');
        userMessage.textContent = `You: ${userInput}`;
        userMessage.style = "margin-bottom: 8px; color: #333;";
        chatLog.appendChild(userMessage);

        userInputField.value = '';

        // Predefined list of products
        const allProducts = [
            { product_name: "Shoes1", id: "uid16", cat: "men" },
            { product_name: "Shoes2", id: "uid17", cat: "men" },
            { product_name: "Shoes3", id: "uid18", cat: "men" }
        ];

        // Search for relevant products based on user's input
        const query = userInput.toLowerCase();
        const relevantProducts = allProducts.filter(product => query.includes('shoes'));

        // If no relevant products found
        if (relevantProducts.length === 0) {
            const noProductsMessage = document.createElement('div');
            noProductsMessage.textContent = "AI: No relevant products found for your request.";
            noProductsMessage.style = "margin-bottom: 8px; color: red;";
            chatLog.appendChild(noProductsMessage);
        } else {
            // Generate the AI's response with product names and links
            relevantProducts.forEach((product) => {
                const productMessage = document.createElement('div');
                const link = document.createElement('a');
                link.href = `http://127.0.0.1:5500/B41_WEB_009_Web-Architects/Product%20Page%20Details/pdp.html?id=${product.id}&category=${product.cat}`;
                link.textContent = `Product: ${product.product_name}`;
                productMessage.appendChild(link);
                productMessage.style = "margin-bottom: 8px; color: #007bff;";
                chatLog.appendChild(productMessage);
            });
        }

        chatLog.scrollTop = chatLog.scrollHeight;
    });

    chatWindow.appendChild(chatLog);
    chatWindow.appendChild(userInputField);
    chatWindow.appendChild(sendButton);

    document.body.appendChild(icon);
    document.body.appendChild(chatWindow);

    icon.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
    });
});
