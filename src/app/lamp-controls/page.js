"use client";

import React from 'react';
import { set, ref} from 'firebase/database';
import { db } from '../../../firebaseConfig'


const lampNodes = [
  {nodePath: "LAMPS/L1", label: "Lamp 1"},
  {nodePath: "LAMPS/L2", label: "Lamp 2"},
  
];

export default function LampControls() {
  const handleUpdate = (nodePath, state) => {
    set(ref(db, nodePath), state)
      .then(() => alert(`${nodePath} updated to ${state}`))
      .catch((error) => console.error("Error updating Firebase:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lamp Controls</h1>
      {lampNodes.map(({ nodePath, label }) => (
        <div key={nodePath} style={{ marginBottom: "20px" }}>
          <p>{label}</p>
          <label>
            <input
              type="radio"
              name={nodePath}
              value="true"
              onChange={() => handleUpdate(nodePath, true)}
            />
            ON
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name={nodePath}
              value="false"
              onChange={() => handleUpdate(nodePath, false)}
            />
            OFF
          </label>
        </div>
      ))}
    </div>
  );
}