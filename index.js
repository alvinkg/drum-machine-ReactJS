

const audioClips = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];



function App() {
    const [volume, setVolume] = React.useState(0.5);
    const [recording, setRecording] = React.useState("");
    const [speed, setSpeed] = React.useState(0.5);
    const [drink, setDrink] = React.useState("tea");

    const playRecording = () => {
        let index = 0;
        let recordArray = recording.split(" ");
        const interval = setInterval(() => {
            const audioTag = document.getElementById(recordArray[index]);
            audioTag.currentTime = 0;
            audioTag.volume = volume;
            audioTag.play();
            index++;

        }, 600 * speed);
        setTimeout(
            ()=>clearInterval(interval),600*speed*recordArray.length - 1
        )
    };
    
    return (
        <div className="bg-info w-100 min-vh-100 p-3 m-3 text-white">
            <div className="text-center">
                <h2>My Drum Machine in ReactJS</h2>
                {audioClips.map(clip => (
                    <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording} />
                ))}
                <br />
                <h4>Volume</h4>
                <input
                    type='range'
                    step='0.01'
                    min='0'
                    max='1'
                    className ="w-50"
                    value={volume}
                    onChange={(e)=>setVolume(e.target.value)}
                />
                <h3>{recording}</h3>
                {recording && (
                    <>
                        <button
                            onClick={playRecording}
                            className="btn btn-success">
                            play
                        </button>
                        <button
                            onClick={() => setRecording("")}
                            className="btn btn-danger">
                            clear
                        </button>
                        <br />
                        <h4>Speed</h4>
                <input
                    type='range'
                    step='0.01'
                    min='0.1'
                    max='1.2'
                    className ="w-50"
                    value={speed}
                    onChange={(e)=>setSpeed(e.target.value)}
                />

                    </>
                )}
            </div>

        </div>
    )

    function Pad({ clip , volume, setRecording}) {
        const [active, setActive] = React.useState(false);
        

        React.useEffect(() => {
            document.addEventListener("keydown", handleKeepPress);
            return () => {
                document.removeEventListener("keydown", handleKeepPress);
            }
        }, []);

        const handleKeepPress = (e) => {
            if (e.keyCode === clip.keyCode) {
                playSound();
            }
        }


        const playSound = () => {
            const audioTag = document.getElementById(clip.keyTrigger);
            audioTag.currentTime = 0;
            audioTag.volume = volume;
            audioTag.play();
            
            setActive(true);
            setTimeout(() => setActive(false), 200);
            
            // this line below is stopping the above from working
            // setRecording(e=> e + clip.keyTrigger + " ");

        }
        return (
            <div
                className={`btn btn-secondary p-4 m-3 ${active && 'btn-warning'}`}
                onClick={playSound}>
                <audio
                    className="clip"
                    id={clip.keyTrigger}
                    src={clip.url} />
                {clip.keyTrigger}
            </div>
        );
    }
}
// ReactDOM.render(<App />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)