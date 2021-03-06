import React, { FC } from "react";
import { FiStar, FiSun, FiHome, FiList } from "react-icons/fi";
import classnames from "classnames";
import { useTodoContext, IList } from "../../Context/TodoContext";
import { useThemeContext } from "../../Context/ThemeContext";
import {
	isImportantTask,
	isMydayTask,
	isGeneralTask,
	filterCustomListTasks,
} from "../../Utils";
import SidebarLink from "../SidebarLink";

const SidebarLinksWrapper: FC = () => {
	const { theme } = useThemeContext();
	const { lists, tasks } = useTodoContext();
	const isDark = theme === "dark";

	const linksDividerClassnames = classnames("block w-11/12 my-2 mx-auto", {
		"bg-gray-200": !isDark,
		"bg-gray-600": isDark,
	});

	const importantTasksCount = tasks.length
		? tasks.filter(isImportantTask).length
		: 0;
	const mydayTasksCount = tasks.length ? tasks.filter(isMydayTask).length : 0;
	const allTasksCount = tasks.length ? tasks.filter(isGeneralTask).length : 0;

	function getTasksCountOfList(listID: string) {
		const isCustomListTask = filterCustomListTasks(listID);
		return tasks.length ? tasks.filter(isCustomListTask).length : 0;
	}

	return (
		<div className="flex-grow mb-4">
			<SidebarLink
				path="/tasks/important"
				text="Important"
				color="purple"
				icon={<FiStar />}
				count={importantTasksCount}
			/>
			<SidebarLink
				path="/tasks/myday"
				text="My Day"
				color="orange"
				icon={<FiSun />}
				count={mydayTasksCount}
			/>
			<SidebarLink
				path="/tasks"
				text="Tasks"
				color="blue"
				icon={<FiHome />}
				count={allTasksCount}
			/>
			<span className={linksDividerClassnames} style={{ height: 2 }} />

			{lists.length
				? lists.map((list: IList) => {
						return (
							<SidebarLink
								key={list.id}
								path={`/tasks/list/${list.id}`}
								text={list.name}
								icon={<FiList />}
								count={getTasksCountOfList(list.id)}
							/>
						);
				  })
				: null}
		</div>
	);
};

export default SidebarLinksWrapper;
