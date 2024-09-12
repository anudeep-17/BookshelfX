export async function ChatGPTSupport({messages}:{messages: {role: string, content: string}[]})
{  
    const response = await fetch('/api/chatGPT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: messages })
    });

    const data = await response.json();
    return data;
}