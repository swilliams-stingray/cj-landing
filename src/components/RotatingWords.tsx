"use client";

import { useState, useEffect, useRef } from "react";

const words = ["Business", "Politics", "Community", "Classifieds", "Opinion", "Investigations", "Local News", "Caribbean"];

const TYPING_SPEED = 90;
const DELETING_SPEED = 50;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

export function RotatingWords() {
  const [displayed, setDisplayed] = useState("");
  const wordIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    function tick() {
      const currentWord = words[wordIndex.current];

      if (!isDeleting.current) {
        const next = currentWord.slice(0, displayed.length + 1);
        setDisplayed(next);
      } else {
        const next = currentWord.slice(0, displayed.length - 1);
        setDisplayed(next);
      }
    }

    let delay: number;
    const currentWord = words[wordIndex.current];

    if (!isDeleting.current && displayed === currentWord) {
      // Finished typing — pause then delete
      delay = PAUSE_AFTER_TYPE;
      timeoutRef.current = setTimeout(() => {
        isDeleting.current = true;
        setDisplayed(currentWord.slice(0, -1));
      }, delay);
    } else if (isDeleting.current && displayed === "") {
      // Finished deleting — pause then next word
      delay = PAUSE_AFTER_DELETE;
      timeoutRef.current = setTimeout(() => {
        isDeleting.current = false;
        wordIndex.current = (wordIndex.current + 1) % words.length;
        setDisplayed(words[wordIndex.current].slice(0, 1));
      }, delay);
    } else {
      delay = isDeleting.current ? DELETING_SPEED : TYPING_SPEED;
      timeoutRef.current = setTimeout(tick, delay);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed]);

  return (
    <span className="inline-flex min-w-[160px] items-center justify-center font-serif text-lg italic text-text-secondary md:min-w-[200px] md:text-xl">
      {displayed}
      <span className="ml-[1px] inline-block h-[1.1em] w-[2px] animate-blink bg-accent-navy" />
    </span>
  );
}
