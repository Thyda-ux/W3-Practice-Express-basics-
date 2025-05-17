//Query-validation middleware

export function validateQueryMiddleware(req,res,next){
  const { minCredits, maxCredits } = req.query;

  // Credits must be numbers if provided
  const min = minCredits ? parseInt(minCredits) : null;
  const max = maxCredits ? parseInt(maxCredits) : null;

  if (
    (minCredits !== undefined && Number.isNaN(min)) ||
    (maxCredits !== undefined && Number.isNaN(max))
  ) {
    return res
      .status(400)
      .json({ error: 'minCredits and maxCredits must be valid numbers.' });
  }

  if (min !== null && max !== null && min > max) {
    return res
      .status(400)
      .json({ error: 'maxCredits must be greater than or equal to minCredits.' });
  }

  next();
};
