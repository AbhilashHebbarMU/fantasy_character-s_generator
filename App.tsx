
import React, { useState } from 'react';
import { type Character } from './types';
import { generateCharacter, generateCharacterPortrait, generateCharacterBackstory } from './services/geminiService';
import CharacterDisplay from './components/CharacterDisplay';
import GenerateButton from './components/GenerateButton';
import ErrorDisplay from './components/ErrorDisplay';
import Header from './components/Header';
import DeckDisplay from './components/DeckDisplay';

const App: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [backstory, setBackstory] = useState<string | null>(null);
  const [deck, setDeck] = useState<Character[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [isGeneratingCharacter, setIsGeneratingCharacter] = useState<boolean>(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState<boolean>(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCharacterClick = async () => {
    setIsGeneratingCharacter(true);
    setError(null);
    setCharacter(null);
    setPortraitUrl(null);
    setBackstory(null);
    setIsSaved(false);
    try {
      const newCharacter = await generateCharacter();
      setCharacter(newCharacter);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsGeneratingCharacter(false);
    }
  };

  const handleGeneratePortraitClick = async () => {
    if (!character) return;
    setIsGeneratingPortrait(true);
    setError(null);
    try {
      const newPortraitUrl = await generateCharacterPortrait(character);
      setPortraitUrl(newPortraitUrl);
      setCharacter(prev => prev ? { ...prev, portraitUrl: newPortraitUrl } : null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsGeneratingPortrait(false);
    }
  };
  
  const handleGenerateBackstoryClick = async () => {
    if (!character) return;
    setIsGeneratingBackstory(true);
    setError(null);
    setBackstory(null);
    try {
      const newBackstory = await generateCharacterBackstory(character);
      setBackstory(newBackstory);
      setCharacter(prev => prev ? { ...prev, backstory: newBackstory } : null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsGeneratingBackstory(false);
    }
  };

  const handleSaveToDeck = () => {
    if (!character || isSaved) return;
    setDeck(prevDeck => [...prevDeck, { ...character, portraitUrl, backstory }]);
    setIsSaved(true);
  };

  const isGenerating = isGeneratingCharacter || isGeneratingPortrait || isGeneratingBackstory;
  const showActionButtons = character && !isGeneratingCharacter;

  return (
    <div className="min-h-screen text-gray-100 font-serif flex flex-col items-center p-4">
      <main className="w-full max-w-lg mx-auto flex flex-col items-center text-center space-y-8">
        <Header />

        <div className="w-full">
          <CharacterDisplay
            character={character}
            isGeneratingCharacter={isGeneratingCharacter}
            isGeneratingPortrait={isGeneratingPortrait}
            isGeneratingBackstory={isGeneratingBackstory}
          />
        </div>
        
        <ErrorDisplay error={error} />

        <div className="w-full pt-4">
          {!character && !isGeneratingCharacter ? (
            <GenerateButton onClick={handleGenerateCharacterClick} isLoading={isGeneratingCharacter}>
              Summon a Hero
            </GenerateButton>
          ) : showActionButtons && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GenerateButton 
                  onClick={handleGeneratePortraitClick} 
                  isLoading={isGenerating}
                  className="py-3 text-base"
                >
                  {character.portraitUrl ? 'New Portrait' : 'Gen. Portrait'}
                </GenerateButton>
                 <GenerateButton 
                  onClick={handleGenerateBackstoryClick} 
                  isLoading={isGenerating}
                  className="py-3 text-base bg-green-600 hover:bg-green-700 focus:ring-green-500"
                >
                  {character.backstory ? 'New Backstory' : 'Gen. Backstory'}
                </GenerateButton>
                 <GenerateButton
                  onClick={handleSaveToDeck}
                  isLoading={isGenerating}
                  disabled={isSaved || isGenerating}
                  className={`py-3 text-base ${isSaved ? 'bg-gray-500' : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'}`}
                >
                  {isSaved ? 'Saved!' : 'Save to Deck'}
                </GenerateButton>
              </div>
              <GenerateButton 
                onClick={handleGenerateCharacterClick} 
                isLoading={isGenerating} 
                className="py-3 text-lg bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500"
              >
                Summon Another
              </GenerateButton>
            </div>
          )}
           {isGeneratingCharacter && (
              <GenerateButton onClick={() => {}} isLoading={true}>
                Summoning...
              </GenerateButton>
           )}
        </div>
      </main>
      
      <DeckDisplay deck={deck} />
      
      <footer className="w-full text-center py-4 mt-8 text-xs text-gray-500">
        Powered by Google Gemini
      </footer>
    </div>
  );
};

export default App;
