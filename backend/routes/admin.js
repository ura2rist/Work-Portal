const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const newsController = require('../controllers/news-controller');
const eventController = require('../controllers/event-controller');
const directoryController = require('../controllers/directory-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/authcheck', (request, response) => {
  response.json(true);
});

router.post('/registration', userController.registration);

router.post('/signin', userController.signin);

router.post('/logout', userController.logout);

router.get('/refresh', userController.refresh);

router.get('/users', authMiddleware, userController.getUsers);

router.post('/adduser', authMiddleware, userController.addUser);

router.post('/searchuser', authMiddleware, userController.searchUser);

router.post('/removeUser', authMiddleware, userController.removeUser);

router.post('/changeUser', authMiddleware, userController.changeUser);

router.post('/savenews', authMiddleware, newsController.saveNews);

router.post('/removenews', authMiddleware, newsController.removeNews);

router.post('/addnewspost', authMiddleware, newsController.addnews);

router.post('/addeventpost', authMiddleware, eventController.addEvent);

router.post('/removeevent', authMiddleware, eventController.removeEvent);

router.post('/saveevent', authMiddleware, eventController.saveEvent);

router.post('/addcategory', authMiddleware, directoryController.addCategory);

router.post('/removecategory', authMiddleware, directoryController.removeCategory);

router.post('/changecategory', authMiddleware, directoryController.changeCategory);

router.post('/addsubcategory', authMiddleware, directoryController.addSubCategory);

router.post('/removesubcategory', authMiddleware, directoryController.removeSubCategory);

router.post('/changesubcategory', authMiddleware, directoryController.changeSubCategory);

router.post('/addpeople', authMiddleware, directoryController.addPeople);

router.post('/removepeople', authMiddleware, directoryController.removePeople);

router.post('/getinfo', authMiddleware, directoryController.getInfo);

router.post('/editpeople', authMiddleware, directoryController.editPeople);

module.exports = router;
