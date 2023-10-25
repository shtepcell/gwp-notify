const T_TOKEN = process.env.T_TOKEN

export const sendMessage = async (chat, text) => {
    await fetch(`https://api.telegram.org/bot${T_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chat,
          text: text,
          parse_mode: 'Markdown'
        })
      }).then((res) => {
        if (!res.ok) {
            
            throw new Error(`Error sending message to Telegram: ${res.status} ${res.statusText}`);
        }
      })
    
}