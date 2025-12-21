
import React from 'react';
import { type Character } from '../types';

interface DeckDisplayProps {
  deck: Character[];
}

const DeckCard: React.FC<{ character: Character }> = ({ character }) => (
  <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-cyan-500/20 flex items-center p-2 space-x-3 transform hover:scale-105 transition-transform duration-300">
    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-black/50">
      {character.portraitUrl ? (
        <img src={character.portraitUrl} alt={character.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-cyan-400 text-3xl font-fantasy">?</div>
      )}
    </div>
    <div className="text-left">
      <h3 className="font-bold text-white font-fantasy text-lg">{character.name}</h3>
      <p className="text-sm text-cyan-300">{character.characterClass}</p>
      <div className="flex space-x-2 text-xs mt-1">
        <span className="text-red-400">❤️{character.health}</span>
        <span className="text-blue-400">🔮{character.mana}</span>
        <span className="text-yellow-400">⚔️{character.strength}</span>
      </div>
    </div>
  </div>
);


const DeckDisplay: React.FC<DeckDisplayProps> = ({ deck }) => {
  if (deck.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center mb-6 font-fantasy text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
        My Deck
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deck.map((character, index) => (
          <DeckCard key={`${character.name}-${index}`} character={character} />
        ))}
      </div>
    </section>
  );
};

export default DeckDisplay;
