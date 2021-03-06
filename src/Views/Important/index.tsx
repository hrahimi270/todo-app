import React, { FC } from "react";
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
	ITask,
} from "../../Context/TodoContext";
import { isImportantTask, getListNameOfOneTask } from "../../Utils";
import importantImage from "../../Statics/empty-important.svg";

const ImportantView: FC = () => {
	const { editTask, deleteTask, addTask } = useTodoDispatchContext();
	const { tasks, lists } = useTodoContext();
	const filteredTasks: ITask[] = tasks.filter(isImportantTask);

	return (
		<>
			<ContentTitle title="Important" />
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
								sourceList={getListNameOfOneTask(
									task.listID,
									lists,
								)}
								onEdit={editTask}
								onDeleteClick={deleteTask}
							/>
						);
					})
				) : (
					<EmptyState
						image={importantImage}
						text="Your important tasks are empty!"
					/>
				)}
			</TaskRowsContainer>
			<AddTask onAdd={addTask} isMyday={false} isImportant />
		</>
	);
};

export default ImportantView;
