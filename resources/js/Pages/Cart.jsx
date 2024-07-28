import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Image,
    Checkbox,
    Button,
} from "@nextui-org/react";

import React from "react";

const Cart = ({ auth, products }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Cart" />

            <div className="pt-24 pb-12 px-12">
                <h1 className="font-bold text-2xl">Keranjang</h1>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <Table
                        aria-label="Example empty table"
                        className="col-span-2"
                    >
                        <TableHeader>
                            <TableColumn>
                                <Checkbox>Pilih Semua</Checkbox>
                            </TableColumn>
                            <TableColumn></TableColumn>
                            <TableColumn>JUMLAH</TableColumn>
                            <TableColumn></TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No rows to display."}>
                            {products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox className="gap-4">
                                            <div className="flex flex-col">
                                                <p>{product.name}</p>
                                                <p className="text-gray-500">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </Checkbox>
                                    </TableCell>
                                    <TableCell>
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt={product.name}
                                            className="w-full object-cover h-[50px]"
                                            src={"/storage/" + product.image}
                                        />
                                    </TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="col-span-1 bg-content1 rounded-2xl p-5 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">
                                Ringkasan Belanja
                            </h3>
                            <div className="flex justify-between mt-4">
                                <p>Total Harga :</p>
                                <p>Rp.10.000,-</p>
                            </div>
                        </div>

                        <Button variant="solid" color="primary">
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Cart;
