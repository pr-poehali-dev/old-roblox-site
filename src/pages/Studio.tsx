import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

const Studio = () => {
  const [selectedTool, setSelectedTool] = useState("move");
  const [isPlaying, setIsPlaying] = useState(false);

  const tools = [
    { id: "move", name: "Перемещение", icon: "Move" },
    { id: "rotate", name: "Поворот", icon: "RotateCw" },
    { id: "scale", name: "Масштаб", icon: "Maximize" },
    { id: "part", name: "Деталь", icon: "Box" },
    { id: "model", name: "Модель", icon: "Package" },
    { id: "terrain", name: "Ландшафт", icon: "Mountain" },
  ];

  const workspaceItems = [
    { name: "Workspace", type: "folder", children: [
      { name: "Baseplate", type: "part" },
      { name: "SpawnLocation", type: "spawn" },
      { name: "Camera", type: "camera" },
    ]},
    { name: "Lighting", type: "service" },
    { name: "ReplicatedStorage", type: "service" },
    { name: "ServerStorage", type: "service" },
    { name: "Players", type: "service" },
  ];

  const properties = [
    { name: "Name", value: "Part", type: "string" },
    { name: "Position", value: "0, 4, 0", type: "vector3" },
    { name: "Size", value: "4, 1, 2", type: "vector3" },
    { name: "Material", value: "Plastic", type: "enum" },
    { name: "Color", value: "Medium grey", type: "color" },
    { name: "Anchored", value: "true", type: "boolean" },
  ];

  const playGame = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "🛑 Остановлено" : "▶️ Запущено",
      description: isPlaying ? "Тестирование игры остановлено" : "Запущено тестирование игры"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
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
        {/* Tools Panel */}
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
              onClick={() => setSelectedTool(tool.id)}
              title={tool.name}
            >
              <Icon name={tool.icon as any} size={20} />
            </Button>
          ))}
        </div>

        {/* Explorer Panel */}
        <div className="w-64 bg-gray-800 border-r-2 border-gray-600 flex flex-col">
          <div className="p-3 border-b border-gray-600">
            <h3 className="font-black text-white text-sm">EXPLORER</h3>
          </div>
          <div className="flex-1 p-2 space-y-1 overflow-y-auto">
            {workspaceItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded text-white text-sm">
                  <Icon name="ChevronRight" size={12} />
                  <Icon name="Folder" size={14} />
                  <span className="font-bold">{item.name}</span>
                </div>
                {item.children && (
                  <div className="ml-4 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <div key={childIndex} className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded text-white text-sm">
                        <Icon name="Box" size={12} />
                        <span>{child.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Viewport */}
        <div className="flex-1 bg-gradient-to-b from-sky-400 to-sky-200 relative overflow-hidden">
          {/* 3D Viewport */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-6">
              {/* Ground/Baseplate */}
              <div className="w-96 h-4 bg-gradient-to-b from-green-400 to-green-600 border-4 border-green-700 rounded-lg transform rotate-x-45 shadow-2xl"></div>
              
              {/* Sample Part */}
              <div className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-500 border-4 border-gray-600 rounded-lg transform rotate-y-12 shadow-xl mx-auto"></div>
              
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="absolute border-t border-white" style={{
                    top: `${10 + i * 10}%`,
                    left: 0,
                    right: 0
                  }}></div>
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="absolute border-l border-white" style={{
                    left: `${10 + i * 10}%`,
                    top: 0,
                    bottom: 0
                  }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Viewport Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-white/80 backdrop-blur">
              <Icon name="RotateCw" size={16} />
            </Button>
            <Button size="sm" variant="outline" className="bg-white/80 backdrop-blur">
              <Icon name="Move" size={16} />
            </Button>
          </div>

          {/* Current Tool Display */}
          <div className="absolute bottom-4 left-4">
            <Card className="bg-white/90 backdrop-blur border-2">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <Icon name={tools.find(t => t.id === selectedTool)?.icon as any} size={20} />
                  <span className="font-bold text-sm">
                    {tools.find(t => t.id === selectedTool)?.name}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-64 bg-gray-800 border-l-2 border-gray-600 flex flex-col">
          <div className="p-3 border-b border-gray-600">
            <h3 className="font-black text-white text-sm">PROPERTIES</h3>
          </div>
          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {properties.map((prop, index) => (
              <div key={index} className="space-y-1">
                <label className="text-xs font-bold text-gray-300">{prop.name}</label>
                <div className="bg-gray-700 border border-gray-600 rounded p-2">
                  <span className="text-white text-sm">{prop.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-800 border-t-2 border-gray-600 p-2 flex justify-between items-center text-white text-sm">
        <div className="flex space-x-4">
          <span>Parts: 2</span>
          <span>Scripts: 0</span>
          <span>Memory: 12.4 MB</span>
        </div>
        <div className="flex space-x-4">
          <span>Camera: {selectedTool === "move" ? "Move" : "Orbit"}</span>
          <span>Grid: 1 stud</span>
        </div>
      </div>
    </div>
  );
};

export default Studio;