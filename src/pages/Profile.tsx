import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import RobloxLogo from '@/components/ui/roblox-logo';

export default function Profile() {
  const [user, setUser] = useState({
    username: 'Guest_' + Math.floor(Math.random() * 10000),
    email: 'guest@roblox.com',
    robux: 0,
    tickets: 0,
    joinDate: new Date().toISOString().split('T')[0],
    gamesPlayed: 45,
    friends: 0
  });

  const [editData, setEditData] = useState({
    username: user.username,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData.username.trim().length < 3) {
      toast({
        title: "❌ Ошибка",
        description: "Имя пользователя должно содержать минимум 3 символа"
      });
      return;
    }
    
    setUser(prev => ({ ...prev, username: editData.username }));
    setShowEditProfile(false);
    toast({
      title: "✅ Профиль обновлен!",
      description: `Ваше новое имя: ${editData.username}`
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData.newPassword.length < 6) {
      toast({
        title: "❌ Ошибка",
        description: "Пароль должен содержать минимум 6 символов"
      });
      return;
    }
    
    if (editData.newPassword !== editData.confirmPassword) {
      toast({
        title: "❌ Ошибка",
        description: "Пароли не совпадают!"
      });
      return;
    }

    setShowChangePassword(false);
    setEditData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    toast({
      title: "🔒 Пароль изменен!",
      description: "Ваш пароль успешно обновлен"
    });
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
              ROBLOX V2
            </h1>
          </div>
          <Button 
            variant="outline"
            className="bg-white hover:bg-gray-100 text-red-600 font-bold border-4 border-gray-400 shadow-lg px-6 py-2"
            onClick={() => window.location.href = '/game'}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            НАЗАД К ИГРАМ
          </Button>
        </div>
      </header>

      {/* Profile Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Profile Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-2xl border-4 border-gray-300 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-lg border-4 border-red-700 flex items-center justify-center">
                <Icon name="User" size={48} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl font-black text-red-600 mb-2">{user.username}</h2>
                <p className="text-lg text-gray-700 font-bold mb-4">Игрок с {new Date(user.joinDate).toLocaleDateString('ru-RU')}</p>
                <div className="flex space-x-6">
                  <div className="text-center p-3 bg-yellow-100 rounded-lg border-2 border-yellow-300">
                    <div className="text-xl font-black text-gray-800">{user.robux}</div>
                    <div className="text-sm font-bold text-gray-600">Robux</div>
                  </div>
                  <div className="text-center p-3 bg-green-100 rounded-lg border-2 border-green-300">
                    <div className="text-xl font-black text-gray-800">{user.tickets}</div>
                    <div className="text-sm font-bold text-gray-600">Tickets</div>
                  </div>
                  <div className="text-center p-3 bg-blue-100 rounded-lg border-2 border-blue-300">
                    <div className="text-xl font-black text-gray-800">{user.gamesPlayed}</div>
                    <div className="text-sm font-bold text-gray-600">Игр сыграно</div>
                  </div>
                  <div className="text-center p-3 bg-purple-100 rounded-lg border-2 border-purple-300">
                    <div className="text-xl font-black text-gray-800">{user.friends}</div>
                    <div className="text-sm font-bold text-gray-600">Друзей</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Settings */}
            <Card className="bg-white border-4 border-gray-300 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-red-600 flex items-center">
                  <Icon name="User" size={24} className="mr-3" />
                  НАСТРОЙКИ ПРОФИЛЯ
                </CardTitle>
                <CardDescription className="text-gray-600 font-bold">
                  Измените свое имя пользователя и данные профиля
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Текущее имя:</Label>
                  <p className="text-lg font-black text-gray-800">{user.username}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Email:</Label>
                  <p className="text-lg font-bold text-gray-600">{user.email}</p>
                </div>
                <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-black border-4 border-red-700 shadow-lg">
                      <Icon name="Edit" size={16} className="mr-2" />
                      ИЗМЕНИТЬ ИМЯ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border-4 border-gray-300">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-black text-red-600">
                        ИЗМЕНИТЬ ИМЯ ПОЛЬЗОВАТЕЛЯ
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 font-bold">
                        Введите новое имя пользователя (минимум 3 символа)
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-username" className="text-sm font-bold">
                          Новое имя пользователя
                        </Label>
                        <Input
                          id="new-username"
                          type="text"
                          placeholder="Введите новое имя"
                          value={editData.username}
                          onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                          required
                          minLength={3}
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white font-black border-4 border-green-700">
                          <Icon name="Check" size={16} className="mr-2" />
                          СОХРАНИТЬ
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black border-4 border-gray-300"
                          onClick={() => setShowEditProfile(false)}
                        >
                          ОТМЕНА
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Password Settings */}
            <Card className="bg-white border-4 border-gray-300 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-red-600 flex items-center">
                  <Icon name="Lock" size={24} className="mr-3" />
                  БЕЗОПАСНОСТЬ
                </CardTitle>
                <CardDescription className="text-gray-600 font-bold">
                  Измените пароль для защиты аккаунта
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Пароль:</Label>
                  <p className="text-lg font-bold text-gray-600">••••••••</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Последнее изменение:</Label>
                  <p className="text-sm font-bold text-gray-500">{new Date(user.joinDate).toLocaleDateString('ru-RU')}</p>
                </div>
                <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black border-4 border-yellow-700 shadow-lg">
                      <Icon name="Key" size={16} className="mr-2" />
                      СМЕНИТЬ ПАРОЛЬ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border-4 border-gray-300">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-black text-red-600">
                        ИЗМЕНИТЬ ПАРОЛЬ
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 font-bold">
                        Введите текущий и новый пароль для изменения
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-sm font-bold">
                          Текущий пароль
                        </Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="Введите текущий пароль"
                          value={editData.currentPassword}
                          onChange={(e) => setEditData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-sm font-bold">
                          Новый пароль
                        </Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="Введите новый пароль"
                          value={editData.newPassword}
                          onChange={(e) => setEditData(prev => ({ ...prev, newPassword: e.target.value }))}
                          required
                          minLength={6}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-sm font-bold">
                          Подтвердите пароль
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Повторите новый пароль"
                          value={editData.confirmPassword}
                          onChange={(e) => setEditData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white font-black border-4 border-green-700">
                          <Icon name="Check" size={16} className="mr-2" />
                          ИЗМЕНИТЬ
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black border-4 border-gray-300"
                          onClick={() => setShowChangePassword(false)}
                        >
                          ОТМЕНА
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <Card className="bg-white border-4 border-gray-300 shadow-xl mt-6">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-red-600 flex items-center">
                <Icon name="Info" size={24} className="mr-3" />
                ИНФОРМАЦИЯ ОБ АККАУНТЕ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <Icon name="Calendar" size={24} className="text-gray-600 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-800">Дата регистрации</div>
                  <div className="text-sm font-bold text-gray-600">{new Date(user.joinDate).toLocaleDateString('ru-RU')}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <Icon name="Clock" size={24} className="text-gray-600 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-800">Время в игре</div>
                  <div className="text-sm font-bold text-gray-600">127 часов</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <Icon name="Trophy" size={24} className="text-gray-600 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-800">Достижения</div>
                  <div className="text-sm font-bold text-gray-600">8 из 25</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}