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

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  // Validates data
  if (!isValidAG(CourseInfo, AssignmentGroup)) return [];
  if (!isValidGrade(AssignmentGroup)) return [];

  let learners = [];

  // Process learner submissions
  for (let i = 0; i < LearnerSubmissions.length; i++) { 
    let submission = LearnerSubmissions[i];
    let learnerId = submission.learner_id;
    let assignmentId = submission.assignment_id;

    // Find the assignment by looping through assignments
    let assignment = AssignmentGroup.assignments.find(a => a.id === assignmentId);
    if (!assignment) continue; // Skip if assignment not found

    // Skip assignments that are not yet due
    let dueDate = new Date(assignment.due_at);
    if (dueDate > new Date()) {
      continue;
    }

    // Check if learner already exists in learners array
    let learner = learners.find(l => l.id === learnerId);

    if (!learner) {
      learner = { id: learnerId, avg: 0, totalScore: 0, totalPossible: 0 };
      learners.push(learner);
    }

    // Calculate the score for the submission and deducts 10% if late
    let score = submission.submission.score;
    let submittedDate = new Date(submission.submission.submitted_at);
    if (submittedDate > dueDate) {
      score -= assignment.points_possible * 0.1; 
    }

    let scorePercentage = score / assignment.points_possible;
    learner[assignmentId] = ((scorePercentage * 1000) ) / 1000; 
    learner.totalScore += score;
    learner.totalPossible += assignment.points_possible;
  }

  // Finalize learner data and calculate averages
  let results = [];
  for (let i = 0; i < learners.length; i++) {
    let learner = learners[i];
    let scaledAvg = (learner.totalScore / learner.totalPossible) * 1000;
    results.push(learner);
  }

  // Return the results array
  return results;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);










  