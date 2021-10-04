import React, { useEffect, useState } from "react";
import { Entry } from "./Entry";
import { searchEntries } from "./EntryManager";

export const EntryList = ({ moods, entries, onEditButtonClick, onDeleteButtonClick }) => {

  const [filteredEntries, setEntries] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [moodSelected, setMoodSelected] = useState("");

  useEffect(() => {
    if (searchedTerm !== "") {
      searchEntries(searchedTerm).then(entriesData => setEntries(entriesData))
    } else {
      setEntries(entries)
    }
  }, [searchedTerm, entries])


  const filterAllEntries = (moodId) => {
    const filteredEntriesByMood = entries.filter(entry => entry.moodId === parseInt(moodId))
    setEntries(filteredEntriesByMood)
    setMoodSelected(parseInt(moodId))
  }


  return (
    <article className="panel is-primary">
      <h1 className="panel-heading">Entries</h1>
      <p className="panel-tabs">
        <a className={moodSelected === "" ? "is-active" : ""} onClick={() => {
          setEntries(entries)
          setMoodSelected("")
        }}>All</a>
        {
          moods.map(mood => {
            return <a
              onClick={() => filterAllEntries(mood.id)}
              className={moodSelected === mood.id ? "is-active" : ""}
            >{mood.label}</a>
          })
        }
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input is-primary" type="text" placeholder="Search" onKeyUp={
            (event) => {
              const searchTerm = event.target.value
              setTerm(searchTerm)
            }
          } />
        </p>
      </div>



      {/*
            Pseudo Code
            .filter(happyEntries => happyEntries.mood.label === "Happy")
        */}
      {filteredEntries.map(entry => {
        return <div className="panel-block">
          <Entry
            key={entry.id}
            entry={entry}
            mood={moods.find(m => m.id === entry.moodId)}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </div>
      })}
    </article>
  );
};
