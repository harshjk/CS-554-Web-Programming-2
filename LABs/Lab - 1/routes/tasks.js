/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Wed Sep 13 2017
 *  File : tasks.js
 *******************************************/
const express = require('express');
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;

router.get("/", (req, res) => {
    let skip = 0;
    let limit = 20;
    if (typeof req.query.skip !== "undefined") {
        skip = Number(req.query.skip);
    }
    if (typeof req.query.take !== "undefined") {
        limit = Number(req.query.take);
    }
    taskData.getTasks(limit, skip).then((tasks) => {
        res.json(tasks);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
    taskData.getTaskById(req.params.id).then((task) => {
        res.json(task);
    }).catch(() => {
        res.status(404).json({
            error: "Recipe not found"
        });
    });
});

router.post("/", (req, res) => {
    let task = req.body;

    if (!task) {
        res.status(400).json({
            error: "You must provide data to create a task"
        });
        return;
    }

    if (!task.title) {
        res.status(400).json({
            error: "You must provide a title of task"
        });
        return;
    }

    if (!task.description) {
        res.status(400).json({
            error: "You must provide a description of task"
        });
        return;
    }

    if (!task.hoursEstimated) {
        res.status(400).json({
            error: "You must provide a hours estimated of task"
        });
        return;
    }

    if (!task.completed) {
        res.status(400).json({
            error: "You must provide a is task completed or not"
        });
        return;
    }

    taskData.addTask(task.title, task.description, task.hoursEstimated, task.completed)
        .then((newTask) => {
            res.json(newTask);
        }, () => {
            res.sendStatus(500);
        });
});

router.put("/:id", (req, res) => {
    let task = req.body;

    if (!task) {
        res.status(400).json({
            error: "You must provide data to update a task"
        });
        return;
    }

    if (!task.title) {
        res.status(400).json({
            error: "You must provide a title of task"
        });
        return;
    }

    if (!task.description) {
        res.status(400).json({
            error: "You must provide a description of task"
        });
        return;
    }

    if (!task.hoursEstimated) {
        res.status(400).json({
            error: "You must provide a hours estimated of task"
        });
        return;
    }

    if (!'completed' in task) {
        res.status(400).json({
            error: "You must provide a is task completed or not"
        });
        return;
    }

    let getRecipe = taskData.getTaskById(req.params.id).then(() => {
        return taskData.updateTask(req.params.id, task)
            .then((updatedTask) => {
                res.json(updatedTask);
            }, (error) => {
                //console.log(error);
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({
            error: "Task not found"
        });
    });

});

router.patch("/:id", (req, res) => {
    let task = req.body;

    if (!task) {
        res.status(400).json({
            error: "You must provide data to update a task"
        });
        return;
    }

    let getRecipe = taskData.getTaskById(req.params.id).then(() => {
        return taskData.patchTask(req.params.id, task)
            .then((updatedTask) => {
                res.json(updatedTask);
            }, (error) => {
                //console.log(error);
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({
            error: "Task not found"
        });
    });

});

router.post("/:id/comments", (req, res) => {
    let comment = req.body;

    if (!comment) {
        res.status(400).json({
            error: "You must provide data to create a comment"
        });
        return;
    }

    if (!comment.name) {
        res.status(400).json({
            error: "You must provide a name of commenter"
        });
        return;
    }

    if (!comment.comment) {
        res.status(400).json({
            error: "You must provide a comment"
        });
        return;
    }

    taskData.addComment(req.params.id, comment.name, comment.comment)
        .then((newComment) => {
            res.json(newComment);
        }, () => {
            res.sendStatus(500);
        });
});

module.exports = router;