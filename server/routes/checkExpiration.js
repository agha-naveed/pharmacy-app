import express from 'express'
import Medicine from '../model/medicine.js'

const router = express.Router();

router.route("/")
.get(async (req, res) => {
    const getFormattedDate = (date = new Date()) => {
        let onlyDate = date.getDate().toString().length == 1 ? `0${date.getDate()}` : date.getDate();
        let month = (date.getMonth() + 1).toString().length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        return `${date.getFullYear()}-${month}-${onlyDate}`;
    };

    let today = getFormattedDate();

    let after6Months = new Date();
    after6Months.setMonth(after6Months.getMonth() + 6);
    let _6MonthsLater = getFormattedDate(after6Months);
  
    
    const data = await Medicine.find({
        expiry_date : { $gte: today, $lte: _6MonthsLater }
    })
    
    if(data.length > 0) {
        return res.json({
            message: 'ok',
            data
        })
    }
    else {
        return res.json({
            message: 'no'
        })
    }
})


export default router