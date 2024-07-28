import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Avatar, Badge } from "@nextui-org/react";
import React from "react";

const Chat = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Chat" />

            <div className="pt-24 pb-12 px-12 grid grid-cols-3 gap-4">
                <div className="bg-content1 rounded-2xl p-5">
                    <h4 className="font-semibold">Kotak Masuk</h4>
                    <div className="flex flex-col gap-2 rounded-2xl mt-4">
                        <div className="p-2 bg-content2 rounded-2xl flex gap-4 items-center">
                            <Badge content="1" color="primary">
                                <Avatar
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                    className=""
                                />
                            </Badge>
                            <p>Toko Jaya Abadi</p>
                        </div>
                        <div className="p-2 bg-content2 rounded-2xl flex gap-4 items-center">
                            <Badge content="1" color="primary">
                                <Avatar
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                    className=""
                                />
                            </Badge>
                            <p>Toko Jaya Abadi</p>
                        </div>
                        <div className="p-2 bg-content2 rounded-2xl flex gap-4 items-center">
                            <Badge content="1" color="primary">
                                <Avatar
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                    className=""
                                />
                            </Badge>
                            <p>Toko Jaya Abadi</p>
                        </div>
                    </div>
                </div>
                <div className="bg-content1 rounded-2xl col-span-2 flex flex-col justify-center items-center p-20">
                    <h3 className="text-xl font-bold">
                        Selamat Datang di Chat !
                    </h3>
                    <p>Pilih Pesan Untuk Memulai Percakapan</p>
                </div>
            </div>
        </Authenticated>
    );
};

export default Chat;
