import React from 'react';

interface NordnetCTAProps {
  variant?: 'high' | 'low';
}

const NordnetCTA: React.FC<NordnetCTAProps> = ({ variant }) => {
  const affiliateLink = "https://go.adt267.com/t/t?a=1582930370&as=2066019423&t=2&tk=1";
  const imageLink = "https://track.adtraction.com/t/t?a=2067948486&as=2066019423&t=1&tk=1&i=1";

  return (
    <div className={`my-12 flex justify-center w-full ${variant === 'low' ? 'opacity-90' : ''}`}>
      <a 
        href={affiliateLink} 
        target="_blank" 
        rel="sponsored noopener noreferrer"
        className="block w-full max-w-[728px] hover:opacity-95 transition-opacity"
      >
        <img 
          src={imageLink} 
          alt="Öppna konto hos Nordnet" 
          className="w-full h-auto rounded-lg shadow-sm"
        />
      </a>
    </div>
  );
};

export default NordnetCTA;


