import express from 'express'
import { createOrUpdate, deleteAvengerById, getAvengerById, readAllAvengers } from './db.js'

const router = express.Router()

// READ ALL Avengers
router.get('/avengers', async(req, res) => {
    const { success, data } = await readAllAvengers()

    if(success){
        return res.json({success, data})
    }
    return res.status(500).json({success:false, messsage: "Error"})
})

// Get an Avenger by ID
router.get('/avenger/:id', async(req, res) => {
    const { id } = req.params
    const { success, data } = await getAvengerById(id)
    console.log(data)
    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Create Avenger
router.post('/avenger', async(req, res) => {
    const { success, data } = await createOrUpdate(req.body)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})


// Update Avenger by ID
router.put('/avenger/:id', async(req, res) => {
    const avenger = req.body
    const { id } = req.params
    avenger.id = parseInt(id)

    const { success, data } = await createOrUpdate(avenger)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Delete Avenger by Id
router.delete('/avenger/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await deleteAvengerById(id)
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error'})
})
  



export default router