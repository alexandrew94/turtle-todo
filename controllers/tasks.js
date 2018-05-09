const User = require('../models/user');
const moment = require('moment');

// Indexing all the tasks for a certain user
function tasksIndex(req, res) {
  const allTasks = [];
  allTasks.push(req.currentUser.tasks.filter(task => {
    // Pushing all tasks that are supposed to be for today.
    if (task.dueDate === moment().format('YYYY-MM-DD') || task.recurring === 'daily') {
      return task;
    }
  }));
  allTasks.push(req.currentUser.tasks.filter(task => {
    // Pushing all tasks that are supposed to be for the past.
    if (moment(task.dueDate).isBefore(moment().format('YYYY-MM-DD'))) {
      return task;
    }
  }));
  allTasks.push(req.currentUser.tasks.filter(task => {
    // Pushing all tasks that are supposed to be for the future.
    if (moment(task.dueDate).isAfter(moment().format('YYYY-MM-DD'))) {
      return task;
    }
  }));
  res.json(allTasks);
}

// Making a new task - it automatically assigns `actionRequired` as true for the new task.
function tasksCreate(req, res, next) {
  req.body.dueDate = moment(req.body.dueDate).format('YYYY-MM-DD');
  req.body.time = moment(req.body.time).format('HH:mm');
  req.currentUser.tasks.push(req.body);
  req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}

// function tasksComplete(req, res, next) {
//   User
//     .findById(req.params.id)
//     .then(user => {
//       if(user.id === req.currentUser.id) {
//         const task = user.tasks.id(req.params.taskId);
//         if (!user.score) {
//           user.score = 0;
//         }
//         user.score += 5;
//         if (!user[`${task.title}Score`]) {
//           user[`${task.title}Score`] = 0;
//         }
//         user[`${task.title}Score`] += 5;
//         if (!task.recurring) {
//           user.completedTasks.push(task);
//           task.remove();
//         }
//         return user.save()
//           .then((user) => {
//             res.json(user.tasks);
//           });
//       } else {
//         res.json({ message: 'Unauthorized' });
//       }
//     })
//     .catch(err => next(err));
// }

function tasksComplete(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => {
      if(user.id === req.currentUser.id) {
        const task = user.tasks.id(req.params.taskId);
        if (!user.score) {
          user.score = 0;
        }
        user.score += 5;
        if(!user.taskScores) {
          user.taskScores = [];
        }
        // user.taskScores.forEach((e) => {
        //   if(Object.keys(e)[0] === `${task.title}Score`) {
        //     e[`${task.title}Score`] += 5;
        //   }
        // });
        if (!user[`${task.title}Score`]) {
          user[`${task.title}Score`] = 0;
        }
        user[`${task.title}Score`] += 5;
        if (!task.recurring) {
          user.completedTasks.push(task);
          task.remove();
        }
        return user.save()
          .then((user) => {
            res.json(user.tasks);
          });
      } else {
        res.json({ message: 'Unauthorized' });
      }
    })
    .catch(err => next(err));
}

// This 'deletion' function will be used for completing a task. It will update the user's score when you do it.
// function tasksComplete(req, res, next) {
//   User
//     .findById(req.params.id)
//     .then(user => {
//       if(user.id === req.currentUser.id) {
//         const task = user.tasks.id(req.params.taskId);
//         console.log(task);
//         if (!user.score) {
//           user.score = 0;
//         }
//         user.score += 5;
//         if(!user.taskScores) {
//           user.taskScores = {};
//         }
//         if (!user.taskScores[`${task.title}Score`]) {
//           user.taskScores[`${task.title}Score`] = 0;
//         }
//         console.log('LOGGING USER TASKSCORES before =+5', user.taskScores, user.score);
//         user.taskScores[`${task.title}Score`] += 5;
//         console.log('LOGGING USER TASKSCORES', user.taskScores, user.score);
//         // All of these lines above could be used in the future to determine how to increment the score on the main user data. I think this is actually subject to change depending on the naming conventions we call our tasks etc. For instance, if we do this our task title can't have spaces in it.
//         if (!task.recurring) {
//           task.remove();
//         }
//         // For recurring tasks, we might not remove this.
//         console.log('logging the whole user', user.taskScores);
//         return user.save()
//           .then((user) => {
//             console.log('right after save--->',user.taskScores);
//             res.json(user.tasks);
//           });
//         // console.log('logging the whole user after save', user.taskScores);
//         // return res.status(202).json(user.tasks);
//       } else {
//         res.json({ message: 'Unauthorized' });
//       }
//     })
//     .catch(err => next(err));
// }

//  Finding a particular task by the task Id
function tasksShow(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => {
      if(user.id === req.currentUser.id) {
        const task = user.tasks.id(req.params.taskId);
        res.json(task);
      } else {
        res.json({ message: 'Unauthorized' });
      }
    })
    .catch(err => next(err));
}

function tasksEdit(req, res, next) {
  // This will need some sort of validation later, since we want only the currently logged in user to be able to edit a task.
  User
    .findById(req.params.id)
    .then(user => {
      if(user.id === req.currentUser.id) {
        let task = user.tasks.id(req.params.taskId);
        req.body.dueDate = moment(req.body.dueDate).format('YYYY-MM-DD');
        req.body.time = moment(req.body.time).format('HH:mm');
        task = Object.assign(task, req.body);
        user.save();
        res.json(task);
      } else {
        res.json({ message: 'Unauthorized' });
      }
    })
    .catch(err => next(err));
}

function tasksDelete(req, res, next) {
  // This will need some sort of validation later, since we want only the currently logged in user to be able to delete a task.
  User
    .findById(req.params.id)
    .then(user => {
      if(user.id === req.currentUser.id) {
        const task = user.tasks.id(req.params.taskId);
        task.remove();
        return user.save();
      } else {
        res.json({ message: 'Unauthorized' });
      }
    })
    .then(task => res.json(task))
    .catch(err => next(err));
}

// Remaining tasks:

module.exports = {
  tasksIndex: tasksIndex,
  tasksCreate: tasksCreate,
  tasksShow: tasksShow,
  tasksEdit: tasksEdit,
  tasksComplete: tasksComplete,
  tasksDelete: tasksDelete
};
