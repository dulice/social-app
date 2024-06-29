export const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeIn"}},
    exit: { opacity: 0, transition: { ease: "easeOut"}}
}

export const slideUp = {
    hidden: {
      y: "100vh",
    },
    visible: {
      y: 0,
      transition: {
        type: "Spring",
        stiffness: 50
      }
    },
    exit: {
      y: "100vh",
      transition : {
        type: "Spring", stiffness: 50
      }
    }
  }