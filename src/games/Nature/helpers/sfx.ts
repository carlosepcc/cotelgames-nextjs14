// Function to play sound
export const playSound = (freq:number = 250, type:OscillatorType = "triangle", duration = 350) => {
  // Create a new AudioContext instance for each call
  const audioContext = new window.AudioContext();

  // Create a new OscillatorNode instance
  const oscillator = audioContext.createOscillator();

  // Set the oscillator type and frequency
  oscillator.type = type;
  oscillator.frequency.value = freq; // Using value instead of setValueAtTime for simplicity

  // Connect the oscillator to the destination (the speakers)
  oscillator.connect(audioContext.destination);

  // Start the oscillator
  oscillator.start();

  // Stop the oscillator after a specified duration
  setTimeout(() => {
    oscillator.stop();
    audioContext.close(); // Close the AudioContext when done
  }, duration); // Adjust the duration as needed
};
