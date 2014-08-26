Cakewalk-A-300-PRO
==================

Cakewalk-A-300-PRO controller script.

==================

Installation:

1: copy the file C:\Users\your name\Documents\Bitwig Studio on win.
2: Open it in an Editor like Notepad. Do not use word.
3: follow these steps here: http://www.kvraudio.com/forum/viewtopic.php?p=5693803#p5693803
   you probaply just need to change the UUID Number.
4: Check out if yourController Map sends the same MIDI CCs like they are defined in the variables -> Line 24-38.
   To check this, uncomment  printMidi(status, data1, data2); in function midiOn at the bottom
   then open the console and move the controllers to see if the MIDI CC match. If not change them in the script,
   according to your MIDI CCs.   
5: Start Bitwig and enjoy!   
