import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "./ReadMore.css";
import Logo from "../../Components/Logo/Logo";

const ReadMore = () => {
  const { setIsLoggedIn } = useOutletContext();

  const handleLoginClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="read-more-container">
        <div className="left-content-register">
          <div className="logo-und-button">
            <Logo />
            <div className="login-div">
              <Link to={"/"}>
                <button
                  onClick={() => handleLoginClick()}
                  className="Login-Button"
                >
                  LOGIN
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="text">
          <p>
            bring it vernetzt dich mit Menschen, die in deiner Umgebung wohnen,
            zwecks gegenseitiger Abhol- bzw. Bringhilfe in Situationen, in denen
            jemand gerade nicht in der Lage ist einen Weg oder eine Besorgung
            selbst zu machen.
          </p>
          <p>
            Case 1: Dein Kind ist krank und du wartest auf einen Handwerker. Du
            brauchst heute aber noch dringend frische Windeln und ein
            Medikament- schaffst es aber selber nicht diese Besorgungen zu
            erledigen. Einer deiner Nachbarn fährt heute am Heimweg sicher noch
            beim Supermarkt oder der Apotheke vorbei und könnte dir problemlos
            diepaar Sachen mitnehmen. Erstelle ein neues ToDo in bring it und
            alle Sorgen lösen sich unter Umständen wie von selbst auf.
          </p>
          <p>
            Case 2: Es ist Samstag Abend, du hast Freunde eingeladen und
            möchtest noch schnell ein paar Getränke kaufen. Dein Auto startet
            aber nicht und der Pannendienst ist noch lange nicht da. Irgendwer
            in deiner näheren Umgebung fährt aber bestimmt noch bei einem
            Geschäft oder zumindest bei der Tankstelle vorbei und könnte dir was
            mitbringen. Schnell ein ToDo in bring it verfassen und der Abend
            verläuft vielleicht viel weniger chaotisch, als du aufgrund der
            Autopanne erwartet hättest.
          </p>
          <p>
            Case 3: Du bist unterwegs nach Hause und fährst noch bei der
            Postfiliale vorbei um ein dort hinterlegtes Paket abzuholen. Es ist
            für dich nur ein geringer Mehraufwand für einen deiner Nachbarn
            ebenfalls ein Paket mitzunehmen. Ein Blick auf bring it verrät dir,
            wem du damit heute eine Freude machen könntest.
          </p>
         
        </div>
      </div>
    </>
  );
};

export default ReadMore;
