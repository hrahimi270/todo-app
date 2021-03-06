import React, { FC } from "react";
import { useParams } from "react-router-dom";
import {
	ContentTitle,
	TaskRowsContainer,
	TaskRow,
	AddTask,
	EmptyState,
} from "../../Components";
import {
	useTodoContext,
	useTodoDispatchContext,
	IList,
	ITask,
} from "../../Context/TodoContext";
import { filterCustomListTasks } from "../../Utils";
import listTasksImage from "../../Statics/empty-list-tasks.svg";

const ListView: FC = () => {
	const { id } = useParams();
	const { editTask, deleteTask, addTask } = useTodoDispatchContext();
	const { tasks, lists } = useTodoContext();

	const isCustomListTask = filterCustomListTasks(id as string);
	const filteredTasks: ITask[] = tasks.filter(isCustomListTask);

	function getListName(): string {
		const activeList: IList = lists.filter(
			(list: IList) => list.id === id,
		)[0];

		const name =
			activeList && activeList.name ? activeList.name : "undefined";

		return name;
	}

	return (
		<>
			<ContentTitle inCustomList title={getListName()} />
			<TaskRowsContainer>
				{filteredTasks.length ? (
					filteredTasks.map((task: ITask) => {
						return (
							<TaskRow
								key={task.id}
								task={task.task}
								id={task.id}
								done={task.done}
								important={task.important}
								myDay={task.myday}
								onEdit={editTask}
								onDeleteClick={deleteTask}
							/>
						);
					})
				) : (
					<EmptyState
						image={listTasksImage}
						text="There is no task in this list!"
					/>
				)}
			</TaskRowsContainer>

			<AddTask
				onAdd={addTask}
				listID={id}
				isImportant={false}
				isMyday={false}
			/>
		</>
	);
};

export default ListView;
