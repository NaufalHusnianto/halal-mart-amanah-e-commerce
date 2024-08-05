import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import axios from "axios";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";

export default function Dashboard({ auth, products }) {
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleSearch = async () => {
        try {
            const response = await axios.get("/search", {
                params: { query: query },
            });

            // Cek format data
            console.log("Data fetched:", response.data);

            // Jika respons adalah array
            setFilteredProducts(
                Array.isArray(response.data) ? response.data : []
            );
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Dashboard" />

            <div className="pt-24 pb-12 sm:px-12 px-3">
                <div className="flex justify-center items-center mb-6 gap-4">
                    <TextInput
                        type="text"
                        placeholder="Cari Produk"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-1/2 text-gray-500 bg-background h-2/3 px-4 py-2 rounded"
                    />
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={handleSearch}
                        size="sm"
                    >
                        Search
                    </Button>
                </div>

                <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <Card
                                shadow="sm"
                                key={index}
                                isPressable
                                onPress={() => console.log("item pressed")}
                            >
                                <CardBody className="overflow-visible p-0">
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt={product.name}
                                        className="w-full object-cover h-[140px]"
                                        src={"/storage/" + product.image}
                                    />
                                </CardBody>
                                <CardFooter className="text-small flex-col items-start">
                                    <div className="flex justify-between w-full">
                                        <p className="font-bold text-md">
                                            {product.name}
                                        </p>
                                        <p className="text-default-500">
                                            Rp.{product.price},-
                                        </p>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <p className="text-default-500 text-start">
                                            {product.description}
                                        </p>
                                        <div className="flex justify-between items-center w-full mt-2">
                                            <p className="text-default-500 text-start">
                                                Stock:
                                                <span className="text-foreground font-extralight mx-1">
                                                    {product.stock}
                                                </span>
                                            </p>
                                            <Button
                                                variant="solid"
                                                color="primary"
                                                size="sm"
                                            >
                                                + Keranjang
                                            </Button>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}
