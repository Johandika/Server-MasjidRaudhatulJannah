const ApiKey = async (req, res, next) => {
  try {
    const { apikey } = req.headers;

    if (apikey !== process.env.API_KEY) {
      throw { name: "Api Key Tidak Valid" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = ApiKey;
