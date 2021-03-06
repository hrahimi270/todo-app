import React, { FC } from "react";
import classnames from "classnames";
import { useTodoDispatchContext } from "../../Context/TodoContext";
import { useThemeContext } from "../../Context/ThemeContext";
import SidebarLogo from "../SidebarLogo";
import SidebarDarkmodeSwitcher from "../SidebarDarkmodeSwitcher";
import SidebarLinksWrapper from "../SidebarLinksWrapper";
import SidebarActions from "../SidebarActions";

const Sidebar: FC = () => {
	const { addList } = useTodoDispatchContext();
	const { theme } = useThemeContext();
	const sidebarClassNames = classnames(
		"fixed left-0 bottom-0 top-0 block overflow-y-auto overflow-hidden shadow-xl flex flex-col flex-no-wrap flex-wrap md:w-64 z-10 py-4",
		{
			"bg-white": theme === "light",
			"bg-gray-800": theme === "dark",
		},
	);

	return (
		<aside className={sidebarClassNames}>
			{/* Logo */}
			<SidebarLogo />

			<SidebarDarkmodeSwitcher />

			{/* Links */}
			<SidebarLinksWrapper />

			{/* Actions */}
			<SidebarActions onAdd={addList} />
		</aside>
	);
};

export default Sidebar;
