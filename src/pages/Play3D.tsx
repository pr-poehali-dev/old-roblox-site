import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import * as THREE from "three";

const Play3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [health, setHealth] = useState(100);
  const [coins, setCoins] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 0, 100);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4a9d5f,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 1, 0);
    player.castShadow = true;
    scene.add(player);

    const headGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.5, 0);
    head.castShadow = true;
    player.add(head);

    const obstacles: THREE.Mesh[] = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 2 + 1;
      const obstacleGeometry = new THREE.BoxGeometry(size, size * 2, size);
      const obstacleMaterial = new THREE.MeshStandardMaterial({ 
        color: Math.random() * 0xffffff 
      });
      const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
      obstacle.position.set(
        (Math.random() - 0.5) * 80,
        size,
        (Math.random() - 0.5) * 80
      );
      obstacle.castShadow = true;
      obstacle.receiveShadow = true;
      scene.add(obstacle);
      obstacles.push(obstacle);
    }

    const coinGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
    const coinMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.2
    });
    
    const coinsArray: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const coin = new THREE.Mesh(coinGeometry, coinMaterial);
      coin.position.set(
        (Math.random() - 0.5) * 80,
        0.5,
        (Math.random() - 0.5) * 80
      );
      coin.castShadow = true;
      scene.add(coin);
      coinsArray.push(coin);
    }

    const playerVelocity = new THREE.Vector3();
    const moveSpeed = 0.15;
    const jumpForce = 0.3;
    const gravity = -0.01;
    let isGrounded = true;

    const keys: { [key: string]: boolean } = {};

    const onKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
      
      if (e.key === ' ' && isGrounded) {
        playerVelocity.y = jumpForce;
        isGrounded = false;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    let cameraAngle = 0;
    let cameraDistance = 8;
    const cameraHeight = 5;

    const onMouseMove = (e: MouseEvent) => {
      if (e.buttons === 2) {
        cameraAngle -= e.movementX * 0.005;
      }
    };

    const onWheel = (e: WheelEvent) => {
      cameraDistance += e.deltaY * 0.01;
      cameraDistance = Math.max(3, Math.min(15, cameraDistance));
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('wheel', onWheel);
    renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (isPaused) {
        renderer.render(scene, camera);
        return;
      }

      if (keys['w']) {
        const forward = new THREE.Vector3(
          Math.sin(cameraAngle),
          0,
          Math.cos(cameraAngle)
        );
        player.position.add(forward.multiplyScalar(moveSpeed));
      }
      if (keys['s']) {
        const backward = new THREE.Vector3(
          Math.sin(cameraAngle),
          0,
          Math.cos(cameraAngle)
        );
        player.position.sub(backward.multiplyScalar(moveSpeed));
      }
      if (keys['a']) {
        const left = new THREE.Vector3(
          Math.cos(cameraAngle),
          0,
          -Math.sin(cameraAngle)
        );
        player.position.add(left.multiplyScalar(moveSpeed));
      }
      if (keys['d']) {
        const right = new THREE.Vector3(
          Math.cos(cameraAngle),
          0,
          -Math.sin(cameraAngle)
        );
        player.position.sub(right.multiplyScalar(moveSpeed));
      }

      playerVelocity.y += gravity;
      player.position.y += playerVelocity.y;

      if (player.position.y <= 1) {
        player.position.y = 1;
        playerVelocity.y = 0;
        isGrounded = true;
      }

      player.position.x = Math.max(-45, Math.min(45, player.position.x));
      player.position.z = Math.max(-45, Math.min(45, player.position.z));

      for (let i = coinsArray.length - 1; i >= 0; i--) {
        const coin = coinsArray[i];
        coin.rotation.y += 0.05;
        
        const distance = player.position.distanceTo(coin.position);
        if (distance < 1.5) {
          scene.remove(coin);
          coinsArray.splice(i, 1);
          setCoins(prev => prev + 1);
        }
      }

      const cameraX = player.position.x - Math.sin(cameraAngle) * cameraDistance;
      const cameraZ = player.position.z - Math.cos(cameraAngle) * cameraDistance;
      camera.position.set(cameraX, player.position.y + cameraHeight, cameraZ);
      camera.lookAt(player.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const exitGame = () => {
    window.location.href = '/studio';
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden" ref={mountRef}>
      <div className="absolute top-4 left-4 space-y-2 z-10">
        <Card className="bg-gray-900/80 backdrop-blur border-2 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 text-white">
              <Icon name="Heart" size={20} className="text-red-500" />
              <span className="font-bold">{health} HP</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/80 backdrop-blur border-2 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 text-white">
              <Icon name="Coins" size={20} className="text-yellow-500" />
              <span className="font-bold">{coins} Монет</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute top-4 right-4 space-x-2 z-10">
        <Button
          onClick={togglePause}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
        >
          <Icon name={isPaused ? "Play" : "Pause"} size={16} className="mr-2" />
          {isPaused ? "ПРОДОЛЖИТЬ" : "ПАУЗА"}
        </Button>
        
        <Button
          onClick={exitGame}
          className="bg-red-600 hover:bg-red-700 text-white font-bold"
        >
          <Icon name="X" size={16} className="mr-2" />
          ВЫХОД
        </Button>
      </div>

      {isPaused && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
          <Card className="bg-gray-900 border-4 border-gray-700 p-8">
            <CardContent className="space-y-6">
              <h2 className="text-4xl font-black text-white text-center">ПАУЗА</h2>
              
              <div className="space-y-2 text-white">
                <p className="text-lg font-bold">Управление:</p>
                <div className="space-y-1 text-sm">
                  <p>• <span className="font-bold">W/A/S/D</span> - Движение</p>
                  <p>• <span className="font-bold">Пробел</span> - Прыжок</p>
                  <p>• <span className="font-bold">Правая кнопка мыши</span> - Поворот камеры</p>
                  <p>• <span className="font-bold">Колесо мыши</span> - Приближение</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={togglePause}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3"
                >
                  <Icon name="Play" size={20} className="mr-2" />
                  ПРОДОЛЖИТЬ
                </Button>
                
                <Button
                  onClick={exitGame}
                  variant="outline"
                  className="flex-1 border-2 border-gray-600 text-white hover:bg-gray-800 font-bold py-3"
                >
                  <Icon name="LogOut" size={20} className="mr-2" />
                  В STUDIO
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-gray-900/80 backdrop-blur border-2 border-gray-700">
          <CardContent className="p-2 px-4">
            <p className="text-white text-sm font-bold">
              Собери все золотые монеты! 🪙
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Play3D;
