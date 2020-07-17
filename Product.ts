import {
  Table, AllowNull, Column, Model, DataType, BelongsToMany
} from 'sequelize-typescript'
import Category from './Category'
import ProductCategory from './ProductCategory'
import Store from './Store'
import ProductStore from './ProductStore'


@Table({ underscored: true })
class Product extends Model<Product> {
    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @AllowNull(false)
    @Column(DataType.STRING)
    priceRange: string

    @AllowNull
    @Column(DataType.STRING)
    barCode: string


    @BelongsToMany(() => Category, () => ProductCategory)
    categories: Category[]

    @BelongsToMany(() => Store, () => ProductStore)
    stores: Store[]
}

export default Product
