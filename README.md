
<img width="499" alt="image" src="https://github.com/eliflali/Weekly-Planner/assets/63200204/6f9df6c9-36be-49d0-a891-89f518c52fc4">

Weekly Planner is a task management application with a Django backend and a ReactJS frontend. This tool allows users to efficiently manage their weekly tasks and notes through a user-friendly interface. Key features include:

* Task Management: Add, delete, and manage tasks effortlessly.
* Pinboard: Use the pinboard to add and organize notes.
* Emergency Status: Change the emergency status of tasks to prioritize your workload.
  
This project aims to streamline your weekly planning and ensure you stay organized and productive.


## Demo

### Add-Delete Tasks:

Adding a task:

![WhatsApp GIF 2024-07-08 at 14 54 08](https://github.com/eliflali/Weekly-Planner/assets/63200204/468932c3-d67e-4637-9225-58a07ab08305)


Scheduling and deleting a task:

![WhatsApp GIF 2024-07-08 at 14 54 36](https://github.com/eliflali/Weekly-Planner/assets/63200204/a2180cd8-5d4d-4d2f-be54-7589a6ed1a19)

### Manage Emergency Status:

![WhatsApp GIF 2024-07-08 at 14 55 56](https://github.com/eliflali/Weekly-Planner/assets/63200204/3dd36e99-d973-4f02-9df8-873420853cc7)

Resulting schedule:

![WhatsApp GIF 2024-07-08 at 14 56 22](https://github.com/eliflali/Weekly-Planner/assets/63200204/abca11bc-3d79-404f-9e9f-808394dad361)


### Use Pinboard to Take Notes:

![WhatsApp GIF 2024-07-08 at 14 57 09](https://github.com/eliflali/Weekly-Planner/assets/63200204/3c47661a-3910-41eb-bf1f-c1fb47b711d4)

### View and Manage Your Tasks in One Place:
![WhatsApp GIF 2024-07-08 at 15 04 34](https://github.com/eliflali/Weekly-Planner/assets/63200204/d5380c40-6cf7-4dfa-ac0f-0238111f6dd7)



## Component Overview

Those two components are used together:
#### 1. WeekPlanner

The WeekPlanner component is the main container for the weekly planner. It manages the state of tasks, handles task addition, deletion, and completion, and supports drag-and-drop functionality.

---


#### 2. DayColumn

The DayColumn component represents a column for each day of the week and the unscheduled section. It displays tasks, supports drag-and-drop operations, and includes functionality for task deletion and completion.

#### How-to Use
##### Adding Tasks

* Task Input: Use the TaskInput component to add a new task. You can specify the task name, deadline, and emergency status.
Adding Logic: The addTask function creates a new task and adds it to the unscheduled column. It also sends a POST request to the backend to store the new task.

##### Managing Tasks

* Viewing Tasks: Each task is displayed in a DayColumn for the respective day or in the unscheduled section.
* Deleting Tasks: Click the delete icon (DeleteIcon) next to a task to delete it. This triggers the deleteTask function, which removes the task from the state and sends a DELETE request to the backend.
* Completing Tasks: Click the check icon (CheckIcon) next to a task to mark it as complete. This triggers the completeTask function, updating the task's state and sending a PATCH request to the backend.
  
##### Drag-and-Drop Functionality

* Drag-and-Drop Setup: The DragDropContext component from react-beautiful-dnd wraps around the DayColumn components to enable drag-and-drop functionality.
* Droppable Areas: Each DayColumn is a Droppable area, allowing tasks to be dropped into it.
* Draggable Items: Each task is a Draggable item, allowing it to be moved between columns.
* Handling Drag End: The onDragEnd function handles the logic when a drag operation ends. It updates the state to reflect the new position of the task and sends a PATCH request to the backend to update the task's day.
##### Example Usage
View and Manage Tasks: Open the application to see tasks organized by day. You can add new tasks using the input form at the top.
Drag-and-Drop: Drag tasks between different days to organize your week. The tasks will automatically update their day in the backend.
Complete and Delete Tasks: Use the check and delete icons to mark tasks as complete or remove them from the list.

---

#### 3. Pinboard Component

##### Functionality:

* Displays a pinboard where users can add, drag, and delete notes.
* Notes are color-coded and can be repositioned on the board.
* Users can add new notes using a text area and a color picker.

##### How-to:
* Add Notes:
Type in the text area and press Enter to add a new note with the selected color.
* Drag Notes:
Drag notes to reposition them on the board. The new positions are saved to the backend.
* Delete Notes:
Click the delete icon on a note to remove it from the pinboard.

---

#### 4. Emergency Status Manager

##### Functionality:
* Manages tasks by their emergency status.
* Displays tasks in columns labeled "High", "Moderate", "Low", and "Hobby".
* Allows users to drag and drop tasks between columns to update their emergency status.

##### How-to:

* View Tasks:
Tasks are displayed under columns corresponding to their emergency status.
* Drag and Drop:
Drag tasks between columns to update their emergency status. The changes are saved to the backend.

---

#### 5. Task Viewer

##### Functionality:

* Displays all tasks.
* Allows users to delete tasks and mark them as completed.
  
##### How-to:

* View Tasks:
Tasks are displayed with their details including title, description, deadline, emergency status, and completion status.
* Delete Tasks:
Click the delete button to remove a task.
* Complete Tasks:
Click the complete button
