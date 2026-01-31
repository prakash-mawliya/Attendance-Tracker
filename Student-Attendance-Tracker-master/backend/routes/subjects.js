
const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

// POST route to add a new subject
router.post('/', async (req, res) => {
  try {
    const { name, attendedClasses, totalClasses } = req.body;
    const missedClasses = totalClasses - attendedClasses;
    const totalMissedClasses = missedClasses > 0 ? missedClasses : 0; // Ensure totalMissedClasses is not negative
    const newSubject = new Subject({ name, attendedClasses, totalClasses, missedClasses, totalMissedClasses });
    await newSubject.save();
    res.status(201).send(newSubject);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET route to fetch all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).send(subjects);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// DELETE route to delete a subject by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await Subject.findByIdAndDelete(id);
    if (!deletedSubject) {
      return res.status(404).send('Subject not found');
    }
    res.status(200).send(deletedSubject);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT route to update a subject by ID
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { attendedClasses, totalClasses } = req.body;
      const missedClasses = totalClasses - attendedClasses;
      const totalMissedClasses = missedClasses > 0 ? missedClasses : 0; // Ensure totalMissedClasses is not negative
      const updatedSubject = await Subject.findByIdAndUpdate(id, {
        attendedClasses,
        totalClasses,
        missedClasses,
        totalMissedClasses,
      }, { new: true });
      if (!updatedSubject) {
        return res.status(404).send('Subject not found');
      }
      res.status(200).send(updatedSubject);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  module.exports = router;

module.exports = router;
