
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 font-fantasy">
        Fantasy Character Generator
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Summon heroes from the digital ether with the power of AI.
      </p>
    </header>
  );
};

export default Header;
