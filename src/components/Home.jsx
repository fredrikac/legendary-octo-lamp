import { useState } from 'react';

const Home = () => {
  const [buttonText, setButtonText] = useState('Logga in');
  const [buttonColor, setButtonColor] = useState('green');

  const toggle = () => {
    setButtonText('Logga ut')
    setButtonColor('red')
  }

  return (
    <div>
      <button onClick={toggle} style={{ backgroundColor: `${buttonColor}` }}>{buttonText}</button>
    </div>
  );
};

export default Home;