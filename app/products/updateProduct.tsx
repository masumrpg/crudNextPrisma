"use client";
import { SyntheticEvent, useState } from "react";
import {Brand} from "@prisma/client"
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}


const UpdateProduct = ({brands, product}: {brands: Brand[]; product: Product}) => {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [brand, setBrand] = useState(product.brandId);

    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleUpdate =async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.patch(`/api/products/${product.id}`, {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })
        router.refresh();
        setIsOpen(false);
    }

    const handleModal = () => {
        setIsOpen(!isOpen);
    }


    return (
    <div>
        <button className="btn btn-info btn-sm" onClick={handleModal}>Ubah</button>

        <div className={isOpen ? 'modal modal-open' : 'modal'}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update {product.title}</h3>
                <form onSubmit={handleUpdate}>
                    <div className="form-control w-full">
                        <label className="label font-bold">Nama Produk</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered" placeholder="Product Name" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-bold">Harga</label>
                        <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input input-bordered" placeholder="Price" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-bold">Merek</label>
                        <select value={brand} onChange={(e) => setBrand(Number(e.target.value))} className="select select-bordered">
                            {brands.map((brand) => (
                                <option value={brand.id} key={brand.id}>{brand.name}</option>
                            ))}
                            
                        </select>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>Tutup</button>
                        <button type="submit" className="btn btn-primary">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default UpdateProduct