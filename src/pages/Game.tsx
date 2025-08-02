import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import RobloxLogo from '@/components/ui/roblox-logo';

export default function Game() {
  const [user] = useState({
    username: 'Guest_' + Math.floor(Math.random() * 10000),
    robux: 0,
    tickets: 0
  });

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
    },
    {
      id: 5,
      title: "Castle Siege",
      description: "Захватывайте замки в средневековых битвах!",
      image: "/img/a2ae8285-95e0-4a2e-9ef9-524f66705753.jpg",
      players: 1856,
      rating: 4.5
    },
    {
      id: 6,
      title: "Space Battle",
      description: "Космические сражения среди звезд!",
      image: "/img/1f81666d-d49e-4c06-9821-f757391ab871.jpg",
      players: 2743,
      rating: 4.8
    },
    {
      id: 7,
      title: "Pirate Adventure",
      description: "Приключения пиратов на семи морях!",
      image: "/img/de758f21-015e-4dc6-acae-a5e777a28c30.jpg",
      players: 1624,
      rating: 4.6
    }
  ];

  const playGame = (gameTitle: string) => {
    toast({
      title: "🎮 Запуск игры!",
      description: `Загружается ${gameTitle}... Убедитесь, что клиент Roblox установлен!`
    });

    setTimeout(() => {
      toast({
        title: "🚀 Игра запущена!",
        description: `${gameTitle} загружена в клиенте Roblox. Приятной игры!`
      });
    }, 2000);
  };

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
              OLD ROBLOX
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border-2 border-white/30">
              <div className="flex items-center space-x-2">
                <Icon name="User" className="w-5 h-5 text-white" />
                <span className="text-white font-bold">{user.username}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded border-2 border-yellow-600"></div>
                <span className="text-white font-bold">{user.robux} R$</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-400 rounded border-2 border-green-600"></div>
                <span className="text-white font-bold">{user.tickets} Tix</span>
              </div>
            </div>
            <Button 
              variant="outline"
              className="bg-white hover:bg-gray-100 text-red-600 font-bold border-4 border-gray-400 shadow-lg px-6 py-2"
              onClick={() => window.location.href = '/profile'}\n            >\n              <Icon name=\"Settings\" size={20} className=\"mr-2\" />\n              ПРОФИЛЬ\n            </Button>\n            <Button \n              variant=\"outline\"\n              className=\"bg-white hover:bg-gray-100 text-red-600 font-bold border-4 border-gray-400 shadow-lg px-6 py-2\"\n              onClick={() => window.location.href = '/'}
            >
              <Icon name="Home" size={20} className="mr-2" />
              ГЛАВНАЯ
            </Button>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-2xl border-4 border-gray-300 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-red-600 mb-2">
                  Добро пожаловать, {user.username}! 🎮
                </h2>
                <p className="text-lg text-gray-700 font-bold">
                  Выберите игру и начните приключение в классическом Roblox!
                </p>
              </div>
              <div className="flex space-x-4">
                <div className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-300">
                  <div className="text-2xl font-black text-gray-800">{user.robux}</div>
                  <div className="text-sm font-bold text-gray-600">Robux</div>
                </div>
                <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-300">
                  <div className="text-2xl font-black text-gray-800">{user.tickets}</div>
                  <div className="text-sm font-bold text-gray-600">Tickets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
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

                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-black border-4 border-red-700 shadow-lg"
                    onClick={() => playGame(game.title)}
                  >
                    <Icon name="Play" size={16} className="mr-2" />
                    ИГРАТЬ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-600 to-red-700 p-8 border-t-8 border-red-800 mt-12">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <RobloxLogo size={48} className="hover:scale-110 transition-transform duration-300" />
            <h2 className="text-xl font-black text-white tracking-wider">OLD ROBLOX</h2>
          </div>
          <p className="text-white/80 font-bold">
            © 2008 Old Roblox. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}