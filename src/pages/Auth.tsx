import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

export default function Auth() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    username: '', 
    password: '', 
    confirmPassword: '',
    email: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем есть ли зарегистрированный пользователь
    const savedUser = localStorage.getItem('roblox_user');
    const savedPassword = localStorage.getItem('roblox_password');
    
    if (!savedUser || !savedPassword) {
      alert('❌ Аккаунт не найден! Пожалуйста, сначала зарегистрируйтесь.');
      return;
    }
    
    const userData = JSON.parse(savedUser);
    
    // Проверяем правильность введенных данных
    if (loginData.username !== userData.username) {
      alert('❌ Неправильное имя пользователя!');
      return;
    }
    
    if (loginData.password !== savedPassword) {
      alert('❌ Неправильный пароль!');
      return;
    }
    
    // Если все правильно - входим
    console.log('✅ Успешный вход для:', userData.username);
    window.location.href = '/game';
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    
    // Сохраняем данные пользователя в localStorage
    const userData = {
      username: registerData.username,
      email: registerData.email,
      robux: 25, // Стартовые робуксы для новых пользователей
      tickets: 10, // Стартовые билеты
      joinDate: new Date().toISOString().split('T')[0],
      gamesPlayed: 0,
      friends: 0
    };
    
    localStorage.setItem('roblox_user', JSON.stringify(userData));
    localStorage.setItem('roblox_password', registerData.password); // Сохраняем пароль отдельно
    console.log('Регистрация завершена:', userData);
    
    // Переходим на главную страницу
    window.location.href = '/game';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Gamepad2" className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary">ROBLOX 2008</h1>
          <p className="text-muted-foreground">Добро пожаловать в классический Роблокс!</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Войти в игру</CardTitle>
            <CardDescription>
              Войдите в свой аккаунт или создайте новый для начала игры
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="login-username" className="text-sm font-medium">
                      Имя пользователя
                    </label>
                    <Input
                      id="login-username"
                      type="text"
                      placeholder="Введите имя пользователя"
                      value={loginData.username}
                      onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="login-password" className="text-sm font-medium">
                      Пароль
                    </label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Введите пароль"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="LogIn" className="w-4 h-4 mr-2" />
                    Войти в игру
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="register-username" className="text-sm font-medium">
                      Имя пользователя
                    </label>
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="Выберите имя пользователя"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="register-email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Введите email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="register-password" className="text-sm font-medium">
                      Пароль
                    </label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Создайте пароль"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">
                      Подтвердите пароль
                    </label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Повторите пароль"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                    Создать аккаунт
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Назад к главной
          </Button>
        </div>
      </div>
    </div>
  );
}