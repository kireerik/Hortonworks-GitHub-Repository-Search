export const animate = (update, duration, done) => {
  let startTime;

  const id = requestAnimationFrame(function frame() {
    const progress = Math.min((performance.now() - startTime) / duration, 1);

    update(progress);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      performance.clearMarks(id);

      done();
    }
  }).toString();

  performance.mark(id);

  startTime = performance.getEntriesByName(id)[0].startTime;
};
