import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Image,
    Button,
} from "@nextui-org/react";
import React, { useState } from "react";

const Checkout = ({ auth }) => {
    const { selectedItems } = usePage().props;

    if (!selectedItems) {
        return <div>No items selected for checkout.</div>;
    }

    const [shippingAddress, setShippingAddress] = useState("");

    const { data, setData, post, progress } = useForm({
        items: selectedItems,
        shipping_address: "",
        payment_invoice: null,
    });

    const totalHarga = selectedItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const handleInputChange = (e) => {
        setShippingAddress(e.target.value);
        setData("shipping_address", e.target.value);
    };

    const handleFileChange = (e) => {
        setData("payment_invoice", e.target.files[0]);
    };

    const handlePurchase = () => {
        post(route("checkout.purchase"), {
            onSuccess: () => console.log("Purchase completed successfully."),
            onError: (errors) => console.error("Purchase error", errors),
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Checkout" />

            <div className="pt-24 pb-12 px-12">
                <h1 className="font-bold text-2xl">Checkout</h1>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <Table
                        aria-label="Selected items table"
                        className="col-span-2"
                    >
                        <TableHeader>
                            <TableColumn>Item</TableColumn>
                            <TableColumn>Jumlah</TableColumn>
                            <TableColumn>Harga</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {selectedItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Image
                                                shadow="sm"
                                                radius="lg"
                                                width="100%"
                                                alt={item.product.name}
                                                className="w-[50px] h-[50px] object-cover"
                                                src={
                                                    "/storage/" +
                                                    item.product.image
                                                }
                                            />
                                            <div>
                                                <p>{item.product.name}</p>
                                                <p className="text-gray-500">
                                                    {item.product.description}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        Rp.{item.product.price},-
                                    </TableCell>
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
                                <p>Rp.{totalHarga},-</p>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="shipping_address">
                                    Alamat Pengiriman (link google maps):
                                </label>
                                <textarea
                                    id="shipping_address"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    value={shippingAddress}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="my-4">
                                <label htmlFor="payment_invoice">
                                    Upload Bukti Pembayaran:
                                </label>
                                <input
                                    type="file"
                                    id="payment_invoice"
                                    className="mt-1 block w-full"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <Button
                            variant="solid"
                            color="primary"
                            onClick={handlePurchase}
                        >
                            Beli
                        </Button>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Checkout;
