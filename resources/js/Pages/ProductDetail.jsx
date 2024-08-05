import { usePage } from "@inertiajs/react";

export default function ProductDetail() {
    const { props } = usePage();
    const { product } = props;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Tambahkan elemen lainnya sesuai kebutuhan */}
        </div>
    );
}
