import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGlobalState, User } from "~~/services/store/store";

const LogoutButton = () => {
  const router = useRouter()
  const updateUserType = useGlobalState((state) => state.setUserType)
  const logout = () => {
    updateUserType("undefined")
    router.push("/")
  }
  return (
    <Button
      background="linear-gradient(93.51deg, #aa3311 2.84%, #BFaaaa 99.18%)"
      border={"1rem"}
      backgroundClip="text"
      textTransform="uppercase"
      fontWeight="bold"
      letterSpacing="1.5px"
      onClick={logout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
