import { isDBConnected } from "../../utils/db.js";

const status = async (req, res) => {
    if(isDBConnected) {
        return res.status(200).json({statusText: "ok"});
    } else {
        res.status(503).json({ statusText: 'error' });
    }
}

export default status;