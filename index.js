const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// Checks AssignmentGroup matches with course_id
function isValidAG(CourseInfo, AssignmentGroup){
  try {
    if (CourseInfo.id === AssignmentGroup.course_id) {
      return true;
    } else {
      throw new Error(`${AssignmentGroup.name} does not belong to its course.`);
    }
  } catch (error) {
    console.error(error.message);
    return false;
  }
}

// Checks if grade is valid
function isValidGrade(AssignmentGroup) {
  try {
    for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
      const pointsPossible = AssignmentGroup.assignments[i].points_possible;


      // Check for invalid data
      if (pointsPossible === 0 || typeof pointsPossible !== 'number') {
        throw new Error(`Invalid points for assignment ${AssignmentGroup.assignments[i].name}.`);
      }
    }
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}








   