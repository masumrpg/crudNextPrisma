import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";
const prisma = new PrismaClient();

const getProducts = async () => {
    const res = await prisma.product.findMany({
        select:{
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: true,
        },
    });
    return res;
}

const getBrands = async () => {
    const res = await prisma.brand.findMany();
    return res;
}

const Product = async () => {
    const [products, brands] = await Promise.all([
        getProducts(),
        getBrands()
    ])
    return (
        <div>

            <div>
                <div className="mb-2">
                    <AddProduct brands={brands} />
                </div>
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Produk</th>
                        <th>Harga</th>
                        <th>Merek</th>
                        <th className="text-center">Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.brand.name}</td>
                            <td className="flex justify-center space-x1">
                                <UpdateProduct brands={brands} product={product}/>
                                <DeleteProduct product={product}/>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default Product