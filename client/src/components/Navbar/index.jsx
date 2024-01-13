import { Avatar } from "antd";

const Navbar = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const avatar = localStorage.getItem("avatar");

  return (
    <div className="h-14 px-4 fixed left-0 top-0 right-0 shadow z-10 bg-white">
      <div className="flex justify-end gap-x-3 items-center h-14">
        <Avatar src={avatar? avatar : ""} size={40}></Avatar>
        <div className="flex flex-col justify-center">
          <span className="text-base text-left leading-5">{name? name : ""}</span>
          <span className="text-sm text-gray-500 font-light leading-5">
            {email? email : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
