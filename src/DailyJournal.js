import React, { useState, useEffect } from "react";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import { addEntry, deleteEntry, getEntries, getEntryById, updateEntry } from "./components/EntryManager";
import { getMoods } from "./components/mood/MoodManager";

export const DailyJournal = () => {
  const [entries, setEntries] = useState([])
  const [moods, setMoods] = useState([])
  const [entry, setEntry] = useState({})

  useEffect(() => {
    getAllEntries()
    getMoods().then(moodsData => setMoods(moodsData))
  }, [])

  const getAllEntries = () => {
    getEntries().then(entriesData => setEntries(entriesData))
  }

  const onEditButtonClick = (entryId) => {
    getEntryById(entryId).then(entryData => setEntry(entryData)).then(() => console.log(entry))
  }

  const onDeleteButtonClick = (entryId) => {
    deleteEntry(entryId)
      .then(getAllEntries)
  }

  const onFormSubmit = (entryData) => {
    console.log("submit", entryData)
    if (entryData.id) {
      updateEntry(entryData).then(getAllEntries)
    } else {
      addEntry(entryData).then(getAllEntries)
    }
    setEntry({
      concept: "",
      entry: "",
      moodId: 0
    })
  }

  return (
    <div className="DailyJournal container">
      <div className="columns">
        <div className="column">
          <EntryForm entry={entry} moods={moods} onFormSubmit={onFormSubmit} />
        </div>
        <div className="column">
          <EntryList
            entries={entries}
            moods={moods}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </div>
      </div>

    </div>
  );
};
