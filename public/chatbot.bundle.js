(function () {
	function createChatbotUI() {
		const chatbotContainer = document.createElement('div');
		chatbotContainer.id = 'chatbot';
		chatbotContainer.style.position = 'fixed';
		chatbotContainer.style.bottom = '20px';
		chatbotContainer.style.right = '20px';
		chatbotContainer.style.width = '350px';
		chatbotContainer.style.maxHeight = '800px';
		chatbotContainer.style.backgroundColor = '#fff';
		chatbotContainer.style.border = '1px solid #ccc';
		chatbotContainer.style.borderRadius = '8px';
		chatbotContainer.style.overflow = 'hidden';
		chatbotContainer.style.zIndex = '100000';
		chatbotContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

		chatbotContainer.innerHTML = `
      <div id="chatbot-header" style="background-color: #1976d2; color: white; padding: 10px; font-size: 16px; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
        <span>チャットボット</span>
        <div id="size-buttons">
          <button id="size-btn-1" style="background-color: #1565c0; color: #fff; border: none; border-radius: 4px; padding: 6px 12px; cursor: pointer;">中</button>
          <button id="size-btn-2" style="background-color: #1565c0; color: #fff; border: none; border-radius: 4px; padding: 6px 12px; cursor: pointer;">大</button>
        </div>
      </div>
      <div id="chatbot-body">
        <div id="chatbot-messages" style="height: 250px; overflow-y: auto; padding: 10px; background-color: #f9f9f9; word-break: break-all;"></div>
        <div id="chatbot-input-container" style="padding: 10px; display: flex; gap: 10px; background-color: #f1f1f1;">
          <input type="text" id="chatbot-input" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="メッセージを入力..." />
          <button id="chatbot-send" style="padding: 8px 16px; background-color: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">送信</button>
        </div>
      </div>
    `;

		document.body.appendChild(chatbotContainer);

		const sizeButtons = document.getElementById('size-buttons');

		const sizes = {
			small: {
				width: '250px',
				height: '50px',
				messagesHeight: '0px',
				next: ['中', '大'],
			},
			medium: {
				width: '350px',
				height: '400px',
				messagesHeight: '250px',
				next: ['小', '大'],
			},
			large: {
				width: '700px',
				height: '750px',
				messagesHeight: '600px',
				next: ['小', '中'],
			},
		};

		let currentSize = 'medium';

		function updateSize(size) {
			currentSize = size;
			chatbotContainer.style.width = sizes[size].width;
			chatbotContainer.style.maxHeight = sizes[size].height;

			const chatbotMessages = document.getElementById('chatbot-messages');
			chatbotMessages.style.height = sizes[size].messagesHeight;

			const chatbotBody = document.getElementById('chatbot-body');
			chatbotBody.style.display = size === 'small' ? 'none' : 'block';

			sizeButtons.innerHTML = '';
			sizes[size].next.forEach((label) => {
				const button = document.createElement('button');
				button.textContent = label;
				button.style.backgroundColor = '#1565c0';
				button.style.color = '#fff';
				button.style.border = 'none';
				button.style.borderRadius = '4px';
				button.style.padding = '6px 12px';
				button.style.cursor = 'pointer';
				button.onclick = () => {
					if (label === '小') updateSize('small');
					if (label === '中') updateSize('medium');
					if (label === '大') updateSize('large');
				};
				sizeButtons.appendChild(button);
			});
		}

		updateSize(currentSize);
	}

	function handleMessage(apiUrl, textModelId, voiceModelId) {
		const inputField = document.getElementById('chatbot-input');
		const messageContainer = document.getElementById('chatbot-messages');
		const sendButton = document.getElementById('chatbot-send');

		sendButton.addEventListener('click', async () => {
			const userMessage = inputField.value.trim();
			if (!userMessage) return;

			// ユーザーのメッセージを表示
			const userMsgDiv = document.createElement('div');
			userMsgDiv.textContent = userMessage;
			userMsgDiv.style.textAlign = 'right';
			userMsgDiv.style.marginBottom = '10px';
			userMsgDiv.style.backgroundColor = '#f1f1f1';
			userMsgDiv.style.padding = '8px';
			userMsgDiv.style.borderRadius = '4px';
			messageContainer.appendChild(userMsgDiv);
			inputField.value = '';

			try {
				const response = await fetch(apiUrl, {
					method: 'POST',
					mode: 'cors',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						message: userMessage,
						textModelId,
						voiceModelId,
					}),
				});

				const data = await response.json();

				if (response.ok) {
					// 正常時のアシスタントのメッセージ表示
					const assistantMsgDiv = document.createElement('div');
					assistantMsgDiv.textContent =
						data.response || 'アシスタントからの応答がありません。';
					assistantMsgDiv.style.textAlign = 'left';
					assistantMsgDiv.style.marginBottom = '10px';
					assistantMsgDiv.style.backgroundColor = '#f1f1f1';
					assistantMsgDiv.style.padding = '8px';
					assistantMsgDiv.style.borderRadius = '4px';
					messageContainer.appendChild(assistantMsgDiv);

					if (data.audioUrl) new Audio(data.audioUrl).play();
				} else {
					// APIエラー時のエラーメッセージ表示
					const errorMsgDiv = document.createElement('div');
					errorMsgDiv.textContent = data.error || 'エラーが発生しました。';
					errorMsgDiv.style.textAlign = 'left';
					errorMsgDiv.style.marginBottom = '10px';
					errorMsgDiv.style.backgroundColor = '#f8d7da';
					errorMsgDiv.style.padding = '8px';
					errorMsgDiv.style.borderRadius = '4px';
					messageContainer.appendChild(errorMsgDiv);
				}
			} catch (err) {
				console.error('送信エラー:', err);
				// ネットワークエラーなどで例外が発生した場合のエラーメッセージ表示
				const errorMsgDiv = document.createElement('div');
				errorMsgDiv.textContent = 'メッセージの送信に失敗しました。';
				errorMsgDiv.style.textAlign = 'left';
				errorMsgDiv.style.marginBottom = '10px';
				errorMsgDiv.style.backgroundColor = '#f8d7da';
				errorMsgDiv.style.padding = '8px';
				errorMsgDiv.style.borderRadius = '4px';
				messageContainer.appendChild(errorMsgDiv);
			}

			// メッセージコンテナを常に最新メッセージが表示されるようにスクロール
			messageContainer.scrollTop = messageContainer.scrollHeight;
		});
	}

	window.initializeChatbot = function (config) {
		const { textModelId, voiceModelId, apiUrl } = config;
		createChatbotUI();
		handleMessage(apiUrl, textModelId, voiceModelId);
	};
})();
