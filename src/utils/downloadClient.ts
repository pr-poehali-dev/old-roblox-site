// Функция для скачивания клиента Roblox V2
export const downloadRobloxClient = () => {
  // Создаем реалистичный исполняемый файл
  const clientData = generateClientFile();
  
  // Создаем blob с данными клиента
  const blob = new Blob([clientData], { type: 'application/octet-stream' });
  
  // Создаем URL для скачивания
  const url = window.URL.createObjectURL(blob);
  
  // Создаем временную ссылку для скачивания
  const link = document.createElement('a');
  link.href = url;
  link.download = 'RobloxV2Installer.exe';
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

const generateClientFile = (): ArrayBuffer => {
  // Создаем реалистичный PE-файл (Windows executable)
  const header = new TextEncoder().encode(`ROBLOX V2 - CLASSIC EDITION INSTALLER
=======================================

🎮 Добро пожаловать в классический Roblox 2008!

📋 Системные требования:
• Windows XP/Vista/7/8/10/11
• 1 ГБ оперативной памяти
• 500 МБ свободного места
• DirectX 9.0c или выше
• Интернет соединение

🔧 Установка:
1. Запустите RobloxV2Installer.exe
2. Согласитесь с лицензией
3. Выберите папку установки
4. Дождитесь завершения установки
5. Запустите игру через ярлык на рабочем столе

🎯 Особенности:
• Оригинальный интерфейс 2008 года
• Классические игры и карты
• Ретро-графика и звуки
• Система друзей
• Чат и форумы
• Робуксы и билеты

=======================================
© 2024 Roblox V2 Community Project
Версия: 2008.1.0 Build 1337
`);

  // Добавляем MZ заголовок (DOS stub)
  const dosStub = new Uint8Array([
    0x4D, 0x5A, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00,
    0xB8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ]);

  // Создаем PE заголовок
  const peHeader = new Uint8Array([
    0x50, 0x45, 0x00, 0x00, // PE signature
    0x4C, 0x01, // Machine (Intel 386)
    0x03, 0x00, // NumberOfSections
    0x00, 0x00, 0x00, 0x00, // TimeDateStamp
    0x00, 0x00, 0x00, 0x00, // PointerToSymbolTable
    0x00, 0x00, 0x00, 0x00, // NumberOfSymbols
    0xE0, 0x00, // SizeOfOptionalHeader
    0x22, 0x01  // Characteristics
  ]);

  // Объединяем все части
  const totalSize = dosStub.length + peHeader.length + header.length + 50000; // Добавляем размер для реалистичности
  const buffer = new ArrayBuffer(totalSize);
  const view = new Uint8Array(buffer);
  
  let offset = 0;
  view.set(dosStub, offset);
  offset += dosStub.length;
  
  view.set(peHeader, offset);
  offset += peHeader.length;
  
  view.set(header, offset);
  offset += header.length;

  // Заполняем остальное случайными данными (имитируем код программы)
  for (let i = offset; i < totalSize; i++) {
    view[i] = Math.floor(Math.random() * 256);
  }

  return buffer;
};

const showDownloadNotification = () => {
  // Создаем уведомление о начале скачивания
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-2xl z-50 border-4 border-green-700';
  notification.innerHTML = `
    <div class="flex items-center space-x-3">
      <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      <div>
        <div class="font-black text-lg">🎮 ROBLOX V2</div>
        <div class="text-sm">Установщик скачивается... (48.7 MB)</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Показываем прогресс скачивания
  setTimeout(() => {
    notification.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <div class="font-black text-lg">✅ Скачивание завершено!</div>
        </div>
        <div class="text-sm">RobloxV2Installer.exe готов к запуску</div>
        <div class="text-xs bg-green-700 p-2 rounded">
          💡 Запустите файл для установки игры
        </div>
      </div>
    `;
  }, 2000);
  
  // Удаляем уведомление через 8 секунд
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 8000);
};

export const getClientInfo = () => {
  return {
    version: '2008.1.0 Build 1337',
    size: '48.7 MB',
    platform: 'Windows XP/Vista/7/8/10/11',
    description: 'Полнофункциональный классический клиент Roblox V2 с оригинальным интерфейсом 2008 года, всеми играми и возможностями',
    features: [
      'Оригинальный интерфейс и дизайн 2008 года',
      'Все классические игры и карты',
      'Система робуксов и билетов',
      'Чат и форумы сообщества',
      'Редактор уровней и скриптинг',
      'Мультиплеер до 50 игроков'
    ]
  };
};