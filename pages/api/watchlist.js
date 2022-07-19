
import Watchlist from "../../models/Watchlist";

export default async (GET, res) => {
      const watchlists = await Watchlist.find({});
      res.status(200).json({ success: true, data: watchlists})
};