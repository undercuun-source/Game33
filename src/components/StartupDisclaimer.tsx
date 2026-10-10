import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, CheckSquare, Square } from 'lucide-react';

interface StartupDisclaimerProps {
  onComplete: () => void;
}

export const StartupDisclaimer: React.FC<StartupDisclaimerProps> = ({ onComplete }) => {
  const [show, setShow] = useState<boolean>(true);
  const [check1, setCheck1] = useState<boolean>(false);
  const [check2, setCheck2] = useState<boolean>(false);

  const handleAccept = () => {
    if (check1 && check2) {
      setShow(false);
    }
  };

  const handleAnimationComplete = () => {
    if (!show) {
      onComplete();
    }
  };

  const canContinue = check1 && check2;

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {show && (
        <motion.div
          id="startup-disclaimer-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/75 backdrop-blur-md text-white p-4 select-none touch-none overflow-hidden"
        >
          {/* Ambient Background Glow (Vibrant Blue trust accent) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)] pointer-events-none" />

          {/* Professional Contract Card with rich blue background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative max-w-2xl w-full flex flex-col max-h-[90vh] p-6 sm:p-8 rounded-[2rem] bg-blue-950/90 border border-blue-800/80 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 shrink-0">
              {/* Yellow Warning Emoji */}
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
                ⚠️
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-black uppercase tracking-wider text-blue-200">
                  ACUERDO DE TÉRMINOS DE USO
                </h1>
                <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mt-0.5">
                  CONTRATO LEGAL OBLIGATORIO
                </p>
              </div>
            </div>

            {/* Scrollable Contract Text */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-left text-xs text-blue-100 font-normal leading-relaxed scrollbar-thin select-text mb-5 border border-blue-800/60 bg-slate-950/50 p-4 rounded-2xl">
              <p className="font-bold text-blue-200">
                Al acceder a este videojuego, usted acepta los siguientes términos:
              </p>

              <div className="space-y-3">
                <div>
                  <h3 className="font-black text-white uppercase text-[11px] mb-1">1. MAYORÍA DE EDAD</h3>
                  <p>El acceso está estrictamente prohibido a menores de 18 años. El usuario garantiza que es mayor de edad y asume la total responsabilidad si permite el acceso a menores.</p>
                </div>

                <div>
                  <h3 className="font-black text-white uppercase text-[11px] mb-1">2. CONTENIDO EXPLÍCITO Y DE DOMINACIÓN</h3>
                  <p>El juego contiene violencia extrema, gore, contenido altamente explícito, sexual, erótico, de fetiches, sumisión, realismo sin censura y material altamente ofensivo para adultos. El juego también incluye temáticas de dominación y sumisión forzada en contra de la voluntad (non-con, CNC). Al ingresar, usted acepta voluntariamente exponerse a todo este material erótico, sexual y violento, y exime de toda responsabilidad médica, psicológica, civil o legal al propietario, desarrollador y al staff por cualquier incomodidad o daño emocional.</p>
                </div>

                <div>
                  <h3 className="font-black text-white uppercase text-[11px] mb-1">3. INTERACCIONES Y EXCLUSIÓN DE DECISIONES</h3>
                  <p>El juego permite interactuar libremente con otros usuarios. El creador/desarrollador no se hace responsable en ningún caso de las decisiones, acuerdos, dinámicas, pactos, divisiones o acciones que los jugadores decidan tomar o realizar dentro o fuera de la plataforma. Cada jugador es absoluta y únicamente responsable de sus propias decisiones, expresiones, juegos de rol y comportamiento.</p>
                </div>

                <div>
                  <h3 className="font-black text-white uppercase text-[11px] mb-1">4. EXONERACIÓN TOTAL DE RESPONSABILIDAD</h3>
                  <p>El desarrollador, propietario y el staff quedan completamente exonerados de toda responsabilidad legal, civil, penal o moral por cualquier acto realizado por los usuarios. No nos hacemos cargo de disputas, conductas delictivas, malentendidos, divisiones o incidentes entre jugadores. Todo lo que ocurra como resultado de la interacción entre usuarios es bajo su propia y exclusiva cuenta, riesgo y responsabilidad.</p>
                </div>

                <div>
                  <h3 className="font-black text-white uppercase text-[11px] mb-1">5. DERECHO DE ADMISIÓN</h3>
                  <p>El propietario se reserva el derecho de eliminar o suspender cualquier cuenta que infrinja estas reglas, sin derecho a reclamos ni reembolsos.</p>
                </div>
              </div>

              <p className="font-bold text-blue-200 border-t border-blue-800/80 pt-2 mt-2">
                Al presionar aceptar, usted declara bajo juramento que es mayor de edad, comprende la naturaleza del juego y asume la responsabilidad total de sus actos dentro de él.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2.5 mb-5 shrink-0">
              <label 
                onClick={() => setCheck1(!check1)}
                className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/60 border border-blue-800/50 hover:border-blue-700/80 cursor-pointer transition-colors select-none text-left"
              >
                <div className="mt-0.5 text-blue-400 shrink-0">
                  {check1 ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                </div>
                <span className="text-xs font-bold text-blue-100 leading-snug">
                  - Declaro bajo juramento que tengo 18 años o más.
                </span>
              </label>

              <label 
                onClick={() => setCheck2(!check2)}
                className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/60 border border-blue-800/50 hover:border-blue-700/80 cursor-pointer transition-colors select-none text-left"
              >
                <div className="mt-0.5 text-blue-400 shrink-0">
                  {check2 ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                </div>
                <span className="text-xs font-bold text-blue-100 leading-snug">
                  - He leído y acepto los Términos y Condiciones de Uso y Exoneración de Responsabilidad.
                </span>
              </label>
            </div>

            {/* Action Button */}
            <button
              disabled={!canContinue}
              onClick={handleAccept}
              className={`w-full py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 ${
                canContinue
                  ? 'bg-blue-600 hover:bg-blue-500 active:scale-98 text-white cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ACEPTAR</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
