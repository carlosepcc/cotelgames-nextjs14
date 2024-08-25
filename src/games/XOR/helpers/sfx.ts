export const playSound = (freq: number = 250) => {
  const audioContext = new (window.AudioContext || window.AudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain(); // Create a gain node

  oscillator.type = "sine"; // Set the oscillator type
  oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + 0.0); // Set initial frequency

  // Connect the oscillator to the gain node, and then to the destination
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Start at a small positive value to avoid the error and ensure initial audibility
  gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);

  // Exponentially ramp up the gain to 1 (full volume) over 0.01 seconds
  gainNode.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.01);

  // Transition to the next frequency after 0.2 seconds
  oscillator.frequency.setValueAtTime(200+ freq, audioContext.currentTime + 0.4);


  // Instead of ramping down to a very small value, keep the gain at a higher level until the sound stops
  gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.6); // Ramp down to a minimal level

  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
    audioContext.close(); // Close the AudioContext when done
  }, 600); // Adjust the duration as needed
};
