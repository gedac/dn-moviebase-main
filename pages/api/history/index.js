
import History from "../../../models/History";

export default async (req, res) => {
      const { method } = req;
      switch (method){
            case 'GET':
                  try{
      const watchlists = await History.find({});
      res.status(200).json({ success: false, data: watchlists})
      } catch (error) {
      res.status(400).json({ success: false });
}
break;

}
};