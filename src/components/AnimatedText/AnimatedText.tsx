/* eslint-disable prefer-const */
import { motion, Variants } from "framer-motion";
import { FC } from "react";


const letterAnimation: Variants = {
    initial: {
        y: "100%",
        opacity: 0
    },
    animate: (i: [number, number]) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: [0.2, 0, 0.1, 1],
            delay: i[0]
        }
    })
};

// Define props type for getLetter function
const getLetter = (name: string) => {
    let letters: JSX.Element[] = [];
    name.split("").forEach((letter, index) => {
        letters.push(
            <motion.span
                key={index}
                variants={letterAnimation}
                initial="initial"
                whileInView="animate"
                custom={[index * 0.02, (name.length - index) * 0.01]}
            >
                {letter === " " ? "\u00A0" : letter} 
            </motion.span>
        );
    });
    return letters;
};

// Define props type for AnimatedText component
interface AnimatedTextProps {
    text: string;
    textStyles?: string;
}

// Define the AnimatedText component with props types
const AnimatedText: FC<AnimatedTextProps> = ({ text, textStyles }) => {
    return (
        <div className={textStyles}>
            {getLetter(text)}
        </div>
    );
};

export default AnimatedText;
