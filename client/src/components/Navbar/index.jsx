import { Avatar } from "antd";
import { useSelector } from "react-redux"

const Navbar = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="h-14 px-4 fixed left-0 top-0 right-0 shadow z-10 bg-white">
      <div className="flex justify-end gap-x-3">
        <Avatar src={user.avatar? user.avatar : ""} size={40}></Avatar>
        <div className="flex flex-col">
          <span className="text-base text-left leading-5">{user.name? user.name : ""}</span>
          <span className="text-sm text-gray-500 font-light leading-5">
            {user.email? user.email : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
