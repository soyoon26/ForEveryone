import Logo from "../components/menus/Logo";
import { Link } from "react-router-dom";
const MainPage = () => {
  return (
    <div>
      {/* <BasicMenu></BasicMenu> */}
      <Link to={"./select"}>
        <Logo></Logo>
      </Link>
    </div>
  );
};

export default MainPage;
