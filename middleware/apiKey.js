const ApiKey = async (req, res, next) => {
  try {
    const { apiKey } = req.headers;

    if (apiKey !== process.env.API_KEY) {
      throw { name: "Api Key Tidak Valid" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = ApiKey;
