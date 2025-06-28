import express from 'express'
import MedicinePurchase from '../model/medicine-purchase.js'

const router = express.Router();

router.route("/")
.get(async (req, res) => {
  let cookie = await req.cookies.user
  let medicine;

  let date = new Date()
  let onlyDate = (date.getDate()).toString().length == 1 ? `0${date.getDate()}` : date.getDate()
  let month = (date.getMonth() + 1).toString().length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  let finalDate = `${date.getFullYear()}-${month}-${onlyDate}`

  if(cookie == 'admin') {
    medicine = await MedicinePurchase.find({date: finalDate}).sort({createdAt: -1})
  }
  else {
    medicine = await MedicinePurchase.find({user: cookie, date: finalDate}).sort({createdAt: -1})
  }

    if(medicine) {
        return res.json({
            message: 'ok',
            details: medicine
        })
    }
    else {
        return res.json({
            message: "error"
        })
    }

})
.patch(async (req, res) => {
    let { from, to } = req.query
    let cookie = await req.cookies.user


    if(cookie == 'admin') {
        if(from && !to) {
            const data = await MedicinePurchase.find({
                date: {
                    $gte: from
                }
            }).sort({createdAt: -1})

            return res.json({
                message: 'ok',
                data
            })
        }
        if(!from && to) {
            const data = await MedicinePurchase.find({
                date: {
                    $lte: to
                }
            }).sort({createdAt: -1})
            return res.json({
                message: 'ok',
                data
            })
        }

        if(from && to) {
            const data = await MedicinePurchase.find({
                date: {
                    $gte: from,
                    $lte: to
                }
            }).sort({createdAt: -1})
            return res.json({
                message: 'ok',
                data
            })
        }


        else {
            return res.json({
                message: "No Data"
            })
        }
    }


    else {
        if(from && !to) {
            const data = await MedicinePurchase.find({
                date: {
                    $gte: from
                },
                user: cookie
            }).sort({createdAt: -1})

            return res.json({
                message: 'ok',
                data
            })
        }
        if(!from && to) {
            const data = await MedicinePurchase.find({
                date: {
                    $lte: to
                },
                user: cookie
            }).sort({createdAt: -1})
            return res.json({
                message: 'ok',
                data
            })
        }

        if(from && to) {
            const data = await MedicinePurchase.find({
                date: {
                    $gte: from,
                    $lte: to
                },
                user: cookie
            }).sort({createdAt: -1})
            return res.json({
                message: 'ok',
                data
            })
        }


        else {
            return res.json({
                message: "No Data"
            })
        }
    }
})
export default router
