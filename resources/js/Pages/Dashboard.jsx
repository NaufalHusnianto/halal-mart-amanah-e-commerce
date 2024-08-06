import { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Image,
    Pagination,
} from "@nextui-org/react";
import axios from "axios";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";

export default function Dashboard({ auth, products }) {
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const { data, setData, post, reset, errors } = useForm({
        product_id: "",
        quantity: 1,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    const handleSearch = async () => {
        try {
            const response = await axios.get("/search", {
                params: { query: query },
            });

            // console.log("Data fetched:", response.data);

            setFilteredProducts(
                Array.isArray(response.data) ? response.data : []
            );
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const addToCart = (product_id) => {
        setData("product_id", product_id);
    };

    useEffect(() => {
        if (data.product_id) {
            console.log(data);
            post(route("cart.add"), {
                onSuccess: () => console.log("success"),
                onError: (errors) => console.error("error", errors),
                onFinish: () => console.log("request finished"),
            });
        }
    }, [data.product_id]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Authenticated user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-24 sm:px-12 px-3">
                <div className="flex justify-center items-center mb-8 gap-4">
                    <TextInput
                        type="text"
                        placeholder="Cari Produk"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
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
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product, index) => (
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
                                                onClick={() =>
                                                    addToCart(product.id)
                                                }
                                            >
                                                + Keranjang
                                            </Button>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p className="p-5">No products found.</p>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                    <Pagination
                        total={Math.ceil(
                            filteredProducts.length / productsPerPage
                        )}
                        initialPage={currentPage}
                        onChange={(page) => paginate(page)}
                        showControls
                    />
                </div>
            </div>
        </Authenticated>
    );
}
