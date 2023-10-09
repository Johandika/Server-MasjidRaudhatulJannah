const ApiKey = async (req, res, next) => {
  try {
    const { api_key } = req.headers;

    if (api_key !== process.env.API_KEY) {
      throw { name: "Api Key Tidak Valid" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = ApiKey;
