import { useEffect, useState } from "react";
import Typing from "./Typing";
import "./html.css";
import TimeUp from "./TimeUp";
function Area() {
  const paragraphs = [
    "chip large brash water hate early amusement blade fortunate longing dirt snails sadden mistake congratulate suggest suffer weather enjoy hurl contribute hall straight undo nervous mean temporary learning special righteous volleyball cheap amazing mask amusement progress optimal ambiguous classify halting halting wandering blue-eyed hilarious shock love end seashore iron oil regret animal tasteful second gate robin digestion relax likeable sloppy camp control trouble embarrassed illegal lick excited stage sneaky survive grateful yarn brief silky joyous amazing combative quickest coherent simplistic property kittens screw prepare prepare dedicate old-fashioned witty boats obsolete night make terrific lumber tense crayon supreme sweet difficult superb muscle creep", "earsplitting spiffy hungry punish dinner vacuous learn square remarkable destruction summon boorish snobbish bend island yielding tempt utter ten uptight orange competition obnoxious learned output install surmise suggestion bells splendid pluck twist beseech steal sturdy terminate renounce old request butter cry idolize vest deny oatmeal cough tasty approval shock colossal support better astonish skillful damp list ossified tub travel servant grubby husky available disobey quilt ajar slim minister best flavor glib eat quiet dolls receipt sloppy parent rose careful big staking tax spring cute paltry gray same open witty throne unknown convert puzzling rough motion stream destruction heal shop tend",
    "cats banish desire pear symptomatic unwritten freeze expansion tendency acid sand flag vest pluck better greedy faint hate lose surprise permissible impair hop flesh incredible smell naive feather thump boring cobweb believe blue cluttered race color blushing habitual lace kneel hall bind careless crack sable shoe cagey sour forbid careless coach mean whisper public wave order aback inaugurate calculating sneeze burn scent salute withdraw mailbox point building toss ask impress shear befitting go sink show bat willing utopian state gun voiceless disastrous alluring pricey dashing zealous miss cease pretend wheel disastrous ugly whip aggressive light sign cease pretend wheel promise preset annoyed enthusiastic knowledgeable gainful moo mean north past chase stormy able bid",  "quit writer alert inquire hear confused fretful pleasure good bye thought dangerous stick yoke anxious puny violet different help tender behave bottle tiresome oppress teeth dip consign cease attract pump past careful discovery grain part aggressive nebulous songs possessive diligent cheerful chair careful tacit magic somber camera holiday treat output knotty spend flagrant question swing violent deny somber boundless paste futuristic church crush tire divergent popcorn confess flag berserk aspiring easy torpid striped pancake synonymous immure shoot icy pancake sad face butter slip astonishing stream flap camera rabid terminate faded convene spiffy stream gullible apparatus flee carriage gaze cart participate oil hear contain",
    "quit writer alert inquire hear confused fretful pleasure good-bye thought dangerous stick yoke anxious puny violet different help tender behave bottle tiresome oppress teeth dip consign cease attract pump past careful discovery grain part aggressive nebulous songs possessive diligent cheerful chair careful tacit magic somber camera holiday treat output knotty spend flagrant question swing violent deny somber boundless paste futuristic church tire crush popcorn divergent flag confess aspiring berserk torpid easy pancake striped immure synonymous icy shoot sad pancake butter face astonishing slip flap stream rabid camera faded terminate spiffy convene gullible stream flee apparatus gaze carriage participate cart hear oil contain system responsible wiggly health earthquake worried amuck justify orange machine receive scarce cannon toe save hospital", "snail ship magenta questionable charming walk authority knee expand select handsomely cheerful camera present cook survey zonked rhetorical operate society authority deeply library sanction persuade panicky shout purpose present whip nippy fast warn cart value clean skillful derive impulse lewd happen bat youthful acrid wiggly legal crack crack cattle shout present panicky heartbreaking originate misty complete operation beautiful succinct bear grant protective seat bewildered nippy madly test persuade sanction shout protest lean click unsightly wicked sneeze ticket breezy cash hook strong mask paltry animated nice equable cute library rhetorical operate deeply known uninterested",
  ];

  const [typing, setTyping] = useState("");
  const [inputFieldValue, setInputFieldValue] = useState("");
  const maxTime = 30;
  let accuracy;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setwpm] = useState(0);
  const [cpm, setcpm] = useState(0);
  const loadParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const inputField = document.getElementsByClassName("input-field")[0];
    document.addEventListener("keydown", () => inputField.focus());
    const content = Array.from(paragraphs[randomIndex]).map((letter, index) => (
      <span
        key={index}
        style={{ color: letter !== " " ? "black" : "transparent" }}
        className={`char ${index === 0 ? "active" : ""}`}
      >
        {letter !== " " ? letter : "_"}
      </span>
    ));
    setTyping(content);
    setInputFieldValue("");
    setCharIndex(0);
    setMistakes(0);
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    const characters = document.querySelectorAll(".char");
    if (
      e.key === "Backspace" &&
      charIndex > 0 &&
      charIndex < characters.length &&
      timeLeft > 0
    ) {
      if (characters[charIndex - 1].classList.contains("correct")) {
        characters[charIndex - 1].classList.remove("correct");
      }
      if (characters[charIndex - 1].classList.contains("wrong")) {
        characters[charIndex - 1].classList.remove("wrong");
        setMistakes(mistakes - 1);
      }
      characters[charIndex].classList.remove("active");
      characters[charIndex - 1].classList.add("active");
      setCharIndex(charIndex - 1);
      let cpm = (charIndex - mistakes - 1) * (60 / (maxTime - timeLeft));
      cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
      let wpm = Math.round(
        ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
      );
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      setwpm(wpm);
    }
  };

  const initTyping = (e) => {
    const characters = document.querySelectorAll(".char");
    let typedChar = e.target.value;
    if (charIndex < characters.length && timeLeft > 0) {
      let currentChar = characters[charIndex].innerText;
      if (currentChar === "_") currentChar = " ";
      if (!isTyping) {
        setIsTyping(true);
      }
      if (typedChar === currentChar) {
        setCharIndex(charIndex + 1);
        if (charIndex + 1 < characters.length) {
          characters[charIndex + 1].classList.add("active");
        }
        characters[charIndex].classList.remove("active");
        characters[charIndex].classList.add("correct");
      } else {
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        characters[charIndex].classList.remove("active");
        if (charIndex + 1 < characters.length) {
          characters[charIndex + 1].classList.add("active");
        }
        characters[charIndex].classList.add("wrong");
      }
      if (charIndex === characters.length - 1) {
        setIsTyping(false);
      }

      let wpm = Math.round(
        ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
      );
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      setwpm(wpm);

      let cpm = (charIndex - mistakes) * (60 / (maxTime - timeLeft));
      cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;

      setcpm(parseInt(cpm, 10));
    } else {
      setIsTyping(false);
    }
  };

  const reset = () => {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setTyping("");
    setcpm(0);
    setwpm(0);

    const characters = document.querySelectorAll(".char");
    characters.forEach((span) => {
      span.classList.remove("correct");
      span.classList.remove("wrong");
      span.classList.remove("active");
    });

    characters[0].classList.add("active");
    loadParagraph();
  };

  useEffect(() => {
    loadParagraph();
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        let cpm = (charIndex - mistakes) * (60 / (maxTime - timeLeft));
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        setcpm(parseInt(cpm, 10));
        let wpm = Math.round(
          ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
        );
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        setwpm(wpm);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsTyping(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTyping, timeLeft]);
  let ctyped = (cpm * maxTime) / 60;
  accuracy = (ctyped - mistakes) / ctyped;
  accuracy *= 100;
  accuracy = Math.round(accuracy);
  if (timeLeft === 0) {
    return <TimeUp wpm={wpm} cpm={cpm} mistakes={mistakes} accuracy={accuracy}/>;
  }
  return (
    <>
      <div className="container">
        <input
          type="text"
          className="input-field"
          value={inputFieldValue}
          onChange={initTyping}
          onKeyDown={handleKeyDown}
        />
        <Typing
          typing={typing}
          inputFieldValue={inputFieldValue}
          timeLeft={timeLeft}
          mistakes={mistakes}
          wpm={wpm}
          cpm={cpm}
          initTyping={initTyping}
          resetGame={reset}
          accuracy={accuracy}
        />
      </div>
    </>
  );
}

export default Area;
