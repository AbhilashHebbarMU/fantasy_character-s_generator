
import React from 'react';
import { type Character } from '../types';

interface CharacterDisplayProps {
  character: Character | null;
  isGeneratingCharacter: boolean;
  isGeneratingPortrait: boolean;
  isGeneratingBackstory: boolean;
}

const StatDisplay: React.FC<{ label: string; value: number; icon: string; color: string }> = ({ label, value, icon, color }) => (
  <div className="flex flex-col items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${color}`}>{icon}</div>
    <p className="mt-1 text-sm text-gray-300">{label}</p>
    <p className="font-bold text-lg text-white">{value}</p>
  </div>
);

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ character, isGeneratingCharacter, isGeneratingPortrait, isGeneratingBackstory }) => {
  if (isGeneratingCharacter) {
    return (
      <div className="w-full h-auto min-h-[28rem] flex items-center justify-center bg-black bg-opacity-40 rounded-2xl shadow-2xl border-2 border-purple-500/30 p-6 backdrop-blur-md glowing-border">
        <div className="flex flex-col items-center justify-center animate-pulse">
          <svg className="w-12 h-12 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.69-3.182-3.182a8.25 8.25 0 0 0-11.667 0L2.985 16.95z" />
          </svg>
          <p className="mt-4 text-lg text-gray-400">Conjuring a hero...</p>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="w-full h-auto min-h-[28rem] flex items-center justify-center bg-black bg-opacity-40 rounded-2xl shadow-2xl border-2 border-purple-500/30 p-6 backdrop-blur-md glowing-border">
        <div className="text-center text-gray-400">
          <h2 className="text-2xl font-bold text-gray-300 font-fantasy">Welcome, Adventurer!</h2>
          <p className="mt-2">Your destiny awaits. Click the button to summon a new hero.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black bg-opacity-40 rounded-2xl shadow-2xl border-2 border-purple-500/30 p-4 backdrop-blur-md glowing-border space-y-4">
      {/* Portrait Section */}
      <div className="w-full h-64 bg-black/30 rounded-lg flex items-center justify-center overflow-hidden border border-purple-500/30">
        {isGeneratingPortrait ? (
           <div className="flex flex-col items-center justify-center animate-pulse text-purple-400">
             <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
             </svg>
             <p className="text-sm mt-2">Painting...</p>
           </div>
        ) : character.portraitUrl ? (
          <img src={character.portraitUrl} alt={`Portrait of ${character.name}`} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-500 p-4">
            <p className="text-sm">Generate a portrait to reveal your hero!</p>
          </div>
        )}
      </div>
      
      {/* Name and Class Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-fantasy">{character.name}</h2>
        <p className="mt-1 text-xl text-cyan-300">The {character.characterClass}</p>
      </div>

      {/* Backstory Section */}
      <div className="h-14 text-center px-2 flex items-center justify-center">
          {isGeneratingBackstory ? (
            <p className="text-gray-400 animate-pulse">Writing their legend...</p>
          ) : character.backstory ? (
            <p className="text-gray-300 italic text-sm">"{character.backstory}"</p>
          ) : <p className="text-gray-500 text-sm">Generate a backstory to discover their past.</p>}
      </div>

      {/* Stats Section */}
      <div className="flex justify-around pt-2 border-t border-purple-500/20">
        <StatDisplay label="Health" value={character.health} icon="❤️" color="text-red-500" />
        <StatDisplay label="Mana" value={character.mana} icon="🔮" color="text-blue-500" />
        <StatDisplay label="Strength" value={character.strength} icon="⚔️" color="text-yellow-500" />
      </div>
    </div>
  );
};

export default CharacterDisplay;
