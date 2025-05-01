exports.getBasicStats = async (req, res, next) => {
    try {
      const stats = {
        totalEvents: 10,
        totalRegistrations: 250,
        totalRevenue: 5000
      };
      return res.json({ success: true, stats });
    } catch (err) {
      next(err);
    }
  };

  