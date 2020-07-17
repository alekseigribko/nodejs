import Product from 'src/services/products/models/Product'
import Logger from 'src/utils/Logger'
import auth from 'src/services/auth'
import { Router } from 'express'
import ProductStore from 'src/services/products/models/ProductStore'
import Store from 'src/services/products/models/Store'
import StoreLocation from 'src/services/products/models/StoreLocation'

const router = Router()

router.get('/:id', auth.authenticate('user:read'), (req, res) => {
  Product.findByPk(req.params.id)
    .then((product) => {
      if (product) {
        res.json(product)

        return
      }
      res.status(404)
    }).catch((err) => {
      Logger.error(err)
      res.sendStatus(500)
    })
})

router.get('/:id/store', auth.authenticate('user:read'), (req, res) => {
  ProductStore.findAll(
    {
      include: [{ model: Store, include: [StoreLocation] }],
      where: {
        productId: req.params.id
      }

    }

  )
    .then((productStore) => {
      if (productStore) {
        res.json(productStore)// TODO: convert to api format
        return
      }
      res.sendStatus(404)
    }).catch((err) => {
      Logger.error(err)
      res.sendStatus(500)
    })
})


export default router
