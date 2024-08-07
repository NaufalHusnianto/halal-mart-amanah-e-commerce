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
    Button,
} from "@nextui-org/react";
import React from "react";

const Transactions = ({ auth, transactions, products }) => {
    const getProductDetails = (productId) => {
        return products.find((product) => product.id === productId) || {};
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Transaction History" />

            <div className="pt-24 pb-12 px-12">
                <h1 className="font-bold text-2xl">Riwayat Transaksi</h1>
                <Table aria-label="Transaction History Table" className="mt-4">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Tanggal</TableColumn>
                        <TableColumn>List Barang</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Total</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => {
                            const items = JSON.parse(transaction.items);

                            return (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            transaction.created_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {items.map((item) => {
                                            const product = getProductDetails(
                                                parseInt(item.product_id)
                                            );
                                            return (
                                                <div
                                                    key={product.id}
                                                    className="flex items-center"
                                                >
                                                    <Image
                                                        src={
                                                            "/storage/" +
                                                            product.image
                                                        }
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <div className="ml-4">
                                                        {product.name}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell>
                                        Rp.
                                        {items.reduce((total, item) => {
                                            const product = getProductDetails(
                                                parseInt(item.product_id)
                                            );
                                            return (
                                                total +
                                                parseFloat(product.price) *
                                                    parseInt(item.quantity)
                                            );
                                        }, 0)}
                                        ,-
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Authenticated>
    );
};

export default Transactions;
