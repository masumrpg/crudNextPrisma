"use client";
import { SyntheticEvent, useState } from "react";
import {Brand} from "@prisma/client"
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";


const AddProduct = ({brands}: {brands: Brand[]}) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleSubmit =async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post("/api/products", {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })
        setTitle("");
        setPrice("");
        setBrand("");
        router.refresh();
        setIsOpen(false);
    }

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const homePage = '/'


    return (
    <div>
        <button className="btn mr-3" onClick={handleModal}>Tambah</button>
        <Link className="btn btn-primary bg-sky-500 hover:bg-sky-700" href={homePage}>Home Page</Link>

        <div className={isOpen ? 'modal modal-open' : 'modal'}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Tambah Produk Baru</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full">
                        <label className="label font-bold">Nama Produk</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered" placeholder="Product Name" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-bold">Harga</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input input-bordered" placeholder="Price" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-bold">Merek</label>
                        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select select-bordered" required>
                            <option value="" disabled>Pilih Merek</option>
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

export default AddProduct