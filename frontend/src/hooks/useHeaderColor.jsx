import { useEffect, useState } from "react";

const useHeaderColor = () => {
const [headerColor, setHeaderColor] = useState('#303e3e')
  //to handle shadow of header
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 8) {
        setHeaderColor("#302e2e")
      } else {
        setHeaderColor("#303e3e");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return headerColor
};

export default useHeaderColor;
