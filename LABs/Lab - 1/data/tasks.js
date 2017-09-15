/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Wed Sep 13 2017
 *  File : tasks.js
 *******************************************/
const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require('uuid/v4');

let exportedMethods = {
    getTasks(taskLimit, skipTask) {
        if (taskLimit > 100) {
            taskLimit = 100;
        }
        return tasks().then((taskCollection) => {
            return taskCollection.find({}).skip(skipTask > 0 ? skipTask : 0).limit(taskLimit).toArray();
        });
    },
    getTaskById(id) {
        return tasks().then((taskCollection) => {
            return taskCollection.findOne({
                _id: id
            }).then((task) => {
                if (!task) throw "Task not found";
                return task;
            });
        });
    },
    addTask(title, description, hoursEstimated, completed, comments) {
        if (typeof title !== "string" || typeof description !== "string" || typeof hoursEstimated !== "number" || typeof completed !== "boolean") {
            throw "Input type is wrong";
        }
        if (typeof (comments) === "undefined") {
            comments = [];
        } else if (typeof (comments) !== "object") {
            throw "Comments type is wrong";
        }
        return tasks().then((taskCollection) => {
            let newTask = {
                _id: uuid(),
                title: title,
                description: description,
                hoursEstimated: hoursEstimated,
                completed: completed,
                comments: comments
            };
            return taskCollection.insertOne(newTask).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getTaskById(newId);
            });
        });
    },
    updateTask(id, updateTask) {
        return tasks().then((taskCollection) => {
            if (updateTask.title === undefined) {
                throw "There must be title for update task";
            }
            if (typeof updateTask.title !== "string") {
                throw "Title must be in string format";
            }
            if (updateTask.description === undefined) {
                throw "There must be description for update task";
            }
            if (typeof updateTask.description !== "string") {
                throw "Description must be in string format";
            }
            if (updateTask.hoursEstimated === undefined) {
                throw "There must be hours estimated for update task";
            }
            if (typeof updateTask.hoursEstimated !== "number") {
                throw "hoursEstimated must be in number format";
            }
            if (updateTask.completed === undefined) {
                throw "There must be is complete for update task";
            }
            if (typeof updateTask.completed !== "boolean") {
                throw "Is complete must be in boolean format";
            }
            let updatedTask = {
                title: updateTask.title,
                description: updateTask.description,
                hoursEstimated: updateTask.hoursEstimated,
                completed: updateTask.completed
            };
            return taskCollection.updateOne({
                _id: id
            }, updatedTask).then((result) => {
                return this.getTaskById(id);
            });
        });
    },
    patchTask(id, updateTask) {
        return tasks().then((taskCollection) => {
            let updatedTask = {};
            if ('title' in updateTask) {
                if (typeof updateTask.title !== "string") {
                    throw "Title must be in string format";
                } else {
                    updatedTask.title = updateTask.title;
                }
            }
            if ('description' in updateTask) {
                if (typeof updateTask.description !== "string") {
                    throw "Description must be in string format";
                } else {
                    updatedTask.description = updateTask.description;
                }
            }
            if ('hoursEstimated' in updateTask) {
                if (typeof updateTask.hoursEstimated !== "number") {
                    throw "hoursEstimated must be in number format";
                } else {
                    updatedTask.hoursEstimated = updateTask.hoursEstimated;
                }
            }
            if ('completed' in updateTask) {
                if (typeof updateTask.completed !== "boolean") {
                    throw "Is complete must be in boolean format";
                } else {
                    updatedTask.completed = updateTask.completed;
                }
            }
            let updateCommand = {
                $set: updatedTask
            };
            return taskCollection.updateOne({
                _id: id
            }, updateCommand).then((result) => {
                return this.getTaskById(id);
            });
        });
    },
    addComment(taskId, name, comment) {
        return tasks().then((taskCollection) => {
            commentID = uuid();
            let newCommentObject = {
                _id: commentID,
                name: name,
                comment: comment
            };
            return taskCollection.updateOne({
                _id: taskId
            }, {
                $push: {
                    "comments": newCommentObject
                }
            }).then(function () {
                
                return exportedMethods.getCommentByCommentID(commentID).then((comment) => {
                    return comment;
                }, (error) => {
                    return Promise.reject("Can not add this comment");
                    //return error;
                });
            });
        });
    },
    getCommentByCommentID(id) {
        id = String(id);
        return tasks().then((taskCollection) => {
            return taskCollection.findOne({
                $where: "this.comments._id = '" + id + "'"
            }).then((task) => {
                if (!task) throw "comment not found";
                console.log(task);
                let result = task.comments.filter(function (obj) {
                    console.log(obj);
                    return obj._id === id;
                });
                console.log(result);
                if (!result) throw "comment not found";

                result.taskId = task._id;
                result.taskTitle = task.title;
                //console.log(result);
                return result;
            });
        });
    },
    deleteComment(taskId, commentID) {
        return tasks().then((taskCollection) => {
            return taskCollection.updateOne({
                "comments._id": commentID
            }, {
                $unset: {
                    "comments.$._id": commentID
                }
            }).then((updationInfo) => {
                if (updationInfo.updatedCount === 0) {
                    throw (`Could not comment with id of ${commentID}`)
                } else {
                    return "Comment Deleted";
                }
            });
        });
    }
};

module.exports = exportedMethods;


/* exportedMethods.deleteComment('bb42f321-9f13-4ae0-9090-15b7ac796586','249eb120-79c5-4924-b4a1-3bb40431b3af').then((data) => {
    console.log(data);
}) */

/* exportedMethods.addComment("bb42f321-9f13-4ae0-9090-15b7ac796586", "Gopi H K", "Gopi Harsh Kevadia").then((data) => {
    console.log(JSON.stringify(data));
}); */


/* exportedMethods.patchTask("fd025450-1b46-4e9b-878e-dceed2fb2b8f", {
    completed: false,
    comments: ['Harsh Kevadia', 'Gopi Harsh']
}).then((data) => {
    console.log(data);
});
 */
/* exportedMethods.updateTask("fd025450-1b46-4e9b-878e-dceed2fb2b8f", {
    title: 'Harsh Jagdishbhai Kevadia',
    description: 'Gopi H Kevadia',
    hoursEstimated: 10,
    completed: true,
    comments: ['Harsh Kevadia', 'Gopi Harsh']
}).then((data) => {
    console.log(data);
}); */

/* exportedMethods.addTask("Harsh Kevadia", "Gopi Harsh Kevadia", 12, false).then((data) => {
    console.log(data);
}); */

/* exportedMethods.getTasks(0, 0).then((data) => {
    console.log(JSON.stringify(data));
}); */