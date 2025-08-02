import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface RobloxInstallerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RobloxInstaller({ open, onOpenChange }: RobloxInstallerProps) {
  const [installStep, setInstallStep] = useState<'download' | 'extract' | 'install' | 'complete'>('download');
  const [progress, setProgress] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);

  const startInstallation = async () => {
    setIsInstalling(true);
    setInstallStep('download');
    setProgress(0);

    // Этап 1: Скачивание
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(i);
    }

    // Этап 2: Извлечение файлов
    setInstallStep('extract');
    setProgress(0);
    for (let i = 0; i <= 100; i += 8) {
      await new Promise(resolve => setTimeout(resolve, 80));
      setProgress(i);
    }

    // Этап 3: Установка
    setInstallStep('install');
    setProgress(0);
    for (let i = 0; i <= 100; i += 6) {
      await new Promise(resolve => setTimeout(resolve, 120));
      setProgress(i);
    }

    // Завершение
    setInstallStep('complete');
    setIsInstalling(false);
    
    toast({
      title: "🎉 Установка завершена!",
      description: "Roblox 2008 успешно установлен на ваш компьютер!"
    });
  };

  const getStepTitle = () => {
    switch (installStep) {
      case 'download': return 'Скачивание файлов...';
      case 'extract': return 'Извлечение архива...';
      case 'install': return 'Установка Roblox...';
      case 'complete': return 'Установка завершена!';
    }
  };

  const getStepDescription = () => {
    switch (installStep) {
      case 'download': return 'Загружаем клиент Roblox 2008 (45.2 МБ)';
      case 'extract': return 'Распаковываем файлы игры...';
      case 'install': return 'Настраиваем Roblox на вашем компьютере...';
      case 'complete': return 'Roblox готов к использованию!';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-4 border-gray-300 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-red-600 text-center flex items-center justify-center">
            <Icon name="Download" className="w-8 h-8 mr-3" />
            УСТАНОВКА ROBLOX
          </DialogTitle>
          <DialogDescription className="text-gray-600 font-bold text-center text-lg">
            Классический клиент Roblox 2008 года
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center p-6 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg border-4 border-cyan-300">
            <div className="w-20 h-20 bg-red-500 border-4 border-red-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
              {installStep === 'complete' ? (
                <Icon name="CheckCircle" size={40} className="text-white" />
              ) : isInstalling ? (
                <Icon name="Loader2" size={40} className="text-white animate-spin" />
              ) : (
                <Icon name="Download" size={40} className="text-white" />
              )}
            </div>
            
            <h3 className="text-xl font-black text-gray-800 mb-2">{getStepTitle()}</h3>
            <p className="text-sm font-bold text-gray-600 mb-4">{getStepDescription()}</p>
            
            {isInstalling && (
              <div className="space-y-3">
                <Progress value={progress} className="w-full h-4" />
                <p className="text-lg font-black text-red-600">
                  {progress}%
                </p>
              </div>
            )}

            {installStep === 'complete' && (
              <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 mt-4">
                <Icon name="CheckCircle" size={24} className="text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-bold">Roblox установлен!</p>
                <p className="text-sm text-green-600 mt-1">
                  Вы можете найти ярлык на рабочем столе
                </p>
              </div>
            )}
          </div>
          
          {!isInstalling && installStep !== 'complete' && (
            <Button 
              className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-lg py-4 border-4 border-red-700 shadow-xl"
              onClick={startInstallation}
            >
              <Icon name="Download" size={20} className="mr-2" />
              НАЧАТЬ УСТАНОВКУ
            </Button>
          )}

          {installStep === 'complete' && (
            <div className="space-y-3">
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-lg py-4 border-4 border-green-700 shadow-xl"
                onClick={() => {
                  toast({
                    title: "🚀 Запуск Roblox",
                    description: "Открывается клиент Roblox..."
                  });
                  onOpenChange(false);
                }}
              >
                <Icon name="Play" size={20} className="mr-2" />
                ЗАПУСТИТЬ ROBLOX
              </Button>
              
              <Button 
                variant="outline"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-black py-3 border-4 border-gray-300"
                onClick={() => onOpenChange(false)}
              >
                ЗАКРЫТЬ
              </Button>
            </div>
          )}
          
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-yellow-600 mt-1" />
              <div>
                <h4 className="font-black text-yellow-800 mb-1">СИСТЕМНЫЕ ТРЕБОВАНИЯ</h4>
                <ul className="text-sm font-bold text-yellow-700 space-y-1">
                  <li>• Windows XP или выше</li>
                  <li>• 512 МБ ОЗУ</li>
                  <li>• DirectX 9.0c</li>
                  <li>• 100 МБ свободного места</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}