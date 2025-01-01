'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './auth.module.css';

export default function Auth(){
    const PIN = "71619";
    const CorrectPath = "../lamp-controls";
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const route = useRouter();
    const handlePin = (e) => {
        e.preventDefault();
        if (pin === PIN){
            route.push(CorrectPath);
        } else {
            setError("Incorrect PIN, Try again in 100 years");
        }
    };
    return (
        <div className={styles.authContainer}>
        <form onSubmit={handlePin} className={styles.authForm}>
        <h2>Enter PIN</h2>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={styles.authInput}
          />
          <button type="submit" className={styles.authButton}>
            Submit
          </button>
        </form>
        {error && <p className={styles.authError}>{error}</p>}
      </div>
    );
}

