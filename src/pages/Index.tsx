import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import RobloxLogo from "@/components/ui/roblox-logo";
import { useState, useEffect } from "react";
import { downloadRobloxClient, getClientInfo } from '@/utils/downloadClient';
import RobloxInstaller from '@/components/RobloxInstaller';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showInstaller, setShowInstaller] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [showFriends, setShowFriends] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [showAddFriend, setShowAddFriend] = useState(false);

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const savedUser = localStorage.getItem('roblox_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setCurrentUser(userData);
      
      // Загружаем друзей пользователя
      const savedFriends = localStorage.getItem('roblox_friends');
      if (savedFriends) {
        setFriends(JSON.parse(savedFriends));
      }
    }
  }, []);

  const addFriend = () => {
    if (!newFriendName.trim()) {
      toast({
        title: "❌ Ошибка",
        description: "Введите имя друга!"
      });
      return;
    }

    // Проверяем, не добавлен ли уже этот друг
    if (friends.some(friend => friend.name.toLowerCase() === newFriendName.toLowerCase())) {
      toast({
        title: "❌ Ошибка", 
        description: "Этот игрок уже в списке друзей!"
      });
      return;
    }

    const newFriend = {
      id: Date.now(),
      name: newFriendName,
      online: Math.random() > 0.5 // Случайный статус
    };

    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem('roblox_friends', JSON.stringify(updatedFriends));
    
    // Обновляем счетчик друзей в профиле пользователя
    const userData = {...currentUser, friends: updatedFriends.length};
    setCurrentUser(userData);
    localStorage.setItem('roblox_user', JSON.stringify(userData));

    setNewFriendName('');
    setShowAddFriend(false);
    
    toast({
      title: "✅ Друг добавлен!",
      description: `${newFriendName} теперь в списке друзей`
    });
  };

  const removeFriend = (friendId) => {
    const updatedFriends = friends.filter(friend => friend.id !== friendId);
    setFriends(updatedFriends);
    localStorage.setItem('roblox_friends', JSON.stringify(updatedFriends));
    
    // Обновляем счетчик друзей в профиле пользователя
    const userData = {...currentUser, friends: updatedFriends.length};
    setCurrentUser(userData);
    localStorage.setItem('roblox_user', JSON.stringify(userData));

    toast({
      title: "👋 Друг удален",
      description: "Игрок убран из списка друзей"
    });
  };

  const games = [
    {
      id: 1,
      title: "Sword Fighting Tournament",
      description: "Сражайтесь мечами в эпических битвах!",
      image: "/img/24801938-8d2c-427b-a8dc-57eb39348ada.jpg",
      players: 1247,
      rating: 4.8
    },
    {
      id: 2,
      title: "Build To Survive",
      description: "Стройте укрытия и выживайте!",
      image: "/img/99a99a0f-b1a4-4eed-aa1b-b1149fec4e9d.jpg",
      players: 892,
      rating: 4.6
    },
    {
      id: 3,
      title: "Racing Circuit",
      description: "Гонки на самых крутых трассах!",
      image: "/img/6c482fb9-6f85-40d2-9f02-9f70414e779b.jpg",
      players: 2156,
      rating: 4.9
    },
    {
      id: 4,
      title: "Zombie Apocalypse",
      description: "Сражайтесь с ордами зомби!",
      image: "/img/be21c174-3cb0-4606-aa36-87533390f20d.jpg",
      players: 3241,
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 to-blue-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 p-4 shadow-lg border-b-4 border-red-700">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <RobloxLogo size={48} className="hover:scale-110 transition-transform duration-300" />
            <h1 className="text-3xl font-black text-white tracking-wider drop-shadow-lg" 
                style={{
                  textShadow: '3px 3px 0px #8B0000, -1px -1px 0px #8B0000, 1px -1px 0px #8B0000, -1px 1px 0px #8B0000'
                }}>
              ROBLOX V2
            </h1>
          </div>
          <nav className="flex space-x-4">
            <Button 
              className="bg-yellow-400 hover:bg-yellow-500 text-red-600 font-bold border-4 border-yellow-600 shadow-lg px-6 py-2"
              onClick={() => window.location.href = '/auth'}
            >
              <Icon name="LogIn" size={20} className="mr-2" />
              ВОЙТИ
            </Button>
            <Button 
              className="bg-green-400 hover:bg-green-500 text-white font-bold border-4 border-green-600 shadow-lg px-6 py-2"
              onClick={() => downloadRobloxClient()}
            >
              <Icon name="Download" size={20} className="mr-2" />
              СКАЧАТЬ КЛИЕНТ
            </Button>
            <Dialog open={showFriends} onOpenChange={setShowFriends}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white hover:bg-gray-100 text-red-600 font-bold border-4 border-gray-400 shadow-lg px-6 py-2">
                  <Icon name="Users" size={20} className="mr-2" />
                  ДРУЗЬЯ
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-4 border-gray-300">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-red-600">МОИ ДРУЗЬЯ</DialogTitle>
                  <DialogDescription className="text-gray-600 font-bold">
                    Список ваших друзей в Roblox
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg border-2 border-red-700 flex items-center justify-center">
                          <Icon name="User" size={20} className="text-white" />
                        </div>
                        <span className="font-bold text-gray-800">{friend.name}</span>
                      </div>
                      <Badge variant={friend.online ? "default" : "secondary"} className="font-bold">
                        {friend.online ? "🟢 Онлайн" : "⚫ Офлайн"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-2xl border-4 border-gray-300 mb-12">
            <h2 className="text-5xl font-black text-red-600 mb-4 tracking-wide" 
                style={{
                  textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'
                }}>
              ДОБРО ПОЖАЛОВАТЬ В ROBLOX!
            </h2>
            <p className="text-xl text-gray-700 mb-8 font-bold">
              Исследуйте миры, созданные игроками. Стройте, играйте, общайтесь!
            </p>
            <div className="flex justify-center space-x-6">
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white font-black text-xl px-8 py-4 border-4 border-red-700 shadow-xl"
                onClick={() => window.location.href = '/auth'}
              >
                <Icon name="LogIn" size={24} className="mr-3" />
                ВОЙТИ В ИГРУ
              </Button>
              <Button 
                className="bg-cyan-400 hover:bg-cyan-500 text-white font-black text-xl px-8 py-4 border-4 border-cyan-600 shadow-xl"
                onClick={() => setShowInstaller(true)}
              >
                <Icon name="Download" size={24} className="mr-3" />
                СКАЧАТЬ КЛИЕНТ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section id="games-section" className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black text-white mb-4 tracking-wide"
                style={{
                  textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'
                }}>
              ПОПУЛЯРНЫЕ ИГРЫ
            </h3>
            <div className="bg-yellow-400 h-2 w-32 mx-auto rounded-full border-2 border-yellow-600"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="bg-white border-4 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg border-4 border-cyan-600 overflow-hidden mb-4">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg font-black text-gray-800 text-center">
                    {game.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-gray-600 font-bold mb-4 text-center">
                    {game.description}
                  </CardDescription>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={16} className="text-cyan-600" />
                      <span className="text-sm font-bold text-gray-700">{game.players}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-bold text-gray-700">{game.rating}</span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-black border-4 border-red-700 shadow-lg">
                        <Icon name="Play" size={16} className="mr-2" />
                        ИГРАТЬ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white border-4 border-gray-300 max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-black text-red-600 text-center">
                          {game.title}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 font-bold text-center text-lg">
                          {game.description}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        <div className="aspect-video bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg border-4 border-cyan-600 overflow-hidden">
                          <img 
                            src={game.image} 
                            alt={game.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-300">
                            <Icon name="Users" size={24} className="text-cyan-600 mx-auto mb-2" />
                            <div className="text-2xl font-black text-gray-800">{game.players}</div>
                            <div className="text-sm font-bold text-gray-600">Игроков онлайн</div>
                          </div>
                          <div className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-300">
                            <Icon name="Star" size={24} className="text-yellow-500 mx-auto mb-2 fill-current" />
                            <div className="text-2xl font-black text-gray-800">{game.rating}</div>
                            <div className="text-sm font-bold text-gray-600">Рейтинг</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-4">
                          <Button 
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black text-xl py-4 border-4 border-red-700 shadow-xl"
                            onClick={() => {
                              setShowDownload(true);
                              setDownloadProgress(0);
                              
                              const interval = setInterval(() => {
                                setDownloadProgress(prev => {
                                  if (prev >= 100) {
                                    clearInterval(interval);
                                    return 100;
                                  }
                                  return prev + Math.random() * 15;
                                });
                              }, 200);
                            }}
                            disabled={isPlaying}
                          >
                            {isPlaying ? (
                              <>
                                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                                ЗАГРУЗКА...
                              </>
                            ) : (
                              <>
                                <Icon name="Play" size={20} className="mr-2" />
                                ИГРАТЬ СЕЙЧАС
                              </>
                            )}
                          </Button>
                          <Button 
                            variant="outline" 
                            className="bg-yellow-400 hover:bg-yellow-500 text-red-600 font-black py-4 border-4 border-yellow-600"
                            onClick={() => {
                              toast({
                                title: "⭐ Добавлено в избранное!",
                                description: `${game.title} сохранена в ваших любимых играх`
                              });
                            }}
                          >
                            <Icon name="Heart" size={20} />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-400 to-orange-400 border-t-8 border-yellow-600">
        <div className="container mx-auto">
          <h3 className="text-4xl font-black text-white text-center mb-12 tracking-wide"
              style={{
                textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'
              }}>
            ВОЗМОЖНОСТИ ROBLOX
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg border-4 border-gray-300 shadow-2xl text-center">
              <div className="w-20 h-20 bg-red-500 border-4 border-red-700 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <Icon name="Gamepad2" size={40} className="text-white" />
              </div>
              <h4 className="text-2xl font-black text-gray-800 mb-4">ИГРАЙ</h4>
              <p className="text-gray-700 font-bold">
                Миллионы игр созданных сообществом. Найди свою любимую!
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg border-4 border-gray-300 shadow-2xl text-center">
              <div className="w-20 h-20 bg-cyan-400 border-4 border-cyan-600 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <Icon name="Wrench" size={40} className="text-white" />
              </div>
              <h4 className="text-2xl font-black text-gray-800 mb-4">СОЗДАВАЙ</h4>
              <p className="text-gray-700 font-bold">
                Используй Roblox Studio для создания собственных миров!
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg border-4 border-gray-300 shadow-2xl text-center">
              <div className="w-20 h-20 bg-yellow-400 border-4 border-yellow-600 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <Icon name="Users" size={40} className="text-red-600" />
              </div>
              <h4 className="text-2xl font-black text-gray-800 mb-4">ОБЩАЙСЯ</h4>
              <p className="text-gray-700 font-bold">
                Встречай друзей и играй вместе в безопасной среде!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-600 to-red-700 p-8 border-t-8 border-red-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <RobloxLogo size={64} className="hover:scale-110 transition-transform duration-300" />
            <h2 className="text-2xl font-black text-white tracking-wider">OLD ROBLOX</h2>
          </div>
          
          <div className="flex justify-center space-x-8 mb-6">
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 font-bold"
              onClick={() => toast({ title: "📖 О нас", description: "Old Roblox - ностальгический портал игр 2006-2008 годов!" })}
            >
              О нас
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 font-bold"
              onClick={() => toast({ title: "❓ Помощь", description: "Нужна помощь? Напишите нам в поддержку!" })}
            >
              Помощь
            </Button>
            {isLoggedIn && (
              <Button 
                variant="ghost" 
                className="text-white hover:text-yellow-400 font-bold"
                onClick={() => setShowFriends(true)}
              >
                <Icon name="Users" size={16} className="mr-2" />
                Друзья ({friends.length})
              </Button>
            )}
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 font-bold"
              onClick={() => toast({ title: "📧 Контакты", description: "Email: support@oldroblox.games" })}
            >
              Контакты
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 font-bold"
              onClick={() => toast({ title: "📋 Правила", description: "Соблюдайте правила честной игры и уважайте других игроков!" })}
            >
              Правила
            </Button>
          </div>

          <p className="text-white/80 font-bold">
            © 2008 Old Roblox Games. Все права защищены.
          </p>
        </div>
      </footer>

      {/* Download Modal */}
      <Dialog open={showDownload} onOpenChange={setShowDownload}>
        <DialogContent className="bg-white border-4 border-gray-300 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-red-600 text-center">
              📥 СКАЧАЙТЕ СТАРЫЙ ROBLOX
            </DialogTitle>
            <DialogDescription className="text-gray-600 font-bold text-center text-lg">
              Для игры требуется клиент Roblox 2008 года
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg border-4 border-cyan-300">
              <div className="w-20 h-20 bg-red-500 border-4 border-red-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Icon name="Download" size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">ROBLOX CLASSIC CLIENT</h3>
              <p className="text-sm font-bold text-gray-600 mb-4">Версия 2008 • 45.2 МБ</p>
              
              {downloadProgress < 100 ? (
                <div className="space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-400">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-300 border-r-2 border-red-700"
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-lg font-black text-red-600">
                    Загрузка... {Math.round(downloadProgress)}%
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4">
                    <Icon name="CheckCircle" size={24} className="text-green-600 mx-auto mb-2" />
                    <p className="text-green-700 font-bold">Загрузка завершена!</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-lg py-3 border-4 border-red-700 shadow-xl"
                      onClick={() => {
                        downloadRobloxClient();
                        setShowDownload(false);
                      }}
                    >
                      <Icon name="Download" size={20} className="mr-2" />
                      СКАЧАТЬ КЛИЕНТ
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-red-600 font-black py-3 border-4 border-yellow-600"
                      onClick={() => {
                        toast({
                          title: "📖 Инструкция",
                          description: "1. Скачайте клиент 2. Установите 3. Запустите игру через браузер"
                        });
                      }}
                    >
                      <Icon name="HelpCircle" size={20} className="mr-2" />
                      ИНСТРУКЦИЯ
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-black text-yellow-800 mb-1">ВАЖНО!</h4>
                  <p className="text-sm font-bold text-yellow-700">
                    Этот клиент работает только на Windows XP/Vista/7. 
                    Убедитесь, что у вас отключен антивирус при установке.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Friends Modal */}
      {isLoggedIn && (
        <Dialog open={showFriends} onOpenChange={setShowFriends}>
          <DialogContent className="bg-white border-4 border-gray-300 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-red-600 text-center">
                <Icon name="Users" size={32} className="inline mr-3" />
                ДРУЗЬЯ
              </DialogTitle>
              <DialogDescription className="text-gray-600 font-bold text-center text-lg">
                {friends.length > 0 ? `У вас ${friends.length} друзей` : 'У вас пока нет друзей'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {friends.length > 0 && (
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${friend.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="font-bold text-gray-800">{friend.name}</span>
                        <span className="text-xs text-gray-500">
                          {friend.online ? 'онлайн' : 'офлайн'}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-800 border-red-300 hover:border-red-500"
                        onClick={() => removeFriend(friend.id)}
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="border-t-2 border-gray-200 pt-4">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-black border-4 border-green-700"
                  onClick={() => setShowAddFriend(true)}
                >
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  ДОБАВИТЬ ДРУГА
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Friend Modal */}
      {isLoggedIn && (
        <Dialog open={showAddFriend} onOpenChange={setShowAddFriend}>
          <DialogContent className="bg-white border-4 border-gray-300 max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-green-600 text-center">
                <Icon name="UserPlus" size={24} className="inline mr-2" />
                ДОБАВИТЬ ДРУГА
              </DialogTitle>
              <DialogDescription className="text-gray-600 font-bold text-center">
                Введите имя игрока для добавления в друзья
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">
                  Имя пользователя:
                </label>
                <Input
                  type="text"
                  placeholder="Введите имя игрока"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  className="border-2 border-gray-300"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-black border-4 border-green-700"
                  onClick={addFriend}
                >
                  <Icon name="Check" size={16} className="mr-2" />
                  ДОБАВИТЬ
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black border-4 border-gray-300"
                  onClick={() => {
                    setShowAddFriend(false);
                    setNewFriendName('');
                  }}
                >
                  ОТМЕНА
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Roblox Installer */}
      <RobloxInstaller open={showInstaller} onOpenChange={setShowInstaller} />
    </div>
  );
};

export default Index;