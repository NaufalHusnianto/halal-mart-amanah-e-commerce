import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
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
import React, { useState, useEffect } from "react";

const Cart = ({ auth }) => {
    const { cart } = usePage().props;
    const cartItems = cart ? cart.items : [];

    const [checkedItems, setCheckedItems] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [items, setItems] = useState(cart.items);

    useEffect(() => {
        const initialCheckedState = cartItems.reduce((acc, item) => {
            acc[item.id] = false;
            return acc;
        }, {});
        setCheckedItems(initialCheckedState);
    }, [cartItems]);

    const handleCheckboxChange = (itemId) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId],
        }));
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const newCheckedState = cartItems.reduce((acc, item) => {
            acc[item.id] = !selectAll;
            return acc;
        }, {});
        setCheckedItems(newCheckedState);
    };

    const totalHarga = cartItems.reduce((total, item) => {
        if (checkedItems[item.id]) {
            return total + item.product.price * item.quantity;
        }
        return total;
    }, 0);

    const handleRemoveItem = (cartItemId) => {
        axios
            .delete(route("cart.removeItem"), {
                data: { cart_item_id: cartItemId },
            })
            .then((response) => {
                setItems(items.filter((item) => item.id !== cartItemId));
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error removing item from cart:", error);
            });
    };

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
                                <Checkbox
                                    isChecked={selectAll}
                                    onChange={handleSelectAll}
                                >
                                    Pilih Semua
                                </Checkbox>
                            </TableColumn>
                            <TableColumn></TableColumn>
                            <TableColumn>JUMLAH</TableColumn>
                            <TableColumn>HARGA</TableColumn>
                            <TableColumn></TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No rows to display."}>
                            {cartItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox
                                            isChecked={checkedItems[item.id]}
                                            onChange={() =>
                                                handleCheckboxChange(item.id)
                                            }
                                            className="gap-4"
                                        >
                                            <div className="flex flex-col">
                                                <p>{item.product.name}</p>
                                                <p className="text-gray-500">
                                                    {item.product.description}
                                                </p>
                                            </div>
                                        </Checkbox>
                                    </TableCell>
                                    <TableCell>
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt={item.product.name}
                                            className="w-full object-cover h-[50px]"
                                            src={
                                                "/storage/" + item.product.image
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.product.price}</TableCell>
                                    <TableCell>
                                        <Button
                                            color="danger"
                                            variant="solid"
                                            size="sm"
                                            onClick={() =>
                                                handleRemoveItem(item.id)
                                            }
                                        >
                                            Remove
                                        </Button>
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
