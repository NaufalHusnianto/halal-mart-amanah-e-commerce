import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Avatar, Badge } from "@nextui-org/react";
import React from "react";

const Chat = ({ auth }) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Chat" />

            <div className="pt-24 pb-12 px-12 flex justify-center items-center">
                <div className="bg-content1 rounded-2xl col-span-2 min-h-96 w-full max-w-4xl">
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
