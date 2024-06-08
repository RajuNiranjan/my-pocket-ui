export const getAllUser = async (req, res, next) => {
  try {
    res.status(200).json({ message: "welcome back raju" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
