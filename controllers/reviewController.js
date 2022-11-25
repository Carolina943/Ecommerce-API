const createReview = async (req, res) =>{
  res.send('create review');
};

const getAllReviews = async (req,res) =>{
  res.send('get all review');
};

const getSingleReview = async (req,res) =>{
  res.send('get single reviews');
};

const updateReview = async =>{
  res.send('update review');
};

const deleteReview = async =>{
  res.send('delete review');
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};