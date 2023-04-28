const Account = require('../models/account');

const accountController = {
  getAllAccounts: async (req, res) => {
    try {
      const accounts = await Account.find();
      res.json(accounts);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const account = await Account.findOne({ email, password });
      if (account) {
        res.json(account);
      } else {
        res.status(401).send('Invalid login credentials');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  },

  addAccount: async (req, res) => {
    try {
      const { email, password, is_admin, gender, firstname, lastname } =
        req.body;

      if (is_admin === undefined) {
        is_admin = false;
      }
      const account = new Account({
        email,
        password,
        is_admin,
        gender,
        firstname,
        lastname,
      });
      await account.save();
      res.json(account);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  },

  addLeave: async (req, res) => {
    try {
      const { userId, startDate, endDate, days, leaveType } = req.body;
      const account = await Account.findById(userId);
      if (account) {
        const newLeave = {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          days: Number(days),
          leaveType: String(leaveType),
        };
        account.leaves.push(newLeave);
        await account.save();
        res.json(account);
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.query;
      const account = await Account.findById(id);
      if (account) {
        res.json(account);
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  },

  getUserLeaves: async (req, res) => {
    try {
      const { id } = req.query;
      const account = await Account.findById(id);
      if (account) {
        res.json(account.leaves);
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  },

  getAllLeaves: async (req, res) => {
    try {
      const leaves = await Account.find().select('leaves');
      res.json(leaves);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  },

  updateLeave: async (req, res) => {
    try {
      const { userId, leaveId, startDate, endDate, leaveType, days } = req.body;
      const account = await Account.findById(userId);
      if (account) {
        const leaveIndex = account.leaves.findIndex(
          (leave) => leave._id.toString() === leaveId
        );
        if (leaveIndex !== -1) {
          account.leaves[leaveIndex].startDate = startDate;
          account.leaves[leaveIndex].endDate = endDate;
          account.leaves[leaveIndex].leaveType = leaveType;
          account.leaves[leaveIndex].days = days;
          await account.save();
          res.json(account);
        } else {
          res.status(404).send('Leave not found');
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  },

  deleteLeave: async (req, res) => {
    try {
      const { userId, leaveId } = req.query;
      console.log(userId, leaveId);
      const account = await Account.findById(userId);
      if (account) {
        const leaveIndex = account.leaves.findIndex(
          (leave) => leave._id.toString() === leaveId
        );
        if (leaveIndex !== -1) {
          account.leaves.splice(leaveIndex, 1);
          await account.save();
          res.json(account);
        } else {
          res.status(404).send('Leave not found');
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  },
};

module.exports = accountController;
