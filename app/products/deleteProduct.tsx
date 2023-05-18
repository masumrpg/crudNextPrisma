"use client";
import "./products.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const DeleteProduct = ({product}: {product: Product}) => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleDelete = async (productId: number) => {
        await axios.delete(`/api/products/${productId}`);
        router.refresh();
        setIsOpen(false);
    }

    const handleModal = () => {
        setIsOpen(!isOpen);
    }


    return (
    <div>
        <button className="btn btn-error btn-sm" onClick={handleModal}>Hapus</button>

        <div className={isOpen ? 'modal modal-open' : 'modal'}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Yakin Hapus <span className="font-highlight">{product.title}</span>?</h3>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleModal}>Tidak</button>
                    <button type="button" className="btn btn-primary" onClick={() => handleDelete(product.id)}>Ya</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default DeleteProduct