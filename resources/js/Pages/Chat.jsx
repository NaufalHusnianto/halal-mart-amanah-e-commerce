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
                            <p>Toko Lampu Permata</p>
                        </div>
                        <div className="p-2 bg-content2 rounded-2xl flex gap-4 items-center">
                            <Badge content="5" color="primary">
                                <Avatar
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                    className=""
                                />
                            </Badge>
                            <p>Toko Indah Palace</p>
                        </div>
                    </div>
                </div>
                <div className="bg-content1 rounded-2xl col-span-2 min-h-96">
                    <div className="w-full bg-content2 rounded-xl py-2 px-4 flex items-center gap-3">
                        <Avatar
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            className=""
                        />
                        <p className="font-semibold">Toko Jaya Abadi</p>
                    </div>

                    <div className="py-5 px-12 flex flex-col">
                        <div className="flex items-center gap-3 justify-start">
                            <Avatar
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                className=""
                            />
                            <div className="border-2 border-primary rounded-full p-3">
                                <p className="text-sm">Hallo, Permisi</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                            <div className="border-2 border-primary rounded-full p-3">
                                <p className="text-sm">
                                    Hallo, Ada yang bisa dibantu?
                                </p>
                            </div>
                            <Avatar
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                className=""
                            />
                        </div>

                        <div className="flex items-center gap-3 justify-start">
                            <Avatar
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                className=""
                            />
                            <div className="border-2 border-primary rounded-full p-3">
                                <p className="text-sm">
                                    apakah produk ini ada ??
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="bg-content1 rounded-2xl col-span-2 flex flex-col justify-center items-center p-20">
                    <h3 className="text-xl font-bold">
                        Selamat Datang di Chat !
                    </h3>
                    <p>Pilih Pesan Untuk Memulai Percakapan</p>
                </div> */}
            </div>
        </Authenticated>
    );
};

export default Chat;
