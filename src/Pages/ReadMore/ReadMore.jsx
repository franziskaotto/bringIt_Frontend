import React from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "./ReadMore.css";
import Logo from "../../Components/Logo/Logo";

const ReadMore = () => {
  const { setIsLoggedIn } = useOutletContext();

  const handleLoginClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="read-more-container">
      <div className="left-content-register">
        <div className="logo-und-button">
          <Logo />
          <div className="login-div">
            <Link to={"/"}>
              <button onClick={handleLoginClick} className="Login-Button">
                LOGIN
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text">
        <p>
          <strong>bringIt</strong> vernetzt dich mit Menschen, die in deiner
          Umgebung wohnen, zwecks gegenseitiger Abhol- bzw. Bringhilfe in
          Situationen, in denen jemand gerade nicht in der Lage ist einen Weg
          oder eine Besorgung selbst zu machen.
        </p>
        <p>
          <strong>Case 1:</strong> Dein Kind ist krank und du wartest auf einen
          Handwerker. Du brauchst heute aber noch dringend frische Windeln und
          ein Medikament- schaffst es aber selber nicht diese Besorgungen zu
          erledigen. Einer deiner Nachbarn fährt heute am Heimweg sicher noch
          beim Supermarkt oder der Apotheke vorbei und könnte dir problemlos die
          paar Sachen mitnehmen. Erstelle ein neues Todo in{" "}
          <strong>bringIt</strong> und alle Sorgen lösen sich unter Umständen
          wie von selbst auf.
        </p>
        <p>
          <strong>Case 2:</strong> Es ist Samstag Abend, du hast Freunde
          eingeladen und möchtest noch schnell ein paar Getränke kaufen. Dein
          Auto startet aber nicht und der Pannendienst ist noch lange nicht da.
          Irgendwer in deiner näheren Umgebung fährt aber bestimmt noch bei
          einem Geschäft oder zumindest bei der Tankstelle vorbei und könnte dir
          was mitbringen. Schnell ein Todo in <strong>bringIt</strong> verfassen
          und der Abend verläuft vielleicht viel weniger chaotisch, als du
          aufgrund der Autopanne erwartet hättest.
        </p>
        <p>
          <strong>Case 3:</strong> Du bist unterwegs nach Hause und fährst noch
          bei der Postfiliale vorbei um ein dort hinterlegtes Paket abzuholen.
          Es ist für dich nur ein geringer Mehraufwand für einen deiner Nachbarn
          ebenfalls ein Paket mitzunehmen. Ein Blick auf
          <strong> bringIt</strong> verrät dir, wem du damit heute eine Freude
          machen und dir dabei ein paar BringITS verdienen kannst.
        </p>
      </div>
    </div>
  );
};

export default ReadMore;
