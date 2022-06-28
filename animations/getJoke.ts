const jokeVariants = {
  hidden: {
    scale: 3.4,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 5.2,
      duration: 0.8,
    },
  },
  active: {
    scale: [1, 3, 0.6, 3, 1, 0.5, 2, 0.5, 1, 3, 0.6, 3, 1], //[1, 0.9, 0.8, 0.9, 0.8, 0.9],
    rotate: [0, 30, 0, -30, 0, 360, 0, -360, 0, -30, 0, 30, 0],
    times: [0, 0.2, 0.5, 0.8, 1, 1.5, 2, 2.5, 3, 3.2, 3.5, 3.8, 4],
    transition: {
      duration: 4,
      delay: 10,
    },
  },
};


const addJokeButtonVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    x: 200,
  },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: 14,
      duration: 0.8,
    },
  },
};

const addJokeButtonWhileHover = {
  // scale: [1, 1.5, 1],
  rotate: [0, 180, 360],
  // time: [
  //   0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.9, 0.95, 1,
  // ],
  transition:{
    type: "spring",
    duration: 0.2,
  }
}

const jokeWhileTap = {
  scale: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 1.2],
  time: [
    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.9, 0.95, 1,
  ],
  transition:{
    type: "spring",
    duration: 1,

  }
}

const addJokeButtonOnMouseLeave = {
  scale: [1, 1.5, 1],
  rotate: [0, 180, 360],
  transition: {
    type: "spring",
    duration: 0.6,
  }
}

// const jokeOnMouseLeave = {



export const animations = {
  jokeVariants,
  addJokeButtonVariants,
  addJokeButtonWhileHover,
  jokeWhileTap,
  addJokeButtonOnMouseLeave,
};
