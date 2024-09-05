document.addEventListener("DOMContentLoaded", function() {
    // new WOW().init();
    const inputField = document.getElementById("user-input");

    // 监听输入框的键盘按下事件
    inputField.addEventListener('keydown', function(event) {
        // 检查按下的是否是回车键（Enter）
        if (event.key === 'Enter') {
            event.preventDefault(); // 防止默认的换行行为
            sendMessage(); // 调用发送消息的函数
        }
    });
  });


function sendMessage() {
  const inputField = document.getElementById("user-input");
  const chatContainer = document.getElementById("chat-container");
  const userMessage = inputField.value;



  if (userMessage) {
    // Show User Message
    chatContainer.innerHTML += `
            <div class='user-message'>
                <div class='userName'>
                    You
                </div>
                <div class='user-flex-container'>
                    <div class='user-flex-container messageContainer'>
                        <div class='messageText'>
                            ${userMessage}
                        </div>
                    </div>
                    <div class='imageContainer'>
                        <img src="src/user_avator.png" alt="userImage"> 
                    </div>                     
                </div>                  
            </div>
            `;
    // Send it to the server
    fetch("http://127.0.0.1:8000/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Show server response
        chatContainer.innerHTML += `
            <div class='ai-message'>
                <div class='aiName'>
                    Robot
                </div>
                <div class='ai-flex-container'>
                    <div class='aiImageContainer'>
                        <img src="src/ai_avator.png" alt="aiImage"> 
                    </div>    
                    <div class='ai-flex-container aiMessageContainer'>
                        <div class=' messageText'>${data.reply}</div>
                    </div>                 
                </div>                  
            </div>
            `;
                // Scroll to the bottom of the chat container
                chatContainer.scrollTop = chatContainer.scrollHeight;

                
      });

    inputField.value = ""; // clear the input value
  }
}






