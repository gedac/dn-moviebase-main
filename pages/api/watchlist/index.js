import Watchlist from "../../../models/Watchlist";

export default async (req, res) => {
      const { method } = req;
      switch (method){
            case 'GET':
                  try{
      const watchlists = await Watchlist.find({});
      res.status(200).json({ success: true, data: watchlists})
      } catch (error) {
      res.status(400).json({ success: false });
}
break;

}
};