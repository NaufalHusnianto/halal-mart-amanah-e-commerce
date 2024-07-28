import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function Dashboard({ auth, products }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={
            //     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            //         Dashboard
            //     </h2>
            // }
        >
            <Head title="Dashboard" />

            <div className="pt-24 pb-12 px-12">
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                    {products.map((product, index) => (
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
                                <div className="flex justify-between items-center w-full mt-2">
                                    <div>
                                        <p className="text-default-500 text-start">
                                            {product.description}
                                        </p>
                                        <p className="text-default-500 text-start">
                                            Stock:
                                            <span className="text-foreground font-extralight mx-1">
                                                {product.stock}
                                            </span>
                                        </p>
                                    </div>
                                    <Button
                                        variant="solid"
                                        color="primary"
                                        size="sm"
                                    >
                                        + Keranjang
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
