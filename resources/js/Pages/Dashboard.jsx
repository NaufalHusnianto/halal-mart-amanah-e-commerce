import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

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
                                    <b>{product.name}</b>
                                    <p className="text-default-500">
                                        {product.price}
                                    </p>
                                </div>
                                <p className="mt-2 text-default-500">
                                    {product.description}
                                </p>
                                <p className="text-default-500">
                                    Stock: {product.stock}
                                </p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
