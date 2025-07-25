const express = require("express");
const router = express.Router();
const skill = require("../models/Skill");
router.get("/", async (req, res) => {
  try {
    let skills = skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});
router.post("/", async (req, res) => {
  try {
    const newSkill = new skill(req.body);
    const newskill = await newSkill.save();
    res.status(201).json(newskill);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedSkill = await skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSkill);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await skill.findByIdAndDelete(req.params.id);
    res.json({ msg: "Skill deleted" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
