import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import * as THREE from "three";

interface SceneObject {
  id: string;
  name: string;
  mesh: THREE.Mesh;
  type: string;
}

const Studio = () => {
  const [selectedTool, setSelectedTool] = useState("move");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedObject, setSelectedObject] = useState<SceneObject | null>(null);
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([]);
  
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  const tools = [
    { id: "move", name: "Перемещение", icon: "Move" },
    { id: "rotate", name: "Поворот", icon: "RotateCw" },
    { id: "scale", name: "Масштаб", icon: "Maximize" },
    { id: "part", name: "Деталь", icon: "Box" },
    { id: "model", name: "Модель", icon: "Package" },
    { id: "terrain", name: "Ландшафт", icon: "Mountain" },
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(50, 50, 0x444444, 0x888888);
    scene.add(gridHelper);

    const baseplateGeometry = new THREE.BoxGeometry(50, 1, 50);
    const baseplateMaterial = new THREE.MeshStandardMaterial({ color: 0x4a9d5f });
    const baseplate = new THREE.Mesh(baseplateGeometry, baseplateMaterial);
    baseplate.position.y = -0.5;
    baseplate.receiveShadow = true;
    scene.add(baseplate);

    const partGeometry = new THREE.BoxGeometry(4, 2, 4);
    const partMaterial = new THREE.MeshStandardMaterial({ color: 0xa0a0a0 });
    const part = new THREE.Mesh(partGeometry, partMaterial);
    part.position.set(0, 2, 0);
    part.castShadow = true;
    scene.add(part);

    const initialObjects: SceneObject[] = [
      { id: "baseplate", name: "Baseplate", mesh: baseplate, type: "part" },
      { id: "part1", name: "Part", mesh: part, type: "part" }
    ];
    setSceneObjects(initialObjects);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;

      if (event.buttons === 2 || event.ctrlKey) {
        camera.position.x -= deltaX * 0.05;
        camera.position.y += deltaY * 0.05;
      } else if (event.buttons === 1) {
        const deltaRotationQuaternion = new THREE.Quaternion()
          .setFromEuler(new THREE.Euler(
            deltaY * (Math.PI / 180) * 0.5,
            deltaX * (Math.PI / 180) * 0.5,
            0,
            'XYZ'
          ));

        const cameraPosition = camera.position.clone();
        const distance = cameraPosition.length();
        
        cameraPosition.applyQuaternion(deltaRotationQuaternion);
        cameraPosition.setLength(distance);
        
        camera.position.copy(cameraPosition);
        camera.lookAt(0, 0, 0);
      }

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (event: WheelEvent) => {
      const zoomSpeed = 0.1;
      const direction = camera.position.clone().normalize();
      
      if (event.deltaY > 0) {
        camera.position.addScaledVector(direction, zoomSpeed);
      } else {
        camera.position.addScaledVector(direction, -zoomSpeed);
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children.filter(obj => obj instanceof THREE.Mesh && obj !== baseplate));

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const foundObject = initialObjects.find(obj => obj.mesh === clickedMesh);
        
        if (foundObject) {
          setSelectedObject(foundObject);
          toast({
            title: "Объект выбран",
            description: `Выбран: ${foundObject.name}`
          });
        }
      }
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel);
    renderer.domElement.addEventListener('click', onClick);
    renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.domElement.removeEventListener('click', onClick);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const addPart = () => {
    if (!sceneRef.current) return;

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ 
      color: Math.random() * 0xffffff 
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      Math.random() * 10 - 5,
      2,
      Math.random() * 10 - 5
    );
    mesh.castShadow = true;
    sceneRef.current.add(mesh);

    const newObject: SceneObject = {
      id: `part_${Date.now()}`,
      name: `Part ${sceneObjects.length + 1}`,
      mesh: mesh,
      type: "part"
    };

    setSceneObjects(prev => [...prev, newObject]);
    setSelectedObject(newObject);

    toast({
      title: "✅ Объект создан",
      description: `Добавлен ${newObject.name}`
    });
  };

  const moveTool = () => {
    if (!selectedObject) {
      toast({
        title: "⚠️ Объект не выбран",
        description: "Сначала выберите объект в сцене"
      });
      return;
    }

    selectedObject.mesh.position.x += 1;
    toast({
      title: "↔️ Перемещение",
      description: `${selectedObject.name} перемещён`
    });
  };

  const rotateTool = () => {
    if (!selectedObject) {
      toast({
        title: "⚠️ Объект не выбран",
        description: "Сначала выберите объект в сцене"
      });
      return;
    }

    selectedObject.mesh.rotation.y += Math.PI / 4;
    toast({
      title: "🔄 Поворот",
      description: `${selectedObject.name} повёрнут на 45°`
    });
  };

  const scaleTool = () => {
    if (!selectedObject) {
      toast({
        title: "⚠️ Объект не выбран",
        description: "Сначала выберите объект в сцене"
      });
      return;
    }

    selectedObject.mesh.scale.multiplyScalar(1.2);
    toast({
      title: "📏 Масштаб",
      description: `${selectedObject.name} увеличен`
    });
  };

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);

    switch(toolId) {
      case "part":
        addPart();
        break;
      case "move":
        moveTool();
        break;
      case "rotate":
        rotateTool();
        break;
      case "scale":
        scaleTool();
        break;
      case "model":
        toast({
          title: "📦 Модель",
          description: "Функция добавления моделей"
        });
        break;
      case "terrain":
        toast({
          title: "⛰️ Ландшафт",
          description: "Функция редактирования ландшафта"
        });
        break;
    }
  };

  const playGame = () => {
    window.location.href = '/play3d';
  };

  const saveProject = () => {
    toast({
      title: "💾 Сохранено",
      description: `Проект сохранён. Объектов: ${sceneObjects.length}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <div className="bg-gray-800 border-b-2 border-gray-600 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-gray-700"
              onClick={() => window.location.href = "/"}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <h1 className="text-xl font-black text-white">ROBLOX STUDIO</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={playGame}
              className={`font-black ${
                isPlaying 
                  ? "bg-red-600 hover:bg-red-700 border-red-800" 
                  : "bg-green-600 hover:bg-green-700 border-green-800"
              } text-white border-2`}
            >
              <Icon name={isPlaying ? "Square" : "Play"} size={16} className="mr-2" />
              {isPlaying ? "СТОП" : "ИГРАТЬ"}
            </Button>
            <Button 
              onClick={saveProject}
              variant="outline" 
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-16 bg-gray-700 border-r-2 border-gray-600 flex flex-col items-center py-2 space-y-2">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="sm"
              className={`w-12 h-12 p-0 ${
                selectedTool === tool.id
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "text-white hover:bg-gray-600"
              }`}
              onClick={() => handleToolClick(tool.id)}
              title={tool.name}
            >
              <Icon name={tool.icon as any} size={20} />
            </Button>
          ))}
        </div>

        <div className="w-64 bg-gray-800 border-r-2 border-gray-600 flex flex-col">
          <div className="p-3 border-b border-gray-600">
            <h3 className="font-black text-white text-sm">EXPLORER</h3>
          </div>
          <div className="flex-1 p-2 space-y-1 overflow-y-auto">
            {sceneObjects.map((obj) => (
              <div 
                key={obj.id}
                className={`flex items-center space-x-2 p-2 hover:bg-gray-700 rounded text-white text-sm cursor-pointer ${
                  selectedObject?.id === obj.id ? "bg-blue-600" : ""
                }`}
                onClick={() => setSelectedObject(obj)}
              >
                <Icon name="Box" size={14} />
                <span className="font-bold">{obj.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative" ref={mountRef}></div>

        <div className="w-64 bg-gray-800 border-l-2 border-gray-600 flex flex-col">
          <div className="p-3 border-b border-gray-600">
            <h3 className="font-black text-white text-sm">PROPERTIES</h3>
          </div>
          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {selectedObject ? (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Name</label>
                  <div className="bg-gray-700 border border-gray-600 rounded p-2">
                    <span className="text-white text-sm">{selectedObject.name}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Position</label>
                  <div className="bg-gray-700 border border-gray-600 rounded p-2">
                    <span className="text-white text-sm">
                      {selectedObject.mesh.position.x.toFixed(1)}, {selectedObject.mesh.position.y.toFixed(1)}, {selectedObject.mesh.position.z.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Rotation</label>
                  <div className="bg-gray-700 border border-gray-600 rounded p-2">
                    <span className="text-white text-sm">
                      {(selectedObject.mesh.rotation.x * 180 / Math.PI).toFixed(0)}°, 
                      {(selectedObject.mesh.rotation.y * 180 / Math.PI).toFixed(0)}°, 
                      {(selectedObject.mesh.rotation.z * 180 / Math.PI).toFixed(0)}°
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Scale</label>
                  <div className="bg-gray-700 border border-gray-600 rounded p-2">
                    <span className="text-white text-sm">
                      {selectedObject.mesh.scale.x.toFixed(2)}, {selectedObject.mesh.scale.y.toFixed(2)}, {selectedObject.mesh.scale.z.toFixed(2)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm text-center mt-4">
                Выберите объект
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <Card className="bg-gray-800/90 backdrop-blur border-2 border-gray-600">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 text-white">
              <Icon name={tools.find(t => t.id === selectedTool)?.icon as any} size={20} />
              <span className="font-bold text-sm">
                {tools.find(t => t.id === selectedTool)?.name}
              </span>
              {selectedObject && (
                <>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm">Выбран: {selectedObject.name}</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Studio;