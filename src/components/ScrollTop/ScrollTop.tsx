import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa"; 

const ScrollTop = () => {
  return (
    <ScrollToTop
      smooth
      component={<FaArrowUp size={18} color="#fff" />} 
      style={{
        background: "linear-gradient(to right, #a3a3a3, #808080, #4facfe)",
        borderRadius: "50%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       
      }}
    />
  );
};

export default ScrollTop;
