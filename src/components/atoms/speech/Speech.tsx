import React, { FC, useEffect, useState } from 'react';

import { VolumeUpRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface SpeechProps {
  text: string;
}

const Speech: FC<SpeechProps> = ({ text }) => {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | undefined>();

  useEffect(() => {
    const loadVoice = () => {
      const voices = speechSynthesis.getVoices().filter(({ lang }) => lang === 'en-US');

      const googleVoice = voices.find(({ voiceURI }) => voiceURI === 'Google US English');
      const appleVoice = voices.find(
        ({ voiceURI }) => voiceURI === 'com.apple.voice.compact.en-US.Samantha',
      );

      setVoice(googleVoice || appleVoice || voices[0]);
    };

    loadVoice();

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoice;
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = () => {
    const msg = new SpeechSynthesisUtterance();

    msg.text = text;
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;

    if (voice) msg.voice = voice;

    speechSynthesis.speak(msg);
  };

  if (!('speechSynthesis' in window)) return null;

  return (
    <IconButton onClick={speak}>
      <VolumeUpRounded />
    </IconButton>
  );
};

export default Speech;
