
import { MenuContexts } from "@/contexts/MenuContexts";
import { useContext } from "react";
import { FaBars, FaRegUser } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import BtnLogout from "../Logout/btnLogout";
import { Menu, MenuButton, Button, MenuList, MenuGroup, MenuItem, MenuDivider, Avatar, WrapItem } from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function MainHeader() {
    const { data } = useSession()
    const { toggle } = useContext(MenuContexts);

    return (
        <header className="bg-white flex flex-1 w-full justify-between items-center lg:justify-end px-5 h-16 shadow-lg shadow-gray-200">
            <div onClick={toggle} className="lg:hidden"><FaBars className="cursor-pointer" /></div>
            <div>
                <Menu>
                    <MenuButton className="text-purple-700">
                    <WrapItem>
                        <Avatar
                            name={data?.user?.name ?? "Usuário"}
                            src={data?.user?.image ?? "https://bit.ly/dan-abramov"}
                        />
                    </WrapItem>
                    </MenuButton>
                    <MenuList >
                        <MenuGroup >
                            <MenuItem className="text-purple-700" ><FaRegUser className="mr-3 text-purple-700" />< Link className="text-purple-700" href="/dashboard/perfil">Meu Perfil</Link></MenuItem>
                        </MenuGroup>
                        <MenuDivider />

                        <div className="pl-3 text-purple-700 flex items-center">
                            <RiLogoutBoxLine className="mr-3" />
                            <BtnLogout />
                        </div>



                    </MenuList>
                </Menu>

            </div>
        </header>
    )
}
