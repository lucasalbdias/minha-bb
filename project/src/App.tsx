import React, { useState, useEffect, useRef } from 'react';
import { Heart, Cat, Stars, Gift, Music, MessageCircleHeart, Sparkles, Camera, Cloud, Moon, Sun } from 'lucide-react';

function App() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number; rotation: number }[]>([]);
  const [catIndex, setCatIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [showPhotoFrame, setShowPhotoFrame] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);

  const catImages = [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  const uniqueLoveMessages = [
    "Cada estrela no céu é um motivo pelo qual te amo, infinitas e brilhantes.",
    "Se eu pudesse criar um universo, ele seria feito apenas dos momentos ao seu lado.",
    "Seu sorriso é a magia que transforma meus dias comuns em extraordinários.",
    "Nem todos os poetas do mundo conseguiriam descrever o que sinto por você.",
    "Em cada batida do meu coração, seu nome é sussurrado como uma canção secreta.",
    "Você não é apenas minha princesa, é a artista que pinta cores em minha vida.",
    "Se o tempo parasse agora, eu escolheria eternizar cada segundo com você."
  ];

  const specialMessage = "Minha princesa, você não é apenas alguém que eu amo, mas a razão pela qual meu coração conheceu o verdadeiro significado do amor. Cada momento ao seu lado é como descobrir um novo universo de emoções que eu nunca soube que existiam. Seu sorriso tem o poder de transformar o dia mais cinzento no mais colorido, e seu abraço é o lugar onde encontro paz mesmo nos momentos mais turbulentos. Você é extraordinária em cada detalhe, desde a forma como seus olhos brilham quando está feliz até o jeito único como pronuncia meu nome. Te amo além das palavras, além do tempo, além de tudo que é conhecido. Você é meu milagre diário, minha inspiração constante, minha princesa eterna.";

  useEffect(() => {
    // Determine time of day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('afternoon');
    } else if (hour >= 18 && hour < 22) {
      setTimeOfDay('evening');
    } else {
      setTimeOfDay('night');
    }

    // Cat image rotation
    const interval = setInterval(() => {
      setCatIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showMessage && specialMessage) {
      setCurrentMessage('');
      setIsTyping(true);
      
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < specialMessage.length) {
          setCurrentMessage(prev => prev + specialMessage.charAt(i));
          i++;
          
          if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
          }
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [showMessage]);

  const handleClick = (e: React.MouseEvent) => {
    // Create heart
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 30 + 20,
      rotation: Math.random() * 360
    };
    setHearts((prevHearts) => [...prevHearts, newHeart]);

    // Create sparkles
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: e.clientX + (Math.random() * 60 - 30),
      y: e.clientY + (Math.random() * 60 - 30),
      size: Math.random() * 8 + 2,
      color: `hsl(${Math.random() * 60 + 300}, 100%, 70%)`
    }));
    setSparkles(prev => [...prev, ...newSparkles]);

    // Remove hearts and sparkles after animation
    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
    }, 2000);
    
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.some(ns => ns.id === s.id)));
    }, 1500);
  };

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const togglePhotoFrame = () => {
    setShowPhotoFrame(!showPhotoFrame);
  };

  const getTimeIcon = () => {
    switch(timeOfDay) {
      case 'morning': return <Sun className="text-yellow-400" size={24} />;
      case 'afternoon': return <Sun className="text-orange-400" size={24} />;
      case 'evening': return <Cloud className="text-indigo-400" size={24} />;
      case 'night': return <Moon className="text-indigo-600" size={24} />;
    }
  };

  const getGreeting = () => {
    switch(timeOfDay) {
      case 'morning': return "Bom dia, minha princesa!";
      case 'afternoon': return "Boa tarde, minha princesa!";
      case 'evening': return "Boa noite, minha princesa!";
      case 'night': return "Doces sonhos, minha princesa!";
    }
  };

  const getBackgroundStyle = () => {
    switch(timeOfDay) {
      case 'morning': return "from-pink-100 via-yellow-50 to-blue-100";
      case 'afternoon': return "from-orange-50 via-pink-100 to-purple-100";
      case 'evening': return "from-purple-100 via-pink-200 to-indigo-100";
      case 'night': return "from-indigo-200 via-purple-200 to-blue-200";
    }
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${getBackgroundStyle()} flex flex-col items-center p-4 relative overflow-hidden transition-all duration-1000`}
      onClick={handleClick}
    >
      {/* Floating elements background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float text-pink-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.6,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {i % 3 === 0 ? (
              <Heart size={Math.random() * 20 + 10} fill="#FFC0CB" />
            ) : i % 3 === 1 ? (
              <Stars size={Math.random() * 15 + 8} fill="#FFD700" />
            ) : (
              <Sparkles size={Math.random() * 15 + 8} className="text-yellow-300" />
            )}
          </div>
        ))}
      </div>

      {/* Click hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed animate-float-up pointer-events-none"
          style={{
            left: heart.x - heart.size / 2,
            top: heart.y - heart.size / 2,
            transform: `rotate(${heart.rotation}deg)`
          }}
        >
          <Heart size={heart.size} fill="#FF69B4" />
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed animate-sparkle pointer-events-none"
          style={{
            left: sparkle.x - sparkle.size / 2,
            top: sparkle.y - sparkle.size / 2,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`
          }}
        />
      ))}

      <header className="text-center mb-8 mt-8 relative">
        <div className="absolute -top-4 -left-4 bg-white bg-opacity-70 rounded-full p-2 shadow-md">
          {getTimeIcon()}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2 animate-pulse">
          Eu Amo Minha Princesa
        </h1>
        <p className="text-lg text-purple-600 italic">
          {getGreeting()}
        </p>
      </header>

      <div className="max-w-4xl w-full backdrop-blur-sm bg-white bg-opacity-40 rounded-2xl shadow-lg p-6 mb-8 border border-pink-200">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 relative">
            <div className="rounded-lg overflow-hidden shadow-lg border-4 border-pink-300 transition-all duration-500 transform hover:scale-105 hover:rotate-2">
              <img 
                src={catImages[catIndex]} 
                alt="Gatinho fofo" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-transparent opacity-20"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-pink-100 rounded-full p-3 shadow-md border-2 border-pink-300 transform hover:rotate-12 transition-all cursor-pointer" onClick={togglePhotoFrame}>
              <Camera size={30} className="text-pink-600" />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-400" fill="currentColor" />
              Mensagem Única
              <Sparkles className="text-yellow-400" fill="currentColor" />
            </h2>
            <p className="text-lg text-purple-700 mb-6 italic font-medium p-4 bg-white bg-opacity-50 rounded-lg shadow-inner">
              {uniqueLoveMessages[Math.floor(Math.random() * uniqueLoveMessages.length)]}
            </p>
            <button 
              onClick={toggleMessage} 
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 flex items-center mx-auto transform hover:scale-105"
            >
              <MessageCircleHeart className="mr-2" />
              {showMessage ? "Esconder Mensagem" : "Mensagem Especial"}
            </button>
          </div>
        </div>
      </div>

      {showPhotoFrame && (
        <div className="max-w-4xl w-full backdrop-blur-md bg-white bg-opacity-30 rounded-xl p-6 mb-8 shadow-lg animate-fade-in border-2 border-pink-300 relative">
          <button 
            onClick={togglePhotoFrame}
            className="absolute top-2 right-2 text-pink-600 hover:text-pink-800"
          >
            ✕
          </button>
          <h3 className="text-xl font-bold text-pink-700 mb-4 text-center">Nossa Galeria de Momentos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {catImages.map((img, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-lg"></div>
                <img 
                  src={img} 
                  alt={`Momento especial ${index + 1}`} 
                  className="w-full h-40 object-cover rounded-lg shadow-md transform transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="text-white" fill="white" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showMessage && (
        <div className="max-w-2xl w-full backdrop-blur-md bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl p-6 mb-8 shadow-lg animate-fade-in border-2 border-pink-300">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 text-center">Carta de Amor Única</h3>
          <div 
            ref={messageRef}
            className="text-purple-800 leading-relaxed text-center h-48 overflow-y-auto custom-scrollbar p-4 bg-white bg-opacity-50 rounded-lg"
          >
            <p>{currentMessage}</p>
            {isTyping && <span className="typing-cursor">|</span>}
          </div>
          <div className="flex justify-center mt-4">
            <Heart className="text-red-500 animate-beat" fill="#FF0080" size={40} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
        <div className="backdrop-blur-sm bg-white bg-opacity-30 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:rotate-1 border-2 border-pink-200">
          <div className="flex items-center justify-center mb-3">
            <Heart className="text-pink-600 animate-pulse" fill="#FF69B4" />
          </div>
          <h3 className="text-lg font-bold text-pink-700 text-center mb-2">Amor Infinito</h3>
          <p className="text-purple-700 text-center text-sm">
            Meu amor por você não tem limites, cresce a cada dia como um universo em expansão.
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white bg-opacity-30 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:rotate-1 border-2 border-purple-200">
          <div className="flex items-center justify-center mb-3">
            <Cat className="text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-purple-700 text-center mb-2">Fofura Eterna</h3>
          <p className="text-purple-700 text-center text-sm">
            Assim como esses gatinhos, você traz fofura e alegria para todos os momentos da minha vida.
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white bg-opacity-30 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:rotate-1 border-2 border-pink-200">
          <div className="flex items-center justify-center mb-3">
            <Gift className="text-pink-600" />
          </div>
          <h3 className="text-lg font-bold text-pink-700 text-center mb-2">Presente Divino</h3>
          <p className="text-purple-700 text-center text-sm">
            Você é o presente mais precioso que eu poderia receber, minha princesa querida.
          </p>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 flex gap-2">
        <button 
          onClick={toggleMusic}
          className={`rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110 ${isPlaying ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-white text-pink-600'}`}
        >
          <Music size={24} />
        </button>
      </div>

      <audio id="bgMusic" loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      <footer className="text-center text-pink-700 mt-auto mb-4">
        <p>Feito exclusivamente com amor para minha princesa ❤️</p>
      </footer>
    </div>
  );
}

export default App;