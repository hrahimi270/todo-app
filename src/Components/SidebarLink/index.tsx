import React, { FC } from "react";
import classnames from "classnames";
import { useThemeContext } from "../../Context/ThemeContext";
import { Link, useHistory } from "react-router-dom";

type TColors =
	| "red"
	| "orange"
	| "yellow"
	| "green"
	| "blue"
	| "purple"
	| "pink"
	| "gray";
interface ISidebarLink {
	path: string;
	text: string;
	color?: TColors;
	icon?: React.ReactNode;
	count?: number;
}

const SidebarLink: FC<ISidebarLink> = (props) => {
	const {
		location: { pathname },
	} = useHistory();
	const { theme } = useThemeContext();
	const activeLink: Boolean = props.path === pathname;
	const isDark = theme === "dark";

	// color & color strength
	const { color = "gray" } = props;
	const colorStrength = color === "gray" ? 200 : 100;

	// hover
	const hoverClass = `hover:bg-${color}-${colorStrength}`;
	const darkHoverClass = `hover:bg-gray-900`;

	// active
	const activeClass = `bg-${color}-100`;
	const darkActiveClass = `bg-gray-900`;

	// link
	const linkClassName = classnames(
		"w-11/12 flex items-center pl-6 pr-3 py-3 mb-2 mx-auto rounded-md",
		{
			"text-gray-200": isDark,
			"text-gray-800": !isDark,

			[hoverClass]: !activeLink && !isDark,
			[darkHoverClass]: !activeLink && isDark,

			[activeClass]: activeLink && !isDark,
			[darkActiveClass]: activeLink && isDark,
		},
	);
	const iconClassName = classnames("mr-2", `text-${color}-500`);

	// counter bdage
	const countClassnames = classnames("ml-auto text-xs", {
		"text-gray-100": isDark,
		"text-gray-800": !isDark,
	});

	return (
		<Link to={props.path} className={linkClassName}>
			{props.icon ? (
				<div className={iconClassName}>{props.icon}</div>
			) : null}

			{props.text}

			{props.count ? (
				<span className={countClassnames}>{props.count}</span>
			) : null}
		</Link>
	);
};

export default SidebarLink;
