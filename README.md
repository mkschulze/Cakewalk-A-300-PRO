Cakewalk-A-300-PRO
==================

Cakewalk-A-300-PRO controller script.

==================
Features:

1: Transport Control <br>
2: Loops cycle on/off<br>
3: Track selection with fwd/rwd buttons<br>
4: Slider 9 linkted to master volume<br>
5: Rotary knobs linked to primary device macros<br>

==================
Installation:

1: Copy the file C:\Users\your name\Documents\Bitwig Studio on win.<br>
2: Open it in an Editor like Notepad. Do not use word.<br>
3: follow these steps here: http://www.kvraudio.com/forum/viewtopic.php?p=5693803#p5693803<br>
   you probaply just need to change the UUID Number.<br>
4: Check out if yourController Map sends the same MIDI CCs like they are defined in the variables in Line 24-38.<br>
   To check this, uncomment  printMidi(status, data1, data2); in function midiOn at the bottom<br>
   then open the console and move the controllers to see if the MIDI CC match. If not change them in the script,
   according to your MIDI CCs.<br>
5: Start Bitwig and enjoy..<br>
