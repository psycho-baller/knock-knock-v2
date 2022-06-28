/* Ideas:
- Click to reveal
    - move sounds here, initial sound is now shorter and ends right b4 the "OOOO!"
    - when clicked, play the rest of the audio
        - not possible to click early coz button wont be shown
*/
import Link from "next/link";
import flashStyle from "../styles/index.module.scss";
import buttonStyle from "../styles/addButton.module.scss";
import { motion } from "framer-motion";
import { animations } from "../animations/getJoke";
import { IoMdAddCircle } from 'react-icons/io';
import ReactTooltip from 'react-tooltip';

const GetJoke = ({ jokes, id }) => {

  let knock: string = "";
  let who: string = "";
  const joke = jokes[id];

  knock = joke["who's-there"];
  who = joke["who"];

  return (
    <>
      <div className={flashStyle.req}>
        <motion.h1
          drag
          whileDrag={{ scale: 1.1 }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
          whileTap={animations.jokeWhileTap}
        >
          {knock}
        </motion.h1>
      </div>
      <div className={flashStyle.res}>
        <motion.h1
          drag
          whileDrag={{ scale: 1.1 }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
          whileTap={animations.jokeWhileTap}
        >
          {knock} who?
        </motion.h1>
      </div>
      <motion.div className={flashStyle.star}>
        <motion.div
            data-tip="Add your own joke!"

        className={buttonStyle.big}
          initial="hidden"
            animate="visible"
            variants={animations.addJokeButtonVariants}
            whileHover={animations.addJokeButtonWhileHover}
          >
        <Link passHref href="/add-joke">
          <a
          className={buttonStyle.link}
            data-tip="Add your own joke!"
            
          >
            <IoMdAddCircle size={60}
                        className={buttonStyle.button}
 />
          </a>
          
        </Link>
            <ReactTooltip place="left" type="dark" effect="solid" />

        </motion.div>
            {/* <ReactTooltip place="left" type="dark" effect="solid" /> */}

        <motion.h1
          initial="hidden"
          animate={["visible", "active"]}
          variants={animations.jokeVariants}
          whileTap={animations.jokeWhileTap}
          // onMouseOut={animations.jokeOnMouseLeave}
          drag
          whileDrag={{ scale: 1.1 }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
          layout
        >
          {who}
        </motion.h1>
      </motion.div>
    </>
  );
};

export default GetJoke;
