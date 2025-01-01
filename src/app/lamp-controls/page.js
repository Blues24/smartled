"use client";

import { useState } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "../../../firebaseConfig";
import styles from "./LampControls.module.css";

const LampControls = () => {
  const lampNodes = [
    { nodePath: "LAMPS/L1", label: "Lampu 1" },
    { nodePath: "LAMPS/L2", label: "Lampu 2" },
    { nodePath: "LAMPS/L3", label: "Lampu 3" },
    { nodePath: "LAMPS/L4", label: "Lampu 4" }
  ];

  const [lampStates, setLampStates] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState([]);

  // Handle perubahan status lampu
  const handleSelection = (nodePath, newState) => {
    setLampStates((prev) => ({
      ...prev,
      [nodePath]: newState,
    }));
  };

  // Fungsi untuk meng-update status di Firebase
  const handleUpdate = async () => {
    setIsUpdating(true);
    setErrors([]); // Bersihkan error sebelumnya

    try {
      // Validasi apakah nodePath ada di Firebase
      const validationPromises = lampNodes.map(async ({ nodePath }) => {
        const snapshot = await get(ref(db, nodePath));
        if (!snapshot.exists()) {
          throw new Error(`NodePath "${nodePath}" tidak ditemukan di database.`);
        }
      });

      await Promise.all(validationPromises);

      // Jika validasi berhasil, lakukan pembaruan
      const updatePromises = Object.keys(lampStates).map((nodePath) =>
        set(ref(db, nodePath), lampStates[nodePath])
      );

      await Promise.all(updatePromises);

      alert("Data berhasil diperbarui di Firebase!");
    } catch (err) {
      console.error("Error saat memperbarui Firebase:", err);
      setErrors((prev) => [...prev, err.message]);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.title}>
      <h1>Demo Kontrol Lampu</h1>
     <div className={styles.gridContainer}>
       {lampNodes.map(({ nodePath, label }) => (
         <div key={nodePath} className={styles.gridItems}>
           <p>{label}</p>
           <button
             className={`${styles.button} ${
               lampStates[nodePath] ? styles.on : styles.off
             }`}
             onClick={() => handleSelection(nodePath, !lampStates[nodePath])}
           >
             {lampStates[nodePath] ? "ON" : "OFF"}
           </button>
         </div>
       ))}
       <div className={styles.gridBtnUpdate}>
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className={styles.updateButton}
        >
          {isUpdating ? "Memperbarui..." : "Update"}
        </button>
       </div>
       {errors.length > 0 && (
         <div className={styles.errors}>
           <h3>Error:</h3>
           <ul>
             {errors.map((error, index) => (
               <li key={index}>{error}</li>
             ))}
           </ul>
         </div>
       )}
     </div>
    </div> 
  );
};

export default LampControls;
