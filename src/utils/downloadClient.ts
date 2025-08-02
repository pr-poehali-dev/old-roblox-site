// Функция для скачивания клиента Roblox
export const downloadRobloxClient = () => {
  // Создаем фиктивный файл для демонстрации скачивания
  const clientData = generateClientFile();
  
  // Создаем blob с данными клиента
  const blob = new Blob([clientData], { type: 'application/octet-stream' });
  
  // Создаем URL для скачивания
  const url = window.URL.createObjectURL(blob);
  
  // Создаем временную ссылку для скачивания
  const link = document.createElement('a');
  link.href = url;
  link.download = 'RobloxClient2008.exe';
  link.style.display = 'none';
  
  // Добавляем ссылку в DOM, кликаем по ней и удаляем
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Освобождаем память
  window.URL.revokeObjectURL(url);
  
  // Показываем уведомление
  showDownloadNotification();
};

const generateClientFile = (): string => {
  // Генерируем содержимое файла клиента (демо версия)
  const header = `ROBLOX CLIENT 2008 - CLASSIC EDITION
=======================================

Добро пожаловать в классический Roblox 2008!

Системные требования:
- Windows XP/Vista/7 или выше
- 512 МБ оперативной памяти
- DirectX 9.0c
- Интернет соединение

Инструкция по установке:
1. Запустите установочный файл
2. Следуйте инструкциям мастера установки
3. Запустите Roblox и войдите в свой аккаунт
4. Начните играть в любимые игры!

=======================================
© 2008 Roblox Corporation
`;

  // Добавляем случайные данные для имитации реального файла
  const randomData = Array(1000).fill(0).map(() => 
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('');

  return header + '\n\n' + randomData;
};

const showDownloadNotification = () => {
  // Создаем уведомление о начале скачивания
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
  notification.innerHTML = `
    <div class="flex items-center space-x-2">
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      <span>Скачивание клиента Roblox начато!</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Удаляем уведомление через 3 секунды
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
};

export const getClientInfo = () => {
  return {
    version: '2008.1.0',
    size: '45.2 MB',
    platform: 'Windows',
    description: 'Классический клиент Roblox 2008 с оригинальными играми и интерфейсом'
  };
};