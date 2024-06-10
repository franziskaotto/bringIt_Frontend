import React, { useState } from "react";
import "./Map.css";

const Map = () => {
  const [activeTab, setActiveTab] = useState("tab-1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <>
      <div className="left-side-content-map">
        <div className="tabs">
          <nav className="tab-nav">
            <ul className="tab-list" role="tablist" aria-orientation="vertical">
              <li>
                <button
                  role="tab"
                  id="tab-1"
                  aria-controls="panel-1"
                  aria-selected={activeTab === "tab-1"}
                  className={`tab-btn ${
                    activeTab === "tab-1" ? "tab-btn--active" : ""
                  }`}
                  onClick={() => handleTabClick("tab-1")}
                >
                  Tab #1
                </button>
              </li>
              <li>
                <button
                  role="tab"
                  id="tab-2"
                  aria-controls="panel-2"
                  aria-selected={activeTab === "tab-2"}
                  className={`tab-btn ${
                    activeTab === "tab-2" ? "tab-btn--active" : ""
                  }`}
                  onClick={() => handleTabClick("tab-2")}
                >
                  Tab #2
                </button>
              </li>
              <li>
                <button
                  role="tab"
                  id="tab-3"
                  aria-controls="panel-3"
                  aria-selected={activeTab === "tab-3"}
                  className={`tab-btn ${
                    activeTab === "tab-3" ? "tab-btn--active" : ""
                  }`}
                  onClick={() => handleTabClick("tab-3")}
                >
                  Tab #3
                </button>
              </li>
            </ul>
          </nav>
          <div
            role="tabpanel"
            id="panel-1"
            aria-labelledby="tab-1"
            className={`tab-panel ${
              activeTab === "tab-1" ? "tab-panel--active" : ""
            }`}
          >
            <p>Content of Tab #1</p>
          </div>
          <div
            role="tabpanel"
            id="panel-2"
            aria-labelledby="tab-2"
            className={`tab-panel ${
              activeTab === "tab-2" ? "tab-panel--active" : ""
            }`}
          >
            <p>Content of Tab #2</p>
          </div>
          <div
            role="tabpanel"
            id="panel-3"
            aria-labelledby="tab-3"
            className={`tab-panel ${
              activeTab === "tab-3" ? "tab-panel--active" : ""
            }`}
          >
            <p>Content of Tab #3</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
