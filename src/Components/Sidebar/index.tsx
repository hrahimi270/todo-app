import React, { useContext } from "react";
import classnames from "classnames";
import { TodoContext } from "../../Context/TodoContext";
import { ThemeContext } from '../../Context/ThemeContext'
import SidebarLogo from "../SidebarLogo";
import SidebarLinksWrapper from "../SidebarLinksWrapper";
import SidebarActions from "../SidebarActions";

export default () => {
	const todoContext = useContext(TodoContext);
	const { theme } = useContext(ThemeContext);
	const sidebarClassNames = classnames('fixed left-0 bottom-0 top-0 block overflow-y-auto overflow-hidden shadow-xl flex flex-col flex-no-wrap flex-wrap md:w-64 z-10 py-4', {
		'bg-white': theme === 'light',
		'bg-gray-800': theme === 'dark'
	})

	return (
		<aside className={sidebarClassNames}>
			{/* Logo */}
			<SidebarLogo />

			{/* Links */}
			<SidebarLinksWrapper />

			{/* Actions */}
			<SidebarActions onAdd={todoContext.addList} />
		</aside>
	);
};
