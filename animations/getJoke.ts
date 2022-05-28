const variants = {
  hidden: {
    scale: 0.4,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.5,
    },
  },
};
const whileHover = {
    scale: [1, 0.9, 0.8, 0.9, 0.8, 0.9],
    transition: {
        duration: 0.5,
    },
};
export const animations = {
    variants,
    whileHover,
};