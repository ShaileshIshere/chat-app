"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/conversations/useCurrentConversation";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";

interface ConfirmModal {
    isOpen?: boolean;
    onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModal> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setIsLoading(true);

        axios
            .delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose();
                router.push("/conversations");
                router.refresh();
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false));
    }, [conversationId, router, onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="mt-2 sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertTriangle className={"h-6 w-6 text-red-600"} />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                        as={"h3"}
                        className={
                            "text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                        }
                    >
                        Delete conversation
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className={"text-sm text-gray-500"}>
                            Are you sure you want to delete this conversation?
                            This action can not be undone.
                        </p>
                    </div>
                </div>
            </div>
            {/* fix: button lay out */}
            <div className="mt-5 flex flex-col justify-center sm:mt-4 sm:flex-row-reverse sm:justify-start gap-3">
                <Button disabled={isLoading} danger onClick={onDelete}>
                    Delete
                </Button>
                <Button disabled={isLoading} secondary onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
