/**
 * Created by Suloo on 26.08.2014.
 */
loadAPI(1);

host.defineController("Cakewalk", "A-300 PRO", "1.0", "e504e660-2b27-11e4-8c21-0800200c9a66");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["A-PRO 1"], ["A-PRO"]);

// CC 0 and CCs 120+ are reserved
var LOWEST_CC = 1;
var HIGHEST_CC = 119;

// Two array-variables to hold the values of all the CCs and to check if they have changed
var ccValue = initArray(0, ((HIGHEST_CC - LOWEST_CC + 1)*16));
var ccValueOld = initArray(0, ((HIGHEST_CC - LOWEST_CC + 1)*16));


/*Load the A-300 Bitwig.mid file in your A-300 Editor and transmit it to the Hardware device. Then select
 the controller Map.*/

var _down     = 22;
var _up       = 23;
var _stop     = 25;
var _play     = 26;
var _loop     = 27;
var _record   = 28;
var _b1       = 29;
var _b2       = 30;
var _b4       = 4;

var _knob1    = 102;
var _knob2    = 103;
var _knob3    = 104;
var _knob4    = 105;
var _knob5    = 106;
var _knob6    = 107;
var _knob7    = 108;
var _knob8    = 109;
var _mastervolume = 118;




// A function to create an indexed function for the Observers
function getValueObserverFunc(index, varToStore)
{
    return function(value)
    {
        varToStore[index] = value;
    }
}

function init()
{
    transport = host.createTransport();
    cursorTrack = host.createCursorTrack(0,0);
    primaryDevice = cursorTrack.getPrimaryDevice();
    masterTrack = host.createMasterTrack(0);
    application   = host.createApplication();

    for (var i = 0; i < 8; i++) {
        primaryDevice.getMacro(i).getAmount().setIndication(true);
    }

    // Create 16 NoteInputs + Omni.
    // Verbose to allow commenting out unneeded channels
    // To do so, put "//" in front of the lines containing channels you don't want to use
    // Be sure to do it for the "createNoteInput" lines as well as the corresponding
    // "setShouldConsumeEvents" and "assignPolyphonicAftertouchToExpression" lines below
    MultiBi   = host.getMidiInPort(0).createNoteInput("MultiBi - Omni", "??????");
    MultiBi1  = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 1", "?0????");
    MultiBi2  = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 2", "?1????");
    /*MultiBi3  = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 3", "?2????");
     MultiBi4  = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 4", "?3????");
     MultiBi5  = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 5", "?4????");
     MultiBi6  = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 6", "?5????");
     MultiBi7  = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 7", "?6????");
     MultiBi8  = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 8", "?7????");
     MultiBi9  = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 9", "?8????");
     MultiBi10 = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 10", "?9????");
     MultiBi11 = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 11", "?A????");
     MultiBi12 = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 12", "?B????");
     MultiBi13 = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 13", "?C????");
     MultiBi14 = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 14", "?D????");
     MultiBi15 = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 15", "?E????");
     MultiBi16 = host.getMidiInPort(0).createNoteInput("MultiBi - Ch 16", "?F????");*/

    // Disable the consuming of events by the NoteInputs, so they are also available for mapping
    MultiBi.setShouldConsumeEvents(false);
    MultiBi1.setShouldConsumeEvents(false);
    /* MultiBi2.setShouldConsumeEvents(false);
     MultiBi3.setShouldConsumeEvents(false);
     MultiBi4.setShouldConsumeEvents(false);
     MultiBi5.setShouldConsumeEvents(false);
     MultiBi6.setShouldConsumeEvents(false);
     MultiBi7.setShouldConsumeEvents(false);
     MultiBi8.setShouldConsumeEvents(false);
     MultiBi9.setShouldConsumeEvents(false);
     MultiBi10.setShouldConsumeEvents(false);
     MultiBi11.setShouldConsumeEvents(false);
     MultiBi12.setShouldConsumeEvents(false);
     MultiBi13.setShouldConsumeEvents(false);
     MultiBi14.setShouldConsumeEvents(false);
     MultiBi15.setShouldConsumeEvents(false);
     MultiBi16.setShouldConsumeEvents(false);*/

    // Enable Poly AT translation into Timbre for the internal BWS instruments
    MultiBi.assignPolyphonicAftertouchToExpression(0,   NoteExpression.TIMBRE_UP, 5);
    MultiBi1.assignPolyphonicAftertouchToExpression(0,   NoteExpression.TIMBRE_UP, 5);
    MultiBi2.assignPolyphonicAftertouchToExpression(1,   NoteExpression.TIMBRE_UP, 5);
    /*MultiBi3.assignPolyphonicAftertouchToExpression(2,   NoteExpression.TIMBRE_UP, 5);
     MultiBi4.assignPolyphonicAftertouchToExpression(3,   NoteExpression.TIMBRE_UP, 5);
     MultiBi5.assignPolyphonicAftertouchToExpression(4,   NoteExpression.TIMBRE_UP, 5);
     MultiBi6.assignPolyphonicAftertouchToExpression(5,   NoteExpression.TIMBRE_UP, 5);
     MultiBi7.assignPolyphonicAftertouchToExpression(6,   NoteExpression.TIMBRE_UP, 5);
     MultiBi8.assignPolyphonicAftertouchToExpression(7,   NoteExpression.TIMBRE_UP, 5);
     MultiBi9.assignPolyphonicAftertouchToExpression(8,   NoteExpression.TIMBRE_UP, 5);
     MultiBi10.assignPolyphonicAftertouchToExpression(9,  NoteExpression.TIMBRE_UP, 5);
     MultiBi11.assignPolyphonicAftertouchToExpression(10, NoteExpression.TIMBRE_UP, 5);
     MultiBi12.assignPolyphonicAftertouchToExpression(11, NoteExpression.TIMBRE_UP, 5);
     MultiBi13.assignPolyphonicAftertouchToExpression(12, NoteExpression.TIMBRE_UP, 5);
     MultiBi14.assignPolyphonicAftertouchToExpression(13, NoteExpression.TIMBRE_UP, 5);
     MultiBi15.assignPolyphonicAftertouchToExpression(14, NoteExpression.TIMBRE_UP, 5);
     MultiBi16.assignPolyphonicAftertouchToExpression(15, NoteExpression.TIMBRE_UP, 5);*/




    // Enable Midi Beat Clock. Comment out if you don't want that
    host.getMidiOutPort(0).setShouldSendMidiBeatClock;

    // Setting Callbacks for Midi and Sysex
    host.getMidiInPort(0).setMidiCallback(onMidi);
    host.getMidiInPort(0).setSysexCallback(onSysex);

    // Make CCs 1-119 freely mappable for all 16 Channels
    userControls = host.createUserControls((HIGHEST_CC - LOWEST_CC + 1)*16);

    for(var i=LOWEST_CC; i<=HIGHEST_CC; i++)
    {
        for (var j=1; j<=16; j++) {
            // Create the index variable c
            var c = i - LOWEST_CC + (j-1) * (HIGHEST_CC-LOWEST_CC+1);
            // Set a label/name for each userControl
            userControls.getControl(c).setLabel("CC " + i + " - Channel " + j);
            // Add a ValueObserver for each userControl
            userControls.getControl(c).addValueObserver(127, getValueObserverFunc(c, ccValue));
        }
    }
}




