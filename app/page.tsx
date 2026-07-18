"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import TimeCounter from "@/components/TimeCounter";

// El Canvas de three.js nunca debe renderizarse en el servidor
const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
});

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!entered) return;
    const show = setTimeout(() => setShowHint(true), 1800);
    const hide = setTimeout(() => setShowHint(false), 8500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [entered]);

  return (
    <main className="stage">
      <AnimatePresence>
        {!entered && (
          <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <motion.span
              className="intro-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Una dedicatoria en el espacio
            </motion.span>

            <motion.h1
              className="intro-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.1 }}
            >
              Para alguien que ilumina
              <br /> hasta el universo
            </motion.h1>

            <motion.p
              className="intro-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.1 }}
            >
Un pequeño rincón hecho con mucho cariño para alguien que llegó a mi vida y se volvió muy especial. Gracias por cada momento y por ser tú.            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.1 }}
            >
              <TimeCounter />
            </motion.div>

            <motion.button
              className="enter-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 1 }}
              onClick={() => setEntered(true)}
            >
              Entrar al universo
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <>
          <motion.h2
            className="experience-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 7, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
          >
            Cada estrella de este lugar dice algo bonito de ti
          </motion.h2>

          <AnimatePresence>
            {showHint && (
              <motion.p
                className="hint"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.8 }}
              >
                Arrastra para mirar alrededor · scroll para acercarte
              </motion.p>
            )}
          </AnimatePresence>

          <div className="vignette-frame" />
          <Experience />
        </>
      )}
    </main>
  );
}
