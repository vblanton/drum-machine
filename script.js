// Hello
// This drum machine works pretty well (as long as no one moves the audio files from the freeCodeCamp server). Things should work as expected. It doesn't pass all the freeCodeCamp tests because I designed it differently then the tests expect. But it passes them in spirit.
// Currently the entire drum machine is a React component. However, the audio files, audio playing and volume are taken care of outside of the component as regular javascript variables.
// Some improvement to this code could include better code compaction/streamlining (combining functions, turning loops/switches into a function maybe), accessing state more accurately in functions since React does asychronous state updating, and better visual feedback like highlighting the drum pad when you press the corresponding key.

// todo: reduce latency in sounds by checking the sounds api and also possibly transitioning to preact, svelte, solid or something





//test

// 'use strict';

// const e = React.createElement;

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

// const domContainer = document.querySelector('#test');
// const root = ReactDOM.createRoot(domContainer);
// root.render(e(LikeButton));


// just some default audio to setup the variable
let audio = new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3");
let volume = .5;
audio.volume = volume;

// audio files for bank 1 and bank 2
let banks = {
  1: [
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
      ],
  2: [
      "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
      ]
};


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      display: "OFF", // display text
      bank: [], // current bank audio files
      bankSwitch: 1 // current bank number
      // volume: 0 // current volume
    };
    this.powerSwitch = this.powerSwitch.bind(this);
    this.bankSwitch = this.bankSwitch.bind(this);
    this.drumPress = this.drumPress.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
  }
    powerSwitch() {
      if (this.state.display == "OFF") {
        this.setState({
          bank: banks[this.state.bankSwitch],
          display: "ON"
        })
        }
      else {
        this.setState({
          bank: [],
          display: "OFF"
        })
      }
    }
    bankSwitch() {
      if (this.state.display == "OFF") {
        if (this.state.bankSwitch == 1) {
          this.setState({bankSwitch: 2})
        } else {
          this.setState({bankSwitch: 1})
        }
      } else if (this.state.bankSwitch == 1) {
        this.setState({
          bankSwitch: 2,
          bank: banks[2],
          display: "Bank 2!"
        })
      } else {
        this.setState({
          bankSwitch: 1,
          bank: banks[1],
          display: "Bank 1!"
        })
      }
    }
    drumPress(e) {
      if (this.state.display == "OFF") {
        return;
      }
      else {
        // some regex to pull the audio file name from the url and display it
        this.setState({
          display: e.target.id.match(/[^/\\&\?]+(?=([\?&].*$|$))/)
          })
        audio = new Audio(e.target.id);
        audio.volume = volume;
        audio.play();
      }
    }
    updateVolume(e) {
      this.setState({
        display: (Math.floor(e.target.value * 100)),
      })
      volume = e.target.value;
      audio.volume = volume;
    }
  render() {
    // code for using keystrokes to play the drum machine
    document.onkeydown = (e) => {
       switch (e.keyCode) {
         case 81:
           audio = new Audio(this.state.bank[0]);
           audio.volume = volume;
           audio.play();
           this.setState({
             display: this.state.bank[0].match(/[^/\\&\?]+(?=([\?&].*$|$))/)
           })
           return;
         case 87:
           audio = new Audio(this.state.bank[1]);
           audio.volume = volume;
           audio.play();
           this.setState({
             display: this.state.bank[1].match(/[^/\\&\?]+(?=([\?&].*$|$))/)
           })
           return;
         case 69:
           audio = new Audio(this.state.bank[2]);
           audio.volume = volume;
           audio.play();
           this.setState({
             display: this.state.bank[2].match(/[^/\\&\?]+(?=([\?&].*$|$))/)
           })
           return;
         case 65:
           audio = new Audio(this.state.bank[3]);
           audio.volume = volume;
           audio.play();
           this.setState({
             display: this.state.bank[3].match(/[^/\\&\?]+(?=([\?&].*$|$))/)
           })
           return;
         case 83:
           audio = new Audio(this.state.bank[4]);
           audio.volume = volume;
           audio.play();
           this.setState({
             display: this.state.bank[4].match(/[^/\\&\?]+(?=([\?&].*$|$))/)
           })
           return;
         case 68:
           audio = new Audio(this.state.bank[5]);
           audio.volume = volume;
           audio.play();
           this.setState({
             display: this.state.bank[5].match(/[^/\\&\?]+(?=([\?&].*$|$))/)
           })
           return;
         case 90:
           audio = new Audio(this.state.bank[6]);
           audio.volume = volume;
           audio.play();
           this.setState({
             display: this.state.bank[6].match(/[^/\\&\?]+(?=([\?&].*$|$))/)
           })
           return;
         case 88:
           audio = new Audio(this.state.bank[7]);
           audio.volume = volume;
           audio.play();
           this.setState({
             display: this.state.bank[7].match(/[^/\\&\?]+(?=([\?&].*$|$))/)
           })
           return;
         case 67:
           audio = new Audio(this.state.bank[8]);
           audio.volume = volume;
           audio.play();
           this.setState({
             display: this.state.bank[8].match(/[^/\\&\?]+(?=([\?&].*$|$))/)
           })
           return;
       }
     };
     return(
     <div id="drum-machine">
      <div class="title">
        <h3>Drum Machine</h3>
        <h4><em>built by apropos</em></h4>
      </div>
      <table>
        <tr>
          <td id="left">
            {/** <input type="text" onkeypress="keypress()" /> **/}
            <button onClick={this.drumPress} class="drum-pad" id={this.state.bank[0]}>Q</button>
            <button onClick={this.drumPress} class="drum-pad" id={this.state.bank[1]}>W</button>
            <button onClick={this.drumPress} class="drum-pad" id={this.state.bank[2]}>E</button>
            <button onClick={this.drumPress} class="drum-pad" id={this.state.bank[3]}>A</button>
            <button onClick={this.drumPress} class="drum-pad" id={this.state.bank[4]}>S</button>
            <button onClick={this.drumPress} class="drum-pad" id={this.state.bank[5]}>D</button>
            <button onClick={this.drumPress} class="drum-pad" id={this.state.bank[6]}>Z</button>
            <button onClick={this.drumPress} class="drum-pad" id={this.state.bank[7]}>X</button>
            <button onClick={this.drumPress} class="drum-pad" id={this.state.bank[8]}>C</button>
          </td>
          <td id="right">
            <div id="power" class="right-element">
              <h4>Power</h4>
          <label class="switch">
            <input onClick={this.powerSwitch} type="checkbox" name="power-switch" />
            <span class="slider"></span>
          </label>
        </div>
        <div id="display" class="right-element">
          <h4>{this.state.display}</h4>
        </div>
        <div id="volume" class="right-element">
          <h4>Volume</h4>
          <div class="slidecontainer">
            <input type="range" min="0" max="1" step="0.01" defaultValue=".5" class="v-slider" id="myRange" onChange={this.updateVolume} />
          </div>
        </div>
        <div id="bank" class="right-element">
          <h4>Bank</h4>
          <span class="banknumber">1</span>
          <label class="switch">
            <input type="checkbox" onClick={this.bankSwitch} name="bank-switch" />
            <span class="slider nocolor"></span>
          </label>
          <span class="banknumber">2</span>
        </div>
          </td>
        </tr>
      </table>
    </div>
     );
  }
}

// ReactDOM.render(<DrumMachine />, container);
const domContainer = document.querySelector('#container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(DrumMachine));