function exit()
{
    // nothing to do here ;-)
}


// Update the UserControls when Midi Data is received
function onMidi(status, data1, data2)
{

    printMidi(status, data1, data2);

    if (isChannelController(status))
    {
        switch (data1)
        {

            case _stop:
                transport.stop();
                break;

            case _play:
                transport.play();
                break;

            case _record:
                transport.record();
                break;
            case _loop:
                transport.toggleLoop();
                break;
            case _up:
                cursorTrack.selectNext();
                break;
            case _down:
                cursorTrack.selectPrevious();
                break;
            case _mastervolume:
                masterTrack.getVolume().set(data2, 128);
                masterTrack.getVolume().setIndication(true);
                break;
            case _b1:
                application.nextPerspective();
                break;
            case _b2:
                application.previousPerspective();
                break;
            case _b4:
                cursorTrack.returnToArrangement();
                break;

            case _knob1:
                primaryDevice.getMacro(0).getAmount().set(data2, 128);
                break;
            case _knob2:
                primaryDevice.getMacro(1).getAmount().set(data2, 128);
                break;
            case _knob3:
                primaryDevice.getMacro(2).getAmount().set(data2, 128);
                break;
            case _knob4:
                primaryDevice.getMacro(3).getAmount().set(data2, 128);
                break;
            case _knob5:
                primaryDevice.getMacro(4).getAmount().set(data2, 128);
                break;
            case _knob6:
                primaryDevice.getMacro(5).getAmount().set(data2, 128);
                break;
            case _knob7:
                primaryDevice.getMacro(6).getAmount().set(data2, 128);
                break;
            case _knob8:
                primaryDevice.getMacro(7).getAmount().set(data2, 128);
                break;
        }
        if (data1 >= LOWEST_CC && data1 <= HIGHEST_CC)
        {
            var index = data1 - LOWEST_CC + ((HIGHEST_CC-LOWEST_CC+1) * MIDIChannel(status));
            userControls.getControl(index).set(data2, 128);
        }

    }

}


function onSysex(data)
{
    //printSysex(data);
}