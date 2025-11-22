// 18.Create functions startExam(callback), evaluateExam(callback), and
// declareResult() using callbacks so the output appears in sequence with
// delays:
// Exam started → Evaluating answers → Result declared.

function startExam(callback) {
  setTimeout(() => {
    console.log('Exam started');
    callback();
  }, 1000);
}

function evaluateExam(callback) {
  setTimeout(() => {
    console.log('Evaluating answers');
    callback();
  }, 1000);
}

function declareResult() {
  setTimeout(() => {
    console.log('Result declared');
  }, 1000);
}

startExam(() => {
  evaluateExam(() => {
    declareResult();
  });
});
