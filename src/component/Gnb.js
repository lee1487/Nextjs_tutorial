import { useRouter } from "next/router";
import React from "react";
import { Menu } from "semantic-ui-react";

const Gnb = () => {
  let activeItem;
  const router = useRouter();
  console.log(router);
  if (router.pathname === "/") {
    activeItem = "home";
  } else if (router.pathname === "/about") {
    activeItem = "about";
  } else if (router.pathname === "/admin") {
    activeItem = "admin";
  }

  let goLink = (e, data) => {
    if (data.name === "home") {
      router.push("/");
    } else if (data.name === "about") {
      router.push("/about");
    }
  };

  return (
    <Menu inverted>
      <Menu.Item name="home" active={activeItem === "home"} onClick={goLink} />
      <Menu.Item
        name="about"
        active={activeItem === "about"}
        onClick={goLink}
      />
      <Menu.Item
        name="Contact Us"
        active={activeItem === "contact"}
        onClick={() => {
          router.push("/contact");
        }}
      />
      <Menu.Item
        name="admin"
        active={activeItem === "admin"}
        onClick={() => {
          router.push("/admin");
        }}
      />
    </Menu>
  );
};

export default Gnb;
