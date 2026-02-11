exports.calculateScore = (profile) => {
  let score = 0;
  if (profile.bio) score += 20;
  if (profile.skills?.length) score += 20;
  if (profile.resume) score += 20;
  if (profile.experience) score += 20;
  if (profile.companyName) score += 20;

  return score;
};
