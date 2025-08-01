import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const games = [
    {
      id: 1,
      title: "Sword Fighting Tournament",
      description: "Сражайтесь мечами в эпических битвах!",
      image: "/img/f067aa17-5eba-4000-96d2-183e8b9eab11.jpg",
      players: 1247,
      rating: 4.8
    },
    {
      id: 2,
      title: "Build To Survive",
      description: "Стройте укрытия и выживайте!",
      image: "/img/f067aa17-5eba-4000-96d2-183e8b9eab11.jpg",
      players: 892,
      rating: 4.6
    },
    {
      id: 3,
      title: "Racing Circuit",
      description: "Гонки на самых крутых трассах!",
      image: "/img/f067aa17-5eba-4000-96d2-183e8b9eab11.jpg",
      players: 2156,
      rating: 4.9
    },
    {
      id: 4,
      title: "Zombie Apocalypse",
      description: "Сражайтесь с ордами зомби!",
      image: "/img/f067aa17-5eba-4000-96d2-183e8b9eab11.jpg",
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
            <div className="w-12 h-12 bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center text-2xl font-black text-red-600">
              R
            </div>
            <h1 className="text-3xl font-black text-white tracking-wider drop-shadow-lg" 
                style={{
                  textShadow: '3px 3px 0px #8B0000, -1px -1px 0px #8B0000, 1px -1px 0px #8B0000, -1px 1px 0px #8B0000'
                }}>
              OLD ROBLOX GAMES
            </h1>
          </div>
          <nav className="flex space-x-4">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-red-600 font-bold border-4 border-yellow-600 shadow-lg px-6 py-2">
              <Icon name="GameController2" size={20} className="mr-2" />
              ИГРАТЬ
            </Button>
            <Button variant="outline" className="bg-white hover:bg-gray-100 text-red-600 font-bold border-4 border-gray-400 shadow-lg px-6 py-2">
              <Icon name="Users" size={20} className="mr-2" />
              ДРУЗЬЯ
            </Button>
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
              <Button className="bg-red-500 hover:bg-red-600 text-white font-black text-xl px-8 py-4 border-4 border-red-700 shadow-xl">
                <Icon name="Play" size={24} className="mr-3" />
                НАЧАТЬ ИГРАТЬ
              </Button>
              <Button className="bg-cyan-400 hover:bg-cyan-500 text-white font-black text-xl px-8 py-4 border-4 border-cyan-600 shadow-xl">
                <Icon name="Wrench" size={24} className="mr-3" />
                СТРОИТЬ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section className="py-12 px-4">
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

                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-black border-4 border-red-700 shadow-lg">
                    <Icon name="Play" size={16} className="mr-2" />
                    ИГРАТЬ
                  </Button>
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
            <div className="w-16 h-16 bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center text-3xl font-black text-red-600">
              R
            </div>
            <h2 className="text-2xl font-black text-white tracking-wider">OLD ROBLOX GAMES</h2>
          </div>
          
          <div className="flex justify-center space-x-8 mb-6">
            <Button variant="ghost" className="text-white hover:text-yellow-400 font-bold">
              О нас
            </Button>
            <Button variant="ghost" className="text-white hover:text-yellow-400 font-bold">
              Помощь
            </Button>
            <Button variant="ghost" className="text-white hover:text-yellow-400 font-bold">
              Контакты
            </Button>
            <Button variant="ghost" className="text-white hover:text-yellow-400 font-bold">
              Правила
            </Button>
          </div>

          <p className="text-white/80 font-bold">
            © 2008 Old Roblox Games. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;