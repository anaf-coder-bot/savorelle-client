import * as motion from "motion/react-client"

export default function ScrollTriggered({ items }) {
  return (
    <div style={container}>
      {items.map(([src, name, hueA, hueB], i) => (
        <Card key={i} i={i} src={src} name={name} hueA={hueA} hueB={hueB} />
      ))}
    </div>
  )
}

function Card({ src, name, hueA, hueB, i }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      {/* Background splash */}
      <div style={{ ...splash, background }} />

      {/* Card */}
      <motion.div style={card} variants={cardVariants} className="card drop-shadow-2xl drop-shadow-[0_10px_20px_rgba(255,255,255,.7)]">
        {/* Image */}
        <img
          src={src}
          alt={name}
          draggable={false}
          style={{
            width: "75%",
            height: "75%",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Name at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            position: "absolute",
            bottom: 20,
            fontSize: 18,
            fontWeight: 600,
            color: "#111",
            textAlign: "center",
            width: "100%",
            letterSpacing: 0.5,
            userSelect: "none",
          }}
        >
          {name}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Variants for scroll animation
 */
const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

/**
 * Helper for gradients
 */
const hue = (h) => `hsl(${h}, 100%, 50%)`

/**
 * Styles
 */
const container = {
  margin: "100px auto",
  maxWidth: 500,
  paddingBottom: 100,
  width: "100%",
}

const cardContainer = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
}

const splash = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card = {
  fontSize: 164,
  width: 300,
  height: 430,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
}
