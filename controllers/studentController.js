const { ObjectId } = require('mongoose').Types;
const { User, Course } = require('../models');

// Aggregate function to get the number of Users overall
const headCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('UserCount');
  return numberOfUsers;
}

// Aggregate function for getting the overall grade using $avg
const grade = async (UserId) =>
  User.aggregate([
    // only include the given User by using $match
    { $match: { _id: new ObjectId(UserId) } },
    
  ]);

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const Users = await User.find();

      const UserObj = {
        Users,
        headCount: await headCount(),
      };

      res.json(UserObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single User
  async getSingleUser(req, res) {
    try {
      const User = await User.findOne({ _id: req.params.UserId })
        .select('-__v');

      if (!User) {
        return res.status(404).json({ message: 'No User with that ID' })
      }

      res.json({
        User,
        grade: await grade(req.params.UserId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new User
  async createUser(req, res) {
    try {
      const User = await User.create(req.body);
      res.json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a User and remove them from the course
  async deleteUser(req, res) {
    try {
      const User = await User.findOneAndRemove({ _id: req.params.UserId });

      if (!User) {
        return res.status(404).json({ message: 'No such User exists' });
      }
      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a User
