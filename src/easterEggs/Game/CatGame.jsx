import { useState, useEffect, useRef } from 'react';
import { useColor } from '../../context/ColorContext';
import DraggableCat from './catGameComp/DraggableCat';
import Rat from '../../assets/logos/Rat';
import Life from '../../assets/logos/life';
import Bomb from '../../assets/logos/Bomb';

const CatGame = () => {
  const { textColor, color } = useColor();

  const [ratQueue, setRatQueue] = useState(() => Array(3).fill().map(getRandomRat)); // Initialize with 3 rats
  const [bombQueue, setBombQueue] = useState(() => Array(3).fill().map(getRandomBomb)); // Initialize with 3 bombs
  const [catPosition, setCatPosition] = useState(0); // Store cat's X position
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(7); // Cat starts with 7 lives
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game is started

  const fallingRatRef = useRef(null);

  // Randomize the size and position of the next rat
  function getRandomRat() {
    const isBigRat = Math.random() < 0.1; // 10% chance for a big rat
    return {
      id: Math.random(), // Unique ID for each rat
      x: Math.random() * (window.innerWidth - (isBigRat ? 100 : 60)), // Adjust width for big rat
      y: -30,
      size: isBigRat ? 'big' : 'normal',
    };
  }

  // Randomize bomb position
  function getRandomBomb() {
    return {
      id: Math.random(),
      x: Math.random() * window.innerWidth, // Random X position for bomb
      y: -30,
    };
  }

  // Handle falling rats and bombs
  useEffect(() => {
    if (!gameStarted || isGameOver || lives <= 0) return;

    const gameSpeed = Math.max(20 - Math.floor(score / 10), 5); // Make it faster as the score increases

    const interval = setInterval(() => {
      // Handle rats falling
      setRatQueue((prevQueue) => {
        return prevQueue.map((rat) => {
          const newY = rat.y + 5; // Increase Y for falling speed

          if (newY > window.innerHeight) {
            // If the rat goes off screen, reset it with a new one
            setScore((prevScore) => prevScore - 2); // Missed rat, subtract 2 points
            return getRandomRat(); // New rat
          }

          // Check for collision with the cat
          if (
            newY > window.innerHeight - 70 &&
            Math.abs(catPosition - rat.x) < (rat.size === 'big' ? 80 : 50)
          ) {
            // Collision detected with a rat
            setScore((prevScore) => prevScore + (rat.size === 'big' ? 5 : 2.5));
            return getRandomRat(); // Replace with a new rat
          }

          return { ...rat, y: newY }; // Update the rat's position
        });
      });

      // Handle bombs falling
      setBombQueue((prevQueue) => {
        return prevQueue.map((bomb) => {
          const newBombY = bomb.y + 5;

          if (newBombY > window.innerHeight - 70 && Math.abs(catPosition - bomb.x) < 50) {
            // Bomb hits the cat
            setLives((prevLives) => {
              const updatedLives = Math.max(prevLives - 1, 0);
              if (updatedLives === 0) {
                setIsGameOver(true); // Set game over if lives are 0
              }
              return updatedLives;
            });
            return getRandomBomb(); // Replace with a new bomb
          } else if (newBombY > window.innerHeight) {
            // Bomb goes off screen
            return getRandomBomb(); // Reset bomb
          } else {
            return { ...bomb, y: newBombY }; // Update bomb position
          }
        });
      });
    }, gameSpeed);

    return () => clearInterval(interval); // Cleanup interval
  }, [catPosition, gameStarted, isGameOver, lives, score]);

  // Handle position change from DraggableCat
  const handleCatPositionChange = (newPosition) => {
    const screenWidth = window.innerWidth;
    // Limit the cat's movement to stay within screen width
    const restrictedPosition = Math.min(
      Math.max(newPosition, 0), // Prevent moving off the left
      screenWidth - 80 // Prevent moving off the right, considering the cat's size
    );
    setCatPosition(restrictedPosition);
  };

  // Restart game after game over
  const handleGameOver = () => {
    setLives(7); // Reset lives to 7
    setScore(0);
    setIsGameOver(false);
    setRatQueue(Array(3).fill().map(getRandomRat)); // Reset with 3 rats
    setBombQueue(Array(3).fill().map(getRandomBomb)); // Reset with 3 bombs
  };

  // Start the game
  const startGame = () => {
    setGameStarted(true); // Set gameStarted to true to start the game
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-between relative overflow-hidden"
      style={{ color: textColor }}
    >
  {!gameStarted && (
  <div className="w-full h-full flex flex-col justify-evenly items-center">
    {/* Game Rules */}
    <div className="text-start text-2xl font-['themeFont']  max-w-[80%]">
      <h2 className="text-6xl text-center font-['Bigger'] uppercase mb-5">Game Rules</h2>
      <p className="mb-2">1. Control the cat to catch falling rats and avoid bombs.</p>
      <p className="mb-2">2. Each rat caught will increase your score. Big rats give more points!</p>
      <p className="mb-2">3. Bombs will subtract one life each time they hit the cat.</p>
      <p className="mb-4">4. You have 7 lives to start with. Game over when all lives are lost.</p>
    </div>

    {/* Play Game Button */}
    <button
      onClick={startGame}
      className="font-['Bigger'] p-4 pt-5 rounded-lg text-4xl uppercase"
      style={{
        color: color,
        backgroundColor: textColor
      }}
    >
      Play Game
    </button>
  </div>
)}


      {/* If the game has started, show the game UI */}
      {gameStarted && (
        <>
          {/* Score and Lives */}
          <div className="text-xl text-center mt-52">
            <p className="font-['Bigger'] text-9xl opacity-60">{score}</p>
            {/* Display remaining lives */}
            <div className="flex flex-col opacity-60">
              {Array.from({ length: lives }).map((_, idx) => (
                <Life key={idx} color={textColor} size="20" />
              ))}
            </div>
            {isGameOver && (
              <div className="mt-10 text-center">
                <p className="text-3xl font-['GameOver']">Game Over!</p>
                <button
                  onClick={handleGameOver}
                  className="px-6 pt-5 mt-10 font-['Bigger'] uppercase py-3 text-6xl border rounded-lg"
                  style={{
                    borderColor: textColor,
                  }}
                >
                  Restart Game
                </button>
              </div>
            )}
          </div>

          <div className="w-[screen]">
            {/* Falling rats */}
            {ratQueue.length > 0 &&
              ratQueue.map((rat) => (
                <div
                  key={rat.id}
                  className="absolute"
                  style={{
                    left: `${rat.x}px`, // Position the rat horizontally
                    top: `${rat.y}px`, // Position vertically for the falling effect
                    transition: 'top 0.02s linear', // Smooth transition
                  }}
                >
                  <Rat
                    color={textColor}
                    size={rat.size === 'big' ? '50' : '20'} // Adjust size based on type
                  />
                </div>
              ))}

            {/* Falling bombs */}
            {bombQueue.length > 0 &&
              bombQueue.map((bomb) => (
                <div
                  key={bomb.id}
                  className="absolute"
                  style={{
                    left: `${bomb.x}px`,
                    top: `${bomb.y}px`,
                    width: '30px',
                    height: '30px',
                  }}
                >
                  <Bomb color={textColor} size="30" /> {/* Use Bomb component here */}
                </div>
              ))}

            {/* Draggable cat */}
            <DraggableCat position={catPosition} onPositionChange={handleCatPositionChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default CatGame;
